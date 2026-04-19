const { createClient } = require('@supabase/supabase-js');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../client/.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

console.log('Testing Supabase Connection...');
console.log('URL:', supabaseUrl);
// Don't log full key, just prefix
console.log('Key Prefix:', supabaseKey?.substring(0, 10));

const supabase = createClient(supabaseUrl, supabaseKey);

async function testStorage() {
  try {
    console.log('\n1. Listing Buckets...');
    const { data: buckets, error: bError } = await supabase.storage.listBuckets();
    if (bError) {
      console.error('❌ Error listing buckets:', bError.message);
    } else {
      console.log('✅ Buckets found:', buckets.map(b => b.name));
    }

    console.log('\n2. Listing files in "giri-os-media"...');
    const { data: files, error: fError } = await supabase.storage.from('giri-os-media').list();
    if (fError) {
      console.error('❌ Error listing files:', fError.message);
    } else {
      console.log(`✅ Success! Found ${files.length} files:`);
      files.forEach(f => console.log(`   - ${f.name} (${f.metadata?.mimetype || 'no-type'})`));
    }
  } catch (err) {
    console.error('❌ Unexpected Error:', err);
  }
}

testStorage();
