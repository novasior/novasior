import { supabaseAdminClient } from './config.js';

export interface RequestedProduct {
  id: string;
  name?: string;
  quantity: number;
  price?: number;
}

export async function validateProductItems(items: RequestedProduct[], amountPaise: number) {
  if (!supabaseAdminClient || !Array.isArray(items) || items.length === 0) {
    throw new Error('No valid products were supplied for this payment.');
  }

  const productIds = items.map((item) => String(item?.id || ''));
  if (productIds.some((id) => !id) || new Set(productIds).size !== productIds.length) {
    throw new Error('Invalid product selection.');
  }

  const { data: products, error } = await supabaseAdminClient
    .from('products')
    .select('id, name, price, active, currency')
    .in('id', productIds)
    .eq('active', true);

  if (error || !products || products.length !== productIds.length) {
    throw new Error('One or more products are unavailable.');
  }

  const productsById = new Map(products.map((product) => [product.id, product]));
  const normalizedItems = items.map((item) => {
    const product = productsById.get(String(item.id));
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

  return { items: normalizedItems, amountPaise: expectedAmountPaise };
}