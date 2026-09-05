import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import SEO from "../components/SEO";

export default function NotFound() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".error-text",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen flex items-center justify-center bg-[#050505] text-[#eae5da] selection:bg-[#c9a96e] selection:text-[#050505] relative overflow-hidden">
      <SEO title="Page Not Found" description="The page you are looking for does not exist." />
      
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#c9a96e]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="text-center z-10 px-6">
        <h1 className="error-text text-[#c9a96e] text-9xl md:text-[12rem] font-serif mb-4 leading-none mix-blend-screen opacity-50">
          404
        </h1>
        <h2 className="error-text text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight">
          Page Not Found
        </h2>
        <p className="error-text text-white/50 text-lg max-w-md mx-auto mb-10 leading-relaxed">
          The space you are looking for might have been moved, renamed, or perhaps never existed in our blueprints.
        </p>
        <Link 
          to="/"
          className="error-text inline-block px-8 py-4 border border-[#c9a96e]/30 rounded-full text-sm font-medium tracking-widest text-[#c9a96e] uppercase hover:bg-[#c9a96e] hover:text-black transition-all duration-300"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
