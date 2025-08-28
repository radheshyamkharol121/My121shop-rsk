// functions/importCsvAndImages.js
// Usage: node importCsvAndImages.js ./data/products.csv
// यह local node script है जो serviceAccountKey.json का उपयोग करता है

const admin = require('firebase-admin');
const fs = require('fs');
const Papa = require('papaparse');
const axios = require('axios');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: `${serviceAccount.project_id}.appspot.com`
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

async function downloadImageToBuffer(url) {
  const resp = await axios.get(url, { responseType: 'arraybuffer' });
  return Buffer.from(resp.data, 'binary');
}

async function uploadBufferToStorage(buffer, destPath, contentType='image/jpeg') {
  const file = bucket.file(destPath);
  const uuid = uuidv4();
  await file.save(buffer, {
    metadata: {
      contentType,
      metadata: {
        firebaseStorageDownloadTokens: uuid
      }
    }
  });
  const downloadUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(destPath)}?alt=media&token=${uuid}`;
  return downloadUrl;
}

async function importCsv(filePath) {
  const csvText = fs.readFileSync(filePath, 'utf8');
  const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true });
  const rows = parsed.data;
  console.log('Rows to import:', rows.length);
  let ok=0, fail=0;
  for (const row of rows) {
    try {
      let thumbnailUrl = row.imageUrl || row.image || '';
      if (thumbnailUrl && thumbnailUrl.startsWith('http')) {
        try {
          const buf = await downloadImageToBuffer(thumbnailUrl);
          const ext = (path.extname(new URL(thumbnailUrl).pathname) || '.jpg').replace('.', '');
          const dest = `products/${Date.now()}_${uuidv4()}.${ext}`;
          thumbnailUrl = await uploadBufferToStorage(buf, dest, `image/${ext}`);
        } catch imgErr {
          console.warn('Image download/upload failed, using original URL', imgErr.message);
        }
      }
      const payload = {
        title: row.title || row.name || row.product_name,
        price: Number(row.price || row.mrp || 0),
        description: row.description || row.desc || '',
        thumbnail: thumbnailUrl || ''
      };
      await db.collection('products').add({ ...payload, createdAt: admin.firestore.FieldValue.serverTimestamp() });
      ok++;
    } catch (e) {
      console.error('Import failed for row', row, e);
      fail++;
    }
  }
  console.log(`Import finished. Success: ${ok}, Fail: ${fail}`);
}

const csvPath = process.argv[2];
if (!csvPath) {
  console.error('Usage: node importCsvAndImages.js <path/to/file.csv>');
  process.exit(1);
}
importCsv(csvPath).then(()=> process.exit(0)).catch(err=> { console.error(err); process.exit(1); });