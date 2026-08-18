import { getHealthStatus, getPublicRazorpayConfig, razorpayClient } from './lib/config.js';
import { createRazorpayOrder, getAmountInPaise, verifyPaymentSignature } from './lib/razorpay.js';
import { storeVerifiedOrderAndItems } from './lib/order-storage.js';
import { notifyMakeWebhook } from './lib/make.js';
import { getOrders, getOrderByRazorpayOrderId } from './lib/orders.js';
import { getRequestBody, jsonError } from './lib/request.js';

function getRouteParts(req: any) {
  const url = new URL(req?.url || '/', 'https://example.com');
  const cleanedPath = url.pathname.replace(/^\/api\/?/, '').replace(/^\/+/, '');
  const segments = cleanedPath ? cleanedPath.split('/').filter(Boolean) : [];
  return segments;
}

export default async function handler(req: any, res: any) {
  const method = String(req?.method || 'GET').toUpperCase();
  const segments = getRouteParts(req);
  const [first, second] = segments;

  if (method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (method === 'GET' && (!segments.length || segments[0] === '')) {
    return res.status(200).json({
      ok: true,
      message: 'NOVASIOR API is ready.',
      environment: process.env.VERCEL ? 'vercel' : (process.env.NODE_ENV || 'development'),
    });
  }

  if (method === 'GET' && first === 'health') {
    return res.status(200).json(getHealthStatus());
  }

  if (method === 'GET' && first === 'razorpay' && second === 'key') {
    return res.status(200).json(getPublicRazorpayConfig());
  }

  if (method === 'GET' && first === 'orders' && !second) {
    try {
      const result = await getOrders();
      return res.status(200).json(result);
    } catch (error: any) {
      console.error('Fetch orders error:', error?.message || error);
      return res.status(500).json({ success: false, error: error?.message || 'Failed to fetch orders' });
    }
  }

  if (method === 'GET' && first === 'orders' && second) {
    try {
      const orderId = second;
      if (!orderId) {
        return res.status(400).json({ success: false, error: 'Order ID is required.' });
      }

      const result = await getOrderByRazorpayOrderId(orderId);
      return res.status(200).json(result);
    } catch (error: any) {
      console.error('Fetch order error:', error?.message || error);
      const message = String(error?.message || 'Failed to fetch order');
      const status = message === 'Order not found' ? 404 : 500;
      return res.status(status).json({ success: false, error: message });
    }
  }

  if (first === 'razorpay' && second === 'create-order') {
    if (method !== 'POST') {
      return jsonError(res, 405, 'Method not allowed. Use POST.');
    }

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

  if (first === 'razorpay' && second === 'verify-payment') {
    if (method !== 'POST') {
      return jsonError(res, 405, 'Method not allowed. Use POST.');
    }

    try {
      const body = getRequestBody(req);
      const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        amount,
        currency = 'INR',
        customerName,
        customerEmail,
        items = [],
      } = body;

      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return jsonError(res, 400, 'Missing payment details.');
      }

      if (!razorpayClient) {
        return jsonError(res, 500, 'Razorpay is not configured in the server environment.');
      }

      const validSignature = verifyPaymentSignature(razorpay_order_id, razorpay_payment_id, razorpay_signature);
      if (!validSignature) {
        console.warn(`❌ Invalid signature for payment ${razorpay_payment_id}`);
        return jsonError(res, 400, 'Invalid payment signature. Payment verification failed.');
      }

      let actualPaymentMethod = 'razorpay';
      try {
        const paymentDetails = await razorpayClient.payments.fetch(razorpay_payment_id);
        if (paymentDetails && (paymentDetails as any).method) {
          actualPaymentMethod = (paymentDetails as any).method;
        }
      } catch (methodErr: any) {
        console.warn(`Notice: Could not query specific payment method from Razorpay: ${methodErr?.message}`);
      }

      const safeAmountPaise = getAmountInPaise(Number(amount) || 0);

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

      if (!dbResult.isExisting) {
        await notifyMakeWebhook(dbResult.orderId);
      }

      console.log(`✓ Payment verified: ${razorpay_payment_id} | orders.id: ${dbResult.orderId} | Method: ${actualPaymentMethod}`);

      return res.status(200).json({
        success: true,
        verified: true,
        message: 'Payment verified successfully.',
        orderId: dbResult.orderId,
        paymentId: razorpay_payment_id,
        paymentMethod: actualPaymentMethod,
      });
    } catch (error: any) {
      console.error('Razorpay verify-payment error:', error?.message || error);
      return jsonError(res, 500, error?.message || 'Payment verification failed.');
    }
  }

  return res.status(404).json({ success: false, error: 'Not found.' });
}
