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
  'Content-Type': 'application/json',
  'Prefer': 'resolution=merge-duplicates'
};

const productsToSeed = [
  {
    id: 'a0000000-0000-4000-8000-000000000001',
    name: 'Motivational Wallpapers',
    description: 'A premium, carefully curated collection of 25 exclusive motivational wallpapers designed for both Mobile (9:16) and Desktop/Ultra-Wide (16:9) displays. Extracted from our signature collection, each piece acts as a daily visual standard, keeping ambition, relentless discipline, and financial clarity present whenever you unlock your device.',
    price: 299.00,
    currency: 'INR',
    storage_path: 'products/p-01/motivational-wallpapers.zip',
    active: true
  },
  {
    id: 'a0000000-0000-4000-8000-000000000002',
    name: 'Life Tracker',
    description: 'A simple digital tracker designed to help you monitor your habits, goals, progress and the areas of life that matter most. It provides the framework to shift from chasing outcomes to actively measuring and managing your personal development and consistency.',
    price: 499.00,
    currency: 'INR',
    storage_path: 'products/p-02/life-tracker.xlsx',
    active: true
  },
  {
    id: 'a0000000-0000-4000-8000-000000000003',
    name: '10 Lessons to Help You Get Started',
    description: 'Ten practical lessons designed to help you gain direction, build momentum and take the first real steps toward becoming the person you want to be. This digital guide focuses on getting started, mindset, discipline, taking action, and personal growth.',
    price: 799.00,
    currency: 'INR',
    storage_path: 'products/p-03/10-lessons.pdf',
    active: true
  }
];

async function seed() {
  console.log('Seeding products into Supabase products table...');
  const res = await fetch(`${supabaseUrl}/rest/v1/products`, {
    method: 'POST',
    headers,
    body: JSON.stringify(productsToSeed)
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error('Error seeding products:', res.status, errText);
  } else {
    console.log('✓ Successfully seeded products into Supabase!');
  }

  // Verify
  const listRes = await fetch(`${supabaseUrl}/rest/v1/products?select=*`, {
    headers: {
      'apikey': serviceKey,
      'Authorization': `Bearer ${serviceKey}`,
    }
  });
  const data = await listRes.json();
  console.log('Products in DB now:', JSON.stringify(data, null, 2));
}

seed().catch(console.error);
