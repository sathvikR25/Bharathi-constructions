import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import KineticText from './KineticText';
import { Activity } from 'lucide-react';

export default function ConstructionUpdates({ project }) {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'construction_updates'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(update => update.project === project);
      setUpdates(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [project]);

  if (loading || updates.length === 0) return null;

  return (
    <section className="py-20 md:py-32 px-6 md:px-16" style={{ background: "#fdfbf7" }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <Activity className="text-[#c9a96e]" size={24} />
          <span style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#666" }}>
            Ongoing Progress
          </span>
        </div>
        <KineticText 
          as="h2" 
          text="Construction Status." 
          style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", margin: "0 0 4rem 0", color: "#123645" }} 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {updates.map(update => (
            <div key={update.id} className="group cursor-pointer">
              <div className="overflow-hidden rounded-2xl aspect-[4/3] mb-6 shadow-md transition-all duration-500 group-hover:shadow-2xl border border-black/5">
                <img 
                  src={update.imageUrl} 
                  alt={update.dateStr} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col gap-2 px-2">
                <span className="inline-block bg-[#123645] text-[#c9a96e] text-xs font-bold px-3 py-1.5 rounded-full w-max uppercase tracking-wider">
                  {update.dateStr}
                </span>
                {update.description && (
                  <p className="text-[#123645] mt-2 text-sm leading-relaxed opacity-80">
                    {update.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}