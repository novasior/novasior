import { supabase, supabaseAdminClient } from './config.js';

export async function getOrders() {
  const client = supabaseAdminClient ?? supabase;

  if (!client) {
    return { orders: [], note: 'Supabase not configured' };
  }

  const { data, error } = await client
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50);

  if (error) {
    throw new Error(error.message || 'Failed to fetch orders');
  }

  return { orders: data || [] };
}

export async function getOrderByRazorpayOrderId(razorpayOrderId: string) {
  const client = supabaseAdminClient ?? supabase;

  if (!client) {
    throw new Error('Supabase not configured');
  }

  const { data, error } = await client
    .from('orders')
    .select('*')
    .eq('razorpay_order_id', razorpayOrderId)
    .single();

  if (error || !data) {
    throw new Error('Order not found');
  }

  return { order: data };
}
