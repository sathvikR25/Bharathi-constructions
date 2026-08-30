import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Waves, AlignVerticalSpaceAround, Trees, Building2, Droplet, ShieldCheck, Car } from "lucide-react";
import MenuOverlay from "../components/MenuOverlay";
import Header from "../components/Header";
import KineticText from "../components/KineticText";
import ImageCarousel from "../components/ImageCarousel";

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
  { icon: Waves, label: "Infinity Pool", desc: "Temperature-controlled swimming pool with skyline views." },
  { icon: AlignVerticalSpaceAround, label: "Double-Height Lobby", desc: "Grand arrival experience with 24/7 concierge." },
  { icon: Trees, label: "Sky Gardens", desc: "Lush green terraces integrated at multiple levels." },
  { icon: Building2, label: "Clubhouse", desc: "Ultra-luxury club spanning 3 floors." },
  { icon: ShieldCheck, label: "Advanced Security", desc: "Multi-tier biometric access & surveillance." },
  { icon: Car, label: "EV Charging", desc: "Dedicated smart charging bays." },
];

export default function ProjectHorizon() {
  const [navOpen, setNavOpen] = useState(false);
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
    }, mainRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} style={{ background: "transparent", color: "#fdfbf7", overflowX: "hidden" }}>
      
      {/* HEADER */}
      <Header theme="dark" navOpen={navOpen} setNavOpen={setNavOpen} />
      <MenuOverlay navOpen={navOpen} setNavOpen={setNavOpen} />

      {/* HERO SECTION */}
      <section className="hero-section" style={{ height: "100vh", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div ref={heroWrapRef} style={{ position: "absolute", inset: 0, overflow: "hidden", willChange: "transform, opacity, border-radius", transformOrigin: "center center" }}>
          <img src="/horizon pics/BIRD_VIEW_FFFFFF.jpg" alt="Horizon" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.75)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 2rem", pointerEvents: "none" }}>
          <span style={{ fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(0,0,0,0.7)", display: "block", marginBottom: "1rem" }}>Bharathi Horizon</span>
          <KineticText as="h1" text="Horizon Project." style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(3.5rem, 8vw, 8rem)", margin: 0, fontWeight: 400, color: "#0a0a0a" }} />
        </div>
      </section>

      {/* MINIMALIST STATS */}
      <section style={{ padding: "10rem 4rem", background: "transparent", color: "#0a0a0a" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "4rem" }}>
          <div style={{ flex: "1 1 300px" }}>
            <KineticText as="h2" text="Premium Living in Kompally." style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2.5rem, 4vw, 4rem)", margin: "0 0 2rem 0", color: "#0a0a0a" }} />
          </div>
          <div style={{ flex: "1 1 500px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>
            {[ { v: "3 & 4 BHK", l: "Sky Villas" }, { v: "G+28", l: "Floors" }, { v: "2", l: "High-Rise Towers" }, { v: "2027", l: "Completion" } ].map((stat, i) => (
              <div key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.1)", paddingBottom: "1.5rem" }}>
                <span style={{ fontFamily: "Playfair Display, serif", fontSize: "2.5rem", display: "block", marginBottom: "0.5rem" }}>{stat.v}</span>
                <span style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#666" }}>{stat.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FULL CAROUSEL */}
      <section style={{ padding: "10rem 0", background: "transparent" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 4rem", marginBottom: "4rem" }}>
          <KineticText as="h2" text="The Horizon Gallery." style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2.5rem, 4vw, 4rem)", margin: 0, color: "#0a0a0a" }} />
        </div>
        <ImageCarousel images={HORIZON_RENDERS} id="horizon" />
      </section>

      {/* AMENITIES */}
      <section style={{ padding: "10rem 4rem", background: "#0a0a0a" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <KineticText as="h2" text="Project Amenities." style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2.5rem, 4vw, 4rem)", margin: "0 0 6rem 0", color: "#0a0a0a" }} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
            {AMENITIES.map((a, i) => {
              const Icon = a.icon;
              return (
                <div key={i} style={{ padding: "3rem 2rem", background: "rgba(0,0,0,0.02)", borderRadius: "24px", border: "1px solid rgba(0,0,0,0.05)" }}>
                  <Icon size={32} color="#0a0a0a" strokeWidth={1} style={{ marginBottom: "2rem" }} />
                  <h4 style={{ fontSize: "1.2rem", fontWeight: 400, marginBottom: "1rem", color: "#0a0a0a" }}>{a.label}</h4>
                  <p style={{ fontSize: "0.9rem", color: "rgba(0,0,0,0.5)", lineHeight: 1.6 }}>{a.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LOCATION / MASTERPLAN */}
      <section style={{ padding: "10rem 4rem", background: "transparent", color: "#0a0a0a" }}>
         <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "6rem", alignItems: "center" }}>
            <div style={{ flex: "1 1 500px", borderRadius: "24px", overflow: "hidden" }}>
              <img className="reveal-img" src="/horizon pics/floor-scaled.webp" alt="Masterplan" style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
            <div style={{ flex: "1 1 400px" }}>
              <span style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#666", display: "block", marginBottom: "1rem" }}>Location & Plan</span>
              <KineticText as="h2" text="Prime Location." style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2.5rem, 4vw, 4rem)", margin: "0 0 3rem 0", color: "#0a0a0a" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {[["DRS International School", "3 min"], ["Malla Reddy Narayana Hospital", "6 min"], ["ORR Exit — Kandlakoya", "8 min"]].map(([place, time]) => (
                  <div key={place} style={{ display: "flex", justifyContent: "space-between", paddingBottom: "1.5rem", borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
                    <span style={{ fontSize: "1.1rem", color: "#0a0a0a" }}>{place}</span>
                    <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "#555" }}>{time}</span>
                  </div>
                ))}
              </div>
            </div>
         </div>
      </section>

      {/* FOOTER CTA */}
      <section style={{ padding: "12rem 4rem", background: "transparent", textAlign: "center" }}>
        <KineticText as="h2" text="Book Your Home." style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(3rem, 6vw, 6rem)", margin: "0 0 4rem 0", color: "#0a0a0a" }} />
        <a href="#contact" className="hover-target" style={{ display: "inline-flex", alignItems: "center", gap: "1rem", color: "#0a0a0a", textDecoration: "none", fontSize: "0.85rem", letterSpacing: "0.2em", textTransform: "uppercase", padding: "1.5rem 4rem", border: "1px solid rgba(0,0,0,0.3)", borderRadius: "100px", transition: "background 0.3s" }} onMouseEnter={e => {e.currentTarget.style.background="#0a0a0a"; e.currentTarget.style.color="#0a0a0a";}} onMouseLeave={e => {e.currentTarget.style.background="transparent"; e.currentTarget.style.color="#0a0a0a";}}>
          Contact Sales <ArrowRight size={18} />
        </a>
      </section>
    </div>
  );
}
