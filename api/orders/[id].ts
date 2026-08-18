import { getOrderByRazorpayOrderId } from '../../server/orders';

export default async function handler(req: any, res: any) {
  try {
    const orderId = req.query?.id ? String(req.query.id) : '';
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
