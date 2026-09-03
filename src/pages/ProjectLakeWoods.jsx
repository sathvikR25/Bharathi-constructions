import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Shield, Trees, Film, Zap, Activity, Flower2, Compass, Dumbbell, Gamepad2, CarFront, Wifi, Camera, ShoppingCart, MapPin } from "lucide-react";
import MenuOverlay from "../components/MenuOverlay";
import Header from "../components/Header";
import SEO from "../components/SEO";
import KineticText from "../components/KineticText";
import ImageCarousel from "../components/ImageCarousel";

gsap.registerPlugin(ScrollTrigger);

const LAKEWOOD_RENDERS = [
  { src: "/lakewood-media/lakewood-cover.jpg", label: "Project Overview" },
  { src: "/lakewood-media/View 01_FFFFF copy.jpg", label: "Grand Entrance" },
  { src: "/lakewood-media/View 02_FFFFF copy.jpg", label: "Facade Evening" },
  { src: "/lakewood-media/View 03_FFFFFF copy.jpg", label: "Landscape & Open Spaces" },
  { src: "/lakewood-media/View 04_ffffff copy.jpg", label: "Aerial Perspective" },
  { src: "/lakewood-media/View 05_FFFFF copy.jpg", label: "Amenity Deck" },
  { src: "/lakewood-media/view 06_FFFFFF copy.jpg", label: "Lobby & Lounge" },
  { src: "/lakewood-media/lake-woods-brohure-page-0011.jpg", label: "Master Layout" },
  { src: "/lakewood-media/lake-woods-brohure-page-0012.jpg", label: "Feature List" },
  
];



const AMENITIES = [
  { icon: Shield,     label: "24/7 Security",     sub: "Advanced CCTV & Guard Patrol" },
  { icon: Trees,      label: "Lush Landscaping",   sub: "2,000+ Sqft Curated Green Cover" },
  { icon: Activity, label: "Jogging Track", sub: "Dedicated Scenic Jogging Track" },
  { icon: Zap,        label: "Power Backup",        sub: "100% DG Generator Covered" },
  { icon: Compass,    label: "Vastu Compliant",     sub: "All 4 Units Individually Certified" },
  { icon: Dumbbell,   label: "Fitness Centre",      sub: "Premium Equipped Gym" },
  { icon: Gamepad2,   label: "Indoor Games",        sub: "Table Tennis, Carrom & More" },
  { icon: CarFront,   label: "EV Charging",         sub: "Smart Charging Bays in Basement" },
  { icon: Wifi,       label: "High-Speed Internet", sub: "Fibre-Optic Ready Infrastructure" },
  { icon: Camera,     label: "Smart CCTV",          sub: "180+ Camera Full-Coverage Grid" },
  { icon: Flower2, label: "Yoga/Meditation/Multipurpose Hall", sub: "Spacious Multi-Activity Hall" },
  { icon: MapPin,     label: "Prime Location",      sub: "NCL Colony, Kompally, Hyderabad" }
];

export default function ProjectLakeWoods() {
  const [navOpen, setNavOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(null);
  const mainRef = useRef(null);
  const heroWrapRef = useRef(null);
  const heroTextRef = useRef(null);
  const galleryTrackRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // INVERTED SPATIAL MECHANIC: Start Small, Grow Massive
      if (heroWrapRef.current) {
        gsap.fromTo(heroWrapRef.current, 
          { scale: 0.4, borderRadius: "60px" },
          { scale: 1, borderRadius: "0px", scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: true, pin: true } }
        );
        gsap.to(heroTextRef.current, {
          y: -150, opacity: 0, scrollTrigger: { trigger: ".hero-section", start: "top top", end: "center top", scrub: true }
        });
      }

      // 3D Tilt Hover for Residence Cards (Using transparent PNGs now)
      gsap.utils.toArray(".residence-card").forEach(card => {
        const inner = card.querySelector(".residence-inner");
        const floatTl = gsap.timeline({ repeat: -1, yoyo: true }).to(inner, { y: -10, duration: 3, ease: "sine.inOut" });
        card.addEventListener("mouseenter", () => floatTl.pause());
        card.addEventListener("mousemove", (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(inner, { rotationY: x / 20, rotationX: -y / 20, ease: "power2.out", duration: 0.4 });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(inner, { rotationY: 0, rotationX: 0, ease: "power3.out", duration: 0.6, onComplete: () => floatTl.play() });
        });
      });

              
        // Collage Stagger Animation
        gsap.utils.toArray(".collage-item").forEach((item) => {
          gsap.to(item, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          });
        });

      // Reveal Images
      gsap.utils.toArray(".reveal-img").forEach(img => {
        gsap.fromTo(img, { scale: 1.15, filter: "brightness(0.8)" }, {
          scale: 1, filter: "brightness(1)",
          scrollTrigger: { trigger: img, start: "top bottom", end: "center center", scrub: true }
        });
      });
      
    }, mainRef);
    return () => ctx.revert();
  }, []);
  return (
    <div ref={mainRef} style={{ background: "transparent", color: "#123645", overflowX: "hidden" }}>
      <SEO 
        title="Bharathi Lake Woods" 
        description="Exclusive residential living spaces by Bharathi Constructions, offering unmatched tranquility and premium amenities." 
      />
      <Header theme="light" navOpen={navOpen} setNavOpen={setNavOpen} />
      <MenuOverlay navOpen={navOpen} setNavOpen={setNavOpen} />

      {/* LIGHTBOX MODAL */}
      {lightboxImg && typeof document !== "undefined" && createPortal(
        <div 
          style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.95)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "zoom-out" }}
          onClick={() => setLightboxImg(null)}
          className="animate-in fade-in duration-300"
        >
          <img 
            src={lightboxImg} 
            alt="Fullscreen Preview" 
            style={{ maxWidth: "90%", maxHeight: "90vh", objectFit: "contain", borderRadius: "8px", boxShadow: "0 20px 50px rgba(0,0,0,0.5)" }} 
            className="animate-in zoom-in-95 duration-300"
          />
          <span style={{ position: "absolute", top: "2rem", right: "3rem", color: "#fff", fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase", background: "rgba(255,255,255,0.1)", padding: "0.5rem 1rem", borderRadius: "100px", backdropFilter: "blur(10px)" }}>Close</span>
        </div>,
        document.body
      )}

      {/* HERO SECTION (INVERTED: PINNED & EXPANDING) */}
      <section className="hero-section" style={{ height: "100vh", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", background: "#fff" }}>
        {/* Affiliation Logos Top Right */}
        <div className="animate-in fade-in slide-in-from-top-4 duration-1000 delay-500" style={{ position: "absolute", top: "2.5rem", right: "2.5rem", zIndex: 30, display: "flex", gap: "1.5rem", alignItems: "center", background: "rgba(255,255,255,0.95)", padding: "0.75rem 1.5rem", borderRadius: "100px", boxShadow: "0 20px 40px rgba(0,0,0,0.15)", backdropFilter: "blur(10px)" }}>
          <img src="/lakewood-media/credai_logo.png" alt="CREDAI" style={{ height: "25px", objectFit: "contain" }} />
          <img src="/lakewood-media/hmda-logo.png" alt="HMDA" style={{ height: "35px", objectFit: "contain" }} />
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", borderLeft: "1px solid rgba(0,0,0,0.1)", paddingLeft: "1.5rem" }}>
            <img src="/lakewood-media/tsrera-logo.png" alt="TS RERA" style={{ height: "30px", objectFit: "contain" }} />
            <span style={{ fontSize: "0.6rem", fontWeight: 800, color: "#123645", letterSpacing: "0.05em", lineHeight: 1.2, textTransform: "uppercase" }}>TS RERA<br/>P02200006662</span>
          </div>
        </div>

        <div ref={heroWrapRef} style={{ position: "absolute", width: "100%", height: "100%", overflow: "hidden", willChange: "transform, border-radius", transformOrigin: "center center" }}>
          <img src="/lakewood-media/View 03_FFFFFF copy.jpg" alt="Lake Woods" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.95)" }} />
        </div>
        <div ref={heroTextRef} style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 2rem", pointerEvents: "auto", mixBlendMode: "difference", color: "#fff" }}>
          <span style={{ fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", display: "block", marginBottom: "1rem", color: "#fff" }}>Bharathi Lake Woods</span>
          <KineticText as="h1" text="Bharathi Lake Woods." style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(3.5rem, 8vw, 8rem)", margin: "0 0 2rem 0", fontWeight: 400 }} />
        </div>
      </section>

      {/* INVERTED MINIMALIST STATS */}
      <section style={{ padding: "10rem 4rem", background: "transparent", color: "#123645" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "4rem" }}>
          <div style={{ flex: "1 1 300px" }}>
            <KineticText as="h2" text="Project Highlights" style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2.5rem, 4vw, 4rem)", margin: "0 0 2rem 0", color: "#123645" }} />
          </div>
          <div style={{ flex: "1 1 500px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>
            {[ { v: "40", l: "Exclusive Units" }, { v: "8+2", l: "Floors" }, { v: "3 BHK", l: "Premium Layouts" }, { v: "2026", l: "Completion" } ].map((stat, i) => (
              <div key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.1)", paddingBottom: "1.5rem" }}>
                <span style={{ fontFamily: "Playfair Display, serif", fontSize: "2.5rem", display: "block", marginBottom: "0.5rem", color: "#123645" }}>{stat.v}</span>
                <span style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#666" }}>{stat.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3D SPOTLIGHT CAROUSEL GALLERY */}
      <section style={{ padding: "8rem 0 6rem", background: "#f4f1ea", overflow: "hidden" }}>
        <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 clamp(1.5rem, 4vw, 4rem)" }}>
          <div style={{ marginBottom: "3rem", display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <span style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#666", display: "block", marginBottom: "0.75rem" }}>
                The Gallery
              </span>
              <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", margin: 0, color: "#123645", lineHeight: 1.1 }}>
                Project <span style={{ fontStyle: "italic" }}>Gallery</span>
              </h2>
            </div>
            <span style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#666" }}>
              {LAKEWOOD_RENDERS.length} renders
            </span>
          </div>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {LAKEWOOD_RENDERS.map((img, i) => (
              <div 
                key={i} 
                onClick={() => setLightboxImg(img.src)}
                className="collage-item break-inside-avoid relative rounded-2xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-shadow bg-[#123645]/5"
                style={{ opacity: 0, transform: "translateY(40px)" }} // Initial state for GSAP
              >
                <img 
                  src={img.src} 
                  alt={img.label} 
                  className="w-full h-auto block transition-transform duration-700 group-hover:scale-105" 
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INVERTED AMENITIES */}
      <section style={{ padding: "10rem 4rem", background: "transparent" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <KineticText as="h2" text="Project Amenities." style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2.5rem, 4vw, 4rem)", margin: "0 0 6rem 0", color: "#123645" }} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
            {AMENITIES.map((a, i) => {
              const Icon = a.icon;
              return (
                <div key={i} style={{ padding: "3rem 2rem", background: "rgba(0,0,0,0.02)", borderRadius: "24px", border: "1px solid rgba(0,0,0,0.08)" }}>
                  <Icon size={32} color="#123645" strokeWidth={1.5} style={{ marginBottom: "2rem" }} />
                  <h4 style={{ fontSize: "1.2rem", fontWeight: 600, marginBottom: "1rem", color: "#123645" }}>{a.label}</h4>
                  <p style={{ fontSize: "0.9rem", color: "rgba(0,0,0,0.6)", lineHeight: 1.6 }}>{a.sub}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 1. FLOOR PLANS (Brochure) */}
      <section style={{ padding: "10rem 4rem", background: "#f4f1ea", color: "#123645" }}>
        <div style={{ maxWidth: "1600px", margin: "0 auto", textAlign: "center" }}>
          <span style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#666", display: "block", marginBottom: "1.5rem" }}>The Floor Plans</span>
          <KineticText as="h2" text="Floor Plans." style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(3rem, 5vw, 5rem)", margin: "0 0 6rem 0", color: "#123645" }} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))", gap: "4rem" }}>
            <div style={{ borderRadius: "24px", overflow: "hidden", boxShadow: "0 20px 50px rgba(0,0,0,0.1)", background: "#fff" }}>
              <img className="reveal-img" src="/lakewood-media/floor-plans-brochure-2.jpg" alt="East Facing Floor Plans - Flat 01 & 03" style={{ width: "100%", height: "auto", display: "block", imageRendering: "high-quality" }} />
            </div>
            <div style={{ borderRadius: "24px", overflow: "hidden", boxShadow: "0 20px 50px rgba(0,0,0,0.1)", background: "#fff" }}>
              <img className="reveal-img" src="/lakewood-media/floor-plans-brochure.jpg" alt="West Facing Floor Plans - Flat 02 & 04" style={{ width: "100%", height: "auto", display: "block", imageRendering: "high-quality" }} />
            </div>
          </div>
        </div>
      </section>

      {/* 2. 3D FLOOR PLANS (Sections) */}
      <section style={{ padding: "10rem 4rem", background: "transparent", color: "#123645" }}>
        <div style={{ maxWidth: "1600px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "8rem" }}>
            <span style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#000", fontWeight: 700, display: "block", marginBottom: "1.5rem" }}>The Spaces</span>
            <KineticText as="h2" text="3D Floor Plans." style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(3rem, 5vw, 5rem)", margin: 0, color: "#123645" }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "4rem" }}>
              {[
                { img: "/lakewood-media/SECTION 1__ 2675 - SQ.F.jpg", title: "Section 1", sqft: "2675 SQ.FT" },
                { img: "/lakewood-media/SECTION 2__ 2680 - F.jpg", title: "Section 2", sqft: "2680 SQ.FT" },
                { img: "/lakewood-media/SECTION 3__ 2290 - f.jpg", title: "Section 3", sqft: "2290 SQ.FT" },
                { img: "/lakewood-media/SECTION 4 __ 2285 -f.jpg", title: "Section 4", sqft: "2285 SQ.FT" }
              ].map((item, idx) => (
                <div key={idx} style={{ overflow: "hidden" }}>
                  <div style={{ width: "100%", overflow: "hidden", borderRadius: "24px", border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 20px 40px rgba(0,0,0,0.05)" }}>
                    <img className="reveal-img" src={item.img} alt={item.title} onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"} onClick={() => setLightboxImg(item.img)} style={{ cursor: "zoom-in", width: "100%", maxHeight: "80vh", objectFit: "contain", display: "block", imageRendering: "-webkit-optimize-contrast", transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)" }} />
                  </div>
                  <div style={{ marginTop: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 1rem" }}>
                    <span style={{ fontFamily: "Playfair Display, serif", fontSize: "1.5rem", color: "#123645" }}>{item.title}</span>
                    <span style={{ fontSize: "0.8rem", letterSpacing: "0.15em", color: "#000", fontWeight: 700 }}>{item.sqft}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LOCATION / MASTERPLAN */}
      <section style={{ padding: "10rem 4rem", background: "transparent", color: "#123645", borderTop: "1px solid rgba(0,0,0,0.05)" }}>
         <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "6rem", alignItems: "center" }}>
            <div style={{ flex: "1 1 500px", borderRadius: "24px", overflow: "hidden", border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 20px 40px rgba(0,0,0,0.05)" }}>
              <img className="reveal-img" src="/lakewood-media/map.webp" alt="Map" style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
            <div style={{ flex: "1 1 400px" }}>
              <span style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#666", display: "block", marginBottom: "1rem" }}>Location & Connectivity</span>
              <KineticText as="h2" text="Prime Location." style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2.5rem, 4vw, 4rem)", margin: "0 0 3rem 0", color: "#123645" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {[["DRS International School", "3 min"], ["Decathlon & Cineplanet", "6 min"], ["Malla Reddy Narayana Hospital", "8 min"], ["ORR Exit â€” Kandlakoya", "9 min"]].map(([place, time]) => (
                  <div key={place} style={{ display: "flex", justifyContent: "space-between", paddingBottom: "1.5rem", borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
                    <span style={{ fontSize: "1.1rem", color: "#123645" }}>{place}</span>
                    <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "#555" }}>{time}</span>
                  </div>
                ))}
              </div>
            </div>
         </div>
      </section>

      {/* COMPREHENSIVE PROJECT FOOTER */}
        <section style={{ padding: "8rem 4rem 4rem", background: "#f4f1ea", borderTop: "1px solid rgba(0,0,0,0.05)" }}>
          
          {/* CTA */}
          <div style={{ maxWidth: "1400px", margin: "0 auto", textAlign: "center", marginBottom: "8rem" }}>
            <span style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#666", display: "block", marginBottom: "1.5rem" }}>Take The Next Step</span>
            <KineticText as="h2" text="Secure Your Sanctuary." style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(3rem, 6vw, 6rem)", margin: "0 0 4rem 0", color: "#123645" }} />
            <div style={{ display: "flex", justifyContent: "center", gap: "2.5rem", flexWrap: "wrap" }}>
              
              {/* CONTACT SALES BUTTON */}
              <div className="relative inline-flex group/wrap rounded-full p-[3px] shadow-2xl shadow-[#c9a96e]/20 overflow-hidden hover-target">
                {/* Rotating Border */}
                <div className="absolute inset-[-100%] animate-spin bg-[conic-gradient(from_0deg,transparent_0_340deg,#c9a96e_360deg)] opacity-100 transition-opacity duration-300" style={{ animationDuration: '3s' }} />
                
                {/* Button Body */}
                <a href="#contact" className="relative z-10 flex items-center justify-center bg-white shadow-xl shadow-[#123645]/10 rounded-full overflow-hidden group/inner transition-all duration-500 hover:shadow-2xl hover:shadow-[#123645]/20" style={{ padding: "1.25rem 3.5rem" }}>
                  {/* Dynamic Color Fill (Sweeps up from bottom left) */}
                  <div className="absolute inset-0 bg-[#123645] translate-y-full translate-x-[-100%] group-hover/inner:translate-y-0 group-hover/inner:translate-x-0 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] rounded-full origin-bottom-left" />
                  
                  {/* Inner Content */}
                  <span className="relative z-20 flex items-center gap-3 text-[#123645] group-hover/inner:text-white transition-colors duration-500 text-[0.85rem] tracking-[0.2em] uppercase font-semibold">
                    Contact Sales <ArrowRight size={18} className="transform group-hover/inner:translate-x-1 transition-transform duration-500" />
                  </span>
                </a>
              </div>

              {/* DOWNLOAD BROCHURE BUTTON */}
              <div className="relative inline-flex group/wrap rounded-full p-[3px] shadow-2xl shadow-[#c9a96e]/20 overflow-hidden hover-target">
                {/* Rotating Border */}
                <div className="absolute inset-[-100%] animate-spin bg-[conic-gradient(from_0deg,transparent_0_340deg,#c9a96e_360deg)] opacity-100 transition-opacity duration-300" style={{ animationDuration: '3s', animationDelay: '-1.5s' }} />
                
                {/* Button Body */}
                <a href="/brochures/lake-woods-brochure.pdf" download className="relative z-10 flex items-center justify-center bg-white shadow-xl shadow-[#123645]/10 rounded-full overflow-hidden group/inner transition-all duration-500 hover:shadow-2xl hover:shadow-[#123645]/20" style={{ padding: "1.25rem 3.5rem" }}>
                  {/* Dynamic Color Fill (Sweeps up from bottom left) */}
                  <div className="absolute inset-0 bg-[#123645] translate-y-full translate-x-[-100%] group-hover/inner:translate-y-0 group-hover/inner:translate-x-0 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] rounded-full origin-bottom-left" />
                  
                  {/* Inner Content */}
                  <span className="relative z-20 flex items-center gap-3 text-[#123645] group-hover/inner:text-white transition-colors duration-500 text-[0.85rem] tracking-[0.2em] uppercase font-semibold">
                    Download Brochure <ArrowRight size={18} className="transform group-hover/inner:translate-x-1 transition-transform duration-500" />
                  </span>
                </a>
              </div>

            </div>
          </div>

          {/* EXTRACTED DETAILS GRID */}
          <div style={{ maxWidth: "1400px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "4rem", color: "#123645", borderTop: "1px solid rgba(0,0,0,0.1)", paddingTop: "4rem", fontSize: "0.9rem", lineHeight: 1.8 }}>
            
            {/* CORPORATE ADDRESS */}
            <div>
              <h4 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.2rem", marginBottom: "1rem", color: "#000" }}>Corporate Office</h4>
              <p style={{ color: "#444" }}>#2301, Plot No.: 51 & 52, Delight Square<br/>
              3rd floor, Green Park Avenue, Suchitra 'X' Roads,<br/>
              Hyderabad-500067, Telangana.</p>
            </div>

            {/* SITE ADDRESS */}
            <div>
              <h4 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.2rem", marginBottom: "1rem", color: "#000" }}>Site Address</h4>
              <p style={{ color: "#444" }}>Sy no 106, NCL, Kompally,<br/>
              Dundigal Gandimaisamma Mandal,<br/>
              Medchal Malkajgiri District, Telangana 500100.</p>
            </div>

            {/* CONTACT INFO */}
            <div>
              <h4 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.2rem", marginBottom: "1rem", color: "#000" }}>Connect</h4>
              <p style={{ color: "#444", marginBottom: "0.5rem" }}>
                <strong>Sales:</strong> +91 7997992051 <br/>
                <strong>Office:</strong> +91 7997992052 <br/>
                <strong>Support:</strong> +91 7997992053
              </p>
              <p style={{ color: "#444", marginBottom: "0.5rem" }}>
                <strong>E-mail:</strong> <a href="mailto:bharathiconstructionshyd1@gmail.com" style={{ color: "#123645", textDecoration: "none", borderBottom: "1px solid rgba(0,0,0,0.2)" }}>bharathiconstructionshyd1@gmail.com</a>
              </p>
              <p style={{ color: "#444" }}>
                <strong>Socials:</strong> @bharathiconstructionshyd
              </p>
            </div>

          </div>
          
          {/* AFFILIATIONS AND COPYRIGHT */}
          <div style={{ maxWidth: "1400px", margin: "4rem auto 0", borderTop: "1px solid rgba(0,0,0,0.1)", paddingTop: "2rem", display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "2rem", fontSize: "0.8rem", color: "#666" }}>
            <span style={{ textTransform: "uppercase", letterSpacing: "0.1em" }}>© 2026 Bharathi Constructions</span>
          </div>
        </section>
    </div>
  );

}
