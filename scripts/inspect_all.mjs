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

async function inspectEverything() {
  console.log('================================================================');
  console.log('NOVASIOR COMPLETE READ-ONLY SYSTEM INSPECTION');
  console.log('================================================================\n');

  // 1. Storage Buckets Check
  console.log('=== [1] STORAGE BUCKET: digital-products ===');
  const bRes = await fetch(`${supabaseUrl}/storage/v1/bucket`, { headers });
  const buckets = await bRes.json();
  const dpBucket = buckets.find(b => b.id === 'digital-products' || b.name === 'digital-products');
  console.log('Bucket Definition:', JSON.stringify(dpBucket, null, 2));

  // 2. Storage Objects Listing (Recursive through all folders)
  console.log('\n=== [2] STORAGE OBJECTS IN digital-products ===');
  async function listRecursive(prefix = '') {
    const listRes = await fetch(`${supabaseUrl}/storage/v1/object/list/digital-products`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ prefix, limit: 100, sortBy: { column: 'name', order: 'asc' } })
    });
    const items = await listRes.json();
    console.log(`Prefix: '${prefix}' -> Items (${Array.isArray(items) ? items.length : 'error'}):`, JSON.stringify(items, null, 2));
    if (Array.isArray(items)) {
      for (const item of items) {
        if (item.id === null && item.name && item.name !== '') {
          const sub = prefix ? `${prefix}/${item.name}` : item.name;
          await listRecursive(sub);
        }
      }
    }
  }
  await listRecursive('');

  // 3. Database Schema & Tables
  console.log('\n=== [3] DATABASE TABLES ===');

  // Products
  const prodRes = await fetch(`${supabaseUrl}/rest/v1/products?select=*`, { headers });
  const products = await prodRes.json();
  console.log(`\nProducts Table (${products.length} rows):`, JSON.stringify(products, null, 2));

  // Order Items
  const oiRes = await fetch(`${supabaseUrl}/rest/v1/order_items?select=*`, { headers });
  const orderItems = await oiRes.json();
  console.log(`\nOrder Items Table (${orderItems.length} rows):`, JSON.stringify(orderItems, null, 2));

  // Orders
  const oRes = await fetch(`${supabaseUrl}/rest/v1/orders?select=*`, { headers });
  const orders = await oRes.json();
  console.log(`\nOrders Table (${orders.length} rows):`, JSON.stringify(orders, null, 2));

  // 4. OpenAPI Table Definitions
  console.log('\n=== [4] DATABASE SCHEMA DEFINITIONS ===');
  const schemaRes = await fetch(`${supabaseUrl}/rest/v1/`, {
    headers: { ...headers, 'Accept': 'application/openapi+json, application/json' }
  });
  const openApi = await schemaRes.json();
  console.log('Orders Columns:', Object.keys(openApi.definitions?.orders?.properties || {}));
  console.log('Order_Items Columns:', Object.keys(openApi.definitions?.order_items?.properties || {}));
  console.log('Products Columns:', Object.keys(openApi.definitions?.products?.properties || {}));
}

inspectEverything().catch(console.error);
