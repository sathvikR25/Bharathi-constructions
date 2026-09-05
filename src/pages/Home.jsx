import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import MenuOverlay from "../components/MenuOverlay";
import Header from "../components/Header";
import SEO from "../components/SEO";
import KineticText from "../components/KineticText";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [navOpen, setNavOpen] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
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
      
      
      // Onboarding Hero Text Reveal
      gsap.fromTo(".hero-onboarding-text",
        { y: 80, opacity: 0, rotateX: 20 },
        { y: 0, opacity: 1, rotateX: 0, stagger: 0.15, duration: 1.5, ease: "power3.out" }
      );
      
      // 0. Scroll Indicator Animation
      gsap.to(".scroll-indicator-line", {
        y: "200%",
        duration: 1.5,
        repeat: -1,
        ease: "power2.inOut"
      });

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
    <div ref={mainRef} style={{ background: "transparent", color: "#123645", overflowX: "hidden" }}>
      
      {/* PRELOADER */}
      <div ref={preloaderRef} style={{ position: "fixed", inset: 0, background: "transparent", zIndex: 9999, display: "flex", justifyContent: "flex-end", alignItems: "flex-end", padding: "4rem", pointerEvents: "none" }}>
      </div>
      
      <Header theme="light" navOpen={navOpen} setNavOpen={setNavOpen} />
      <MenuOverlay navOpen={navOpen} setNavOpen={setNavOpen} />

      {/* 0. ONBOARDING VIDEO HERO */}
      <section onMouseMove={(e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 30;
        const y = (e.clientY / window.innerHeight - 0.5) * 30;
        setMousePos({ x, y });
      }} style={{ height: "100vh", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "#050505", perspective: "1000px" }}>
        
        {/* PARALLAX VIDEO BACKGROUND */}
        <video autoPlay loop muted playsInline style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.65, transform: `scale(1.05) translate(${mousePos.x}px, ${mousePos.y}px)`, transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)" }}>
          <source src="/onboarding.mp4" type="video/mp4" />
        </video>

        {/* CINEMATIC VIGNETTE OVERLAY */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.8) 100%)", zIndex: 0, pointerEvents: "none" }} />
        
        {/* TOP GRACEFUL TEXT */}
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", color: "#fff", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div className="hero-onboarding-text" style={{ overflow: "hidden", marginBottom: "2rem" }}>
            <span style={{ fontSize: "0.85rem", letterSpacing: "0.5em", textTransform: "uppercase", display: "inline-block", opacity: 0.9, borderBottom: "1px solid rgba(255,255,255,0.2)", paddingBottom: "0.8rem", color: "#c9a96e" }}>A New Standard of Living</span>
          </div>

          <div style={{ perspective: "800px" }}>
            <h1 className="hero-onboarding-text" style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(4rem, 11vw, 12rem)", margin: 0, lineHeight: 0.9, color: "#fff", textTransform: "uppercase", letterSpacing: "0.02em", textShadow: "0 20px 50px rgba(0,0,0,0.8)" }}>Bharathi</h1>
          </div>
          <div style={{ perspective: "800px" }}>
            <h1 className="hero-onboarding-text" style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2rem, 5vw, 6rem)", margin: 0, lineHeight: 1, color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.7)", fontStyle: "italic", textTransform: "uppercase", letterSpacing: "0.15em", marginTop: "0.5rem" }}>Constructions</h1>
          </div>
        </div>

        {/* SCROLL INDICATOR */}
        <div className="hero-onboarding-text" style={{ position: "absolute", bottom: "3rem", left: "50%", transform: "translateX(-50%)", textAlign: "center", color: "#fff", zIndex: 1 }}>
          <span style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", display: "block", marginBottom: "1rem", opacity: 0.5 }}>Scroll to Explore</span>
          <div style={{ width: "1px", height: "80px", background: "rgba(255,255,255,0.15)", margin: "0 auto", position: "relative", overflow: "hidden" }}>
             <div className="scroll-indicator-line" style={{ position: "absolute", top: "-100%", left: 0, width: "100%", height: "100%", background: "linear-gradient(to bottom, transparent, #c9a96e, #fff)" }} />
          </div>
        </div>
      </section>

      {/* 1. IMMERSIVE HERO */}
      <section ref={heroSectionRef} style={{ height: "100vh", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", zIndex: 5, pointerEvents: "none", width: "100%", textAlign: "center"}}>
          <h1 ref={textTopRef} style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(4rem, 12vw, 15rem)", margin: 0, color: "#123645", WebkitTextStroke: "2px #123645", lineHeight: 0.8, textTransform: "uppercase" }}>Bharathi</h1>
          <h1 ref={textBottomRef} style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2.5rem, 8.5vw, 15rem)", margin: 0, color: "transparent", WebkitTextStroke: "3px #c9a96e", lineHeight: 0.8, fontStyle: "italic", textTransform: "uppercase" }}>Constructions</h1>
        </div>
        <div ref={heroImgWrapRef} style={{ position: "relative", zIndex: 1, width: "30vw", height: "40vh", borderRadius: "200px", overflow: "hidden", willChange: "transform, width, height, border-radius" }}>
          <img src="/horizon pics/BIRD_VIEW_FFFFFF.jpg" alt="Horizon Skyline" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.7) contrast(1.1)" }} />
        </div>
      </section>

      {/* 2. THE VISION */}
      <section style={{ padding: "clamp(6rem,15vw,15rem) clamp(1.5rem, 5vw, 4rem)", background: "transparent", color: "#123645" }}>
        <div ref={visionRef} style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <span style={{ fontSize: "0.75rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#123645", fontWeight: "700", display: "block", marginBottom: "4rem" }}>Our Manifesto</span>
          <p style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2rem, 4vw, 4.5rem)", lineHeight: 1.4, margin: 0, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.4em" }}>
            {visionText.map((word, i) => <span key={i} className="vision-word" style={{ opacity: 0.1 }}>{word}</span>)}
          </p>
          <div style={{ marginTop: "6rem" }}>
            <Link to="/legacy" className="hover-target" style={{ display: "inline-flex", alignItems: "center", gap: "1rem", color: "#123645", textDecoration: "none", fontSize: "0.85rem", letterSpacing: "0.2em", textTransform: "uppercase", paddingBottom: "0.5rem", borderBottom: "1px solid rgba(0,0,0,0.2)" }}>Read Our Story <ArrowRight size={16}/></Link>
          </div>
        </div>
      </section>

      {/* 2.5 PROJECTS INTRO */}
      <section style={{ padding: "clamp(8rem,12vw,12rem) clamp(1.5rem, 5vw, 4rem) 0", background: "transparent", color: "#123645", textAlign: "center" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <KineticText as="h2" text="Our Projects." style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(3.5rem, 8vw, 8rem)", margin: 0, color: "#123645", justifyContent: "center" }} />
          <p style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)", color: "#666", maxWidth: "600px", margin: "1rem auto 0" }}>Beyond bricks and mortar, we curate environments that elevate your daily existence.</p>
        </div>
      </section>

      {/* 3. HORIZONTAL SCROLL JOURNEY */}
      <section ref={horizontalSectionRef} style={{ height: "100vh", position: "relative", background: "transparent", color: "#123645", overflow: "hidden" }}>
        
        {/* Faded Background Text */}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "100%", textAlign: "center", zIndex: 0, opacity: 0.03, pointerEvents: "none", whiteSpace: "nowrap" }}>
          <span style={{ fontFamily: "Playfair Display, serif", fontSize: "30vw", fontWeight: 700 }}>PORTFOLIO</span>
        </div>
        
        <div ref={horizontalTrackRef} style={{ display: "flex", height: "100%", alignItems: "center", gap: "15vw", padding: "0 10vw", width: "max-content", position: "relative", zIndex: 1 }}>
          
          <div className="horizontal-card-inner" style={{ width: "120vw", flexShrink: 0, display: "flex", gap: "5vw", alignItems: "center" }}>
            <div style={{ flex: "0 0 55%", position: "relative" }}>
              <div style={{ width: "100%", aspectRatio: "4/5", overflow: "hidden", borderRadius: "2vw" }}>
                <img src="/horizon pics/BIRD_VIEW_FFFFFF.jpg" style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="Horizon" />
              </div>
              <h2 className="parallax-layer" data-speed="1.3" style={{ position: "absolute", top: "10%", left: "-10%", fontFamily: "Playfair Display, serif", fontSize: "clamp(5rem, 14vw, 15rem)", color: "#fff", margin: 0, whiteSpace: "nowrap" }}>Horizon.</h2>
            </div>
            <div style={{ flex: "0 0 40%", paddingRight: "4vw" }}>
              <span style={{ fontSize: "clamp(0.75rem, 1vw, 1.2rem)", letterSpacing: "0.25em", textTransform: "uppercase", color: "#fff", background: "#c9a96e", padding: "0.8em 2em", borderRadius: "100px", display: "inline-block", marginBottom: "3vw", fontWeight: 600 }}>01 HORIZON</span>
              <p style={{ fontSize: "clamp(1.5rem, 2.5vw, 3.5rem)", lineHeight: 1.4, color: "#1b4a5e", marginBottom: "4vw" }}>An exclusive collection of 128 premium luxury flats designed for those who choose to live at the very top.</p>
              <Link to="/horizon" className="hover-target" style={{ display: "inline-flex", alignItems: "center", gap: "1rem", color: "#123645", textDecoration: "none", fontSize: "clamp(0.9rem, 1.2vw, 1.5rem)", letterSpacing: "0.2em", textTransform: "uppercase", paddingBottom: "0.8rem", borderBottom: "2px solid rgba(0,0,0,0.3)" }}>View Horizon <ArrowRight size={24}/></Link>
            </div>
          </div>

          <div className="horizontal-card-inner" style={{ width: "120vw", flexShrink: 0, display: "flex", gap: "5vw", alignItems: "center", flexDirection: "row-reverse" }}>
            <div style={{ flex: "0 0 55%", position: "relative" }}>
              <div style={{ width: "100%", aspectRatio: "4/5", overflow: "hidden", borderRadius: "2vw" }}>
                <img src="/lakewood-media/lakewood-cover.jpg" style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="Lake Woods" />
              </div>
              <h2 className="parallax-layer" data-speed="0.7" style={{ position: "absolute", bottom: "10%", right: "-10%", fontFamily: "Playfair Display, serif", fontSize: "clamp(5rem, 14vw, 15rem)", color: "#fff", margin: 0, textAlign: "right", whiteSpace: "nowrap" }}>Lake<br/>Woods.</h2>
            </div>
            <div style={{ flex: "0 0 40%", paddingLeft: "4vw" }}>
              <span style={{ fontSize: "clamp(0.75rem, 1vw, 1.2rem)", letterSpacing: "0.25em", textTransform: "uppercase", color: "#fff", background: "#c9a96e", padding: "0.8em 2em", borderRadius: "100px", display: "inline-block", marginBottom: "3vw", fontWeight: 600 }}>02 LAKE WOODS</span>
              <p style={{ fontSize: "clamp(1.5rem, 2.5vw, 3.5rem)", lineHeight: 1.4, color: "#1b4a5e", marginBottom: "4vw" }}>Nestled in lush greenery at Suchitra &mdash; a premium flats community crafted for tranquil living.</p>
              <Link to="/lake-woods" className="hover-target" style={{ display: "inline-flex", alignItems: "center", gap: "1rem", color: "#123645", textDecoration: "none", fontSize: "clamp(0.9rem, 1.2vw, 1.5rem)", letterSpacing: "0.2em", textTransform: "uppercase", paddingBottom: "0.8rem", borderBottom: "2px solid rgba(0,0,0,0.3)" }}>View Lake Woods <ArrowRight size={24}/></Link>
            </div>
          </div>

        </div>
      </section>

      {/* 4. LIFESTYLE PARALLAX GRID */}
      <section style={{ padding: "clamp(5rem,15vw,15rem) clamp(1.5rem, 5vw, 4rem)", background: "transparent", color: "#123645" }}>
        <div style={{ maxWidth: "1600px", margin: "0 auto" }}>

           {/* Mobile: simple stack. Desktop: overlapping grid */}
           <div className="parallax-mobile-stack" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div style={{ height: "clamp(240px, 50vw, 600px)", overflow: "hidden", borderRadius: "24px" }}>
                 <img className="parallax-img" data-speed="0.15" src="/horizon pics/VIEW_08_FFFFF.jpg" alt="Pool" style={{ width: "100%", height: "130%", objectFit: "cover", transform: "translateY(-15%)" }} />
              </div>
              <div style={{ height: "clamp(240px, 50vw, 600px)", overflow: "hidden", borderRadius: "24px" }}>
                 <img className="parallax-img" data-speed="-0.15" src="/lakewood-media/view 06_FFFFFF copy.jpg" alt="Lobby" style={{ width: "100%", height: "130%", objectFit: "cover" }} />
              </div>
              <div style={{ height: "clamp(240px, 50vw, 600px)", overflow: "hidden", borderRadius: "24px" }}>
                 <img className="parallax-img" data-speed="0.2" src="/horizon pics/view_07_FFFFFFF.jpg" alt="Nature" style={{ width: "100%", height: "130%", objectFit: "cover", transform: "translateY(-10%)" }} />
              </div>
              <div style={{ height: "clamp(240px, 50vw, 600px)", overflow: "hidden", borderRadius: "24px" }}>
                <img className="parallax-img" data-speed="-0.12" src="/lakewood-media/View 05_FFFFF copy.jpg" alt="Amenity" style={{ width: "100%", height: "130%", objectFit: "cover", transform: "translateY(-10%)" }} />
              </div>
              <div style={{ height: "clamp(240px, 50vw, 600px)", overflow: "hidden", borderRadius: "24px" }}>
                <img className="parallax-img" data-speed="0.18" src="/horizon pics/view_10_FFFFFF.jpg" alt="Exterior" style={{ width: "100%", height: "130%", objectFit: "cover", transform: "translateY(-10%)" }} />
              </div>
              <div style={{ height: "clamp(240px, 50vw, 600px)", overflow: "hidden", borderRadius: "24px" }}>
                <img className="parallax-img" data-speed="-0.2" src="/lakewood-media/View 02_FFFFF copy.jpg" alt="Facade" style={{ width: "100%", height: "130%", objectFit: "cover", transform: "translateY(-10%)" }} />
              </div>
              <div style={{ height: "clamp(240px, 50vw, 600px)", overflow: "hidden", borderRadius: "24px" }}>
                <img className="parallax-img" data-speed="0.15" src="/horizon pics/view_09_FFFFFFF.jpg" alt="Driveway" style={{ width: "100%", height: "130%", objectFit: "cover", transform: "translateY(-10%)" }} />
              </div>
           </div>
        </div>
      </section>

      {/* 5. INFINITE MARQUEE */}
      <section style={{ padding: "clamp(4rem,8vw,8rem) 0", background: "transparent", overflow: "hidden", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
         <div style={{ display: "flex", width: "200vw" }}>
           <div ref={marqueeRef} style={{ display: "flex", whiteSpace: "nowrap", alignItems: "center" }}>
              {[1,2,3,4,5,6].map(i => (
                <div key={i} style={{ display: "flex", alignItems: "center" }}>
                  <span className="marquee-text" style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(3rem, 6vw, 6rem)", color: "#123645", fontWeight: "700", margin: "0 clamp(1.5rem, 4vw, 4rem)", textTransform: "uppercase" }}>Bharathi Constructions</span>
                </div>
              ))}
           </div>
         </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "transparent", color: "#123645", padding: "12rem 4rem 4rem", position: "relative", zIndex: 10 }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(3rem, 8vw, 8rem)", color: "#123645", margin: "0 0 4rem 0", textAlign: "center" }}>Precision in Every Metric.</h2>
          <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginBottom: "8rem" }}>
             <Link to="/legacy" className="hover-target" style={{ padding: "1.5rem 4rem", borderRadius: "100px", border: "1px solid rgba(0,0,0,0.2)", color: "#123645", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.15em", fontSize: "0.8rem", transition: "background 0.3s" }} onMouseEnter={e => {e.target.style.background="#123645"; e.target.style.color="#fff";}} onMouseLeave={e => {e.target.style.background="transparent"; e.target.style.color="#123645";}}>Our Legacy</Link>
             <Link to="/contact" className="hover-target" style={{ padding: "1.5rem 4rem", borderRadius: "100px", background: "#123645", color: "#fff", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.15em", fontSize: "0.8rem", transition: "transform 0.3s" }} onMouseEnter={e => e.target.style.transform="scale(1.05)"} onMouseLeave={e => e.target.style.transform="scale(1)"}>Contact Us</Link>
          </div>

          <div style={{ height: "1px", background: "rgba(0,0,0,0.06)", marginBottom: "3rem" }} />

          {/* Footer Info Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "3rem", marginBottom: "3rem" }}>
            <div>
              <span style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", display: "block", marginBottom: "1rem" }}>Office</span>
              <p style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "rgba(0,0,0,0.6)", margin: 0 }}>Delight Square, 3rd Floor<br />Suchitra X Roads<br />Hyderabad â€” 500067</p>
            </div>
            <div>
              <span style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", display: "block", marginBottom: "1rem" }}>Contact</span>
              <a href="tel:+917997992051" style={{ display: "block", fontSize: "0.9rem", color: "rgba(0,0,0,0.6)", textDecoration: "none", lineHeight: 2, transition: "color 0.3s" }} onMouseEnter={e => e.target.style.color="#123645"} onMouseLeave={e => e.target.style.color="rgba(0,0,0,0.6)"}>+91 79979 92051</a>
              <a href="mailto:bharathiconstructionshyd1@gmail.com" style={{ display: "block", fontSize: "0.9rem", color: "rgba(0,0,0,0.6)", textDecoration: "none", lineHeight: 2, transition: "color 0.3s" }} onMouseEnter={e => e.target.style.color="#123645"} onMouseLeave={e => e.target.style.color="rgba(0,0,0,0.6)"}>bharathiconstructionshyd1@gmail.com</a>
            </div>
            <div>
              <span style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", display: "block", marginBottom: "1rem" }}>Navigate</span>
              {[["Our Legacy", "/legacy"], ["Bharathi Horizon", "/horizon"], ["Lake Woods", "/lake-woods"], ["Builder Profile", "/builder-profile"]].map(([label, href]) => (
                <Link key={href} to={href} style={{ display: "block", fontSize: "0.9rem", color: "rgba(0,0,0,0.6)", textDecoration: "none", lineHeight: 2, transition: "color 0.3s" }} onMouseEnter={e => e.target.style.color="#123645"} onMouseLeave={e => e.target.style.color="rgba(0,0,0,0.6)"}>{label}</Link>
              ))}
            </div>
          </div>

          <div style={{ height: "1px", background: "rgba(0,0,0,0.06)", marginBottom: "2rem" }} />
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", fontSize: "0.75rem", color: "rgba(0,0,0,0.3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            <span>Â© 2026 Bharathi Constructions. All Rights Reserved.</span>
            <span>Hyderabad, Telangana</span>
          </div>
        </div>
      </footer>
    </div>
  );
}



