import crypto from 'crypto';
import { razorpayClient, razorpayKeyId, razorpayKeySecret } from './config.js';

export function getAmountInPaise(amount: number) {
  return Math.round((Number(amount) || 0) * 100);
}

export function verifyPaymentSignature(razorpayOrderId: string, razorpayPaymentId: string, razorpaySignature: string) {
  if (!razorpayKeySecret) {
    throw new Error('RAZORPAY_KEY_SECRET is missing on the server.');
  }

  const expectedSignature = crypto
    .createHmac('sha256', razorpayKeySecret)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest('hex');

  return expectedSignature === razorpaySignature;
}

export async function createRazorpayOrder({
  amount,
  currency,
  customerName,
  customerEmail,
  items,
}: {
  amount: number;
  currency: string;
  customerName: string;
  customerEmail: string;
  items: Array<{ id: string; name: string; quantity: number; price: number }>;
}) {
  if (!razorpayClient) {
    throw new Error('Razorpay is not configured. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to environment variables.');
  }

  const receipt = `novasior_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const order = await razorpayClient.orders.create({
    amount: Math.round(Number(amount) * 100),
    currency,
    receipt,
    notes: {
      customer_name: String(customerName).slice(0, 120),
      customer_email: String(customerEmail).slice(0, 120),
      item_count: String(Array.isArray(items) ? items.length : 0),
      source: 'novasior-storefront',
      environment: process.env.VERCEL ? 'vercel-production' : 'local-dev',
    },
  });

  return {
    success: true,
    order,
    keyId: razorpayKeyId,
  };
}
