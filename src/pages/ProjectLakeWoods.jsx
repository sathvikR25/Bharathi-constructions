import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, ArrowRight, Compass, Shield, Trees, Zap, Film } from "lucide-react";
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
  { flat: "Flat 01", facing: "East Facing", sqft: "2,290", type: "3 BHK", img: "/lakewood-media/SECTION 3__ 2290 - f-transparent.png", badge: "Premium", rooms: ["Master Suite", "2 Bedrooms", "Drawing Room", "Dining Area", "Kitchen", "3 Baths"], accent: "#C9A96E" },
  { flat: "Flat 02", facing: "West Facing", sqft: "2,285", type: "3 BHK", img: "/lakewood-media/SECTION 4 __ 2285 -f-transparent.png", badge: "Grand", rooms: ["Master Suite", "2 Bedrooms", "Drawing Room", "Dining Area", "Kitchen", "3 Baths"], accent: "#C9A96E" },
  { flat: "Flat 03", facing: "East Facing", sqft: "2,675", type: "3 BHK", img: "/lakewood-media/SECTION 1__ 2675 - SQ.F-transparent.png", badge: "Signature", rooms: ["Master Suite", "2 Bedrooms", "Drawing Room", "Dining Area", "Kitchen", "3 Baths", "Home Theatre"], accent: "#B8860B" },
  { flat: "Flat 04", facing: "West Facing", sqft: "2,680", type: "3 BHK", img: "/lakewood-media/SECTION 2__ 2680 - F-transparent.png", badge: "Elite", rooms: ["Master Suite", "2 Bedrooms", "Drawing Room", "Dining Area", "Kitchen", "3 Baths", "Home Theatre"], accent: "#B8860B" }
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
  { label: "24/7 Security", sub: "Advanced CCTV + Guard" },
  { label: "Green Landscape", sub: "2000+ Sqft Green Cover" },
  { label: "Mini Theatre", sub: "8-Seat Screening Room" },
  { label: "Power Backup", sub: "100% DG Generator" },
  { label: "Vastu Compliant", sub: "All Units Certified" },
  { label: "Prime Location", sub: "NCL Colony, Kompally" }
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
    <div ref={cardRef} className="animate-on-scroll fade-up"
      style={{ background: "#fff", borderRadius: "20px", overflow: "hidden", transitionDelay: (idx % 2) * 120 + "ms", transformStyle: "preserve-3d", cursor: "crosshair", border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 20px 60px rgba(0,0,0,0.07)" }}
      onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onMouseEnter={() => setHovered(true)}
    >
      <div style={{ background: "linear-gradient(160deg, #0d0d0d 0%, #1c1c1c 100%)", padding: "2rem 2rem 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.2rem" }}>
          <div>
            <span style={{ fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase", color: plan.accent, fontWeight: 700, display: "block", marginBottom: "0.4rem" }}>{plan.badge} Unit</span>
            <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: "2.2rem", color: "#fff", margin: 0, lineHeight: 1 }}>{plan.flat}</h3>
          </div>
          <div style={{ textAlign: "right" }}>
            <span style={{ display: "block", fontSize: "2.4rem", color: plan.accent, fontFamily: "Playfair Display, serif", lineHeight: 1 }}>{plan.sqft}</span>
            <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.15em" }}>SQ. FT.</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: "0.75rem", paddingBottom: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          {[plan.facing, plan.type].map((tag, i) => (
            <span key={i} style={{ fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", padding: "0.3rem 0.9rem", borderRadius: "100px", border: "1px solid " + (i === 0 ? plan.accent + "70" : "rgba(255,255,255,0.15)"), color: i === 0 ? plan.accent : "rgba(255,255,255,0.55)" }}>{tag}</span>
          ))}
        </div>
        <div style={{ padding: "2rem 0.5rem", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "360px", transform: hovered ? "translateZ(25px)" : "translateZ(0)", transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)" }}>
          <img src={plan.img} alt={plan.flat} style={{ width: "100%", maxWidth: "460px", height: "auto", display: "block", imageRendering: "crisp-edges", filter: hovered ? "drop-shadow(0 25px 35px rgba(201,169,110,0.5)) brightness(1.06) contrast(1.04)" : "drop-shadow(0 10px 20px rgba(0,0,0,0.6)) brightness(1.02)", transition: "filter 0.5s ease" }} loading="lazy" />
        </div>
      </div>
      <div style={{ padding: "1.5rem 2rem 2rem", background: "#fff" }}>
        <p style={{ fontSize: "0.62rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#bbb", marginBottom: "0.75rem" }}>Room Configuration</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {plan.rooms.map((room, i) => (
            <span key={i} style={{ fontSize: "0.72rem", padding: "0.25rem 0.75rem", background: "#f3f3f3", borderRadius: "100px", color: "#444", letterSpacing: "0.04em" }}>{room}</span>
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
    }, { threshold: 0.08, rootMargin: "0px 0px -60px 0px" });
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

      <section className="lw-hero" style={{ position: "relative", height: "100vh", overflow: "hidden", display: "flex", alignItems: "flex-end" }}>
        <img ref={heroBgRef} src="/lakewood-media/lakewood-cover.jpg" alt="Lake Woods" style={{ position: "absolute", top: "-15%", left: 0, width: "100%", height: "130%", objectFit: "cover", zIndex: 1 }} fetchPriority="high" />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.15) 100%)", zIndex: 2 }} />
        <div style={{ position: "relative", zIndex: 3, width: "100%", padding: "0 4rem 6rem" }}>
          <div className="animate-on-scroll fade-up" style={{ maxWidth: "900px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
              <div style={{ width: "40px", height: "1px", background: "var(--gold)" }} />
              <span style={{ fontSize: "0.72rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--gold)" }}>NCL Colony, Kompally · Hyderabad</span>
            </div>
            <img src="/lakewood-media/lakewood-logo.png" alt="Bharathi Lake Woods" style={{ width: "420px", maxWidth: "90%", display: "block", filter: "brightness(0) invert(1)", marginBottom: "3rem" }} />
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {[{ n: "40", l: "Units" }, { n: "8+2", l: "Floors" }, { n: "2,621", l: "Sq. Yds" }, { n: "3 BHK", l: "Type" }].map((s, i) => (
                <div key={i} style={{ padding: "1.5rem 2.5rem", borderRight: i !== 3 ? "1px solid rgba(255,255,255,0.12)" : "none", borderTop: "1px solid rgba(255,255,255,0.12)" }}>
                  <span style={{ display: "block", fontFamily: "Playfair Display, serif", fontSize: "1.8rem", color: "#fff", lineHeight: 1 }}>{s.n}</span>
                  <span style={{ fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginTop: "0.3rem", display: "block" }}>{s.l}</span>
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

      <section style={{ padding: "10rem 4rem", background: "#fff" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", gap: "6rem", flexWrap: "wrap", alignItems: "flex-start" }}>
          <div style={{ flex: "1 1 380px", position: "sticky", top: "140px" }} className="animate-on-scroll fade-right">
            <span style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold-dark)", fontWeight: 600 }}>The Vision</span>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2.8rem, 4vw, 4.5rem)", color: "var(--ink)", marginTop: "1.5rem", lineHeight: 1.1 }}>Redefining<br /><em>Exclusivity.</em></h2>
            <div style={{ width: "50px", height: "2px", background: "var(--gold)", margin: "2rem 0" }} />
            <p style={{ fontSize: "1.1rem", color: "var(--ink-2)", lineHeight: 1.9, marginBottom: "1.5rem" }}>A meticulously crafted enclave of precisely 40 ultra-premium 3 BHK apartments in NCL Colony, Kompally.</p>
            <p style={{ fontSize: "1.1rem", color: "var(--ink-2)", lineHeight: 1.9 }}>Rising across 8+2 floors — architecture integrating modern elegance with lush natural surroundings for a true resort lifestyle.</p>
            <a href="/#booking" style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", marginTop: "3rem", padding: "1rem 2rem", background: "#0a0a0a", color: "#fff", textDecoration: "none", fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 500 }}>Book Site Visit <ArrowRight size={16} /></a>
          </div>
          <div style={{ flex: "1 1 600px", display: "flex", flexDirection: "column", gap: "2rem" }}>
            {[{ src: "View 01_FFFFF copy.jpg", caption: "Grand Facade", h: "500px" }, { src: "View 02_FFFFF copy.jpg", caption: "Exterior — Dusk", h: "380px" }].map((item, i) => (
              <div key={i} className="animate-on-scroll fade-up" style={{ position: "relative", overflow: "hidden", borderRadius: "12px", height: item.h, transitionDelay: i * 150 + "ms" }}>
                <img src={"/lakewood-media/" + item.src} alt={item.caption} style={{ width: "100%", height: "130%", objectFit: "cover", position: "absolute", top: "-15%" }} loading="lazy" className="hover-zoom" />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)" }} />
                <span style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem", fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#fff", background: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)", padding: "0.35rem 0.9rem", borderRadius: "100px" }}>{item.caption}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="horiz-scroll-section" style={{ background: "#0a0a0a" }}>
        <div ref={horizontalRef} style={{ display: "flex", width: (RENDERS.length * 100) + "vw", height: "100vh", overflow: "hidden" }}>
          {RENDERS.map((render, idx) => (
            <div key={idx} className="horiz-panel" style={{ flex: "0 0 100vw", height: "100vh", position: "relative", overflow: "hidden" }}>
              <img src={"/lakewood-media/" + render.src} alt={render.label} style={{ width: "100%", height: "100%", objectFit: "cover" }} loading={idx === 0 ? "eager" : "lazy"} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.85) 100%)" }} />
              <div style={{ position: "absolute", bottom: "5rem", left: "5rem" }}>
                <span style={{ fontSize: "0.62rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", display: "block", marginBottom: "0.75rem" }}>{String(idx + 1).padStart(2, "0")} / {String(RENDERS.length).padStart(2, "0")}</span>
                <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#fff", margin: 0 }}>{render.label}</h3>
              </div>
              <div style={{ position: "absolute", bottom: "5.5rem", right: "5rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span style={{ fontSize: "0.62rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>Scroll</span>
                <ArrowRight size={16} color="rgba(255,255,255,0.3)" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "10rem 4rem", background: "#fafaf8" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div className="animate-on-scroll fade-up" style={{ textAlign: "center", marginBottom: "7rem" }}>
            <span style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold-dark)", fontWeight: 600 }}>Project Highlights</span>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2.5rem, 4vw, 4rem)", color: "var(--ink)", marginTop: "1rem" }}>Excellence in Every Detail</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10rem" }}>
            {BROCHURE.map((item, idx) => (
              <div key={idx} className="animate-on-scroll fade-up" style={{ display: "flex", flexDirection: idx % 2 === 0 ? "row" : "row-reverse", alignItems: "center", gap: "5rem", flexWrap: "wrap" }}>
                <div style={{ flex: "1 1 520px", borderRadius: "8px", overflow: "hidden", boxShadow: "0 20px 50px rgba(0,0,0,0.08)" }}>
                  <img src={"/lakewood-media/" + item.src} alt={item.label} style={{ width: "100%", height: "auto", display: "block" }} loading="lazy" className="hover-zoom" />
                </div>
                <div style={{ flex: "1 1 360px" }}>
                  <span style={{ fontFamily: "Playfair Display, serif", fontSize: "5rem", color: "var(--gold)", opacity: 0.12, lineHeight: 1, display: "block" }}>{String(idx + 1).padStart(2, "0")}</span>
                  <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: "2.5rem", color: "var(--ink)", marginTop: "0.5rem" }}>{item.label}</h3>
                  <div style={{ width: "40px", height: "2px", background: "var(--gold)", margin: "1.5rem 0" }} />
                  <p style={{ fontSize: "1.1rem", color: "var(--ink-2)", lineHeight: 1.8 }}>Crafted with the finest materials and attention to every detail. Each aspect of Bharathi Lake Woods reflects uncompromising standards of luxury and design excellence.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "8rem 4rem", background: "#0a0a0a" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div className="animate-on-scroll fade-up" style={{ marginBottom: "5rem" }}>
            <span style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 600 }}>Curated Lifestyle</span>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2.5rem, 4vw, 4rem)", color: "#fff", marginTop: "1rem" }}>World-Class Amenities</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1px", background: "rgba(255,255,255,0.06)" }}>
            {AMENITIES.map((a, i) => (
              <div key={i} className="animate-on-scroll fade-up" style={{ padding: "3rem", background: "#0a0a0a", transitionDelay: i * 80 + "ms", transition: "background 0.3s ease", cursor: "default" }}
                onMouseEnter={e => e.currentTarget.style.background = "#141414"}
                onMouseLeave={e => e.currentTarget.style.background = "#0a0a0a"}
              >
                <h4 style={{ fontSize: "1.2rem", color: "#fff", marginBottom: "0.5rem", fontWeight: 500 }}>{a.label}</h4>
                <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>{a.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "10rem 4rem", background: "#f5f3ee" }}>
        <div style={{ maxWidth: "1600px", margin: "0 auto" }}>
          <div className="animate-on-scroll fade-up" style={{ textAlign: "center", marginBottom: "7rem" }}>
            <span style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold-dark)", fontWeight: 600 }}>Floor Configurations</span>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2.5rem, 4vw, 4rem)", color: "var(--ink)", marginTop: "1rem" }}>3D Views & Residences</h2>
            <div style={{ width: "50px", height: "2px", background: "var(--gold)", margin: "2rem auto" }} />
            <p style={{ fontSize: "1.1rem", color: "var(--ink-2)", maxWidth: "600px", margin: "0 auto", lineHeight: 1.8 }}>100% Vastu compliant. Zero dead space. Hover over each card to interact in 3D.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(480px, 1fr))", gap: "2rem" }}>
            {RESIDENCES.map((plan, idx) => (<ResidenceCard key={idx} plan={plan} idx={idx} />))}
          </div>
        </div>
      </section>

      <section style={{ padding: "10rem 4rem", background: "#fff" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "8rem" }}>
          <div className="animate-on-scroll fade-up" style={{ display: "flex", flexWrap: "wrap", gap: "5rem", alignItems: "center" }}>
            <div style={{ flex: "1 1 360px" }}>
              <span style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold-dark)", fontWeight: 600 }}>Site Overview</span>
              <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "3rem", color: "var(--ink)", marginTop: "1rem", marginBottom: "1.5rem" }}>The Masterplan</h2>
              <p style={{ fontSize: "1.1rem", color: "var(--ink-2)", lineHeight: 1.9 }}>A bird's eye view of pure exclusivity. Every amenity, walkway, and green zone meticulously placed across 2,621 Sq. Yds. of prime real estate.</p>
            </div>
            <div style={{ flex: "1 1 600px", borderRadius: "12px", overflow: "hidden", boxShadow: "0 30px 60px rgba(0,0,0,0.08)" }}>
              <img src="/lakewood-media/master-plan-min-660a544def095.webp" alt="Masterplan" style={{ width: "100%", height: "auto", display: "block" }} loading="lazy" />
            </div>
          </div>
          <div className="animate-on-scroll fade-up" style={{ display: "flex", flexWrap: "wrap-reverse", gap: "5rem", alignItems: "center" }}>
            <div style={{ flex: "1 1 600px", borderRadius: "12px", overflow: "hidden", boxShadow: "0 30px 60px rgba(0,0,0,0.08)", background: "#f0f0f0", padding: "0.5rem" }}>
              <img src="/lakewood-media/map.webp" alt="Location Map" style={{ width: "100%", height: "auto", display: "block", borderRadius: "8px" }} loading="lazy" />
            </div>
            <div style={{ flex: "1 1 360px" }}>
              <span style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold-dark)", fontWeight: 600 }}>Connectivity</span>
              <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "3rem", color: "var(--ink)", marginTop: "1rem", marginBottom: "1.5rem" }}>Prime Location</h2>
              <p style={{ fontSize: "1.1rem", color: "var(--ink-2)", lineHeight: 1.9, marginBottom: "2rem" }}>Strategically positioned in NCL Colony, Kompally. World-class schools, hospitals, and retail within minutes.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[["DRS International School", "3 min"], ["Malla Reddy Narayana Hospital", "8 min"], ["ORR Exit — Kandlakoya", "9 min"], ["HITEC City via ORR", "30 min"]].map(([place, time]) => (
                  <div key={place} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "1rem", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
                    <span style={{ fontSize: "0.95rem", color: "var(--ink)" }}>{place}</span>
                    <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--gold-dark)" }}>{time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ position: "relative", height: "60vh", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src="/lakewood-media/View 03_FFFFFF copy.jpg" alt="CTA" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.65)" }} />
        <div className="animate-on-scroll fade-up" style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 2rem" }}>
          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2rem, 5vw, 4rem)", color: "#fff", marginBottom: "2rem" }}>Your Dream Residence Awaits</h2>
          <a href="/#booking" style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", padding: "1.1rem 3rem", background: "var(--gold)", color: "#0a0a0a", textDecoration: "none", fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700 }}>
            Schedule Private Tour <ArrowRight size={16} />
          </a>
        </div>
      </section>

      <footer style={{ background: "#0a0a0a", color: "#fff", padding: "6rem 4rem 3rem" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "3rem", marginBottom: "5rem" }}>
            <div>
              <img src="/logo.png" alt="Bharathi" style={{ height: "60px", filter: "brightness(0) invert(1)", marginBottom: "1.5rem" }} decoding="async" />
              <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.4)", maxWidth: "280px", lineHeight: 1.8 }}>NCL Colony, Kompally, North Hyderabad, 500014</p>
            </div>
            <nav style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {NAV_ITEMS.map(item => (
                <a key={item.href} href={item.href} style={{ textDecoration: "none", color: "rgba(255,255,255,0.45)", fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", transition: "color 0.2s" }}
                  onMouseEnter={e => e.target.style.color = "var(--gold)"}
                  onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.45)"}
                >{item.label}</a>
              ))}
            </nav>
          </div>
          <div style={{ height: "1px", background: "rgba(255,255,255,0.07)", marginBottom: "2.5rem" }} />
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", fontSize: "0.8rem", color: "rgba(255,255,255,0.3)" }}>
            <span>© 2026 Bharathi Constructions. All Rights Reserved.</span>
            <span>RERA Registered | Kompally, Hyderabad, Telangana</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
