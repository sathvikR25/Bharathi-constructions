import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import MenuOverlay from "../components/MenuOverlay";
import Header from "../components/Header";
import KineticText from "../components/KineticText";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [navOpen, setNavOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const mainRef = useRef(null);
  
  // Refs
  const preloaderRef = useRef(null);
  const counterRef = useRef(null);
  const heroSectionRef = useRef(null);
  const heroImgWrapRef = useRef(null);
  const textTopRef = useRef(null);
  const textBottomRef = useRef(null);
  const visionRef = useRef(null);
  const horizontalSectionRef = useRef(null);
  const horizontalTrackRef = useRef(null);
  const marqueeRef = useRef(null);

  useEffect(() => {
    // PRELOADER SEQUENCE
    let count = { val: 0 };
    gsap.to(count, {
      val: 100,
      duration: 2,
      ease: "power4.inOut",
      onUpdate: () => {
        if (counterRef.current) counterRef.current.innerText = Math.round(count.val) + "%";
      },
      onComplete: () => {
        gsap.to(preloaderRef.current, {
          yPercent: -100,
          duration: 1.2,
          ease: "power4.inOut",
          onComplete: () => {
            setLoaded(true);
            ScrollTrigger.refresh();
          }
        });
      }
    });
  }, []);

  useEffect(() => {
    if (!loaded) return;

    let ctx = gsap.context(() => {
      
      // 1. Hero Pinned Expansion
      const tlHero = gsap.timeline({
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: "top top",
          end: "+=150%",
          scrub: 1,
          pin: true
        }
      });
      tlHero.to(heroImgWrapRef.current, { width: "100vw", height: "100vh", borderRadius: "0px", ease: "power2.inOut" }, 0)
            .to(textTopRef.current, { y: "-150%", opacity: 0, ease: "power2.inOut" }, 0)
            .to(textBottomRef.current, { y: "150%", opacity: 0, ease: "power2.inOut" }, 0);

      // 2. The Vision (Text Reveal)
      const words = gsap.utils.toArray(".vision-word");
      gsap.fromTo(words, 
        { opacity: 0.1 },
        { 
          opacity: 1, 
          stagger: 0.1, 
          scrollTrigger: {
            trigger: visionRef.current,
            start: "top 70%",
            end: "bottom 50%",
            scrub: 1
          }
        }
      );

      // 3. Horizontal Scroll Section
      const track = horizontalTrackRef.current;
      if (track) {
        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
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

      // 4. Parallax Image Grid (Lifestyle)
      gsap.utils.toArray(".parallax-img").forEach(img => {
        const speed = img.getAttribute("data-speed") || 0.1;
        gsap.to(img, {
          yPercent: speed * 100,
          ease: "none",
          scrollTrigger: {
            trigger: img.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });

      // 5. Infinite Marquee
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 20,
        repeat: -1
      });

      // Non-linear scroll elements (floating text)
      gsap.utils.toArray(".parallax-layer").forEach(layer => {
        const speed = layer.getAttribute("data-speed") || 1;
        gsap.to(layer, {
          y: (i, el) => (1 - parseFloat(speed)) * (ScrollTrigger.maxScroll(window) - (el.offsetTop || 0)),
          ease: "none",
          scrollTrigger: { trigger: layer, start: "top bottom", end: "bottom top", scrub: true }
        });
      });

    }, mainRef);
    return () => ctx.revert();
  }, [loaded]);

  const visionText = "For over 40 years, we have refused to compromise. We don't just build structures; we engineer generational sanctuaries. Every beam, every vista, every meticulously crafted square foot is a testament to absolute perfection. This is Bharathi Constructions.".split(" ");

  return (
    <div ref={mainRef} style={{ background: "transparent", color: "#0a0a0a", overflowX: "hidden" }}>
      
      {/* PRELOADER */}
      <div ref={preloaderRef} style={{ position: "fixed", inset: 0, background: "transparent", zIndex: 9999, display: "flex", justifyContent: "flex-end", alignItems: "flex-end", padding: "4rem" }}>
         <h1 ref={counterRef} style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(5rem, 15vw, 15rem)", color: "#0a0a0a", margin: 0, lineHeight: 0.8 }}>0%</h1>
      </div>
      
      <Header theme="light" navOpen={navOpen} setNavOpen={setNavOpen} />
      <MenuOverlay navOpen={navOpen} setNavOpen={setNavOpen} />

      {/* 1. IMMERSIVE HERO */}
      <section ref={heroSectionRef} style={{ height: "100vh", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", zIndex: 5, pointerEvents: "none", width: "100%", textAlign: "center"}}>
          <h1 ref={textTopRef} style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(4rem, 12vw, 15rem)", margin: 0, color: "#0a0a0a", WebkitTextStroke: "2px #0a0a0a", lineHeight: 0.8, textTransform: "uppercase" }}>Bharathi</h1>
          <h1 ref={textBottomRef} style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(4rem, 12vw, 15rem)", margin: 0, color: "transparent", WebkitTextStroke: "3px #c9a96e", lineHeight: 0.8, fontStyle: "italic", textTransform: "uppercase" }}>Legacies</h1>
        </div>
        <div ref={heroImgWrapRef} style={{ position: "relative", zIndex: 1, width: "30vw", height: "40vh", borderRadius: "200px", overflow: "hidden", willChange: "transform, width, height, border-radius" }}>
          <img src="/horizon pics/BIRD_VIEW_FFFFFF.jpg" alt="Horizon Skyline" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.7) contrast(1.1)" }} />
        </div>
      </section>

      {/* 2. THE VISION */}
      <section style={{ padding: "15rem 4rem", background: "transparent", color: "#0a0a0a" }}>
        <div ref={visionRef} style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <span style={{ fontSize: "0.75rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#0a0a0a", fontWeight: "700", display: "block", marginBottom: "4rem" }}>Our Manifesto</span>
          <p style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2rem, 4vw, 4.5rem)", lineHeight: 1.4, margin: 0, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.4em" }}>
            {visionText.map((word, i) => <span key={i} className="vision-word" style={{ opacity: 0.1 }}>{word}</span>)}
          </p>
          <div style={{ marginTop: "6rem" }}>
            <Link to="/legacy" className="hover-target" style={{ display: "inline-flex", alignItems: "center", gap: "1rem", color: "#0a0a0a", textDecoration: "none", fontSize: "0.85rem", letterSpacing: "0.2em", textTransform: "uppercase", paddingBottom: "0.5rem", borderBottom: "1px solid rgba(0,0,0,0.2)" }}>Read Our Story <ArrowRight size={16}/></Link>
          </div>
        </div>
      </section>

      {/* 3. HORIZONTAL SCROLL JOURNEY */}
      <section ref={horizontalSectionRef} style={{ height: "100vh", position: "relative", background: "transparent", color: "#0a0a0a", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "100%", textAlign: "center", zIndex: 0, opacity: 0.03, pointerEvents: "none", whiteSpace: "nowrap" }}>
          <span style={{ fontFamily: "Playfair Display, serif", fontSize: "30vw", fontWeight: 700 }}>PORTFOLIO</span>
        </div>
        
        <div ref={horizontalTrackRef} style={{ display: "flex", height: "100%", alignItems: "center", gap: "15vw", padding: "0 10vw", width: "max-content", position: "relative", zIndex: 1 }}>
          
          <div className="horizontal-card-inner" style={{ width: "80vw", maxWidth: "1200px", display: "flex", gap: "6rem", alignItems: "center" }}>
            <div style={{ flex: 1, position: "relative" }}>
              <div style={{ width: "100%", aspectRatio: "4/5", overflow: "hidden", borderRadius: "20px" }}>
                <img src="/horizon pics/VIEW_04_FFFFFFF.jpg" style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="Horizon" />
              </div>
              <h2 className="parallax-layer" data-speed="1.3" style={{ position: "absolute", top: "10%", left: "-15%", fontFamily: "Playfair Display, serif", fontSize: "7vw", color: "#fff", margin: 0 }}>Horizon.</h2>
            </div>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#fff", background: "#c9a96e", padding: "0.5rem 1.2rem", borderRadius: "100px", display: "inline-block", marginBottom: "2rem", fontWeight: 600 }}>01 THE SKYLINE</span>
              <p style={{ fontSize: "1.5rem", lineHeight: 1.6, color: "#333", maxWidth: "400px", marginBottom: "3rem" }}>A modern high-rise project with excellent views and natural ventilation.</p>
              <Link to="/horizon" className="hover-target" style={{ display: "inline-flex", alignItems: "center", gap: "1rem", color: "#0a0a0a", textDecoration: "none", fontSize: "0.85rem", letterSpacing: "0.2em", textTransform: "uppercase", paddingBottom: "0.5rem", borderBottom: "1px solid rgba(0,0,0,0.3)" }}>View Horizon <ArrowRight size={16}/></Link>
            </div>
          </div>

          <div className="horizontal-card-inner" style={{ width: "80vw", maxWidth: "1200px", display: "flex", gap: "6rem", alignItems: "center", flexDirection: "row-reverse" }}>
            <div style={{ flex: 1, position: "relative" }}>
              <div style={{ width: "100%", aspectRatio: "4/5", overflow: "hidden", borderRadius: "20px" }}>
                <img src="/lakewood-media/lakewood-cover.jpg" style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="Lake Woods" />
              </div>
              <h2 className="parallax-layer" data-speed="0.7" style={{ position: "absolute", bottom: "10%", right: "-15%", fontFamily: "Playfair Display, serif", fontSize: "7vw", color: "#fff", margin: 0, textAlign: "right" }}>Lake<br/>Woods.</h2>
            </div>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#fff", background: "#c9a96e", padding: "0.5rem 1.2rem", borderRadius: "100px", display: "inline-block", marginBottom: "2rem", fontWeight: 600 }}>02 THE SANCTUARY</span>
              <p style={{ fontSize: "1.5rem", lineHeight: 1.6, color: "#333", maxWidth: "400px", marginBottom: "3rem" }}>A premium residential community located in a peaceful environment.</p>
              <Link to="/lake-woods" className="hover-target" style={{ display: "inline-flex", alignItems: "center", gap: "1rem", color: "#0a0a0a", textDecoration: "none", fontSize: "0.85rem", letterSpacing: "0.2em", textTransform: "uppercase", paddingBottom: "0.5rem", borderBottom: "1px solid rgba(0,0,0,0.3)" }}>View Lake Woods <ArrowRight size={16}/></Link>
            </div>
          </div>

        </div>
      </section>

      {/* 4. LIFESTYLE PARALLAX GRID */}
      <section style={{ padding: "15rem 4rem", background: "transparent", color: "#0a0a0a" }}>
        <div style={{ maxWidth: "1600px", margin: "0 auto" }}>
           <div style={{ textAlign: "center", marginBottom: "10rem" }}>
             <KineticText as="h2" text="Our Projects." style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(3rem, 6vw, 6rem)", margin: 0, color: "#0a0a0a" }} />
             <p style={{ fontSize: "1.2rem", color: "#666", maxWidth: "600px", margin: "2rem auto 0" }}>Beyond bricks and mortar, we curate environments that elevate your daily existence.</p>
           </div>

           <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "2rem", alignItems: "center" }}>
              <div style={{ gridColumn: "1 / 6", height: "600px", overflow: "hidden", borderRadius: "24px" }}>
                 <img className="parallax-img" data-speed="0.15" src="/horizon pics/VIEW_08_FFFFF.jpg" alt="Pool" style={{ width: "100%", height: "130%", objectFit: "cover", transform: "translateY(-15%)" }} />
              </div>
              <div style={{ gridColumn: "7 / 13", height: "800px", overflow: "hidden", borderRadius: "24px", marginTop: "10rem" }}>
                 <img className="parallax-img" data-speed="-0.15" src="/lakewood-media/view 06_FFFFFF copy.jpg" alt="Lobby" style={{ width: "100%", height: "130%", objectFit: "cover", transform: "translateY(0%)" }} />
              </div>
              <div style={{ gridColumn: "3 / 11", height: "700px", overflow: "hidden", borderRadius: "24px", marginTop: "-5rem", zIndex: 2, border: "20px solid #fdfbf7" }}>
                 <img className="parallax-img" data-speed="0.2" src="/horizon pics/view_07_FFFFFFF.jpg" alt="Nature" style={{ width: "100%", height: "130%", objectFit: "cover", transform: "translateY(-10%)" }} />
              </div>
           </div>
        </div>
      </section>

      {/* 5. INFINITE MARQUEE */}
      <section style={{ padding: "8rem 0", background: "transparent", overflow: "hidden", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
         <div style={{ display: "flex", width: "200vw" }}>
           <div ref={marqueeRef} style={{ display: "flex", whiteSpace: "nowrap", alignItems: "center" }}>
              {[1,2,3,4,5,6].map(i => (
                <div key={i} style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ fontFamily: "Playfair Display, serif", fontSize: "6rem", color: "#0a0a0a", WebkitTextStroke: "none", fontWeight: "700", margin: "0 4rem", textTransform: "uppercase" }}>Bharathi Constructions</span>
                  <span style={{ fontSize: "2rem", color: "rgba(0,0,0,0.5)" }}>âœ¦</span>
                </div>
              ))}
           </div>
         </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "transparent", color: "#0a0a0a", padding: "12rem 4rem 4rem", position: "relative", zIndex: 10 }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(3rem, 8vw, 8rem)", color: "#0a0a0a", margin: "0 0 4rem 0" }}>Precision in Every Metric.</h2>
          <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginBottom: "8rem" }}>
             <Link to="/legacy" className="hover-target" style={{ padding: "1.5rem 4rem", borderRadius: "100px", border: "1px solid rgba(0,0,0,0.2)", color: "#0a0a0a", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.15em", fontSize: "0.8rem", transition: "background 0.3s" }} onMouseEnter={e => {e.target.style.background="#0a0a0a"; e.target.style.color="#fff";}} onMouseLeave={e => {e.target.style.background="transparent"; e.target.style.color="#0a0a0a";}}>Our Legacy</Link>
             <Link to="/contact" className="hover-target" style={{ padding: "1.5rem 4rem", borderRadius: "100px", background: "#0a0a0a", color: "#fff", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.15em", fontSize: "0.8rem", transition: "transform 0.3s" }} onMouseEnter={e => e.target.style.transform="scale(1.05)"} onMouseLeave={e => e.target.style.transform="scale(1)"}>Contact Us</Link>
          </div>
          <div style={{ height: "1px", background: "rgba(0,0,0,0.06)", marginBottom: "3rem" }} />
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", fontSize: "0.75rem", color: "rgba(0,0,0,0.4)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            <span>Â© 2026 Bharathi Constructions.</span>
            <span>Hyderabad, Telangana</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

