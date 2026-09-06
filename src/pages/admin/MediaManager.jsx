import React, { useState, useEffect } from 'react';
import { Upload, Trash2, Eye, Lock, FileText, Link as LinkIcon, Loader2, Copy } from 'lucide-react';
import { storage } from '../../lib/firebase';
import { ref, listAll, getDownloadURL, uploadBytesResumable, deleteObject } from 'firebase/storage';

export default function MediaManager({ role }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [folder, setFolder] = useState('brochures');

  const canEdit = role === 'MD' || role === 'Tech Handler' || role === 'Admin'; // Added Admin just in case

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const listRef = ref(storage, folder);
      const res = await listAll(listRef);
      const filesPromises = res.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        return { name: itemRef.name, fullPath: itemRef.fullPath, url };
      });
      const filesData = await Promise.all(filesPromises);
      setFiles(filesData);
    } catch (error) {
      console.error("Error fetching files:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [folder]);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const storageRef = ref(storage, folder + '/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
      (snapshot) => {
        const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(prog);
      }, 
      (error) => {
        console.error("Upload error:", error);
        setUploading(false);
        alert("Upload failed.");
      }, 
      () => {
        setUploading(false);
        setProgress(0);
        fetchFiles();
      }
    );
  };

  const handleDelete = async (fullPath) => {
    if(!window.confirm("Are you sure you want to delete this file permanently?")) return;
    try {
      const fileRef = ref(storage, fullPath);
      await deleteObject(fileRef);
      fetchFiles();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Delete failed.");
    }
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    alert("URL copied to clipboard!");
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <div>
          <h2 className="text-3xl font-serif text-gray-900 tracking-wide mb-1">Media Library</h2>
          <p className="text-gray-500 text-sm">Manage brochures, images, and other assets on Firebase Storage.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <select 
            value={folder}
            onChange={(e) => setFolder(e.target.value)}
            className="bg-white border border-gray-300 text-gray-900 px-4 py-2.5 rounded-lg text-sm font-medium outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all"
          >
            <option value="brochures">Brochures (/brochures)</option>
            <option value="gallery">Gallery (/gallery)</option>
            <option value="media">General Media (/media)</option>
          </select>

          {canEdit ? (
            <label className="bg-gray-900 cursor-pointer text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-black transition-colors flex items-center gap-2">
              <Upload className="w-4 h-4" /> {uploading ? 'Uploading ' + Math.round(progress) + '%' : "Upload File"}
              <input type="file" onChange={handleUpload} className="hidden" disabled={uploading} />
            </label>
          ) : (
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-500 rounded-lg text-sm">
              <Lock className="w-4 h-4" /> View Only (Sales)
            </div>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        </div>
      ) : files.length === 0 ? (
        <div className="bg-white border border-dashed border-gray-300 rounded-2xl py-20 text-center text-gray-500">
          No files found in /{folder}.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {files.map(item => {
            const isImage = item.name.match(/\.(jpeg|jpg|gif|png|webp|svg)$/i);
            return (
              <div key={item.fullPath} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow group relative flex flex-col">
                <div className="h-48 w-full bg-gray-50 relative flex items-center justify-center border-b border-gray-100">
                  {isImage ? (
                    <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <FileText className="w-12 h-12 text-gray-300" />
                  )}
                  
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button onClick={() => window.open(item.url, '_blank')} className="w-10 h-10 rounded-full bg-white text-gray-900 flex items-center justify-center hover:scale-110 transition-transform" title="Preview / Download">
                      <Eye className="w-5 h-5" />
                    </button>
                    <button onClick={() => copyToClipboard(item.url)} className="w-10 h-10 rounded-full bg-white text-gray-900 flex items-center justify-center hover:scale-110 transition-transform" title="Copy URL">
                      <Copy className="w-5 h-5" />
                    </button>
                    {canEdit && (
                      <button onClick={() => handleDelete(item.fullPath)} className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center hover:scale-110 transition-transform" title="Delete">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <p className="font-medium text-gray-900 truncate" title={item.name}>{item.name}</p>
                  <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{folder}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
