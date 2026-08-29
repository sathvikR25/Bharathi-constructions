import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import MenuOverlay from "../components/MenuOverlay";
import CustomCursor from "../components/CustomCursor";
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

const LAKEWOOD_RENDERS = [
  { src: "/lakewood-media/lakewood-cover.jpg", label: "Lake Woods — Cover" },
  { src: "/lakewood-media/View 01_FFFFF copy.jpg", label: "Grand Entrance" },
  { src: "/lakewood-media/View 02_FFFFF copy.jpg", label: "Facade — Evening" },
  { src: "/lakewood-media/View 03_FFFFFF copy.jpg", label: "Landscape View" },
  { src: "/lakewood-media/View 04_ffffff copy.jpg", label: "Aerial Perspective" },
  { src: "/lakewood-media/View 05_FFFFF copy.jpg", label: "Amenity Deck" },
  { src: "/lakewood-media/view 06_FFFFFF copy.jpg", label: "Lobby & Lounge" },
];

export default function Home() {
  const [navOpen, setNavOpen] = useState(false);
  const mainRef = useRef(null);
  const heroWrapRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (heroWrapRef.current) {
        gsap.to(heroWrapRef.current, {
          scale: 0.82, opacity: 0, borderRadius: "48px",
          scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: true }
        });
      }
      gsap.utils.toArray(".proj-morph").forEach(section => {
        const imgWrap = section.querySelector(".morph-wrap");
        if (imgWrap) {
          gsap.fromTo(imgWrap, { scale: 0.88, borderRadius: "60px" }, { scale: 1, borderRadius: "0px", scrollTrigger: { trigger: section, start: "top bottom", end: "center center", scrub: true } });
        }
      });
    }, mainRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} style={{ background: "#050505", color: "#fdfbf7", overflowX: "hidden" }}>
      <CustomCursor />
      <header style={{ position: "fixed", width: "100%", zIndex: 100, mixBlendMode: "difference" }}>
        <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 2.5rem", height: "100px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link to="/" className="hover-target"><img src="/logo.png" alt="Bharathi" style={{ height: "45px", filter: "brightness(0) invert(1)" }} /></Link>
          <button className="hover-target" onClick={() => setNavOpen(!navOpen)} style={{ background: "transparent", border: "none", color: "#fff", fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase" }}>{navOpen ? "Close" : "Menu"}</button>
        </div>
      </header>
      <MenuOverlay navOpen={navOpen} setNavOpen={setNavOpen} />

      {/* HERO */}
      <section className="hero-section" style={{ height: "100vh", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div ref={heroWrapRef} style={{ position: "absolute", inset: 0, overflow: "hidden", willChange: "transform, opacity, border-radius", transformOrigin: "center center" }}>
          <img src="/horizon pics/BIRD_VIEW_FFFFFF.jpg" alt="Horizon Skyline" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.6) contrast(1.05)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 2rem", pointerEvents: "none" }}>
          <KineticText as="h1" text="Not Just Homes." style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(3.5rem, 8vw, 10rem)", margin: 0, fontWeight: 400, color: "#fff" }} />
          <KineticText as="h1" text="Legacies." style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(3.5rem, 8vw, 10rem)", margin: 0, fontWeight: 400, color: "#E0E0E0", fontStyle: "italic" }} />
        </div>
        <div style={{ position: "absolute", bottom: "3rem", left: "50%", transform: "translateX(-50%)", textAlign: "center", zIndex: 10 }}>
          <span style={{ display: "block", fontSize: "0.6rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "1rem" }}>Scroll to Explore</span>
          <div style={{ width: "1px", height: "40px", background: "rgba(255,255,255,0.15)", margin: "0 auto", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "#fff", animation: "scrollLine 2s infinite ease-in-out" }} />
          </div>
        </div>
      </section>

      {/* HORIZON COVER */}
      <section className="proj-morph" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "flex-end", background: "#0a0a0a" }}>
        <div className="morph-wrap" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", overflow: "hidden", transformOrigin: "center top", willChange: "transform, border-radius" }}>
          <img src="/horizon pics/VIEW_04_FFFFFFF.jpg" alt="Horizon" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.85))" }} />
        </div>
        <div style={{ position: "relative", zIndex: 10, width: "100%", padding: "0 4rem 6rem" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "3rem" }}>
            <div>
              <span style={{ fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", display: "block", marginBottom: "1.5rem" }}>01 — Bharathi Horizon</span>
              <KineticText as="h2" text="Sculpting the Skyline." style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2.5rem, 5vw, 5.5rem)", margin: 0, color: "#fff" }} />
              <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", marginTop: "1.5rem", maxWidth: "400px", lineHeight: 1.7 }}>3 & 4 BHK Sky Villas · G+28 Floors · Suchitra X Roads</p>
            </div>
            <Link to="/horizon" className="hover-target" style={{ display: "inline-flex", alignItems: "center", gap: "1rem", color: "#fff", textDecoration: "none", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", paddingBottom: "0.5rem", borderBottom: "1px solid rgba(255,255,255,0.25)" }}>
              Explore Project <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* HORIZON CAROUSEL */}
      <section style={{ padding: "10rem 0", background: "#0a0a0a" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 4rem", marginBottom: "4rem" }}>
          <span style={{ fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", display: "block", marginBottom: "1.5rem" }}>Gallery</span>
          <KineticText as="h2" text="Every Angle. Every Detail." style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2rem, 3.5vw, 3.5rem)", margin: 0, color: "#fff" }} />
        </div>
        <ImageCarousel images={HORIZON_RENDERS} id="horizon" />
      </section>

      {/* LAKE WOODS COVER */}
      <section className="proj-morph" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "flex-end", background: "#050505" }}>
        <div className="morph-wrap" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", overflow: "hidden", transformOrigin: "center top", willChange: "transform, border-radius" }}>
          <img src="/lakewood-media/lakewood-cover.jpg" alt="Lake Woods" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.85))" }} />
        </div>
        <div style={{ position: "relative", zIndex: 10, width: "100%", padding: "0 4rem 6rem" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "3rem" }}>
            <div>
              <span style={{ fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", display: "block", marginBottom: "1.5rem" }}>02 — Bharathi Lake Woods</span>
              <KineticText as="h2" text="Serenity. Engineered." style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2.5rem, 5vw, 5.5rem)", margin: 0, color: "#fff" }} />
              <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", marginTop: "1.5rem", maxWidth: "400px", lineHeight: 1.7 }}>40 Exclusive 3 BHK Units · 8+2 Floors · NCL Colony, Kompally</p>
            </div>
            <Link to="/lake-woods" className="hover-target" style={{ display: "inline-flex", alignItems: "center", gap: "1rem", color: "#fff", textDecoration: "none", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", paddingBottom: "0.5rem", borderBottom: "1px solid rgba(255,255,255,0.25)" }}>
              Explore Project <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* LAKE WOODS CAROUSEL */}
      <section style={{ padding: "10rem 0", background: "#050505" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 4rem", marginBottom: "4rem" }}>
          <span style={{ fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", display: "block", marginBottom: "1.5rem" }}>Gallery</span>
          <KineticText as="h2" text="Where Nature Meets Architecture." style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2rem, 3.5vw, 3.5rem)", margin: 0, color: "#fff" }} />
        </div>
        <ImageCarousel images={LAKEWOOD_RENDERS} id="lakewood" />
      </section>

      {/* STATS */}
      <section style={{ padding: "15rem 4rem", background: "#0a0a0a" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "10rem" }}>
            <KineticText as="h2" text="Precision in Every Metric." style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2.5rem, 4vw, 4rem)", margin: 0, color: "#E0E0E0" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "4rem" }}>
            {[{ n: "40+", l: "Years Heritage" }, { n: "100%", l: "Vastu Compliant" }, { n: "0", l: "Compromise" }].map((stat, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <span style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(4rem, 6vw, 7rem)", color: "#fff", display: "block", lineHeight: 1 }}>{stat.n}</span>
                <span style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", display: "block", marginTop: "1rem" }}>{stat.l}</span>
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
              <KineticText as="p" text="Sculpting the Skyline." style={{ fontSize: "1rem", color: "rgba(255,255,255,0.35)", margin: 0, fontFamily: "Playfair Display, serif", fontStyle: "italic" }} />
            </div>
            <nav style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
              {[{ label: "Horizon", href: "/horizon" }, { label: "Lake Woods", href: "/lake-woods" }, { label: "Legacy", href: "#" }, { label: "Contact", href: "#" }].map(item => (
                <Link key={item.label} to={item.href} className="hover-target" style={{ textDecoration: "none", color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", letterSpacing: "0.15em", textTransform: "uppercase", transition: "color 0.3s" }}>{item.label}</Link>
              ))}
            </nav>
          </div>
          <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", marginBottom: "3rem" }} />
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", fontSize: "0.75rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            <span>© 2026 Bharathi Constructions.</span>
            <span>Hyderabad, Telangana</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
