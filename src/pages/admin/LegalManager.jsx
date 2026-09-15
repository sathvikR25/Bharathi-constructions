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
      const privacyDoc = await getDoc(doc(db, 'legal', 'privacy'));
      if (privacyDoc.exists()) setPrivacyContent(privacyDoc.data().content);

      const termsDoc = await getDoc(doc(db, 'legal', 'terms'));
      if (termsDoc.exists()) setTermsContent(termsDoc.data().content);
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
    <div className="space-y-12">
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