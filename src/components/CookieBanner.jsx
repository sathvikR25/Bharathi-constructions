import React, { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('bharathi_cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('bharathi_cookie_consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-[100] bg-[#123645] border-t border-white/10 text-white p-4 md:p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex-1 text-sm text-white/80 max-w-4xl leading-relaxed">
        We use cookies to improve your browsing experience, analyze site traffic, and serve personalized content. 
        By clicking "Accept All", you consent to our use of cookies as described in our <a href="/policy" className="underline hover:text-[#c9a96e]">Privacy Policy</a>.
      </div>
      <div className="flex gap-3 shrink-0 w-full md:w-auto">
        <button 
          onClick={acceptCookies} 
          className="flex-1 md:flex-none bg-[#c9a96e] text-black px-6 py-2.5 rounded-full font-semibold hover:bg-white transition-colors"
        >
          Accept All
        </button>
      </div>
    </div>
  );
}