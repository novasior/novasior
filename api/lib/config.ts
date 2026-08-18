import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import Razorpay from 'razorpay';

dotenv.config();

const isPlaceholderValue = (value?: string) => {
  const normalized = (value ?? '').trim().toLowerCase();

  if (!normalized) return true;

  return [
    'placeholder',
    'demo',
    'your_',
    'example',
    'changeme',
    'test_placeholder',
    'insert_your',
    'replace_me',
    'undefined',
    'null',
  ].some((token) => normalized.includes(token));
};

export const razorpayKeyId = (process.env.RAZORPAY_KEY_ID ?? '').trim();
export const razorpayKeySecret = (process.env.RAZORPAY_KEY_SECRET ?? '').trim();
export const supabaseUrl = (process.env.SUPABASE_URL ?? '').trim();
export const supabaseAnonKey = (process.env.SUPABASE_ANON_KEY ?? '').trim();
export const supabaseServiceRoleKey = (process.env.SUPABASE_SERVICE_ROLE_KEY ?? '').trim();
export const makeWebhookUrl = (process.env.MAKE_WEBHOOK_URL ?? '').trim();
export const makeApiKey = (process.env.MAKE_WEBHOOK_API_KEY ?? '').trim();

const hasValidRazorpayConfig = Boolean(
  razorpayKeyId &&
    razorpayKeySecret &&
    !isPlaceholderValue(razorpayKeyId) &&
    !isPlaceholderValue(razorpayKeySecret),
);

export const razorpayClient = hasValidRazorpayConfig
  ? new Razorpay({
      key_id: razorpayKeyId,
      key_secret: razorpayKeySecret,
    })
  : null;

export const isTestMode = Boolean(razorpayKeyId.startsWith('rzp_test_'));

export const supabase =
  supabaseUrl && supabaseAnonKey && !isPlaceholderValue(supabaseUrl) && !isPlaceholderValue(supabaseAnonKey)
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export const supabaseAdminClient =
  supabaseUrl && supabaseServiceRoleKey && !isPlaceholderValue(supabaseUrl) && !isPlaceholderValue(supabaseServiceRoleKey)
    ? createClient(supabaseUrl, supabaseServiceRoleKey)
    : null;

export const runtimeEnvironment = process.env.VERCEL ? 'vercel' : (process.env.NODE_ENV || 'development');

export const getHealthStatus = () => ({
  ok: true,
  razorpayConfigured: Boolean(razorpayClient),
  supabaseConfigured: Boolean(supabaseAdminClient),
  makeWebhookConfigured: Boolean(makeWebhookUrl && !isPlaceholderValue(makeWebhookUrl)),
  environment: runtimeEnvironment,
  isTestMode,
  timestamp: new Date().toISOString(),
});

export const getPublicRazorpayConfig = () => ({
  keyId: razorpayKeyId,
  configured: Boolean(razorpayClient),
  isTestMode,
  environment: runtimeEnvironment,
});

export const assertServerConfiguration = () => {
  const missing: string[] = [];

  if (!razorpayKeyId || isPlaceholderValue(razorpayKeyId)) missing.push('RAZORPAY_KEY_ID');
  if (!razorpayKeySecret || isPlaceholderValue(razorpayKeySecret)) missing.push('RAZORPAY_KEY_SECRET');
  if (!supabaseUrl || isPlaceholderValue(supabaseUrl)) missing.push('SUPABASE_URL');
  if (!supabaseServiceRoleKey || isPlaceholderValue(supabaseServiceRoleKey)) missing.push('SUPABASE_SERVICE_ROLE_KEY');
  if (!makeWebhookUrl || isPlaceholderValue(makeWebhookUrl)) missing.push('MAKE_WEBHOOK_URL');
  if (!makeApiKey || isPlaceholderValue(makeApiKey)) missing.push('MAKE_WEBHOOK_API_KEY');

  return missing;
};
