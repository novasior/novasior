import express from 'express';
import path from 'path';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { pathToFileURL } from 'url';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

// ============================================================================
// SUPABASE INITIALIZATION
// ============================================================================

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';
const supabaseAdmin = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null;

const supabaseAdminClient = supabaseUrl && supabaseAdmin
  ? createClient(supabaseUrl, supabaseAdmin)
  : null;

// ============================================================================
// RAZORPAY INITIALIZATION
// ============================================================================

const app = express();
const PORT = Number(process.env.PORT || 3000);

app.use(express.json({ limit: '1mb' }));

const razorpayKeyId = process.env.RAZORPAY_KEY_ID || '';
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET || '';

const isDummyKey = (key?: string) => {
  if (!key) return true;
  const value = key.toLowerCase();
  return value.includes('placeholder') || value.includes('demo') || value.includes('my_') || value === 'rzp_test_placeholderkeyid';
};

const razorpayClient = razorpayKeyId && razorpayKeySecret && !isDummyKey(razorpayKeyId) && !isDummyKey(razorpayKeySecret)
  ? new Razorpay({ key_id: razorpayKeyId, key_secret: razorpayKeySecret })
  : null;

const isTestMode = Boolean(razorpayKeyId && razorpayKeyId.startsWith('rzp_test_'));

// ============================================================================
// SUPABASE DATABASE OPERATIONS & IDEMPOTENT ORDER STORAGE
// ============================================================================

interface VerifiedOrderPayload {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
  amount: number; // in paise
  currency: string;
  customerName: string;
  customerEmail: string;
  paymentMethod: string;
  items: Array<{ id: string; name: string; quantity: number; price: number }>;
}

async function storeVerifiedOrderAndItems(payload: VerifiedOrderPayload) {
  if (!supabaseAdminClient) {
    console.warn('⚠️ Supabase not configured. Order cannot be persisted.');
    return { success: false, reason: 'Supabase admin client not configured' };
  }

  try {
    // 1. Idempotency Check: check if order already exists
    const { data: existingOrder } = await supabaseAdminClient
      .from('orders')
      .select('id, payment_status, email_status')
      .or(`razorpay_payment_id.eq.${payload.razorpayPaymentId},razorpay_order_id.eq.${payload.razorpayOrderId}`)
      .maybeSingle();

    if (existingOrder && existingOrder.payment_status === 'paid') {
      console.log(`ℹ️ Order already persisted and paid (orders.id = ${existingOrder.id}). Reusing existing order.`);
      return { success: true, orderId: existingOrder.id, isExisting: true };
    }

    // 2. Insert into orders table
    const { data: insertedOrder, error: orderError } = await supabaseAdminClient
      .from('orders')
      .insert({
        razorpay_order_id: payload.razorpayOrderId,
        razorpay_payment_id: payload.razorpayPaymentId,
        razorpay_signature: payload.razorpaySignature,
        customer_name: payload.customerName,
        customer_email: payload.customerEmail,
        amount: payload.amount,
        currency: payload.currency || 'INR',
        status: 'paid',
        payment_status: 'paid',
        payment_method: payload.paymentMethod || 'razorpay',
        email_status: 'pending',
        items: payload.items || [],
      })
      .select('id')
      .single();

    if (orderError || !insertedOrder) {
      throw new Error(`Orders insert failed: ${orderError?.message || 'Unknown database error'}`);
    }

    const orderId: number = insertedOrder.id;
    console.log(`✓ Order created in Supabase: orders.id = ${orderId} (BIGINT)`);

    // 3. Insert order_items for every purchased product
    if (Array.isArray(payload.items) && payload.items.length > 0) {
      const orderItemsRows = payload.items.map((item) => ({
        order_id: orderId,
        product_id: item.id, // UUID
        product_name: item.name || 'Digital Product',
        quantity: Number(item.quantity) || 1,
        unit_price: Number(item.price) || 0,
        total_price: (Number(item.price) || 0) * (Number(item.quantity) || 1),
      }));

      const { error: itemsError } = await supabaseAdminClient
        .from('order_items')
        .insert(orderItemsRows);

      if (itemsError) {
        console.error(`⚠️ Warning: Error inserting order_items for order ${orderId}:`, itemsError.message);
      } else {
        console.log(`✓ Stored ${orderItemsRows.length} order_item(s) for order ${orderId}`);
      }
    }

    return { success: true, orderId, isExisting: false };
  } catch (error: any) {
    console.error('Database storage error:', error?.message || error);
    return { success: false, reason: error?.message || 'Database error' };
  }
}

// ============================================================================
// MAKE.COM WEBHOOK NOTIFICATION
// ============================================================================

async function notifyMakeWebhook(orderId: number | string) {
  const makeWebhookUrl = process.env.MAKE_WEBHOOK_URL || 'https://hook.eu1.make.com/lhkqc4gskv1u2omo5r8wafv5ne1y1jej';
  const makeApiKey = process.env.MAKE_WEBHOOK_API_KEY || '';

  console.log(`📡 Sending webhook to Make.com for order_id: ${orderId}...`);
  try {
    const response = await fetch(makeWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-make-apikey': makeApiKey,
      },
      body: JSON.stringify({
        order_id: Number(orderId),
      }),
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      console.error(`⚠️ Make webhook returned status ${response.status}: ${errText}`);
      return { success: false, status: response.status, error: errText };
    }

    console.log(`✓ Make webhook successfully received order_id: ${orderId}`);
    return { success: true };
  } catch (err: any) {
    console.error(`⚠️ Make webhook connection failure for order ${orderId}:`, err?.message || err);
    return { success: false, error: err?.message };
  }
}

// ============================================================================
// API ENDPOINTS
// ============================================================================

app.get('/api/health', async (_req, res) => {
  const razorpayOk = Boolean(razorpayClient);
  const supabaseOk = Boolean(supabaseAdminClient);
  const makeWebhookOk = Boolean(process.env.MAKE_WEBHOOK_URL || 'https://hook.eu1.make.com/lhkqc4gskv1u2omo5r8wafv5ne1y1jej');

  res.json({
    ok: true,
    razorpayConfigured: razorpayOk,
    supabaseConfigured: supabaseOk,
    makeWebhookConfigured: makeWebhookOk,
    isTestMode,
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/razorpay/key', (_req, res) => {
  res.json({
    keyId: razorpayKeyId,
    configured: Boolean(razorpayClient),
    isTestMode,
    supabaseConfigured: Boolean(supabaseAdminClient),
  });
});

app.post('/api/razorpay/create-order', async (req, res) => {
  try {
    const {
      amount,
      currency = 'INR',
      customerName,
      customerEmail,
      items = [],
    } = req.body || {};

    const numericAmount = Number(amount);

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({ error: 'A valid amount is required.' });
    }

    if (!customerName || !customerEmail) {
      return res.status(400).json({ error: 'Customer name and email are required.' });
    }

    if (!razorpayClient) {
      return res.status(500).json({
        success: false,
        error: 'Razorpay is not configured. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to environment variables.',
      });
    }

    const receipt = `novasior_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const order = await razorpayClient.orders.create({
      amount: Math.round(numericAmount * 100),
      currency,
      receipt,
      notes: {
        customer_name: String(customerName).slice(0, 120),
        customer_email: String(customerEmail).slice(0, 120),
        item_count: String(Array.isArray(items) ? items.length : 0),
        source: 'novasior-storefront',
        environment: isTestMode ? 'test' : 'production',
      },
    });

    console.log(`✓ Razorpay order created: ${order.id} (Amount: ₹${numericAmount})`);

    return res.json({
      success: true,
      order,
      keyId: razorpayKeyId,
      environment: isTestMode ? 'TEST MODE' : 'PRODUCTION',
    });
  } catch (error: any) {
    console.error('Razorpay create-order error:', error?.message || error);
    res.status(500).json({
      success: false,
      error: error?.message || 'Failed to create Razorpay order.',
    });
  }
});

app.post('/api/razorpay/verify-payment', async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount,
      currency = 'INR',
      customerName,
      customerEmail,
      items = [],
    } = req.body || {};

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: 'Missing payment details.' });
    }

    if (!razorpayClient) {
      return res.status(500).json({
        success: false,
        verified: false,
        error: 'Razorpay is not configured in the server environment.',
      });
    }

    // 1. Verify Razorpay cryptographic signature FIRST
    const expectedSignature = crypto
      .createHmac('sha256', razorpayKeySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      console.warn(`❌ Invalid signature for payment ${razorpay_payment_id}`);
      return res.status(400).json({
        success: false,
        verified: false,
        error: 'Invalid payment signature. Payment verification failed.',
      });
    }

    // 2. Fetch actual payment method from Razorpay
    let actualPaymentMethod = 'razorpay';
    try {
      const paymentDetails = await razorpayClient.payments.fetch(razorpay_payment_id);
      if (paymentDetails && (paymentDetails as any).method) {
        actualPaymentMethod = (paymentDetails as any).method;
      }
    } catch (methodErr: any) {
      console.warn(`Notice: Could not query specific payment method from Razorpay: ${methodErr?.message}`);
    }

    const safeAmountPaise = Math.round((Number(amount) || 0) * 100);

    // 3. Store verified paid order + order_items in Supabase
    const dbResult = await storeVerifiedOrderAndItems({
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      amount: safeAmountPaise,
      currency,
      customerName: String(customerName || 'Customer'),
      customerEmail: String(customerEmail || ''),
      paymentMethod: actualPaymentMethod,
      items: Array.isArray(items) ? items : [],
    });

    if (!dbResult.success || !dbResult.orderId) {
      console.error('⚠️ Database persistence error:', dbResult.reason);
      return res.status(500).json({
        success: false,
        verified: true,
        error: 'Payment was verified successfully, but failed to save order to database.',
      });
    }

    // 4. Trigger Make.com webhook only after successful persistence (skip if already processed)
    if (!dbResult.isExisting) {
      await notifyMakeWebhook(dbResult.orderId);
    }

    console.log(`✓ Payment verified: ${razorpay_payment_id} | orders.id: ${dbResult.orderId} | Method: ${actualPaymentMethod}`);

    return res.json({
      success: true,
      verified: true,
      message: 'Payment verified successfully.',
      orderId: dbResult.orderId,
      paymentId: razorpay_payment_id,
      paymentMethod: actualPaymentMethod,
    });
  } catch (error: any) {
    console.error('Razorpay verify-payment error:', error?.message || error);
    res.status(500).json({
      success: false,
      verified: false,
      error: error?.message || 'Payment verification failed.',
    });
  }
});

app.get('/api/orders', async (_req, res) => {
  if (!supabase) {
    return res.json({ orders: [], note: 'Supabase not configured' });
  }

  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) throw error;
    res.json({ orders: data || [] });
  } catch (error: any) {
    console.error('Fetch orders error:', error?.message);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

app.get('/api/orders/:id', async (req, res) => {
  if (!supabase) {
    return res.status(404).json({ error: 'Supabase not configured' });
  }

  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('razorpay_order_id', req.params.id)
      .single();

    if (error || !data) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ order: data });
  } catch (error: any) {
    console.error('Fetch order error:', error?.message);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// ============================================================================
// SERVER INITIALIZATION
// ============================================================================

async function initServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    const envStatus = isTestMode ? '🔶 TEST MODE' : '🔴 PRODUCTION MODE';
    console.log(`\n${'='.repeat(70)}`);
    console.log(`✓ NOVASIOR Server Ready`);
    console.log(`${'='.repeat(70)}`);
    console.log(`  Port: ${PORT}`);
    console.log(`  Environment: ${envStatus}`);
    console.log(`  Razorpay: ${razorpayClient ? '✓ Configured' : '✗ Not Configured'}`);
    console.log(`  Supabase: ${supabaseAdminClient ? '✓ Configured' : '✗ Not Configured'}`);
    console.log(`  Make Webhook: ${process.env.MAKE_WEBHOOK_URL || 'https://hook.eu1.make.com/lhkqc4gskv1u2omo5r8wafv5ne1y1jej' ? '✓ Configured' : '✗ Not Configured'}`);
    console.log(`${'='.repeat(70)}\n`);
  });
}

// Export the Express app for Vercel serverless functions
export { app };

// Only start the local dev server when NOT running on Vercel
if (!process.env.VERCEL) {
  initServer();
}
