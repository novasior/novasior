import { razorpayClient } from '../lib/config.js';
import { verifyPaymentSignature, getAmountInPaise } from '../lib/razorpay.js';
import { storeVerifiedOrderAndItems } from '../lib/order-storage.js';
import { notifyMakeWebhook } from '../lib/make.js';
import { getRequestBody, jsonError } from '../lib/request.js';

export default async function handler(req: any, res: any) {
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
