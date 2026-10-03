import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Trash2, Plus, Image as ImageIcon, X } from 'lucide-react';

export default function ConstructionManager() {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [projectFilter, setProjectFilter] = useState('horizon');
  
  const [isAdding, setIsAdding] = useState(false);
  const [newUpdate, setNewUpdate] = useState({ project: 'horizon', dateStr: '', imageUrl: '', description: '' });

  useEffect(() => {
    const q = query(collection(db, 'construction_updates'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUpdates(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newUpdate.dateStr || !newUpdate.imageUrl) return alert('Date and Image URL are required.');
    
    try {
      await addDoc(collection(db, 'construction_updates'), {
        project: newUpdate.project,
        dateStr: newUpdate.dateStr,
        imageUrl: newUpdate.imageUrl,
        description: newUpdate.description,
        createdAt: serverTimestamp()
      });
      setIsAdding(false);
      setNewUpdate({ project: projectFilter, dateStr: '', imageUrl: '', description: '' });
    } catch (err) {
      alert('Error adding update: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this update?')) return;
    try {
      await deleteDoc(doc(db, 'construction_updates', id));
    } catch (err) {
      alert('Error deleting: ' + err.message);
    }
  };

  const filteredUpdates = updates.filter(u => u.project === projectFilter);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-black/5">
        <div>
          <h1 className="text-2xl font-bold text-[#123645]">Construction Updates</h1>
          <p className="text-gray-500 text-sm mt-1">Manage project progress timelines and images.</p>
        </div>
        <button 
          onClick={() => { setIsAdding(true); setNewUpdate({ ...newUpdate, project: projectFilter }); }}
          className="bg-[#123645] hover:bg-[#1a4a5e] text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-md flex items-center gap-2"
        >
          <Plus size={18} /> Add Update
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <button 
          onClick={() => setProjectFilter('horizon')}
          className={"px-6 py-2 rounded-xl font-medium transition-colors " + (projectFilter === 'horizon' ? 'bg-[#c9a96e] text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200')}
        >
          Bharathi Horizon
        </button>
        <button 
          onClick={() => setProjectFilter('lake-woods')}
          className={"px-6 py-2 rounded-xl font-medium transition-colors " + (projectFilter === 'lake-woods' ? 'bg-[#c9a96e] text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200')}
        >
          Bharathi Lake Woods
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="bg-white p-6 rounded-2xl shadow-sm border border-black/5 space-y-4 mb-8">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-bold text-[#123645]">New Update for {projectFilter === 'horizon' ? 'Horizon' : 'Lake Woods'}</h3>
            <button type="button" onClick={() => setIsAdding(false)} className="text-gray-400 hover:text-red-500"><X size={20} /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Date String</label>
              <input type="text" value={newUpdate.dateStr} onChange={e => setNewUpdate({...newUpdate, dateStr: e.target.value})} placeholder="e.g., October 2026" className="w-full px-4 py-2 border border-gray-200 rounded-xl" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Image URL</label>
              <input type="text" value={newUpdate.imageUrl} onChange={e => setNewUpdate({...newUpdate, imageUrl: e.target.value})} placeholder="https://..." className="w-full px-4 py-2 border border-gray-200 rounded-xl" required />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Description (Optional)</label>
              <textarea value={newUpdate.description} onChange={e => setNewUpdate({...newUpdate, description: e.target.value})} placeholder="Slab work completed..." className="w-full px-4 py-2 border border-gray-200 rounded-xl" rows="2"></textarea>
            </div>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-[#c9a96e] text-white px-6 py-2 rounded-xl font-medium">Save Update</button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading updates...</div>
      ) : filteredUpdates.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl text-center text-gray-500">
          No construction updates found for this project.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUpdates.map(update => (
            <div key={update.id} className="bg-white rounded-2xl overflow-hidden border border-black/5">
              <div className="aspect-[4/3] bg-gray-100 relative">
                {update.imageUrl ? (
                  <img src={update.imageUrl} alt={update.dateStr} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-gray-400"><ImageIcon size={48} /></div>
                )}
                <div className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-[#123645]">{update.dateStr}</div>
              </div>
              <div className="p-5">
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{update.description || 'No description provided.'}</p>
                <div className="flex justify-end">
                  <button onClick={() => handleDelete(update.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}