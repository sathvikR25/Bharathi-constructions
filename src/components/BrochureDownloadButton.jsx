import React, { useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { storage } from '../lib/firebase';
import { ref, listAll, getDownloadURL } from 'firebase/storage';

export default function BrochureDownloadButton({ project = "horizon", label = "Download Brochure", className = "" }) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async (e) => {
    e.preventDefault();
    if(loading) return;
    
    setLoading(true);
    try {
      // First check the 'brochures' folder
      let res;
      try {
        res = await listAll(ref(storage, 'brochures'));
      } catch (err) {
        res = { items: [] };
      }
      
      // If empty (because files were uploaded to root instead of the folder), check root
      if (!res || !res.items || res.items.length === 0) {
        res = await listAll(ref(storage, ''));
      }
      
      // Find a brochure matching the project name (case insensitive)
      let targetItem = res.items.find(item => item.name.toLowerCase().includes(project.toLowerCase()));

      if (targetItem) {
        const url = await getDownloadURL(targetItem);
        window.open(url, '_blank');
      } else {
        alert('Brochure not found in database. Please check back later.');
      }
    } catch (error) {
      console.error("Error fetching brochure:", error);
      alert('Failed to download brochure: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={"relative inline-flex group/wrap rounded-full p-[3px] shadow-2xl shadow-[#c9a96e]/20 overflow-hidden hover-target " + className}>
      <div className="absolute inset-[-100%] animate-spin bg-[conic-gradient(from_0deg,transparent_0_340deg,#c9a96e_360deg)] opacity-100 transition-opacity duration-300" style={{ animationDuration: '3s', animationDelay: '-1.5s' }} />
      <button onClick={handleDownload} disabled={loading} className="relative z-10 flex items-center justify-center bg-white shadow-xl shadow-[#123645]/10 rounded-full overflow-hidden group/inner transition-all duration-500 hover:shadow-2xl hover:shadow-[#123645]/20 cursor-pointer" style={{ padding: "1.25rem 3.5rem", border: "none", outline: "none" }}>
        <div className="absolute inset-0 bg-[#123645] translate-y-full translate-x-[-100%] group-hover/inner:translate-y-0 group-hover/inner:translate-x-0 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] rounded-full origin-bottom-left" />
        <span className="relative z-20 flex items-center gap-3 text-[#123645] group-hover/inner:text-white transition-colors duration-500 text-[0.85rem] tracking-[0.2em] uppercase font-semibold">
          {loading ? (
            <><Loader2 size={18} className="animate-spin" /> Fetching...</>
          ) : (
            <>{label} <ArrowRight size={18} className="transform group-hover/inner:translate-x-1 transition-transform duration-500" /></>
          )}
        </span>
      </button>
    </div>
  );
}
