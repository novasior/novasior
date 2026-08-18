import { makeApiKey, makeWebhookUrl } from './config';

export async function notifyMakeWebhook(orderId: number | string) {
  if (!makeWebhookUrl || !makeApiKey) {
    console.warn('⚠️ Make.com webhook is not configured. Skipping webhook notification.');
    return { success: false, error: 'Make.com webhook is not configured on this deployment.' };
  }

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
  } catch (error: any) {
    console.error(`⚠️ Make webhook connection failure for order ${orderId}:`, error?.message || error);
    return { success: false, error: error?.message || 'Webhook request failed' };
  }
}
