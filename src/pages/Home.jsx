import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import MenuOverlay from "../components/MenuOverlay";

gsap.registerPlugin(ScrollTrigger);

// --- Custom Magnetic Cursor ---
function CustomCursor() {
  const cursorOutline = useRef(null);
  const cursorDot = useRef(null);

  useEffect(() => {
    // quickTo for high performance following
    const xToOutline = gsap.quickTo(cursorOutline.current, "x", { duration: 0.5, ease: "power3" });
    const yToOutline = gsap.quickTo(cursorOutline.current, "y", { duration: 0.5, ease: "power3" });
    const xToDot = gsap.quickSetter(cursorDot.current, "x", "px");
    const yToDot = gsap.quickSetter(cursorDot.current, "y", "px");

    const moveCursor = (e) => {
      xToOutline(e.clientX);
      yToOutline(e.clientY);
      xToDot(e.clientX);
      yToDot(e.clientY);
    };

    const handleHover = () => cursorOutline.current.classList.add("active");
    const handleLeave = () => cursorOutline.current.classList.remove("active");

    window.addEventListener("mousemove", moveCursor);
    
    // Attach hover to all links and buttons dynamically
    const attachHovers = () => {
      document.querySelectorAll("a, button, .hover-target").forEach(el => {
        el.addEventListener("mouseenter", handleHover);
        el.addEventListener("mouseleave", handleLeave);
      });
    };
    
    attachHovers();
    // Re-attach if DOM updates
    const observer = new MutationObserver(attachHovers);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={cursorOutline} className="custom-cursor-outline"></div>
      <div ref={cursorDot} className="custom-cursor-dot"></div>
    </>
  );
}

// --- Kinetic Typography Component ---
function KineticText({ text, as = "h2", className = "", style = {} }) {
  const containerRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          // Stagger the word animations
          const words = e.target.querySelectorAll(".kinetic-word");
          words.forEach((w, i) => {
            setTimeout(() => w.classList.add("visible"), i * 80);
          });
        }
      });
    }, { threshold: 0.2, rootMargin: "0px 0px -10% 0px" });
    
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const Tag = as;
  const words = text.split(" ");
  
  return (
    <Tag ref={containerRef} className={`kinetic-line ${className}`} style={style}>
      {words.map((word, i) => (
        <span key={i} className="kinetic-word">
          <span style={{ transitionDelay: `${i * 0.05}s` }}>{word}</span>
        </span>
      ))}
    </Tag>
  );
}

// --- Main Home Spatial Experience ---
export default function Home() {
  const [navOpen, setNavOpen] = useState(false);
  const mainRef = useRef(null);
  const heroImgRef = useRef(null);
  const heroWrapRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Hero Spatial Z-Axis Push
      if (heroWrapRef.current && heroImgRef.current) {
        gsap.to(heroWrapRef.current, {
          scale: 0.85,
          opacity: 0,
          borderRadius: "40px",
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });
      }

      // 2. Project Morphing Cards
      gsap.utils.toArray(".proj-morph").forEach(section => {
        const imgWrap = section.querySelector(".morph-wrap");
        gsap.fromTo(imgWrap, 
          { scale: 0.9, borderRadius: "60px" },
          { 
            scale: 1, 
            borderRadius: "0px",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "center center",
              scrub: true
            }
          }
        );
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
          <Link to="/" className="hover-target">
            <img src="/logo.png" alt="Bharathi" style={{ height: "45px", filter: "brightness(0) invert(1)" }} />
          </Link>
          <button className="hover-target" onClick={() => setNavOpen(!navOpen)} style={{ background: "transparent", border: "none", color: "#fff", fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase" }}>
            {navOpen ? "Close" : "Menu"}
          </button>
        </div>
      </header>
      <MenuOverlay navOpen={navOpen} setNavOpen={setNavOpen} />

      {/* HERO SECTION */}
      <section className="hero-section" style={{ height: "100vh", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div ref={heroWrapRef} style={{ position: "absolute", inset: 0, overflow: "hidden", willChange: "transform, opacity, border-radius", transformOrigin: "center center" }}>
          <img ref={heroImgRef} src="/horizon pics/BIRD_VIEW_FFFFFF.jpg" alt="Horizon Skyline" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.65)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 2rem", pointerEvents: "none" }}>
          <KineticText as="h1" text="Not Just Homes." style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(4rem, 8vw, 10rem)", margin: 0, fontWeight: 400, color: "#fff" }} />
          <KineticText as="h1" text="Legacies." style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(4rem, 8vw, 10rem)", margin: 0, fontWeight: 400, color: "var(--gold)", fontStyle: "italic" }} />
        </div>
        <div style={{ position: "absolute", bottom: "3rem", left: "50%", transform: "translateX(-50%)", textAlign: "center", zIndex: 10 }}>
          <span style={{ display: "block", fontSize: "0.6rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: "1rem" }}>Scroll to Explore</span>
          <div style={{ width: "1px", height: "40px", background: "rgba(255,255,255,0.2)", margin: "0 auto", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "#fff", animation: "scrollLine 2s infinite ease-in-out" }} />
          </div>
        </div>
      </section>

      {/* PROJECT 1: HORIZON */}
      <section className="proj-morph" style={{ position: "relative", minHeight: "150vh", display: "flex", alignItems: "center", background: "#fdfbf7", color: "#0a0a0a" }}>
        <div className="morph-wrap" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100vh", overflow: "hidden", transformOrigin: "center top", willChange: "transform, border-radius" }}>
          <img src="/horizon pics/VIEW_04_FFFFFFF.jpg" alt="Horizon Sky Villas" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.7))" }} />
        </div>
        <div style={{ position: "relative", zIndex: 10, width: "100%", padding: "0 4rem", marginTop: "40vh" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "4rem" }}>
            <div>
              <span style={{ fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold-dark)", display: "block", marginBottom: "1rem", fontWeight: 700 }}>Bharathi Horizon</span>
              <KineticText as="h2" text="Sculpting the Skyline." style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(3rem, 6vw, 6rem)", margin: 0, color: "#fff" }} />
            </div>
            <Link to="/horizon" className="hover-target" style={{ display: "inline-flex", alignItems: "center", gap: "1rem", color: "#fff", textDecoration: "none", fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", paddingBottom: "0.5rem", borderBottom: "1px solid rgba(255,255,255,0.3)" }}>
              Explore Horizon <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* PROJECT 2: LAKE WOODS */}
      <section className="proj-morph" style={{ position: "relative", minHeight: "150vh", display: "flex", alignItems: "center", background: "#050505", color: "#fff" }}>
        <div className="morph-wrap" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100vh", overflow: "hidden", transformOrigin: "center top", willChange: "transform, border-radius" }}>
          <img src="/lakewood-media/lakewood-cover.jpg" alt="Lake Woods Villas" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.7))" }} />
        </div>
        <div style={{ position: "relative", zIndex: 10, width: "100%", padding: "0 4rem", marginTop: "40vh" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "4rem" }}>
            <div>
              <span style={{ fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", display: "block", marginBottom: "1rem", fontWeight: 700 }}>Bharathi Lake Woods</span>
              <KineticText as="h2" text="Serenity. Engineered." style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(3rem, 6vw, 6rem)", margin: 0, color: "#fff" }} />
            </div>
            <Link to="/lake-woods" className="hover-target" style={{ display: "inline-flex", alignItems: "center", gap: "1rem", color: "#fff", textDecoration: "none", fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", paddingBottom: "0.5rem", borderBottom: "1px solid rgba(255,255,255,0.3)" }}>
              Explore Lake Woods <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* STATS / LEGACY (Minimalist Precision) */}
      <section style={{ padding: "15rem 4rem", background: "#0a0a0a" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "10rem" }}>
            <KineticText as="h2" text="Precision in Every Metric." style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2.5rem, 4vw, 4rem)", margin: 0, color: "var(--gold)" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "4rem" }}>
            {[
              { n: "40+", l: "Years Heritage" },
              { n: "100%", l: "Vastu Compliant" },
              { n: "0", l: "Compromise" }
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <span style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(4rem, 6vw, 7rem)", color: "#fff", display: "block", lineHeight: 1 }}>{stat.n}</span>
                <span style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", display: "block", marginTop: "1rem" }}>{stat.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#020202", color: "#fff", padding: "8rem 4rem 4rem" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "4rem", marginBottom: "6rem" }}>
            <div>
              <img src="/logo.png" alt="Bharathi" style={{ height: "55px", filter: "brightness(0) invert(1)", marginBottom: "2rem" }} />
              <KineticText as="p" text="Sculpting the Skyline." style={{ fontSize: "1rem", color: "rgba(255,255,255,0.45)", margin: 0, fontFamily: "Playfair Display, serif", fontStyle: "italic" }} />
            </div>
            <nav style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
              {["Horizon", "Lake Woods", "Legacy", "Contact"].map(item => (
                <a key={item} href="#" className="hover-target" style={{ textDecoration: "none", color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", letterSpacing: "0.15em", textTransform: "uppercase", transition: "color 0.3s" }}>{item}</a>
              ))}
            </nav>
          </div>
          <div style={{ height: "1px", background: "rgba(255,255,255,0.08)", marginBottom: "3rem" }} />
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            <span>© 2026 Bharathi Constructions.</span>
            <span>Hyderabad, Telangana</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
