import { createRazorpayOrder } from '../lib/razorpay.js';
import { getRequestBody, jsonError } from '../lib/request.js';
import { validateProductItems } from '../lib/product-validation.js';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return jsonError(res, 405, 'Method not allowed. Use POST.');
  }

  try {
    const body = await getRequestBody(req);
    const amount = Number(body.amount);
    const currency = String(body.currency || 'INR').toUpperCase();
    const customerName = String(body.customerName || '').trim();
    const customerEmail = String(body.customerEmail || '').trim();
    const items = Array.isArray(body.items) ? body.items : [];

    if (!Number.isFinite(amount) || amount <= 0) {
      return jsonError(res, 400, 'A valid amount is required.');
    }

    if (!customerName || !customerEmail) {
      return jsonError(res, 400, 'Customer name and email are required.');
    }

    const validated = await validateProductItems(items, Math.round(amount * 100));

    const result = await createRazorpayOrder({
      amount: validated.amountPaise / 100,
      currency,
      customerName,
      customerEmail,
      items: validated.items,
    });

    return res.status(200).json({
      success: true,
      order: result.order,
      keyId: result.keyId,
      environment: process.env.VERCEL ? 'VERCEL_PRODUCTION' : 'LOCAL_DEV',
    });
  } catch (error: any) {
    console.error('Razorpay create-order error:', error?.message || error);
    return jsonError(res, 500, error?.message || 'Failed to create Razorpay order.');
  }
}
