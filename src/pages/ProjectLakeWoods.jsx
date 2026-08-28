import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, ArrowRight, Compass, Shield, Trees, Zap, Film, Gamepad2, ShoppingCart, Camera, Dumbbell, CarFront, Wifi } from "lucide-react";
import MenuOverlay from "../components/MenuOverlay";

gsap.registerPlugin(ScrollTrigger);

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Projects", href: "/#projects" },
  { label: "Locations", href: "/#locations" },
  { label: "Enquiry", href: "/#contact" }
];

const RESIDENCES = [
  { flat: "Flat 01", facing: "East Facing", sqft: "2,290", type: "3 BHK", img: "/lakewood-media/SECTION 3__ 2290 - f.jpg", badge: "Premium", rooms: ["Master Suite", "2 Bedrooms", "Drawing Room", "Dining Area", "Kitchen", "3 Baths"], accent: "#C9A96E" },
  { flat: "Flat 02", facing: "West Facing", sqft: "2,285", type: "3 BHK", img: "/lakewood-media/SECTION 4 __ 2285 -f.jpg", badge: "Grand", rooms: ["Master Suite", "2 Bedrooms", "Drawing Room", "Dining Area", "Kitchen", "3 Baths"], accent: "#C9A96E" },
  { flat: "Flat 03", facing: "East Facing", sqft: "2,675", type: "3 BHK", img: "/lakewood-media/SECTION 1__ 2675 - SQ.F.jpg", badge: "Signature", rooms: ["Master Suite", "2 Bedrooms", "Drawing Room", "Dining Area", "Kitchen", "3 Baths", "Home Theatre"], accent: "#B8860B" },
  { flat: "Flat 04", facing: "West Facing", sqft: "2,680", type: "3 BHK", img: "/lakewood-media/SECTION 2__ 2680 - F.jpg", badge: "Elite", rooms: ["Master Suite", "2 Bedrooms", "Drawing Room", "Dining Area", "Kitchen", "3 Baths", "Home Theatre"], accent: "#B8860B" }
];

const RENDERS = [
  { src: "View 01_FFFFF copy.jpg", label: "Grand Entrance" },
  { src: "View 02_FFFFF copy.jpg", label: "Facade — Evening" },
  { src: "View 03_FFFFFF copy.jpg", label: "Landscape View" },
  { src: "View 04_ffffff copy.jpg", label: "Aerial Perspective" },
  { src: "View 05_FFFFF copy.jpg", label: "Amenity Deck" },
  { src: "view 06_FFFFFF copy.jpg", label: "Lobby & Lounge" }
];

const BROCHURE = [
  { src: "lake-woods-brohure-page-0005.jpg", label: "Architecture" },
  { src: "lake-woods-brohure-page-0006.jpg", label: "Specifications" },
  { src: "lake-woods-brohure-page-0007.jpg", label: "Landscaping" },
  { src: "lake-woods-brohure-page-0009.jpg", label: "Amenities" },
  { src: "lake-woods-brohure-page-0011.jpg", label: "Layout" },
  { src: "lake-woods-brohure-page-0012.jpg", label: "Features" },
  { src: "lake-woods-brohure-page-0016.jpg", label: "Overview" }
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

function ResidenceCard({ plan, idx }) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(cardRef.current, { rotateY: x * 12, rotateX: -y * 12, duration: 0.4, ease: "power2.out", transformPerspective: 1200 });
  };
  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, { rotateY: 0, rotateX: 0, duration: 0.8, ease: "elastic.out(1, 0.5)" });
    setHovered(false);
  };
  return (
    <div ref={cardRef} className="animate-on-scroll fade-up clay-lw"
      style={{ overflow: "hidden", transitionDelay: (idx % 2) * 120 + "ms", transformStyle: "preserve-3d", cursor: "crosshair", padding: 0 }}
      onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onMouseEnter={() => setHovered(true)}
    >
      <div style={{ background: "#ffffff", padding: "2.5rem 2.5rem 0", borderTopLeftRadius: "28px", borderTopRightRadius: "28px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.2rem" }}>
          <div>
            <span className="clay-badge" style={{ marginBottom: "1rem", color: plan.accent }}>{plan.badge} Unit</span>
            <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: "2.4rem", color: "#111", margin: 0, lineHeight: 1 }}>{plan.flat}</h3>
          </div>
          <div style={{ textAlign: "right" }}>
            <span style={{ display: "block", fontSize: "2.6rem", color: plan.accent, fontFamily: "Playfair Display, serif", lineHeight: 1 }}>{plan.sqft}</span>
            <span style={{ fontSize: "0.7rem", color: "#999", letterSpacing: "0.15em" }}>SQ. FT.</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: "0.75rem", paddingBottom: "1.5rem", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
          {[plan.facing, plan.type].map((tag, i) => (
            <span key={i} style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", padding: "0.4rem 1rem", borderRadius: "100px", border: "1px solid " + (i === 0 ? plan.accent + "70" : "rgba(0,0,0,0.1)"), color: i === 0 ? plan.accent : "#666", fontWeight: 500 }}>{tag}</span>
          ))}
        </div>
        <div style={{ padding: "2.5rem 0.5rem", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "380px", transform: hovered ? "translateZ(30px)" : "translateZ(0)", transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)" }}>
          <img src={plan.img} alt={plan.flat} style={{ width: "100%", maxWidth: "480px", height: "auto", display: "block", mixBlendMode: "multiply", imageRendering: "auto", transition: "transform 0.5s ease, filter 0.4s ease", transform: hovered ? "scale(1.04)" : "scale(1)", filter: hovered ? "brightness(1.03) contrast(1.05)" : "none" }} loading="lazy" />
        </div>
      </div>
      <div style={{ padding: "2rem 2.5rem 2.5rem", background: "transparent", borderTop: "1px solid rgba(0,0,0,0.03)" }}>
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#aaa", marginBottom: "1rem", fontWeight: 600 }}>Room Configuration</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {plan.rooms.map((room, i) => (
            <span key={i} style={{ fontSize: "0.75rem", padding: "0.3rem 0.85rem", background: "rgba(0,0,0,0.04)", borderRadius: "100px", color: "#444", letterSpacing: "0.04em", fontWeight: 500 }}>{room}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProjectLakeWoods() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mainRef = useRef(null);
  const horizontalRef = useRef(null);
  const heroBgRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("is-visible"); });
    }, { threshold: 0.1, rootMargin: "0px 0px -80px 0px" });
    document.querySelectorAll(".animate-on-scroll").forEach(el => obs.observe(el));
    let ctx = gsap.context(() => {
      if (heroBgRef.current) {
        gsap.to(heroBgRef.current, { yPercent: 25, ease: "none", scrollTrigger: { trigger: ".lw-hero", start: "top top", end: "bottom top", scrub: true } });
      }
      if (horizontalRef.current) {
        const panels = gsap.utils.toArray(".horiz-panel");
        if (panels.length) {
          gsap.to(panels, { xPercent: -100 * (panels.length - 1), ease: "none", scrollTrigger: { trigger: ".horiz-scroll-section", pin: true, scrub: 1, snap: { snapTo: 1 / (panels.length - 1), duration: { min: 0.2, max: 0.5 } }, end: () => "+=" + (horizontalRef.current.offsetWidth * (panels.length - 1)) } });
        }
      }
    }, mainRef);
    [400, 1000, 2200].forEach(t => setTimeout(() => ScrollTrigger.refresh(), t));
    return () => { window.removeEventListener("scroll", handleScroll); obs.disconnect(); ctx.revert(); };
  }, []);

  return (
    <div ref={mainRef} style={{ background: "var(--paper)", color: "var(--ink)", overflowX: "hidden" }}>
      <header className={`site-header dark-mode ${navOpen ? "nav-open" : ""} ${scrolled ? "scrolled" : ""}`} style={{ position: "fixed", width: "100%", zIndex: 100 }}>
        <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 2.5rem", height: "90px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <img src="/logo.png" alt="Bharathi" className="logo-img" decoding="async" style={{ height: "55px", width: "auto" }} />
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            <a href="/#booking" style={{ padding: "0.65rem 1.8rem", background: "var(--ink)", color: "#fff", fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none", fontWeight: 500 }}>Site Visit</a>
            <button className="menu-toggle" onClick={() => setNavOpen(!navOpen)}>
              <span style={{ fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600 }}>{navOpen ? "Close" : "Menu"}</span>
            </button>
          </div>
        </div>
      </header>
      <MenuOverlay navOpen={navOpen} setNavOpen={setNavOpen} />

      {/* HERO */}
      <section className="lw-hero" style={{ position: "relative", height: "100vh", overflow: "hidden", display: "flex", alignItems: "flex-end" }}>
        <img ref={heroBgRef} src="/lakewood-media/lakewood-cover.jpg" alt="Lake Woods" style={{ position: "absolute", top: "-15%", left: 0, width: "100%", height: "130%", objectFit: "cover", zIndex: 1 }} fetchPriority="high" />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.15) 100%)", zIndex: 2 }} />
        <div style={{ position: "relative", zIndex: 3, width: "100%", padding: "0 4rem 6rem" }}>
          <div className="animate-on-scroll slide-up" style={{ maxWidth: "900px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
              <div className="section-line" style={{ display: "inline-block" }} />
              <span className="roll-word" style={{ fontSize: "0.75rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--gold)" }}><span>NCL</span> <span>Colony,</span> <span>Kompally</span> <span>·</span> <span>Hyderabad</span></span>
            </div>
            <img src="/lakewood-media/lakewood-logo.png" alt="Bharathi Lake Woods" style={{ width: "420px", maxWidth: "90%", display: "block", filter: "brightness(0) invert(1)", marginBottom: "3rem" }} className="animate-on-scroll fade-right" />
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              {[{ n: "40", l: "Units" }, { n: "8+2", l: "Floors" }, { n: "2,621", l: "Sq. Yds" }, { n: "3 BHK", l: "Type" }].map((s, i) => (
                <div key={i} className="animate-on-scroll slide-up clay-dark" style={{ padding: "1.2rem 2.5rem", transitionDelay: (i * 100) + "ms", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px" }}>
                  <span className="ticker-digit" style={{ fontFamily: "Playfair Display, serif", fontSize: "1.8rem", color: "#fff", lineHeight: 1 }}><span>{s.n}</span></span>
                  <span style={{ fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginTop: "0.4rem", display: "block" }}>{s.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ position: "absolute", right: "4rem", bottom: "3rem", zIndex: 3, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontSize: "0.58rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", writingMode: "vertical-rl" }}>Scroll</span>
          <div style={{ width: "1px", height: "60px", background: "rgba(255,255,255,0.15)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", background: "var(--gold)", animation: "scrollLine 2s infinite ease-in-out", height: "100%" }} />
          </div>
        </div>
      </section>

      {/* VISION SECTION */}
      <section style={{ padding: "10rem 4rem", background: "#fcfaf6" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", gap: "6rem", flexWrap: "wrap", alignItems: "flex-start" }}>
          <div style={{ flex: "1 1 380px", position: "sticky", top: "140px" }} className="animate-on-scroll slide-left">
            <span className="roll-word" style={{ fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold-dark)", fontWeight: 700 }}><span>The</span> <span>Vision</span></span>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(3rem, 4vw, 4.8rem)", color: "var(--ink)", marginTop: "1.5rem", lineHeight: 1.1 }}>Redefining<br /><em>Exclusivity.</em></h2>
            <div className="section-line" style={{ margin: "2rem 0" }} />
            <p style={{ fontSize: "1.15rem", color: "var(--ink-2)", lineHeight: 1.9, marginBottom: "1.5rem" }}>A meticulously crafted enclave of precisely 40 ultra-premium 3 BHK apartments in NCL Colony, Kompally.</p>
            <p style={{ fontSize: "1.15rem", color: "var(--ink-2)", lineHeight: 1.9 }}>Rising across 8+2 floors — architecture integrating modern elegance with lush natural surroundings for a true resort lifestyle.</p>
            <a href="/#booking" className="clay-stat" style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", marginTop: "3rem", padding: "1.2rem 2.5rem", color: "var(--ink)", textDecoration: "none", fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600 }}>Book Site Visit <ArrowRight size={18} /></a>
          </div>
          <div style={{ flex: "1 1 600px", display: "flex", flexDirection: "column", gap: "3rem" }}>
            {[{ src: "View 01_FFFFF copy.jpg", caption: "Grand Facade", h: "550px" }, { src: "View 02_FFFFF copy.jpg", caption: "Exterior — Dusk", h: "420px" }].map((item, i) => (
              <div key={i} className={`animate-on-scroll ${i % 2 === 0 ? 'card-roll-r' : 'card-roll-l'}`} style={{ position: "relative", overflow: "hidden", borderRadius: "24px", height: item.h, transitionDelay: i * 150 + "ms", boxShadow: "0 25px 50px rgba(0,0,0,0.1)" }}>
                <img src={"/lakewood-media/" + item.src} alt={item.caption} style={{ width: "100%", height: "130%", objectFit: "cover", position: "absolute", top: "-15%" }} loading="lazy" className="hover-zoom" />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 40%)" }} />
                <span className="clay-dark" style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#fff", padding: "0.5rem 1.2rem", borderRadius: "100px", backdropFilter: "blur(10px)" }}>{item.caption}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HORIZONTAL GALLERY */}
      <section className="horiz-scroll-section" style={{ background: "#0a0a0a" }}>
        <div ref={horizontalRef} style={{ display: "flex", width: (RENDERS.length * 100) + "vw", height: "100vh", overflow: "hidden" }}>
          {RENDERS.map((render, idx) => (
            <div key={idx} className="horiz-panel" style={{ flex: "0 0 100vw", height: "100vh", position: "relative", overflow: "hidden" }}>
              <img src={"/lakewood-media/" + render.src} alt={render.label} style={{ width: "100%", height: "100%", objectFit: "cover" }} loading={idx === 0 ? "eager" : "lazy"} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.9) 100%)" }} />
              <div style={{ position: "absolute", bottom: "5rem", left: "5rem" }}>
                <span style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", display: "block", marginBottom: "1rem" }}>{String(idx + 1).padStart(2, "0")} / {String(RENDERS.length).padStart(2, "0")}</span>
                <h3 className="animate-on-scroll slide-up" style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "#fff", margin: 0 }}>{render.label}</h3>
              </div>
              <div style={{ position: "absolute", bottom: "5.5rem", right: "5rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>Scroll</span>
                <ArrowRight size={18} color="rgba(255,255,255,0.4)" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BROCHURE HIGHLIGHTS (Claymorphism) */}
      <section style={{ padding: "12rem 4rem", background: "#f8f6f0" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div className="animate-on-scroll slide-up" style={{ textAlign: "center", marginBottom: "8rem" }}>
            <span className="roll-word" style={{ fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold-dark)", fontWeight: 700 }}><span>Project</span> <span>Highlights</span></span>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(3rem, 4vw, 4.5rem)", color: "var(--ink)", marginTop: "1rem" }}>Excellence in Every Detail</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10rem" }}>
            {BROCHURE.map((item, idx) => (
              <div key={idx} className="animate-on-scroll" style={{ display: "flex", flexDirection: idx % 2 === 0 ? "row" : "row-reverse", alignItems: "center", gap: "4rem", flexWrap: "wrap" }}>
                <div className={`${idx % 2 === 0 ? 'card-roll-l' : 'card-roll-r'}`} style={{ flex: "1 1 520px", borderRadius: "24px", overflow: "hidden", boxShadow: "0 30px 60px rgba(0,0,0,0.12)" }}>
                  <img src={"/lakewood-media/" + item.src} alt={item.label} style={{ width: "100%", height: "auto", display: "block" }} loading="lazy" className="hover-zoom" />
                </div>
                <div className="clay-lw slide-up" style={{ flex: "1 1 400px", padding: "4rem", position: "relative" }}>
                  <span style={{ fontFamily: "Playfair Display, serif", fontSize: "6rem", color: "var(--gold)", opacity: 0.15, lineHeight: 1, display: "block", position: "absolute", top: "2rem", right: "2rem" }}>{String(idx + 1).padStart(2, "0")}</span>
                  <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: "2.8rem", color: "var(--ink)", marginTop: "1rem", position: "relative", zIndex: 2 }}>{item.label}</h3>
                  <div className="section-line" style={{ margin: "2rem 0", height: "3px" }} />
                  <p style={{ fontSize: "1.15rem", color: "var(--ink-2)", lineHeight: 1.8, position: "relative", zIndex: 2 }}>Crafted with the finest materials and attention to every detail. Each aspect of Bharathi Lake Woods reflects uncompromising standards of luxury and design excellence.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AMENITIES (Dark Clay) */}
      <section style={{ padding: "10rem 4rem", background: "#050505" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div className="animate-on-scroll slide-up" style={{ marginBottom: "6rem" }}>
            <span className="roll-word" style={{ fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 700 }}><span>Curated</span> <span>Lifestyle</span></span>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(3rem, 4vw, 4.5rem)", color: "#fff", marginTop: "1rem" }}>World-Class Amenities</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
            {AMENITIES.map((a, i) => {
              const Icon = a.icon;
              return (
                <div key={i} className="animate-on-scroll slide-up clay-dark"
                  style={{ padding: "3rem 2.5rem", transitionDelay: (i % 4) * 80 + "ms" }}
                >
                  <div style={{ marginBottom: "1.8rem" }}>
                    <Icon size={32} color="var(--gold)" strokeWidth={1.5} />
                  </div>
                  <h4 style={{ fontSize: "1.15rem", color: "#fff", marginBottom: "0.5rem", fontWeight: 600, letterSpacing: "0.02em" }}>{a.label}</h4>
                  <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>{a.sub}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3D RESIDENCES (Light Clay) */}
      <section style={{ padding: "12rem 4rem", background: "#f4f1ea" }}>
        <div style={{ maxWidth: "1600px", margin: "0 auto" }}>
          <div className="animate-on-scroll slide-up" style={{ textAlign: "center", marginBottom: "8rem" }}>
            <span className="roll-word" style={{ fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold-dark)", fontWeight: 700 }}><span>Floor</span> <span>Configurations</span></span>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(3rem, 4vw, 4.5rem)", color: "var(--ink)", marginTop: "1rem" }}>3D Views & Residences</h2>
            <div className="section-line" style={{ margin: "2rem auto", height: "3px" }} />
            <p style={{ fontSize: "1.2rem", color: "var(--ink-2)", maxWidth: "600px", margin: "0 auto", lineHeight: 1.8 }}>100% Vastu compliant. Zero dead space. Hover over each card to interact in 3D.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))", gap: "4rem" }}>
            {RESIDENCES.map((plan, idx) => (<ResidenceCard key={idx} plan={plan} idx={idx} />))}
          </div>
        </div>
      </section>

      {/* MASTERPLAN & LOCATION */}
      <section style={{ padding: "12rem 4rem", background: "#fff" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "10rem" }}>
          <div className="animate-on-scroll" style={{ display: "flex", flexWrap: "wrap", gap: "6rem", alignItems: "center" }}>
            <div className="slide-left" style={{ flex: "1 1 400px" }}>
              <span className="roll-word" style={{ fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold-dark)", fontWeight: 700 }}><span>Site</span> <span>Overview</span></span>
              <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2.8rem, 4vw, 4rem)", color: "var(--ink)", marginTop: "1rem", marginBottom: "1.5rem" }}>The Masterplan</h2>
              <p style={{ fontSize: "1.15rem", color: "var(--ink-2)", lineHeight: 1.9 }}>A bird's eye view of pure exclusivity. Every amenity, walkway, and green zone meticulously placed across 2,621 Sq. Yds. of prime real estate.</p>
            </div>
            <div className="card-roll-r" style={{ flex: "1 1 600px", borderRadius: "24px", overflow: "hidden", boxShadow: "0 40px 80px rgba(0,0,0,0.12)", border: "1px solid rgba(0,0,0,0.05)" }}>
              <img src="/lakewood-media/master-plan-min-660a544def095.webp" alt="Masterplan" style={{ width: "100%", height: "auto", display: "block" }} loading="lazy" className="hover-zoom" />
            </div>
          </div>
          <div className="animate-on-scroll" style={{ display: "flex", flexWrap: "wrap-reverse", gap: "6rem", alignItems: "center" }}>
            <div className="clay-lw card-roll-l" style={{ flex: "1 1 600px", padding: "1rem" }}>
              <img src="/lakewood-media/map.webp" alt="Location Map" style={{ width: "100%", height: "auto", display: "block", borderRadius: "16px" }} loading="lazy" className="hover-zoom" />
            </div>
            <div className="slide-right" style={{ flex: "1 1 400px" }}>
              <span className="roll-word" style={{ fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold-dark)", fontWeight: 700 }}><span>Connectivity</span></span>
              <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2.8rem, 4vw, 4rem)", color: "var(--ink)", marginTop: "1rem", marginBottom: "1.5rem" }}>Prime Location</h2>
              <p style={{ fontSize: "1.15rem", color: "var(--ink-2)", lineHeight: 1.9, marginBottom: "2.5rem" }}>Strategically positioned in NCL Colony, Kompally. World-class schools, hospitals, and retail within minutes.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                {[["DRS International School", "3 min"], ["Malla Reddy Narayana Hospital", "8 min"], ["ORR Exit — Kandlakoya", "9 min"], ["HITEC City via ORR", "30 min"]].map(([place, time]) => (
                  <div key={place} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "1.2rem", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
                    <span style={{ fontSize: "1.05rem", color: "var(--ink)", fontWeight: 500 }}>{place}</span>
                    <span className="clay-stat" style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--gold-dark)", padding: "0.4rem 1rem" }}>{time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ position: "relative", height: "70vh", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src="/lakewood-media/View 03_FFFFFF copy.jpg" alt="CTA" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.8))" }} />
        <div className="animate-on-scroll slide-up clay-dark" style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "5rem", maxWidth: "800px", margin: "0 2rem", background: "rgba(10,10,10,0.6)", backdropFilter: "blur(20px)" }}>
          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "#fff", marginBottom: "2.5rem", lineHeight: 1.1 }}>Your Dream Residence Awaits</h2>
          <a href="/#booking" className="clay-stat" style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", padding: "1.2rem 3.5rem", color: "var(--ink)", textDecoration: "none", fontSize: "0.9rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700 }}>
            Schedule Private Tour <ArrowRight size={18} />
          </a>
        </div>
      </section>

      <footer style={{ background: "#050505", color: "#fff", padding: "8rem 4rem 4rem" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "4rem", marginBottom: "6rem" }}>
            <div>
              <img src="/logo.png" alt="Bharathi" style={{ height: "65px", filter: "brightness(0) invert(1)", marginBottom: "2rem" }} decoding="async" />
              <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.45)", maxWidth: "320px", lineHeight: 1.8 }}>NCL Colony, Kompally, North Hyderabad, 500014</p>
            </div>
            <nav style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
              {NAV_ITEMS.map(item => (
                <a key={item.href} href={item.href} style={{ textDecoration: "none", color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", letterSpacing: "0.15em", textTransform: "uppercase", transition: "color 0.3s", fontWeight: 500 }}
                  onMouseEnter={e => e.target.style.color = "var(--gold)"}
                  onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.5)"}
                >{item.label}</a>
              ))}
            </nav>
          </div>
          <div style={{ height: "1px", background: "rgba(255,255,255,0.08)", marginBottom: "3rem" }} />
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", fontSize: "0.85rem", color: "rgba(255,255,255,0.3)" }}>
            <span>© 2026 Bharathi Constructions. All Rights Reserved.</span>
            <span>RERA Registered | Kompally, Hyderabad, Telangana</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
