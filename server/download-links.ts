import crypto from 'crypto';
import { supabaseAdminClient } from './config.js';

const DOWNLOAD_LINK_TTL_SECONDS = 24 * 60 * 60;
const STORAGE_URL_TTL_SECONDS = 60;
const DOWNLOAD_BUCKET = 'digital-products';

type RequestedItem = { id: string; name: string; quantity: number; price: number };

function getSigningSecret() {
  const secret = process.env.DOWNLOAD_LINK_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  if (!secret) throw new Error('Download link signing secret is not configured');
  return secret;
}

function sign(value: string) {
  return crypto.createHmac('sha256', getSigningSecret()).update(value).digest('base64url');
}

function createToken(orderId: number | string, productId: string) {
  const payload = Buffer.from(JSON.stringify({
    orderId: String(orderId),
    productId,
    expiresAt: Math.floor(Date.now() / 1000) + DOWNLOAD_LINK_TTL_SECONDS,
  })).toString('base64url');

  return `${payload}.${sign(payload)}`;
}

function readToken(token: string) {
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return null;

  const expected = sign(payload);
  const suppliedBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (suppliedBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(suppliedBuffer, expectedBuffer)) {
    return null;
  }

  try {
    const parsed = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as {
      orderId?: string;
      productId?: string;
      expiresAt?: number;
    };

    if (!parsed.orderId || !parsed.productId || !parsed.expiresAt || parsed.expiresAt < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export async function createDownloadLinks(orderId: number | string) {
  if (!supabaseAdminClient) throw new Error('Supabase admin client is not configured');
  const adminClient = supabaseAdminClient;

  const { data: items, error: itemsError } = await adminClient
    .from('order_items')
    .select('product_id, product_name')
    .eq('order_id', orderId);

  if (itemsError) throw new Error(`Could not load purchased products: ${itemsError.message}`);

  if (items?.length) {
    const expiresAt = new Date(Date.now() + DOWNLOAD_LINK_TTL_SECONDS * 1000).toISOString();
    const { error: accessError } = await adminClient
      .from('download_access')
      .upsert(
        items.map((item) => ({
          order_id: orderId,
          product_id: item.product_id,
          expires_at: expiresAt,
        })),
        { onConflict: 'order_id,product_id', ignoreDuplicates: true },
      );

    if (accessError) throw new Error(`Could not prepare secure downloads: ${accessError.message}`);
  }

  const expiresAt = new Date((Math.floor(Date.now() / 1000) + DOWNLOAD_LINK_TTL_SECONDS) * 1000).toISOString();

  return Promise.all((items || []).map(async (item) => {
    const { data: product, error: productError } = await adminClient
      .from('products')
      .select('id, name, storage_path')
      .eq('id', item.product_id)
      .eq('active', true)
      .single();

    if (productError || !product?.storage_path) {
      throw new Error(`No downloadable file is configured for product ${item.product_id}`);
    }

    return {
      productId: product.id,
      productName: product.name || item.product_name,
      url: `/api/download/${createToken(orderId, product.id)}`,
      expiresAt,
    };
  }));
}

export async function resolveDownloadLink(token: string) {
  if (!supabaseAdminClient) throw new Error('Supabase admin client is not configured');

  const claims = readToken(token);
  if (!claims) return { status: 404 as const, error: 'Download link is invalid or expired.' };

  const { data: order, error: orderError } = await supabaseAdminClient
    .from('orders')
    .select('id, payment_status, status')
    .eq('id', claims.orderId)
    .maybeSingle();

  if (orderError || !order || (order.payment_status !== 'paid' && order.status !== 'paid')) {
    return { status: 403 as const, error: 'A completed payment is required to access this file.' };
  }

  const { data: item } = await supabaseAdminClient
    .from('order_items')
    .select('product_id')
    .eq('order_id', claims.orderId)
    .eq('product_id', claims.productId)
    .maybeSingle();

  if (!item) return { status: 403 as const, error: 'This product was not included in the paid order.' };

  const { data: product, error: productError } = await supabaseAdminClient
    .from('products')
    .select('storage_path')
    .eq('id', claims.productId)
    .eq('active', true)
    .single();

  if (productError || !product?.storage_path) {
    return { status: 404 as const, error: 'The purchased file is unavailable.' };
  }

  const { data: signedUrl, error: signedUrlError } = await supabaseAdminClient.storage
    .from(DOWNLOAD_BUCKET)
    .createSignedUrl(product.storage_path, STORAGE_URL_TTL_SECONDS);

  if (signedUrlError || !signedUrl?.signedUrl) {
    return { status: 404 as const, error: 'The purchased file is unavailable.' };
  }

  return { status: 302 as const, url: signedUrl.signedUrl };
}

export async function validateOrderItems(items: RequestedItem[], amountPaise: number) {
  if (!supabaseAdminClient || !Array.isArray(items) || items.length === 0) {
    throw new Error('No valid products were supplied for this payment.');
  }

  const productIds = items.map((item) => item.id);
  const { data: products, error } = await supabaseAdminClient
    .from('products')
    .select('id, name, price, active')
    .in('id', productIds)
    .eq('active', true);

  if (error || !products || products.length !== new Set(productIds).size) {
    throw new Error('One or more products are unavailable.');
  }

  const productsById = new Map(products.map((product) => [product.id, product]));
  const normalizedItems = items.map((item) => {
    const product = productsById.get(item.id);
    const quantity = Number(item.quantity);
    if (!product || !Number.isInteger(quantity) || quantity < 1) {
      throw new Error('Invalid product quantity.');
    }

    return {
      id: product.id,
      name: product.name,
      quantity,
      price: Number(product.price),
    };
  });

  const expectedAmountPaise = normalizedItems.reduce(
    (total, item) => total + Math.round(item.price * 100) * item.quantity,
    0,
  );

  if (expectedAmountPaise !== amountPaise) {
    throw new Error('Payment amount does not match the selected products.');
  }

  return normalizedItems;
}