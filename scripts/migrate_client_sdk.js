const fs = require('fs');
const path = require('path');
const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc, writeBatch } = require('firebase/firestore');

// Firebase Config (from previous step)
const firebaseConfig = {
  projectId: "vibe-templates-sachin",
  appId: "1:620618028106:web:72350ee6facb16ead442b3",
  storageBucket: "vibe-templates-sachin.firebasestorage.app",
  apiKey: "AIzaSyDr22OElu9-QdLILSlImn2MRBzW0bQfG_8",
  authDomain: "vibe-templates-sachin.firebaseapp.com",
  messagingSenderId: "620618028106"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const filePath = path.join(__dirname, '../data/templates.json');

async function migrate() {
  console.log('Starting migration...');

  let templates = [];
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    templates = JSON.parse(data);
  } catch (err) {
    console.error('Error reading templates.json:', err);
    process.exit(1);
  }

  console.log(`Found ${templates.length} templates to migrate.`);

  // Batch writes (limit 500 per batch)
  const batchSize = 400;
  for (let i = 0; i < templates.length; i += batchSize) {
    const batch = writeBatch(db);
    const chunk = templates.slice(i, i + batchSize);

    chunk.forEach(template => {
      const ref = doc(db, 'templates', template.id);
      batch.set(ref, template);
    });

    await batch.commit();
    console.log(`Migrated batch ${i / batchSize + 1} (${chunk.length} items)`);
  }

  console.log('Migration complete!');
  process.exit(0);
}

migrate().catch(console.error);
