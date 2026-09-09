import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Initialize Firebase using process.env
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Simple security token to prevent unauthorized spam
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || 'bharathi_secure_lead_2026';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { secret, name, email, phone, project, source, message } = req.body;

    // Verify the secret token
    if (secret !== WEBHOOK_SECRET) {
      console.error("Unauthorized webhook attempt.");
      return res.status(403).json({ error: 'Unauthorized: Invalid secret token' });
    }

    // Save lead to Firebase CRM
    await addDoc(collection(db, 'leads'), {
      name: name || 'Unknown',
      email: email || 'No Email',
      phone: phone || 'No Phone',
      project: project || 'Meta Ad Campaign',
      status: 'New',
      source: source || 'Meta Ads',
      message: message || 'Lead securely generated via Automation Webhook.',
      created_at: new Date().toISOString()
    });

    console.log("Successfully saved automated lead to Firebase CRM.");
    return res.status(200).json({ success: true, message: 'Lead added to CRM successfully.' });

  } catch (error) {
    console.error("Error processing lead webhook:", error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}