import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Initialize Firebase using process.env (Node.js standard) since import.meta is Vite-specific
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

// Meta integration environment variables
const VERIFY_TOKEN = process.env.META_WEBHOOK_VERIFY_TOKEN || 'bharathi_constructions_secure_webhook';
const PAGE_ACCESS_TOKEN = process.env.META_PAGE_ACCESS_TOKEN;

export default async function handler(req, res) {
  // ----------------------------------------------------
  // 1. Webhook Verification (GET request from Meta)
  // ----------------------------------------------------
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token) {
      if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        console.log('META WEBHOOK VERIFIED');
        return res.status(200).send(challenge);
      } else {
        return res.status(403).json({ error: 'Verification token mismatch' });
      }
    }
    return res.status(400).json({ error: 'Missing mode or token' });
  }

  // ----------------------------------------------------
  // 2. Lead Reception (POST request from Meta)
  // ----------------------------------------------------
  if (req.method === 'POST') {
    const body = req.body;

    if (body.object === 'page') {
      try {
        for (const entry of body.entry) {
          for (const change of entry.changes) {
            if (change.field === 'leadgen') {
              const leadgenId = change.value.leadgen_id;
              const formId = change.value.form_id;
              console.log(`New Lead Received. ID: ${leadgenId}`);

              if (!PAGE_ACCESS_TOKEN) {
                console.error("META_PAGE_ACCESS_TOKEN is missing. Cannot fetch lead details.");
                // Return 200 so Meta stops retrying, but log error
                return res.status(200).send('EVENT_RECEIVED_BUT_UNPROCESSED_DUE_TO_MISSING_TOKEN');
              }

              // Fetch the actual lead details securely from Facebook Graph API
              const metaResponse = await fetch(`https://graph.facebook.com/v19.0/${leadgenId}?access_token=${PAGE_ACCESS_TOKEN}`);
              const leadData = await metaResponse.json();

              if (leadData.error) {
                console.error("Error fetching lead from Meta API:", leadData.error);
                continue;
              }

              // Parse field data array into standard fields
              let name = 'Unknown';
              let email = 'Unknown';
              let phone = 'Unknown';
              let project = 'Meta Ad Campaign';
              
              if (leadData.field_data) {
                leadData.field_data.forEach(field => {
                  const fieldName = field.name.toLowerCase();
                  const val = field.values[0];
                  
                  if (fieldName.includes('name')) name = val;
                  if (fieldName.includes('email')) email = val;
                  if (fieldName.includes('phone')) phone = val;
                  if (fieldName.includes('project') || fieldName.includes('property')) project = val;
                });
              }

              // Push the lead directly into Firebase CRM
              await addDoc(collection(db, 'leads'), {
                name: name,
                email: email,
                phone: phone,
                project: project,
                status: 'New',
                source: 'Meta Ads',
                message: `Lead generated automatically from Meta (Facebook/Instagram) Ads. Form ID: ${formId}`,
                created_at: new Date().toISOString()
              });
              
              console.log("Successfully saved Meta lead to Firebase CRM.");
            }
          }
        }
        // Always return 200 OK to Meta to acknowledge receipt
        return res.status(200).send('EVENT_RECEIVED');
      } catch (error) {
        console.error("Error processing webhook payload:", error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    } else {
      return res.status(404).send('Not Found');
    }
  }

  // Handle other methods
  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}