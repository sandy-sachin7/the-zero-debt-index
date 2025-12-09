const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// 1. Initialize Firebase Admin
// Expects the service account JSON string in the environment variable
if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
  console.error('Error: FIREBASE_SERVICE_ACCOUNT environment variable is missing.');
  process.exit(1);
}

let serviceAccount;
try {
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} catch (error) {
  console.error('Error parsing FIREBASE_SERVICE_ACCOUNT JSON:', error);
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const filePath = path.join(__dirname, '../data/templates.json');

async function sync() {
  console.log('Starting Firestore Sync...');

  // 2. Read local JSON
  let templates = [];
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    templates = JSON.parse(data);
  } catch (err) {
    console.error('Error reading templates.json:', err);
    process.exit(1);
  }

  console.log(`Found ${templates.length} templates in codebase.`);

  // 3. Sync to Firestore
  const batchSize = 400;
  let batchCount = 0;

  for (let i = 0; i < templates.length; i += batchSize) {
    const batch = db.batch();
    const chunk = templates.slice(i, i + batchSize);

    chunk.forEach(template => {
      const ref = db.collection('templates').doc(template.id);
      // Use { merge: true } to update existing fields without overwriting everything if we add new fields later
      batch.set(ref, template, { merge: true });
    });

    await batch.commit();
    batchCount++;
    console.log(`Committed batch ${batchCount} (${chunk.length} items).`);
  }

  console.log('Sync complete! Firestore is now up to date with the codebase.');
  process.exit(0);
}

sync().catch(error => {
  console.error('Sync failed:', error);
  process.exit(1);
});
