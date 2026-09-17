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

async function sendWhatsAppAutoReply(phone, name, project) {
  const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
  const WHATSAPP_PHONE_ID = process.env.WHATSAPP_PHONE_ID;

  if (!WHATSAPP_TOKEN || !WHATSAPP_PHONE_ID) {
    console.log("WhatsApp credentials missing (WHATSAPP_TOKEN, WHATSAPP_PHONE_ID), skipping auto-reply.");
    return;
  }

  // Sanitize phone number (WhatsApp API requires international format without + or spaces)
  const formattedPhone = phone.replace(/[^0-9]/g, "");
  // Simple check for valid Indian number if they forgot country code
  const finalPhone = formattedPhone.length === 10 ? "91" + formattedPhone : formattedPhone;

  const url = `https://graph.facebook.com/v17.0/${WHATSAPP_PHONE_ID}/messages`;
  
  // Note: For actual deployment, the template 'lead_welcome_brochure' must be approved in Meta Business Manager.
  // We use a standard message structure here as a robust placeholder or actual template.
  const payload = {
    messaging_product: "whatsapp",
    to: finalPhone,
    type: "text",
    text: {
      body: `Hi ${name}, thank you for your interest in ${project || "Bharathi Constructions"}! Our luxury real estate expert will reach out to you shortly. You can also view our latest brochures on our website: https://bharathiconstructionshyd.com`
    }
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${WHATSAPP_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      console.error("WhatsApp API Error:", await response.text());
    } else {
      console.log(`Sent WhatsApp auto-reply to ${finalPhone}`);
    }
  } catch (error) {
    console.error("Failed to call WhatsApp API:", error);
  }
}

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
      ab_variant: "Webhook",
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
    
    // Trigger WhatsApp Nurture Sequence asynchronously (do not await so it doesn't block the webhook response)
    if (phone && phone !== "No Phone") {
      sendWhatsAppAutoReply(phone, name || "there", project).catch(e => console.error(e));
    }
    return res.status(200).json({ success: true, message: 'Lead added to CRM successfully.' });

  } catch (error) {
    console.error("Error processing lead webhook:", error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}