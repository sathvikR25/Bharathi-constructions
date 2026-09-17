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

      {/* DESKTOP FLOATING WIDGETS */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-[100] flex-col gap-4">
    
      {/* Call Button */}
      <a
        href={`tel:${phoneNumber}`}
        className="group relative flex items-center justify-center w-14 h-14 bg-[#123645] rounded-full shadow-[0_4px_14px_0_rgba(18,54,69,0.39)] hover:scale-110 hover:shadow-[0_6px_20px_rgba(18,54,69,0.23)] transition-all duration-300"
        aria-label="Call Sales"
      >
        <Phone className="w-6 h-6 text-white fill-white" />
        <span className="absolute right-16 bg-black/80 text-white px-3 py-1.5 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none backdrop-blur-sm border border-white/10">
          Call Sales
        </span>
      </a>

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(defaultMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-[0_4px_14px_0_rgba(37,211,102,0.39)] hover:scale-110 hover:shadow-[0_6px_20px_rgba(37,211,102,0.23)] transition-all duration-300"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white fill-white" />
        <span className="absolute right-16 bg-black/80 text-white px-3 py-1.5 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none backdrop-blur-sm border border-white/10">
          Chat with Sales
        </span>
        {/* Pulse effect */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-75"></span>
      </a>
    </div>
    </>
  );
}


