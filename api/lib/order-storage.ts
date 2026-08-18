import { supabaseAdminClient } from './config.js';

export interface VerifiedOrderPayload {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
  amount: number;
  currency: string;
  customerName: string;
  customerEmail: string;
  paymentMethod: string;
  items: Array<{ id: string; name: string; quantity: number; price: number }>;
}

export async function storeVerifiedOrderAndItems(payload: VerifiedOrderPayload) {
  if (!supabaseAdminClient) {
    console.warn('⚠️ Supabase not configured. Order cannot be persisted.');
    return { success: false, reason: 'Supabase admin client not configured' };
  }

  try {
    const { data: existingOrder } = await supabaseAdminClient
      .from('orders')
      .select('id, payment_status, email_status')
      .or(`razorpay_payment_id.eq.${payload.razorpayPaymentId},razorpay_order_id.eq.${payload.razorpayOrderId}`)
      .maybeSingle();

    if (existingOrder && existingOrder.payment_status === 'paid') {
      console.log(`ℹ️ Order already persisted and paid (orders.id = ${existingOrder.id}). Reusing existing order.`);
      return { success: true, orderId: existingOrder.id, isExisting: true };
    }

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

    if (Array.isArray(payload.items) && payload.items.length > 0) {
      const orderItemsRows = payload.items.map((item) => ({
        order_id: orderId,
        product_id: item.id,
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
