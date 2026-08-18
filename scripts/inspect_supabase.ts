import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !serviceKey) {
  console.error('Supabase URL or Service Role Key missing in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey);

async function runFinalVerifications() {
  console.log('====================================================');
  console.log('FINAL VERIFICATION CHECKS');
  console.log('====================================================\n');

  // 1. Check Bucket & Privacy
  console.log('1. Checking Storage Bucket Visibility & Settings:');
  const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
  if (bucketError) {
    console.error('Error listing buckets:', bucketError);
  } else {
    const digitalProductsBucket = buckets.find(b => b.id === 'digital-products' || b.name === 'digital-products');
    console.log('digital-products bucket details:', digitalProductsBucket);
  }

  // 2. Check Storage Files in digital-products
  console.log('\n2. Checking Storage Files in digital-products bucket:');
  const foldersToCheck = ['', 'products', 'products/p-01', 'products/p-02', 'products/p-03'];
  const foundFiles: { path: string; details: any }[] = [];

  for (const folder of foldersToCheck) {
    const { data: files, error: filesError } = await supabase.storage
      .from('digital-products')
      .list(folder, { limit: 100, offset: 0, sortBy: { column: 'name', order: 'asc' } });

    if (filesError) {
      console.error(`Error listing folder '${folder}':`, filesError);
    } else {
      console.log(`Folder '${folder}' contents:`, files);
      for (const f of files || []) {
        if (f.id !== null && f.name && f.name !== '') {
          const fullPath = folder ? `${folder}/${f.name}` : f.name;
          foundFiles.push({ path: fullPath, details: f });
        }
      }
    }
  }
  console.log('\nAll identified actual files in bucket:', foundFiles);

  // 3. Check products table
  console.log('\n3. Checking products table:');
  const { data: products, count: prodCount, error: prodError } = await supabase
    .from('products')
    .select('*', { count: 'exact' });
  console.log('Products count:', prodCount);
  console.log('Products data:', products);
  if (prodError) console.error('Products error:', prodError);

  // 4. Check order_items table
  console.log('\n4. Checking order_items table:');
  const { data: orderItems, count: oiCount, error: oiError } = await supabase
    .from('order_items')
    .select('*', { count: 'exact' });
  console.log('Order items count:', oiCount);
  console.log('Order items data:', orderItems);
  if (oiError) console.error('Order items error:', oiError);

  // 5. Check orders table
  console.log('\n5. Checking orders table:');
  const { data: orders, count: orderCount, error: orderError } = await supabase
    .from('orders')
    .select('*', { count: 'exact' });
  console.log('Orders count:', orderCount);
  console.log('Orders data:', orders);
  if (orderError) console.error('Orders error:', orderError);
}

runFinalVerifications().catch(console.error);
