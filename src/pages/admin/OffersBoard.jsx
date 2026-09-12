import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { Tag, Plus, Edit2, Trash2, X, Check } from 'lucide-react';

export default function OffersBoard() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    targetProject: 'all',
    link: '',
    isActive: true
  });

  const fetchOffers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'offers'));
      const offersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Sort by creation internally if needed, here just raw
      setOffers(offersData.sort((a, b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0)));
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleOpenModal = (offer = null) => {
    if (offer) {
      setEditingOffer(offer.id);
      setFormData({
        title: offer.title,
        description: offer.description,
        targetProject: offer.targetProject,
        link: offer.link || '',
        isActive: offer.isActive
      });
    } else {
      setEditingOffer(null);
      setFormData({ title: '', description: '', targetProject: 'all', link: '', isActive: true });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingOffer) {
        await updateDoc(doc(db, 'offers', editingOffer), {
          ...formData,
          updatedAt: serverTimestamp()
        });
      } else {
        await addDoc(collection(db, 'offers'), {
          ...formData,
          createdAt: serverTimestamp()
        });
      }
      setShowModal(false);
      fetchOffers();
    } catch (error) {
      console.error("Error saving offer:", error);
      alert("Failed to save offer. Please check database permissions.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this offer?")) return;
    try {
      await deleteDoc(doc(db, 'offers', id));
      fetchOffers();
    } catch (error) {
      console.error("Error deleting offer:", error);
    }
  };

  const toggleActive = async (offer) => {
    try {
      await updateDoc(doc(db, 'offers', offer.id), {
        isActive: !offer.isActive
      });
      fetchOffers();
    } catch (error) {
      console.error("Error toggling active state:", error);
    }
  };

  if (loading) return <div className="p-8 text-[#123645] font-medium">Loading offers...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-serif text-[#123645] mb-2 flex items-center gap-3">
            <Tag className="w-8 h-8 text-[#c9a96e]" />
            Promotions & Offers
          </h2>
          <p className="text-[#123645]/60 text-sm font-medium">Manage premium banners displayed across the website.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-[#123645] text-white px-6 py-3 rounded-xl hover:bg-[#1b4a5e] transition-colors flex items-center gap-2 font-medium shadow-md shadow-[#123645]/20"
        >
          <Plus className="w-5 h-5" /> New Offer
        </button>
      </div>

      <div className="grid gap-4">
        {offers.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-[#123645]/10 text-[#123645]/50 font-medium">
            No offers currently active. Click 'New Offer' to create one.
          </div>
        ) : (
          offers.map(offer => (
            <div key={offer.id} className="bg-white p-6 rounded-2xl border border-[#123645]/10 shadow-sm flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-[#123645]">{offer.title}</h3>
                  <span className={`px-3 py-1 text-[0.65rem] font-bold uppercase tracking-widest rounded-full ${offer.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {offer.isActive ? 'Active' : 'Draft'}
                  </span>
                  <span className="px-3 py-1 text-[0.65rem] font-bold uppercase tracking-widest rounded-full bg-[#123645]/5 text-[#123645]">
                    Target: {offer.targetProject}
                  </span>
                </div>
                <p className="text-[#123645]/70 text-sm mb-2">{offer.description}</p>
                {offer.link && <a href={offer.link} target="_blank" rel="noreferrer" className="text-[#c9a96e] text-sm hover:underline font-medium">Action Link Attached</a>}
              </div>
              
              <div className="flex gap-2 shrink-0">
                <button onClick={() => toggleActive(offer)} className="p-2.5 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-xl transition-colors" title={offer.isActive ? "Deactivate" : "Activate"}>
                  {offer.isActive ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                </button>
                <button onClick={() => handleOpenModal(offer)} className="p-2.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(offer.id)} className="p-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#123645]/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
            <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-2xl font-serif text-[#123645] mb-6">{editingOffer ? 'Edit Offer' : 'Create Offer'}</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#123645]/70 uppercase tracking-widest mb-1.5">Headline</label>
                <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#c9a96e] focus:ring-1 focus:ring-[#c9a96e]" placeholder="e.g. Pre-Launch Exclusive" />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-[#123645]/70 uppercase tracking-widest mb-1.5">Description</label>
                <textarea required rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#c9a96e] focus:ring-1 focus:ring-[#c9a96e]" placeholder="Book before Oct 15th to avail complimentary modular kitchen..."></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#123645]/70 uppercase tracking-widest mb-1.5">Target Display Page</label>
                <select value={formData.targetProject} onChange={e => setFormData({...formData, targetProject: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#c9a96e] focus:ring-1 focus:ring-[#c9a96e]">
                  <option value="all">Everywhere (Global)</option>
                  <option value="home">Home Page Only</option>
                  <option value="horizon">Bharathi Horizon Only</option>
                  <option value="lake-woods">Lake Woods Only</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#123645]/70 uppercase tracking-widest mb-1.5">Action Link (Optional)</label>
                <input type="url" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#c9a96e] focus:ring-1 focus:ring-[#c9a96e]" placeholder="https://..." />
              </div>

              <label className="flex items-center gap-3 cursor-pointer py-2">
                <input type="checkbox" checked={formData.isActive} onChange={e => setFormData({...formData, isActive: e.target.checked})} className="w-5 h-5 accent-[#123645]" />
                <span className="text-sm font-medium text-[#123645]">Set Active Immediately</span>
              </label>

              <button type="submit" className="w-full bg-[#123645] text-white py-3.5 rounded-xl font-semibold hover:bg-[#1b4a5e] transition-colors mt-4">
                {editingOffer ? 'Save Changes' : 'Publish Offer'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}