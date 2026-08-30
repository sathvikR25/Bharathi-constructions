import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Shield, Trees, Film, Zap, Compass, Dumbbell, Gamepad2, CarFront, Wifi, Camera, ShoppingCart, MapPin } from "lucide-react";
import MenuOverlay from "../components/MenuOverlay";
import Header from "../components/Header";
import KineticText from "../components/KineticText";
import ImageCarousel from "../components/ImageCarousel";

gsap.registerPlugin(ScrollTrigger);

const LAKEWOOD_RENDERS = [
  { src: "/lakewood-media/lakewood-cover.jpg", label: "01 Lake Woods" },
  { src: "/lakewood-media/View 01_FFFFF copy.jpg", label: "02 Grand Entrance" },
  { src: "/lakewood-media/View 02_FFFFF copy.jpg", label: "03 Facade Evening" },
  { src: "/lakewood-media/View 03_FFFFFF copy.jpg", label: "04 Landscape" },
  { src: "/lakewood-media/View 04_ffffff copy.jpg", label: "05 Aerial Perspective" },
  { src: "/lakewood-media/View 05_FFFFF copy.jpg", label: "06 Amenity Deck" },
  { src: "/lakewood-media/view 06_FFFFFF copy.jpg", label: "07 Lobby & Lounge" },
  { src: "/lakewood-media/lake-woods-brohure-page-0011.jpg", label: "08 Master Layout" },
  { src: "/lakewood-media/lake-woods-brohure-page-0012.jpg", label: "09 Feature List" },
  
  { src: "/lakewood-media/floor-plans-brochure.jpg", label: "10 Floor Plans" }
,
];



const AMENITIES = [
  { icon: Shield,     label: "24/7 Security",     sub: "Advanced CCTV & Guard Patrol" },
  { icon: Trees,      label: "Lush Landscaping",   sub: "2,000+ Sqft Curated Green Cover" },
  { icon: Film,       label: "Mini Theatre",        sub: "Private 8-Seat Screening Room" },
  { icon: Zap,        label: "Power Backup",        sub: "100% DG Generator Covered" },
  { icon: Compass,    label: "Vastu Compliant",     sub: "All 4 Units Individually Certified" },
  { icon: Dumbbell,   label: "Fitness Centre",      sub: "Premium Equipped Gym" },
  { icon: Gamepad2,   label: "Indoor Games",        sub: "Table Tennis, Carrom & More" },
  { icon: CarFront,   label: "EV Charging",         sub: "Smart Charging Bays in Basement" },
  { icon: Wifi,       label: "High-Speed Internet", sub: "Fibre-Optic Ready Infrastructure" },
  { icon: Camera,     label: "Smart CCTV",          sub: "180+ Camera Full-Coverage Grid" },
  { icon: ShoppingCart, label: "Grocery Store",    sub: "In-Community Convenience Store" },
  { icon: MapPin,     label: "Prime Location",      sub: "NCL Colony, Kompally, Hyderabad" }
];

export default function ProjectLakeWoods() {
  const [navOpen, setNavOpen] = useState(false);
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
    <div ref={mainRef} style={{ background: "transparent", color: "#0a0a0a", overflowX: "hidden" }}>
      
      <Header theme="light" navOpen={navOpen} setNavOpen={setNavOpen} />
      <MenuOverlay navOpen={navOpen} setNavOpen={setNavOpen} />

      {/* HERO SECTION (INVERTED: PINNED & EXPANDING) */}
      <section className="hero-section" style={{ height: "100vh", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", background: "transparent" }}>
        <div ref={heroWrapRef} style={{ position: "absolute", width: "100%", height: "100%", overflow: "hidden", willChange: "transform, border-radius", transformOrigin: "center center" }}>
          <img src="/lakewood-media/lakewood-cover.jpg" alt="Lake Woods" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.9)" }} />
        </div>
        <div ref={heroTextRef} style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 2rem", pointerEvents: "none", mixBlendMode: "difference", color: "#fff" }}>
          <span style={{ fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", display: "block", marginBottom: "1rem", color: "rgba(255,255,255,0.7)" }}>Bharathi Lake Woods</span>
          <KineticText as="h1" text="Bharathi Lake Woods." style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(3.5rem, 8vw, 8rem)", margin: 0, fontWeight: 400 }} />
        </div>
      </section>

      {/* INVERTED MINIMALIST STATS */}
      <section style={{ padding: "10rem 4rem", background: "transparent", color: "#0a0a0a" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "4rem" }}>
          <div style={{ flex: "1 1 300px" }}>
            <KineticText as="h2" text="Project Highlights" style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2.5rem, 4vw, 4rem)", margin: "0 0 2rem 0", color: "#0a0a0a" }} />
          </div>
          <div style={{ flex: "1 1 500px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>
            {[ { v: "40", l: "Exclusive Units" }, { v: "8+2", l: "Floors" }, { v: "3 BHK", l: "Premium Layouts" }, { v: "2027", l: "Completion" } ].map((stat, i) => (
              <div key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.1)", paddingBottom: "1.5rem" }}>
                <span style={{ fontFamily: "Playfair Display, serif", fontSize: "2.5rem", display: "block", marginBottom: "0.5rem", color: "#0a0a0a" }}>{stat.v}</span>
                <span style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#666" }}>{stat.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3D SPOTLIGHT CAROUSEL GALLERY */}
        <section className="gallery-section" style={{ padding: "8rem 0", position: "relative", background: "#f4f1ea", overflow: "hidden" }}>
          <div style={{ padding: "0 4rem", marginBottom: "2rem", textAlign: "center" }}>
            <span style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#666", display: "block", marginBottom: "1rem" }}>The Gallery</span>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2.5rem, 4vw, 4rem)", margin: 0, color: "#0a0a0a", lineHeight: 1.1 }}>Project <span style={{ fontStyle: "italic" }}>Gallery</span></h2>
          </div>
          <ImageCarousel images={LAKEWOOD_RENDERS} id="lakewood" theme="light" />
        </section>

      {/* INVERTED AMENITIES */}
      <section style={{ padding: "10rem 4rem", background: "transparent" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <KineticText as="h2" text="Project Amenities." style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2.5rem, 4vw, 4rem)", margin: "0 0 6rem 0", color: "#0a0a0a" }} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
            {AMENITIES.map((a, i) => {
              const Icon = a.icon;
              return (
                <div key={i} style={{ padding: "3rem 2rem", background: "rgba(0,0,0,0.02)", borderRadius: "24px", border: "1px solid rgba(0,0,0,0.08)" }}>
                  <Icon size={32} color="#0a0a0a" strokeWidth={1.5} style={{ marginBottom: "2rem" }} />
                  <h4 style={{ fontSize: "1.2rem", fontWeight: 600, marginBottom: "1rem", color: "#0a0a0a" }}>{a.label}</h4>
                  <p style={{ fontSize: "0.9rem", color: "rgba(0,0,0,0.6)", lineHeight: 1.6 }}>{a.sub}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 1. FLOOR PLANS (Brochure) */}
      <section style={{ padding: "10rem 4rem", background: "#f4f1ea", color: "#0a0a0a" }}>
        <div style={{ maxWidth: "1600px", margin: "0 auto", textAlign: "center" }}>
          <span style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#666", display: "block", marginBottom: "1.5rem" }}>The Floor Plans</span>
          <KineticText as="h2" text="Floor Plans." style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(3rem, 5vw, 5rem)", margin: "0 0 6rem 0", color: "#0a0a0a" }} />
          <div style={{ borderRadius: "24px", overflow: "hidden", boxShadow: "0 20px 50px rgba(0,0,0,0.1)", background: "#fff" }}>
            <img className="reveal-img" src="/lakewood-media/floor-plans-brochure.jpg" alt="Floor Plans" style={{ width: "100%", height: "auto", display: "block" }} />
          </div>
        </div>
      </section>

      {/* 2. 3D FLOOR PLANS (Sections) */}
      <section style={{ padding: "10rem 4rem", background: "transparent", color: "#0a0a0a" }}>
        <div style={{ maxWidth: "1600px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "8rem" }}>
            <span style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#000", fontWeight: 700, display: "block", marginBottom: "1.5rem" }}>The Spaces</span>
            <KineticText as="h2" text="3D Floor Plans." style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(3rem, 5vw, 5rem)", margin: 0, color: "#0a0a0a" }} />
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
                    <img className="reveal-img" src={item.img} alt={item.title} style={{ width: "100%", maxHeight: "80vh", objectFit: "contain", display: "block", transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)" }} onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"} />
                  </div>
                  <div style={{ marginTop: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 1rem" }}>
                    <span style={{ fontFamily: "Playfair Display, serif", fontSize: "1.5rem", color: "#0a0a0a" }}>{item.title}</span>
                    <span style={{ fontSize: "0.8rem", letterSpacing: "0.15em", color: "#000", fontWeight: 700 }}>{item.sqft}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LOCATION / MASTERPLAN */}
      <section style={{ padding: "10rem 4rem", background: "transparent", color: "#0a0a0a", borderTop: "1px solid rgba(0,0,0,0.05)" }}>
         <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "6rem", alignItems: "center" }}>
            <div style={{ flex: "1 1 500px", borderRadius: "24px", overflow: "hidden", border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 20px 40px rgba(0,0,0,0.05)" }}>
              <img className="reveal-img" src="/lakewood-media/map.webp" alt="Map" style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
            <div style={{ flex: "1 1 400px" }}>
              <span style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#666", display: "block", marginBottom: "1rem" }}>Location & Connectivity</span>
              <KineticText as="h2" text="Prime Location." style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2.5rem, 4vw, 4rem)", margin: "0 0 3rem 0", color: "#0a0a0a" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {[["DRS International School", "3 min"], ["Decathlon & Cineplanet", "6 min"], ["Malla Reddy Narayana Hospital", "8 min"], ["ORR Exit â€” Kandlakoya", "9 min"]].map(([place, time]) => (
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
      <section style={{ padding: "12rem 4rem", background: "#f4f1ea", textAlign: "center", borderTop: "1px solid rgba(0,0,0,0.05)" }}>
        <KineticText as="h2" text="Book Your Home." style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(3rem, 6vw, 6rem)", margin: "0 0 4rem 0", color: "#0a0a0a" }} />
        <a href="#contact" className="hover-target" style={{ display: "inline-flex", alignItems: "center", gap: "1rem", color: "#0a0a0a", textDecoration: "none", fontSize: "0.85rem", letterSpacing: "0.2em", textTransform: "uppercase", padding: "1.5rem 4rem", border: "1px solid rgba(0,0,0,0.2)", borderRadius: "100px", transition: "background 0.3s, color 0.3s" }} onMouseEnter={e => {e.currentTarget.style.background="#0a0a0a"; e.currentTarget.style.color="#fff";}} onMouseLeave={e => {e.currentTarget.style.background="transparent"; e.currentTarget.style.color="#0a0a0a";}}>
          Contact Sales <ArrowRight size={18} />
        </a>
      </section>
    </div>
  );
}

