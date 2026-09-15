import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function LegalManager() {
  const [privacyContent, setPrivacyContent] = useState('');
  const [termsContent, setTermsContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  useEffect(() => {
    fetchLegalContent();
  }, []);

  const fetchLegalContent = async () => {
    setLoading(true);
    try {
      const privacyDoc = await getDoc(doc(db, "legal", "privacy"));
      if (privacyDoc.exists() && privacyDoc.data().content) {
        setPrivacyContent(privacyDoc.data().content);
      } else {
        setPrivacyContent(`<h2>1. Information We Collect</h2>\n<p>At Bharathi Constructions, your privacy is important to us. This Privacy Policy details how we collect and use your information.</p>\n\n<h2>2. How We Use Your Information</h2>\n<p>We use the collected data to fulfill requests, provide customer service, and improve our website.</p>\n\n<h2>3. Data Security</h2>\n<p>We adopt robust data collection and storage practices to protect against unauthorized access.</p>\n\n<h2>4. Contact Us</h2>\n<p>Email: bharathiconstructionshyd1@gmail.com</p>\n<p>Phone: +91 7997992051</p>`);
      }

      const termsDoc = await getDoc(doc(db, "legal", "terms"));
      if (termsDoc.exists() && termsDoc.data().content) {
        setTermsContent(termsDoc.data().content);
      } else {
        setTermsContent(`<h2>1. Acceptance of Terms</h2>\n<p>By accessing and using the Bharathi Constructions website, you agree to be bound by these Terms and Conditions.</p>\n\n<h2>2. Use of Information</h2>\n<p>All content on this website is the property of Bharathi Constructions and is protected by copyright laws.</p>\n\n<h2>3. Accuracy of Project Details</h2>\n<p>The architectural designs and visual representations shown on this website are conceptual and subject to change.</p>\n\n<h2>4. Limitation of Liability</h2>\n<p>Bharathi Constructions shall not be held liable for any direct or indirect damages arising from your use of this website.</p>\n\n<h2>5. Governing Law</h2>\n<p>These terms and conditions are governed by the laws of India, subject to the jurisdiction of courts in Hyderabad.</p>`);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleSave = async (docId, content) => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'legal', docId), {
        content,
        updated_at: new Date()
      }, { merge: true });
      alert('Saved successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to save.');
    }
    setSaving(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-12 pb-48 w-full max-w-5xl mx-auto">
      <div>
        <h2 className="text-2xl font-serif text-[#123645] mb-4">Edit Privacy Policy</h2>
        <textarea 
          className="w-full h-64 p-4 border rounded-xl"
          value={privacyContent}
          onChange={(e) => setPrivacyContent(e.target.value)}
          placeholder="Enter Privacy Policy content here (HTML supported)..."
        />
        <button 
          className="mt-4 px-6 py-2 bg-[#123645] text-white rounded-xl"
          onClick={() => handleSave('privacy', privacyContent)}
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save Privacy Policy'}
        </button>
      </div>

      <div>
        <h2 className="text-2xl font-serif text-[#123645] mb-4">Edit Terms & Conditions</h2>
        <textarea 
          className="w-full h-64 p-4 border rounded-xl"
          value={termsContent}
          onChange={(e) => setTermsContent(e.target.value)}
          placeholder="Enter Terms & Conditions content here (HTML supported)..."
        />
        <button 
          className="mt-4 px-6 py-2 bg-[#123645] text-white rounded-xl"
          onClick={() => handleSave('terms', termsContent)}
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save Terms & Conditions'}
        </button>
      </div>
    </div>
  );
}