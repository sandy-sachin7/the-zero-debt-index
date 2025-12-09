import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "vibe-templates-sachin",
  appId: "1:620618028106:web:72350ee6facb16ead442b3",
  storageBucket: "vibe-templates-sachin.firebasestorage.app",
  apiKey: "AIzaSyDr22OElu9-QdLILSlImn2MRBzW0bQfG_8",
  authDomain: "vibe-templates-sachin.firebaseapp.com",
  messagingSenderId: "620618028106"
};

// Initialize Firebase (Singleton pattern)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
