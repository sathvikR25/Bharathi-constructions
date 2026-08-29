import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Trees, Wind, Eye, Waves, Sun, ShieldCheck } from "lucide-react";
import MenuOverlay from "../components/MenuOverlay";
import CustomCursor from "../components/CustomCursor";
import KineticText from "../components/KineticText";
import ImageCarousel from "../components/ImageCarousel";

gsap.registerPlugin(ScrollTrigger);

const LAKEWOOD_RENDERS = [
  { src: "/lakewood-media/lakewood-cover.jpg", label: "Lake Woods" },
  { src: "/lakewood-media/View 01_FFFFF copy.jpg", label: "Grand Entrance" },
  { src: "/lakewood-media/View 02_FFFFF copy.jpg", label: "Facade — Evening" },
  { src: "/lakewood-media/View 03_FFFFFF copy.jpg", label: "Landscape View" },
  { src: "/lakewood-media/View 04_ffffff copy.jpg", label: "Aerial Perspective" },
  { src: "/lakewood-media/View 05_FFFFF copy.jpg", label: "Amenity Deck" },
  { src: "/lakewood-media/view 06_FFFFFF copy.jpg", label: "Lobby & Lounge" },
];

const RESIDENCES = [
  { id: "flat1", label: "Residence 01", sqft: "2290 SQ.FT", facing: "East Facing", img: "/lakewood-media/SECTION 3__ 2290 - f.jpg" },
  { id: "flat2", label: "Residence 02", sqft: "2285 SQ.FT", facing: "West Facing", img: "/lakewood-media/SECTION 4 __ 2285 -f.jpg" },
  { id: "flat3", label: "Residence 03", sqft: "2675 SQ.FT", facing: "East Facing", img: "/lakewood-media/SECTION 1__ 2675 - SQ.F.jpg" },
  { id: "flat4", label: "Residence 04", sqft: "2680 SQ.FT", facing: "West Facing", img: "/lakewood-media/SECTION 2__ 2680 - F.jpg" }
];

export default function ProjectLakeWoods() {
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

      // 3D Tilt Hover for Residence Cards
      gsap.utils.toArray(".residence-card").forEach(card => {
        card.addEventListener("mousemove", (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(card.querySelector(".residence-inner"), {
            rotationY: x / 20,
            rotationX: -y / 20,
            ease: "power2.out",
            duration: 0.4
          });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card.querySelector(".residence-inner"), {
            rotationY: 0,
            rotationX: 0,
            ease: "power3.out",
            duration: 0.6
          });
        });
      });
      
    }, mainRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} style={{ background: "#050505", color: "#fdfbf7", overflowX: "hidden" }}>
      <CustomCursor />
      
      {/* HEADER */}
      <header style={{ position: "fixed", width: "100%", zIndex: 100, mixBlendMode: "difference" }}>
        <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 2.5rem", height: "100px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link to="/" className="hover-target"><img src="/logo.png" alt="Bharathi" style={{ height: "45px", filter: "brightness(0) invert(1)" }} /></Link>
          <button className="hover-target" onClick={() => setNavOpen(!navOpen)} style={{ background: "transparent", border: "none", color: "#fff", fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase" }}>{navOpen ? "Close" : "Menu"}</button>
        </div>
      </header>
      <MenuOverlay navOpen={navOpen} setNavOpen={setNavOpen} />

      {/* HERO SECTION */}
      <section className="hero-section" style={{ height: "100vh", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div ref={heroWrapRef} style={{ position: "absolute", inset: 0, overflow: "hidden", willChange: "transform, opacity, border-radius", transformOrigin: "center center" }}>
          <img src="/lakewood-media/lakewood-cover.jpg" alt="Lake Woods" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.7)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 2rem", pointerEvents: "none" }}>
          <span style={{ fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", display: "block", marginBottom: "1rem" }}>Bharathi Lake Woods</span>
          <KineticText as="h1" text="Serenity. Engineered." style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(3.5rem, 8vw, 8rem)", margin: 0, fontWeight: 400, color: "#fff" }} />
        </div>
      </section>

      {/* MINIMALIST STATS */}
      <section style={{ padding: "10rem 4rem", background: "#fdfbf7", color: "#0a0a0a" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "4rem" }}>
          <div style={{ flex: "1 1 300px" }}>
            <KineticText as="h2" text="Breathe Deep." style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2.5rem, 4vw, 4rem)", margin: "0 0 2rem 0", color: "#0a0a0a" }} />
          </div>
          <div style={{ flex: "1 1 500px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>
            {[ { v: "40", l: "Exclusive Units" }, { v: "8+2", l: "Floors" }, { v: "3 BHK", l: "Premium Layouts" }, { v: "2027", l: "Completion" } ].map((stat, i) => (
              <div key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.1)", paddingBottom: "1.5rem" }}>
                <span style={{ fontFamily: "Playfair Display, serif", fontSize: "2.5rem", display: "block", marginBottom: "0.5rem" }}>{stat.v}</span>
                <span style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#666" }}>{stat.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FULL CAROUSEL */}
      <section style={{ padding: "10rem 0", background: "#050505" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 4rem", marginBottom: "4rem" }}>
          <KineticText as="h2" text="The Lake Woods Gallery." style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2.5rem, 4vw, 4rem)", margin: 0, color: "#fff" }} />
        </div>
        <ImageCarousel images={LAKEWOOD_RENDERS} id="lakewood" />
      </section>

      {/* 3D RESIDENCES (Pure Monochrome, Mix-blend multiply to hide grey JPG bgs) */}
      <section style={{ padding: "10rem 4rem", background: "#fdfbf7", color: "#0a0a0a" }}>
        <div style={{ maxWidth: "1600px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "8rem" }}>
            <span style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#666", display: "block", marginBottom: "1.5rem" }}>The Floor Plans</span>
            <KineticText as="h2" text="Curated Spaces." style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(3rem, 5vw, 5rem)", margin: 0, color: "#0a0a0a" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "3rem", perspective: "1000px" }}>
            {RESIDENCES.map((res, i) => (
              <div key={i} className="residence-card hover-target" style={{ position: "relative", padding: "2rem" }}>
                <div className="residence-inner" style={{ background: "#fff", borderRadius: "24px", padding: "3rem", boxShadow: "0 20px 40px rgba(0,0,0,0.05)", transformStyle: "preserve-3d", display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "3rem", transform: "translateZ(30px)" }}>
                    <span style={{ fontSize: "1.5rem", fontFamily: "Playfair Display, serif" }}>{res.label}</span>
                    <div style={{ textAlign: "right" }}>
                      <span style={{ fontSize: "0.75rem", letterSpacing: "0.1em", display: "block", color: "#666" }}>{res.sqft}</span>
                      <span style={{ fontSize: "0.65rem", letterSpacing: "0.1em", color: "#999", textTransform: "uppercase" }}>{res.facing}</span>
                    </div>
                  </div>
                  <div style={{ width: "100%", transform: "translateZ(60px)", display: "flex", justifyContent: "center" }}>
                     <img src={res.img} alt={res.label} style={{ width: "85%", height: "auto", mixBlendMode: "multiply", pointerEvents: "none" }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section style={{ padding: "12rem 4rem", background: "#020202", textAlign: "center" }}>
        <KineticText as="h2" text="Secure Your Sanctuary." style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(3rem, 6vw, 6rem)", margin: "0 0 4rem 0", color: "#fff" }} />
        <a href="#contact" className="hover-target" style={{ display: "inline-flex", alignItems: "center", gap: "1rem", color: "#fff", textDecoration: "none", fontSize: "0.85rem", letterSpacing: "0.2em", textTransform: "uppercase", padding: "1.5rem 4rem", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "100px", transition: "background 0.3s" }} onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.1)"} onMouseLeave={e => e.currentTarget.style.background="transparent"}>
          Contact Sales <ArrowRight size={18} />
        </a>
      </section>
    </div>
  );
}
