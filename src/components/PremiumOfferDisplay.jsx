import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { db } from '../lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { X, ArrowRight, Sparkles } from 'lucide-react';

export default function PremiumOfferDisplay() {
  const [offers, setOffers] = useState([]);
  const [visibleOffer, setVisibleOffer] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const q = query(collection(db, 'offers'), where("isActive", "==", true));
        const snapshot = await getDocs(q);
        const fetchedOffers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOffers(fetchedOffers);
      } catch (error) {
        console.error("Failed to fetch offers:", error);
      }
    };
    fetchOffers();
  }, []);

  useEffect(() => {
    // Determine which offer to show based on current route
    let currentRouteContext = 'home';
    if (location.pathname.includes('horizon')) currentRouteContext = 'horizon';
    else if (location.pathname.includes('lake-woods')) currentRouteContext = 'lake-woods';
    else if (location.pathname !== '/') currentRouteContext = 'other'; // no offers on random pages

    const relevantOffers = offers.filter(o => 
      o.targetProject === 'all' || o.targetProject === currentRouteContext
    );

    if (relevantOffers.length > 0) {
      // Pick the newest one or most relevant
      const offerToShow = relevantOffers.sort((a, b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0))[0];
      
      // Check if user already dismissed this specific offer
      const isDismissed = sessionStorage.getItem(`dismissed_offer_${offerToShow.id}`);
      
      if (!isDismissed) {
        // Small delay so it slides in elegantly after page load
        setTimeout(() => setVisibleOffer(offerToShow), 1500);
      } else {
        setVisibleOffer(null);
      }
    } else {
      setVisibleOffer(null);
    }
  }, [location, offers]);

  if (!visibleOffer) return null;

  const handleDismiss = () => {
    sessionStorage.setItem(`dismissed_offer_${visibleOffer.id}`, 'true');
    setVisibleOffer(null);
  };

  return (
    <div 
      className="fixed bottom-6 left-6 z-[90] max-w-sm w-[calc(100%-3rem)] animate-[slideUp_0.6s_cubic-bezier(0.16,1,0.3,1)]"
    >
      <div className="relative bg-[#123645]/95 backdrop-blur-xl border border-[#c9a96e]/30 p-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden group">
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#c9a96e]/10 rounded-full filter blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#c9a96e] to-transparent opacity-50"></div>

        <button 
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-white/40 hover:text-white transition-colors p-1"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-4">
          <div className="mt-1 p-2 bg-[#c9a96e]/10 rounded-lg shrink-0">
            <Sparkles className="w-5 h-5 text-[#c9a96e]" />
          </div>
          <div>
            <span className="text-[#c9a96e] text-[0.65rem] font-bold uppercase tracking-widest mb-1 block">Exclusive Offer</span>
            <h4 className="text-white font-serif text-lg leading-tight mb-2">{visibleOffer.title}</h4>
            <p className="text-white/60 text-sm leading-relaxed mb-4">{visibleOffer.description}</p>
            
            {visibleOffer.link && (
              <a 
                href={visibleOffer.link}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#123645] bg-[#c9a96e] hover:bg-white px-4 py-2 rounded-lg transition-colors"
              >
                Learn More <ArrowRight className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}