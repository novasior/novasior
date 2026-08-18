import { getOrders } from '../lib/orders.js';

export default async function handler(_req: any, res: any) {
  try {
    const result = await getOrders();
    return res.status(200).json(result);
  } catch (error: any) {
    console.error('Fetch orders error:', error?.message || error);
    return res.status(500).json({ success: false, error: error?.message || 'Failed to fetch orders' });
  }
}
