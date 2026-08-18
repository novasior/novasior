import fs from 'fs';
import path from 'path';

// Read .env from X:\novasior - Copy\.env
const envPath = path.resolve(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w_]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let value = match[2] || '';
    value = value.trim().replace(/^["'](.*)["']$/, '$1');
    env[match[1]] = value;
  }
});

const supabaseUrl = env.SUPABASE_URL;
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
  console.error('SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing');
  process.exit(1);
}

const headers = {
  'apikey': serviceKey,
  'Authorization': `Bearer ${serviceKey}`,
  'Content-Type': 'application/json'
};

async function run() {
  console.log('====================================================');
  console.log('FINAL VERIFICATION CHECKS (via Supabase API)');
  console.log('====================================================\n');

  // 1. Storage Buckets Check
  console.log('--- 1. BUCKETS CHECK ---');
  const bRes = await fetch(`${supabaseUrl}/storage/v1/bucket`, { headers });
  const buckets = await bRes.json();
  const dpBucket = buckets.find(b => b.id === 'digital-products' || b.name === 'digital-products');
  console.log('digital-products bucket:', JSON.stringify(dpBucket, null, 2));

  // 2. Storage Objects in digital-products
  console.log('\n--- 2. OBJECTS IN digital-products BUCKET ---');
  const prefixes = ['', 'products', 'products/p-01', 'products/p-02', 'products/p-03'];
  for (const p of prefixes) {
    const listRes = await fetch(`${supabaseUrl}/storage/v1/object/list/digital-products`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ prefix: p, limit: 100 })
    });
    const items = await listRes.json();
    console.log(`Prefix '${p}':`, JSON.stringify(items, null, 2));
  }

  // 3. Products Table
  console.log('\n--- 3. PRODUCTS TABLE ---');
  const prodRes = await fetch(`${supabaseUrl}/rest/v1/products?select=*`, { headers });
  const products = await prodRes.json();
  console.log('Products in DB (length ' + products.length + '):', JSON.stringify(products, null, 2));

  // 4. Order Items Table
  console.log('\n--- 4. ORDER_ITEMS TABLE ---');
  const oiRes = await fetch(`${supabaseUrl}/rest/v1/order_items?select=*`, { headers });
  const orderItems = await oiRes.json();
  console.log('Order Items in DB (length ' + orderItems.length + '):', JSON.stringify(orderItems, null, 2));

  // 5. Orders Table
  console.log('\n--- 5. ORDERS TABLE ---');
  const oRes = await fetch(`${supabaseUrl}/rest/v1/orders?select=*`, { headers });
  const orders = await oRes.json();
  console.log('Orders in DB (length ' + orders.length + '):', JSON.stringify(orders, null, 2));
}

run().catch(console.error);
