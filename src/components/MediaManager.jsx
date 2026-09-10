import React, { useState, useEffect } from 'react';
import { storage } from '../lib/firebase';
import { ref, listAll, getDownloadURL, uploadBytesResumable, deleteObject } from 'firebase/storage';
import { Trash2, Upload, FileText, Link as LinkIcon, Loader2 } from 'lucide-react';

export default function MediaManager() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [folder, setFolder] = useState('brochures'); // default folder

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
    const storageRef = ref(storage, `${folder}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
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
    if(!window.confirm("Are you sure you want to delete this file?")) return;
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
    <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", padding: "2rem", marginTop: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 600, margin: 0, fontFamily: "Playfair Display, serif", color: "#fff" }}>Media Library</h2>
        
        <div style={{ display: "flex", gap: "1rem" }}>
          <select 
            value={folder} 
            onChange={(e) => setFolder(e.target.value)}
            style={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", padding: "0.5rem 1rem", borderRadius: "8px", outline: "none" }}
          >
            <option value="brochures">Brochures</option>
            <option value="gallery">Gallery</option>
            <option value="media">General Media</option>
          </select>
          
          <label style={{ cursor: "pointer", background: "#c9a96e", color: "#000", padding: "0.5rem 1rem", borderRadius: "8px", display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 600 }}>
            <Upload size={16} /> {uploading ? Uploading % : "Upload File"}
            <input type="file" onChange={handleUpload} style={{ display: "none" }} disabled={uploading} />
          </label>
        </div>
      </div>

      {loading ? (
        <div style={{ padding: "4rem", display: "flex", justifyContent: "center" }}>
          <Loader2 className="animate-spin" size={32} color="#c9a96e" />
        </div>
      ) : files.length === 0 ? (
        <div style={{ padding: "3rem", textAlign: "center", background: "rgba(255,255,255,0.02)", borderRadius: "8px", color: "rgba(255,255,255,0.5)" }}>
          No files found in /{folder}
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "1.5rem" }}>
          {files.map((file) => (
            <div key={file.fullPath} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", overflow: "hidden" }}>
                <div style={{ width: "40px", height: "40px", background: "rgba(201,169,110,0.1)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <FileText size={20} color="#c9a96e" />
                </div>
                <div style={{ overflow: "hidden" }}>
                  <p style={{ margin: 0, fontSize: "0.9rem", fontWeight: 600, whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", color: "#fff" }} title={file.name}>{file.name}</p>
                </div>
              </div>
              
              <div style={{ display: "flex", gap: "0.5rem", marginTop: "auto" }}>
                <button onClick={() => window.open(file.url, '_blank')} style={{ flex: 1, padding: "0.5rem", background: "rgba(255,255,255,0.05)", border: "none", color: "#fff", borderRadius: "6px", cursor: "pointer", fontSize: "0.8rem", transition: "background 0.2s" }} onMouseEnter={e=>e.target.style.background="rgba(255,255,255,0.1)"} onMouseLeave={e=>e.target.style.background="rgba(255,255,255,0.05)"}>
                  View
                </button>
                <button onClick={() => copyToClipboard(file.url)} style={{ padding: "0.5rem", background: "rgba(255,255,255,0.05)", border: "none", color: "#fff", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} title="Copy URL" onMouseEnter={e=>e.target.style.background="rgba(255,255,255,0.1)"} onMouseLeave={e=>e.target.style.background="rgba(255,255,255,0.05)"}>
                  <LinkIcon size={16} />
                </button>
                <button onClick={() => handleDelete(file.fullPath)} style={{ padding: "0.5rem", background: "rgba(239, 68, 68, 0.1)", border: "none", color: "#ef4444", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} title="Delete" onMouseEnter={e=>e.target.style.background="rgba(239, 68, 68, 0.2)"} onMouseLeave={e=>e.target.style.background="rgba(239, 68, 68, 0.1)"}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
