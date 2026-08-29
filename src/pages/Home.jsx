import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import MenuOverlay from "../components/MenuOverlay";
import CustomCursor from "../components/CustomCursor";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [navOpen, setNavOpen] = useState(false);
  const mainRef = useRef(null);
  
  // Hero Refs
  const heroSectionRef = useRef(null);
  const heroImgWrapRef = useRef(null);
  const textTopRef = useRef(null);
  const textBottomRef = useRef(null);

  // Horizontal Scroll Refs
  const horizontalSectionRef = useRef(null);
  const horizontalTrackRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // 1. Hero Pinned Expansion
      // We pin the hero section. The image wrapper starts small, then grows to 100vw/100vh.
      // Text splits and moves out of the way.
      const tlHero = gsap.timeline({
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: "top top",
          end: "+=150%", // Scroll for 150% of viewport height to complete the animation
          scrub: 1,      // Smooth scrubbing
          pin: true
        }
      });

      tlHero.to(heroImgWrapRef.current, {
        width: "100vw",
        height: "100vh",
        borderRadius: "0px",
        ease: "power2.inOut"
      }, 0)
      .to(textTopRef.current, { y: "-150%", opacity: 0, ease: "power2.inOut" }, 0)
      .to(textBottomRef.current, { y: "150%", opacity: 0, ease: "power2.inOut" }, 0);


      // 2. Horizontal Scroll Section
      // Instead of standard scrolling, we pin this container and move the inner track horizontally.
      const track = horizontalTrackRef.current;
      if (track) {
        const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);
        gsap.to(track, {
          x: getScrollAmount,
          ease: "none",
          scrollTrigger: {
            trigger: horizontalSectionRef.current,
            start: "top top",
            end: () => `+=${track.scrollWidth - window.innerWidth}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true
          }
        });
      }
      
      // 3. Parallax Floating Elements (Non-linear scroll)
      gsap.utils.toArray(".parallax-layer").forEach(layer => {
        const speed = layer.getAttribute("data-speed") || 1;
        gsap.to(layer, {
          y: (i, el) => (1 - parseFloat(speed)) * (ScrollTrigger.maxScroll(window) - (el.offsetTop || 0)),
          ease: "none",
          scrollTrigger: {
            trigger: layer,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
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

      {/* IMMERSIVE HERO: Pinned & Expanding */}
      <section ref={heroSectionRef} style={{ height: "100vh", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        {/* Massive Text Masking */}
        <div style={{ position: "absolute", zIndex: 5, pointerEvents: "none", width: "100%", textAlign: "center", mixBlendMode: "difference" }}>
          <h1 ref={textTopRef} style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(4rem, 12vw, 15rem)", margin: 0, color: "#fff", lineHeight: 0.8, textTransform: "uppercase" }}>Bharathi</h1>
          <h1 ref={textBottomRef} style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(4rem, 12vw, 15rem)", margin: 0, color: "#fff", lineHeight: 0.8, fontStyle: "italic", textTransform: "uppercase" }}>Legacies</h1>
        </div>

        {/* The "Window" that expands */}
        <div ref={heroImgWrapRef} style={{ position: "relative", zIndex: 1, width: "30vw", height: "40vh", borderRadius: "200px", overflow: "hidden", willChange: "transform, width, height, border-radius" }}>
          <img src="/horizon pics/BIRD_VIEW_FFFFFF.jpg" alt="Horizon Skyline" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.7) contrast(1.1)" }} />
        </div>
      </section>

      {/* HORIZONTAL SCROLL JOURNEY (Breaks the vertical brochure layout) */}
      <section ref={horizontalSectionRef} style={{ height: "100vh", position: "relative", background: "#fdfbf7", color: "#0a0a0a", overflow: "hidden" }}>
        {/* Fixed massive background text to give depth during horizontal scroll */}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "100%", textAlign: "center", zIndex: 0, opacity: 0.05, pointerEvents: "none", whiteSpace: "nowrap" }}>
          <span style={{ fontFamily: "Playfair Display, serif", fontSize: "30vw", fontWeight: 700 }}>EXPLORE</span>
        </div>
        
        {/* The Track that moves left */}
        <div ref={horizontalTrackRef} style={{ display: "flex", height: "100%", alignItems: "center", gap: "10vw", padding: "0 10vw", width: "max-content", position: "relative", zIndex: 1 }}>
          
          {/* Card 1: Horizon */}
          <div style={{ width: "80vw", maxWidth: "1200px", display: "flex", gap: "4rem", alignItems: "center" }}>
            <div style={{ flex: 1, position: "relative" }}>
              <div style={{ width: "100%", aspectRatio: "4/5", overflow: "hidden", borderRadius: "20px" }}>
                <img src="/horizon pics/VIEW_04_FFFFFFF.jpg" style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="Horizon" />
              </div>
              <h2 className="parallax-layer" data-speed="1.2" style={{ position: "absolute", top: "20%", left: "-10%", fontFamily: "Playfair Display, serif", fontSize: "6vw", color: "#fff", mixBlendMode: "difference", m: 0 }}>Horizon.</h2>
            </div>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: "0.8rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#666", display: "block", marginBottom: "2rem" }}>01 — The Skyline</span>
              <p style={{ fontSize: "1.5rem", lineHeight: 1.6, color: "#333", maxWidth: "400px", marginBottom: "3rem" }}>A soaring architectural masterpiece capturing panoramic views and pristine northern winds.</p>
              <Link to="/horizon" className="hover-target" style={{ display: "inline-flex", alignItems: "center", gap: "1rem", color: "#0a0a0a", textDecoration: "none", fontSize: "0.85rem", letterSpacing: "0.2em", textTransform: "uppercase", paddingBottom: "0.5rem", borderBottom: "1px solid rgba(0,0,0,0.2)" }}>Enter Horizon <ArrowRight size={16}/></Link>
            </div>
          </div>

          {/* Card 2: Lake Woods */}
          <div style={{ width: "80vw", maxWidth: "1200px", display: "flex", gap: "4rem", alignItems: "center", flexDirection: "row-reverse" }}>
            <div style={{ flex: 1, position: "relative" }}>
              <div style={{ width: "100%", aspectRatio: "4/5", overflow: "hidden", borderRadius: "20px" }}>
                <img src="/lakewood-media/lakewood-cover.jpg" style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="Lake Woods" />
              </div>
              <h2 className="parallax-layer" data-speed="0.8" style={{ position: "absolute", bottom: "10%", right: "-10%", fontFamily: "Playfair Display, serif", fontSize: "6vw", color: "#fff", mixBlendMode: "difference", m: 0, textAlign: "right" }}>Lake<br/>Woods.</h2>
            </div>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: "0.8rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#666", display: "block", marginBottom: "2rem" }}>02 — The Sanctuary</span>
              <p style={{ fontSize: "1.5rem", lineHeight: 1.6, color: "#333", maxWidth: "400px", marginBottom: "3rem" }}>An exclusive low-density community designed around a serene natural lake.</p>
              <Link to="/lake-woods" className="hover-target" style={{ display: "inline-flex", alignItems: "center", gap: "1rem", color: "#0a0a0a", textDecoration: "none", fontSize: "0.85rem", letterSpacing: "0.2em", textTransform: "uppercase", paddingBottom: "0.5rem", borderBottom: "1px solid rgba(0,0,0,0.2)" }}>Enter Lake Woods <ArrowRight size={16}/></Link>
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#050505", color: "#fff", padding: "12rem 4rem 4rem", position: "relative", zIndex: 10 }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(3rem, 8vw, 8rem)", color: "#fff", margin: "0 0 4rem 0" }}>Precision in Every Metric.</h2>
          <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginBottom: "8rem" }}>
             <Link to="/legacy" className="hover-target" style={{ padding: "1.5rem 4rem", borderRadius: "100px", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.15em", fontSize: "0.8rem" }}>Our Legacy</Link>
             <Link to="/contact" className="hover-target" style={{ padding: "1.5rem 4rem", borderRadius: "100px", background: "#fff", color: "#000", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.15em", fontSize: "0.8rem" }}>Contact Us</Link>
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
