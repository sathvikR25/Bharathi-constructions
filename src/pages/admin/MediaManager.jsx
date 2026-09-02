import React, { useState } from 'react';
import { Upload, Trash2, Eye, Lock } from 'lucide-react';

export default function MediaManager({ role }) {
  const [media, setMedia] = useState([
    { id: 1, url: '/lakewood-media/lakewood-cover.jpg', name: 'Lakewood Cover' },
    { id: 2, url: '/lakewood-media/View 01_FFFFF copy.jpg', name: 'Grand Entrance' },
    { id: 3, url: '/lakewood-media/View 02_FFFFF copy.jpg', name: 'Facade Evening' },
    { id: 4, url: '/lakewood-media/View 03_FFFFFF copy.jpg', name: 'Landscape' },
  ]);

  const canEdit = role === 'MD' || role === 'Tech Handler';

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-serif text-gray-900 tracking-wide mb-1">Media Library</h2>
          <p className="text-gray-500 text-sm">Manage project assets, brochures, and images.</p>
        </div>
        
        {canEdit ? (
          <button className="bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-black transition-colors flex items-center gap-2">
            <Upload className="w-4 h-4" /> Upload Media
          </button>
        ) : (
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-500 rounded-lg text-sm">
            <Lock className="w-4 h-4" /> View Only (Sales)
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {media.map(item => (
          <div key={item.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow group relative">
            <div className="h-48 w-full bg-gray-100 relative">
              <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
              
              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button className="w-10 h-10 rounded-full bg-white text-gray-900 flex items-center justify-center hover:scale-110 transition-transform" title="Preview">
                  <Eye className="w-5 h-5" />
                </button>
                {canEdit && (
                  <button className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center hover:scale-110 transition-transform" title="Delete">
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
            <div className="p-4">
              <p className="font-medium text-gray-900 truncate">{item.name}</p>
              <p className="text-xs text-gray-500 mt-1">Image • 2.4 MB</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
