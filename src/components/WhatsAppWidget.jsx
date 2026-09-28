import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function ContactWidgets() {
  const location = useLocation();
  if (location.pathname.startsWith("/admin")) return null;

  const phoneNumber = "+917997992051";
  const defaultMessage = "Hello Bharathi Constructions, I would like to know more about your projects.";

  return (
    <>
      {/* MOBILE QUICK ACTIONS BAR */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-[100] bg-white/90 backdrop-blur-md border-t border-gray-200 flex items-center justify-between p-3 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <a 
          href={`tel:${phoneNumber}`}
          className="flex-1 flex items-center justify-center gap-2 text-[#123645] font-semibold text-sm border-r border-gray-200"
        >
          <Phone className="w-4 h-4" /> Call Sales
        </a>
        <a 
          href={`https://wa.me/${phoneNumber.replace("+", "")}?text=${encodeURIComponent(defaultMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 text-[#25D366] font-semibold text-sm"
        >
          <MessageCircle className="w-4 h-4" /> WhatsApp
        </a>
      </div>

      {/* DESKTOP SLEEK PILL WIDGET */}
      <div className="hidden md:flex fixed bottom-8 right-8 z-[100] flex-row items-center bg-white/95 backdrop-blur-xl rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-gray-200/50 p-1.5 transition-transform hover:scale-[1.02]">
        
        {/* Call Button */}
        <a
          href={`tel:${phoneNumber}`}
          className="flex items-center gap-2.5 px-6 py-2.5 rounded-full hover:bg-gray-100/80 transition-colors text-[#123645] font-semibold text-sm"
          aria-label="Call Sales"
        >
          <Phone className="w-4 h-4" />
          <span>Call Sales</span>
        </a>
        
        {/* Subtle Divider */}
        <div className="w-[1px] h-5 bg-gray-200 mx-1"></div>

        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(defaultMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-6 py-2.5 rounded-full hover:bg-[#25D366]/10 transition-colors text-[#25D366] font-semibold text-sm"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp</span>
        </a>
      </div>
    </>
  );
}