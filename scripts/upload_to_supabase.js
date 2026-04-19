const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../server/.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY; 

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: SUPABASE_URL and SUPABASE_ANON_KEY must be defined in your .env file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function uploadFile(filePath, bucketName = 'giri-os-media') {
  const fileName = path.basename(filePath);
  const fileBuffer = fs.readFileSync(filePath);

  console.log(`🚀 Uploading ${fileName} to ${bucketName}...`);

  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(fileName, fileBuffer, {
      cacheControl: '3600',
      upsert: true,
      contentType: getContentType(fileName)
    });

  if (error) {
    if (error.message.includes('bucket not found')) {
      console.error(`❌ Error: Bucket '${bucketName}' not found. Please create it in Supabase dashboard and set it to Public.`);
    } else {
      console.error('❌ Upload failed:', error.message);
    }
  } else {
    console.log(`✅ Success! File uploaded to: ${data.path}`);
    const { data: publicData } = supabase.storage.from(bucketName).getPublicUrl(data.path);
    console.log(`🔗 Public URL: ${publicData.publicUrl}`);
  }
}

function getContentType(fileName) {
  const ext = path.extname(fileName).toLowerCase();
  const types = {
    '.mp4': 'video/mp4',
    '.mp3': 'audio/mpeg',
    '.ogg': 'audio/ogg',
    '.wav': 'audio/wav',
    '.mov': 'video/quicktime',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg'
  };
  return types[ext] || 'application/octet-stream';
}

// Get file path from command line arguments
const filePath = process.argv[2];

if (!filePath) {
  console.log('Usage: node upload_to_supabase.js <path_to_file>');
  console.log('Example: node upload_to_supabase.js my_video.mp4');
  process.exit(0);
}

if (!fs.existsSync(filePath)) {
  console.error(`❌ Error: File not found at path: ${filePath}`);
  process.exit(1);
}

uploadFile(filePath);
