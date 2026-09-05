import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  ArrowRight, Waves, AlignVerticalSpaceAround, Trees, Building2, Droplet, ShieldCheck, Car, 
  Sofa, PartyPopper, Baby, Film, Zap, Gamepad2, ShoppingBasket, Briefcase, Dumbbell, Camera, Key, Footprints, Flower2, X 
} from "lucide-react";
import MenuOverlay from "../components/MenuOverlay";
import Header from "../components/Header";
import SEO from "../components/SEO";
import KineticText from "../components/KineticText";

gsap.registerPlugin(ScrollTrigger);

const HORIZON_RENDERS = [
  { src: "/horizon pics/BIRD_VIEW_FFFFFF.jpg", label: "Bird's Eye View" },
  { src: "/horizon pics/VIEW_01_FFFF.jpg", label: "Grand Facade" },
  { src: "/horizon pics/view_02_FFFFF.jpg", label: "Evening Elevation" },
  { src: "/horizon pics/view_03_FFFF.jpg", label: "Tower Perspective" },
  { src: "/horizon pics/VIEW_04_FFFFFFF.jpg", label: "Sky Deck" },
  { src: "/horizon pics/view_05_FFFFFFF.jpg", label: "Garden Terrace" },
  { src: "/horizon pics/view_06_FFFFF.jpg", label: "Lobby Approach" },
  { src: "/horizon pics/view_07_FFFFFFF.jpg", label: "Landscape Walk" },
  { src: "/horizon pics/VIEW_08_FFFFF.jpg", label: "Pool Deck" },
  { src: "/horizon pics/view_09_FFFFFFF.jpg", label: "Twilight Vista" },
  { src: "/horizon pics/view_10_FFFFFF.jpg", label: "Aerial Night" },
  { src: "/horizon pics/VIEW_11_FFFFF.jpg", label: "Canopy Walk" },
  { src: "/horizon pics/VIEW_12_fffff.jpg", label: "Courtyard" },
  { src: "/horizon pics/Cam_03_FFFFFF.jpg", label: "Amenity Block" },
  { src: "/horizon pics/cam_4_FFFFF.jpg", label: "Entrance Gate" },
];

const AMENITIES = [
  { icon: Sofa, label: "Grand Entrance with Lounge", desc: "Luxurious double-height waiting lounge." },
  { icon: PartyPopper, label: "Multipurpose Hall", desc: "Spacious venue for events and celebrations." },
  { icon: Baby, label: "Children's Play Area", desc: "Safe, engaging indoor and outdoor zones." },
  { icon: Film, label: "Mini Theatre", desc: "Private screening room with premium acoustics." },
  { icon: Trees, label: "Plantation", desc: "Lush greenery throughout the community." },
  { icon: Zap, label: "100% Power Backup", desc: "Uninterrupted power for all units and areas." },
  { icon: Car, label: "EV Charging", desc: "Dedicated smart charging stations." },
  { icon: Gamepad2, label: "Indoor Games", desc: "Table tennis, billiards, and board games." },
  { icon: ShoppingBasket, label: "Grocery Store", desc: "In-house convenience for daily needs." },
  { icon: Waves, label: "Terrace Infinity Pool", desc: "Stunning pool with skyline decks." },
  { icon: Briefcase, label: "Office", desc: "Co-working spaces and private meeting rooms." },
  { icon: Dumbbell, label: "Gymnasium", desc: "Fully equipped state-of-the-art fitness center." },
  { icon: Camera, label: "CC Cameras", desc: "24/7 comprehensive CCTV surveillance grid." },
  { icon: Key, label: "Maid's Locker Room", desc: "Dedicated rest areas and secure lockers." },
  { icon: Footprints, label: "Walking Track", desc: "Paved jogging and walking trails." },
  { icon: Flower2, label: "Central Landscape Garden", desc: "Vibrant garden integrated on every floor." }
];

export default function ProjectHorizon() {
  const [navOpen, setNavOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(null);
  const mainRef = useRef(null);
  const heroWrapRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Spatial Z-Axis Push
      if (heroWrapRef.current) {
        gsap.to(heroWrapRef.current, {
          scale: 0.85, opacity: 0, borderRadius: "40px",
          scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: true }
        });
      }
      
      // Image Parallax Reveal
      gsap.utils.toArray(".reveal-img").forEach(img => {
        gsap.fromTo(img, { scale: 1.15, filter: "brightness(0.5)" }, {
          scale: 1, filter: "brightness(1)",
          scrollTrigger: { trigger: img, start: "top bottom", end: "center center", scrub: true }
        });
      });

      // Collage Items Animation
      gsap.utils.toArray(".collage-item").forEach((item, i) => {
        gsap.to(item, {
          opacity: 1, y: 0,
          scrollTrigger: { trigger: item, start: "top 95%" },
          delay: (i % 3) * 0.1, duration: 0.8, ease: "power3.out"
        });
      });
    }, mainRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} style={{ background: "transparent", color: "#fdfbf7", overflowX: "hidden" }}>
      <SEO 
        title="Bharathi Horizon" 
        description="Premium luxury residential project by Bharathi Constructions featuring infinite pools and sky gardens." 
      />
      {/* HEADER */}
      <Header theme="dark" navOpen={navOpen} setNavOpen={setNavOpen} />
      <MenuOverlay navOpen={navOpen} setNavOpen={setNavOpen} />

      {/* HERO SECTION */}
      <section className="hero-section" style={{ height: "100vh", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {/* Affiliation Logos Top Right */}
        <div style={{ position: "absolute", top: "clamp(110px, 15vh, 140px)", right: "clamp(1.5rem, 4vw, 3rem)", zIndex: 50, display: "flex", gap: "1.5rem", alignItems: "center", background: "rgba(255,255,255,0.95)", padding: "0.75rem 1.5rem", borderRadius: "100px", boxShadow: "0 20px 40px rgba(0,0,0,0.15)", backdropFilter: "blur(10px)" }}>
          <img src="/lakewood-media/credai_logo.png" alt="CREDAI" style={{ height: "25px", objectFit: "contain" }} />
          <img src="/lakewood-media/hmda-logo.png" alt="HMDA" style={{ height: "35px", objectFit: "contain" }} />
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", borderLeft: "1px solid rgba(0,0,0,0.1)", paddingLeft: "1.5rem" }}>
            <img src="/lakewood-media/tsrera-logo.png" alt="TS RERA" style={{ height: "30px", objectFit: "contain" }} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "0.6rem", fontWeight: 800, color: "#123645", letterSpacing: "0.05em", lineHeight: 1.2, textTransform: "uppercase" }}>TS RERA</span>
              <span style={{ fontSize: "0.55rem", fontWeight: 700, color: "#123645", letterSpacing: "0.05em", lineHeight: 1 }}>P02200006340</span>
            </div>
          </div>
        </div>

        <div ref={heroWrapRef} style={{ position: "absolute", inset: 0, overflow: "hidden", willChange: "transform, opacity, border-radius", transformOrigin: "center center" }}>
          <img src="/horizon pics/BIRD_VIEW_FFFFFF.jpg" alt="Horizon" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.75)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 2rem", pointerEvents: "auto" }}>
            <span style={{ fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(0,0,0,0.7)", display: "block", marginBottom: "1rem" }}>Bharathi Horizon</span>
            <KineticText as="h1" text="Horizon Project." style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(3.5rem, 8vw, 8rem)", margin: "0 0 2rem 0", fontWeight: 400, color: "#123645" }} />
            <a 
              href="/brouchers/Horizon_Brohure.pdf" 
              download
              style={{
                display: "inline-block",
                padding: "1rem 2.5rem",
                border: "1px solid rgba(0,0,0,0.2)",
                borderRadius: "100px",
                color: "#123645",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                fontSize: "0.8rem",
                textDecoration: "none",
                transition: "all 0.3s",
                backdropFilter: "blur(4px)",
                background: "rgba(255,255,255,0.1)"
              }}
              onMouseEnter={e => { e.target.style.background = "#123645"; e.target.style.color = "#fff"; }}
              onMouseLeave={e => { e.target.style.background = "rgba(255,255,255,0.1)"; e.target.style.color = "#123645"; }}
            >
              Download Brochure
            </a>
          </div>
      </section>

      {/* STATS */}
      <section style={{ padding: "clamp(4rem, 10vw, 10rem) clamp(1.5rem, 5vw, 4rem)", background: "transparent", color: "#123645" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "4rem" }}>
          <div style={{ flex: "1 1 300px" }}>
            <KineticText as="h2" text="Premium Living in Kompally." style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2.5rem, 4vw, 4rem)", margin: "0 0 2rem 0", color: "#123645" }} />
          </div>
          <div style={{ flex: "1 1 600px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))", gap: "3rem" }}>
            {[ { v: "1", l: "Tower" }, { v: "8+2", l: "Floors" }, { v: "126", l: "Exclusive Units" }, { v: "3 BHK", l: "Only" }, { v: "1945-2400", l: "SQ.FT" } ].map((stat, i) => (
              <div key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.1)", paddingBottom: "1.5rem" }}>
                <span style={{ fontFamily: "Playfair Display, serif", fontSize: "2.5rem", display: "block", marginBottom: "0.5rem" }}>{stat.v}</span>
                <span style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#666" }}>{stat.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY - COLLAGE */}
      <section style={{ padding: "8rem 0 6rem", background: "#09141A" }}>
        <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 clamp(1.5rem, 4vw, 4rem)" }}>
          <div style={{ marginBottom: "3rem", display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <span style={{ fontSize: "0.65rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", display: "block", marginBottom: "0.75rem" }}>
                Visual Tour
              </span>
              <KineticText as="h2" text="The Horizon Gallery." style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", margin: 0, color: "#fff", fontWeight: 400 }} />
            </div>
            <span style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
              {HORIZON_RENDERS.length} renders
            </span>
          </div>
          
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {HORIZON_RENDERS.map((img, i) => (
              <div 
                key={i} 
                onClick={() => setLightboxImg(img.src)}
                className="collage-item break-inside-avoid relative rounded-2xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-shadow bg-[#ffffff]/5"
                style={{ opacity: 0, transform: "translateY(40px)" }}
              >
                <img 
                  src={img.src} 
                  alt={img.label} 
                  className="w-full h-auto block transition-transform duration-700 group-hover:scale-105" 
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-serif text-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-300 text-center px-4">
                    {img.label}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* AMENITIES */}
      <section style={{ padding: "clamp(4rem, 10vw, 10rem) clamp(1.5rem, 5vw, 4rem)", background: "#123645" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <KineticText as="h2" text="Project Amenities." style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2.5rem, 4vw, 4rem)", margin: "0 0 6rem 0", color: "#fdfbf7" }} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "2rem" }}>
            {AMENITIES.map((a, i) => {
              const Icon = a.icon;
              return (
                <div key={i} style={{ padding: "2.5rem 2rem", background: "rgba(255,255,255,0.03)", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <Icon size={28} color="#c9a96e" strokeWidth={1.5} style={{ marginBottom: "1.5rem" }} />
                  <h4 style={{ fontSize: "1.1rem", fontWeight: 400, marginBottom: "0.5rem", color: "#fdfbf7" }}>{a.label}</h4>
                  <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{a.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LOCATION / MASTERPLAN */}
      <section style={{ padding: "clamp(4rem, 10vw, 10rem) clamp(1.5rem, 5vw, 4rem)", background: "transparent", color: "#123645" }}>
         <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "6rem", alignItems: "center" }}>
            <div style={{ flex: "1 1 min(100%, 500px)", borderRadius: "24px", overflow: "hidden" }}>
              <img className="reveal-img" src="/horizon pics/floor-scaled.webp" alt="Masterplan" style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
            <div style={{ flex: "1 1 400px" }}>
              <span style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#666", display: "block", marginBottom: "1rem" }}>Location & Plan</span>
              <KineticText as="h2" text="Prime Location." style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2.5rem, 4vw, 4rem)", margin: "0 0 3rem 0", color: "#123645" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {[["DRS International School", "3 min"], ["Malla Reddy Narayana Hospital", "6 min"], ["ORR Exit Kandlakoya", "8 min"]].map(([place, time]) => (
                  <div key={place} style={{ display: "flex", justifyContent: "space-between", paddingBottom: "1.5rem", borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
                    <span style={{ fontSize: "1.1rem", color: "#123645" }}>{place}</span>
                    <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "#555" }}>{time}</span>
                  </div>
                ))}
              </div>
            </div>
         </div>
      </section>

      {/* FOOTER CTA */}
      <section style={{ padding: "clamp(4rem, 12vw, 12rem) clamp(1.5rem, 5vw, 4rem)", background: "transparent", textAlign: "center" }}>
        <KineticText as="h2" text="Book Your Home." style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(3rem, 6vw, 6rem)", margin: "0 0 4rem 0", color: "#123645" }} />
        <a href="/contact" className="hover-target" style={{ display: "inline-flex", alignItems: "center", gap: "1rem", color: "#123645", textDecoration: "none", fontSize: "0.85rem", letterSpacing: "0.2em", textTransform: "uppercase", padding: "1.5rem 4rem", border: "1px solid rgba(0,0,0,0.3)", borderRadius: "100px", transition: "background 0.3s" }} onMouseEnter={e => {e.currentTarget.style.background="#123645"; e.currentTarget.style.color="#fff";}} onMouseLeave={e => {e.currentTarget.style.background="transparent"; e.currentTarget.style.color="#123645";}}>
          Contact Sales <ArrowRight size={18} />
        </a>
      </section>
      
      {/* GLOBAL LIGHTBOX PORTAL */}
      {lightboxImg && createPortal(
        <div 
          style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.9)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", backdropFilter: "blur(10px)", opacity: 0, animation: "fadeIn 0.3s forwards" }}
          onClick={() => setLightboxImg(null)}
        >
          <button style={{ position: "absolute", top: "2rem", right: "2rem", background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", width: "50px", height: "50px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "background 0.3s" }} onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.2)"} onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}>
            <X size={24} />
          </button>
          <img src={lightboxImg} alt="Preview" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", borderRadius: "12px", boxShadow: "0 20px 50px rgba(0,0,0,0.5)", transform: "scale(0.95)", animation: "scaleUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards" }} onClick={e => e.stopPropagation()} />
        </div>,
        document.body
      )}

      {/* Inline styles for Lightbox animations */}
      <style>{`
        @keyframes fadeIn { to { opacity: 1; } }
        @keyframes scaleUp { to { transform: scale(1); } }
      `}</style>
    </div>
  );
}

