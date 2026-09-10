import { initializeApp } from "firebase/app";
import { getStorage, ref, listAll } from "firebase/storage";
import 'dotenv/config';

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

async function listFiles() {
  try {
    const listRef = ref(storage, 'brochures');
    const res = await listAll(listRef);
    res.items.forEach((itemRef) => {
      console.log("File:", itemRef.fullPath);
    });
  } catch(e) {
    console.error(e);
  }
}
listFiles();
