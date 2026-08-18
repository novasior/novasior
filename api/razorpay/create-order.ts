import { createRazorpayOrder } from '../../server/razorpay';
import { getRequestBody, jsonError } from '../../server/request';

export default async function handler(req: any, res: any) {
  try {
    const body = getRequestBody(req);
    const amount = Number(body.amount);
    const currency = (body.currency || 'INR').toUpperCase();
    const customerName = String(body.customerName || '').trim();
    const customerEmail = String(body.customerEmail || '').trim();
    const items = Array.isArray(body.items) ? body.items : [];

    if (!Number.isFinite(amount) || amount <= 0) {
      return jsonError(res, 400, 'A valid amount is required.');
    }

    if (!customerName || !customerEmail) {
      return jsonError(res, 400, 'Customer name and email are required.');
    }

    const result = await createRazorpayOrder({
      amount,
      currency,
      customerName,
      customerEmail,
      items,
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
