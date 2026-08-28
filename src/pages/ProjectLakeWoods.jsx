import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, TreePine, Gamepad, Zap, MapPin, Compass, Maximize, Home, Layers } from "lucide-react";
import MenuOverlay from "../components/MenuOverlay";

gsap.registerPlugin(ScrollTrigger);

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Projects", href: "/#projects" },
  { label: "Locations", href: "/#locations" },
  { label: "Enquiry", href: "/#contact" }
];

export default function ProjectLakeWoods() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mainRef = useRef(null);
  const horizontalRef = useRef(null);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    
    // Native CSS Fades (Safe)
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    
    document.querySelectorAll(".animate-on-scroll").forEach(el => obs.observe(el));
    
    // GSAP Advanced Animations (Parallax & Horizontal Scroll)
    let ctx = gsap.context(() => {
      
      // Hero Parallax
      gsap.to(".hero-bg", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // Horizontal Scroll Gallery
      const sections = gsap.utils.toArray(".horizontal-panel");
      if (horizontalRef.current && sections.length > 0) {
        gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: horizontalRef.current,
            pin: true,
            scrub: 1,
            snap: 1 / (sections.length - 1),
            end: () => "+=" + horizontalRef.current.offsetWidth
          }
        });
      }

      // 3D Image Parallax on Sections
      gsap.utils.toArray(".parallax-img-container").forEach(container => {
        const img = container.querySelector("img");
        if(img) {
          gsap.to(img, {
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          });
        }
      });

    }, mainRef);
    
    // Refresh ScrollTrigger after all images load to prevent calculation bugs
    const refreshST = () => ScrollTrigger.refresh();
    setTimeout(refreshST, 500);
    setTimeout(refreshST, 1500);
    window.addEventListener("load", refreshST);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("load", refreshST);
      obs.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <div ref={mainRef} style={{ background: "var(--paper)", color: "var(--ink)", overflowX: "hidden" }}>
      
      {/* HEADER */}
      <header className={`site-header dark-mode ${navOpen ? "nav-open" : ""} ${scrolled ? "scrolled" : ""}`} style={{position: "fixed", width: "100%", zIndex: 100}}>
        <div className="header-inner" style={{maxWidth:"1600px", margin:"0 auto", padding:"0 2rem", height:"100px", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <Link to="/" className="logo-block" style={{textDecoration:"none"}}>
            <img src="/logo.png" alt="Bharathi Constructions" className="logo-img" decoding="async" style={{height: "60px", width: "auto"}} />
          </Link>
          <div style={{display:"flex", alignItems:"center", gap:"2rem"}}>
            <a href="/#booking" className="clay-btn skeuo-gold-text" style={{padding: "0.6rem 1.5rem", border: "1px solid var(--gold)"}}>Site Visit</a>
            <button className="menu-toggle" onClick={() => setNavOpen(!navOpen)}>
              <span style={{fontSize:"0.85rem", letterSpacing:"0.2em", textTransform:"uppercase", fontWeight: 600}}>{navOpen ? "Close" : "Menu"}</span>
            </button>
          </div>
        </div>
      </header>

      <MenuOverlay navOpen={navOpen} setNavOpen={setNavOpen} />

      {/* 1. HERO SECTION */}
      <section className="hero-section" style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden", display: "flex", alignItems: "center", justifyItems: "center" }}>
        <img src="/lakewood-media/lakewood-cover.jpg" alt="Lake Woods Exterior" className="hero-bg" style={{ position: "absolute", top: "-15%", left: 0, width: "100%", height: "130%", objectFit: "cover", zIndex: 1 }} fetchPriority="high" />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 50%, rgba(10,10,10,0.9) 100%)", zIndex: 2 }}></div>
        
        <div style={{ position: "relative", zIndex: 3, width: "100%", textAlign: "center", padding: "0 2rem", marginTop: "10rem" }} className="animate-on-scroll fade-up">
          <img src="/lakewood-media/lakewood-logo.png" alt="Lakewood Logo" style={{ width: "350px", maxWidth: "80%", margin: "0 auto", filter: "brightness(0) invert(1)" }} />
          <div style={{ display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", gap: "0.5rem", marginTop: "2rem", color: "var(--gold)" }}>
            <MapPin size={20} />
            <span style={{ fontSize: "1rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#fff" }}>NCL Colony, Kompally</span>
          </div>
        </div>
      </section>

      {/* 2. THE VISION - RENDER VIEWS */}
      <section style={{ padding: "8rem 2rem", background: "var(--paper)" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div className="animate-on-scroll fade-up" style={{ textAlign: "center", marginBottom: "5rem" }}>
            <span style={{ fontSize: "0.9rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold-dark)", fontWeight: 600 }}>The Vision</span>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2.5rem, 4vw, 4rem)", color: "var(--ink)", marginTop: "1rem" }}>A Benchmark in Exclusivity</h2>
            <div style={{ width: "60px", height: "2px", background: "var(--gold)", margin: "2rem auto" }}></div>
            <p style={{ fontSize: "1.2rem", color: "var(--ink-2)", maxWidth: "800px", margin: "0 auto", lineHeight: 1.8 }}>
              Lake Woods is a meticulously crafted residential enclave comprising precisely 40 ultra-premium 3 BHK apartments. Rising across 8+2 floors, the architecture seamlessly integrates modern elegance with lush natural surroundings.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "2rem" }}>
            <div className="animate-on-scroll fade-up parallax-img-container" style={{ overflow: "hidden", borderRadius: "12px", height: "600px", position: "relative" }}>
              <img src="/lakewood-media/View 01_FFFFF copy.jpg" style={{ width: "100%", height: "130%", objectFit: "cover", position: "absolute", top: "-15%" }} alt="View 01" loading="lazy" />
            </div>
            <div className="animate-on-scroll fade-up parallax-img-container" style={{ overflow: "hidden", borderRadius: "12px", height: "600px", position: "relative", transitionDelay: "200ms" }}>
              <img src="/lakewood-media/View 02_FFFFF copy.jpg" style={{ width: "100%", height: "130%", objectFit: "cover", position: "absolute", top: "-15%" }} alt="View 02" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. HORIZONTAL SCROLL GALLERY (IMMERSIVE RENDER SHOWCASE) */}
      <section ref={horizontalRef} style={{ width: "100%", height: "100vh", display: "flex", flexWrap: "nowrap", overflow: "hidden", background: "var(--ink)" }}>
        {["View 03_FFFFFF copy.jpg", "View 04_ffffff copy.jpg", "View 05_FFFFF copy.jpg", "view 06_FFFFFF copy.jpg"].map((img, idx) => (
          <div key={idx} className="horizontal-panel" style={{ flex: "0 0 100vw", height: "100vh", position: "relative" }}>
            <img src={`/lakewood-media/${img}`} alt={`Render ${idx+3}`} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.8 }} loading="lazy" />
            <div style={{ position: "absolute", bottom: "10%", left: "5%", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(10px)", padding: "2rem", borderRadius: "8px", borderLeft: "4px solid var(--gold)", color: "#fff", maxWidth: "400px" }}>
              <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: "2rem", marginBottom: "0.5rem" }}>Signature Spaces</h3>
              <p style={{ fontSize: "1rem", letterSpacing: "0.1em", color: "var(--paper-2)", opacity: 0.9 }}>Unmatched luxury at every angle. Impeccable finishes designed for the elite.</p>
            </div>
          </div>
        ))}
      </section>

      {/* 4. BROCHURE HIGHLIGHTS - ALTERNATING SECTIONS */}
      <section style={{ padding: "8rem 2rem", background: "#f9f6ee" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "8rem" }}>
          
          {[
            { img: "lake-woods-brohure-page-0005.jpg", title: "Uncompromised Quality", desc: "Every square foot is planned to provide a holistic, resort-like lifestyle right in the heart of Hyderabad." },
            { img: "lake-woods-brohure-page-0007.jpg", title: "Lush Green Landscapes", desc: "Wake up to tranquil breezes. Dedicated pedestrian zones and massive green covers integrate seamlessly." },
            { img: "lake-woods-brohure-page-0009.jpg", title: "Modern Amenities", desc: "A grand entrance lounge, mini-theatre, and communal zones engineered for modern living." },
            { img: "lake-woods-brohure-page-0012.jpg", title: "Absolute Privacy", desc: "Zero dead space corridors. Only the finest materials used to guarantee a serene, private environment." }
          ].map((item, idx) => (
            <div key={idx} className="animate-on-scroll fade-up" style={{ display: "flex", flexDirection: idx % 2 === 0 ? "row" : "row-reverse", alignItems: "center", gap: "4rem", flexWrap: "wrap" }}>
              <div style={{ flex: "1 1 500px", borderRadius: "12px", overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}>
                <img src={`/lakewood-media/${item.img}`} alt={item.title} style={{ width: "100%", height: "auto", display: "block" }} loading="lazy" className="hover-zoom" />
              </div>
              <div style={{ flex: "1 1 400px" }}>
                <span style={{ fontSize: "3rem", color: "var(--gold)", opacity: 0.3, fontFamily: "Playfair Display, serif", lineHeight: 1 }}>0{idx+1}</span>
                <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: "2.5rem", color: "var(--ink)", marginTop: "1rem", marginBottom: "1.5rem" }}>{item.title}</h3>
                <p style={{ fontSize: "1.15rem", color: "var(--ink-2)", lineHeight: 1.8 }}>{item.desc}</p>
                <div style={{ width: "40px", height: "2px", background: "var(--gold)", marginTop: "2rem" }}></div>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* 5. 3D VIEWS & RESIDENCES */}
      <section style={{ padding: "8rem 2rem", background: "#fdfbf7" }}>
        <div style={{ maxWidth: "1600px", margin: "0 auto" }}>
          <div className="animate-on-scroll fade-up" style={{ textAlign: "center", marginBottom: "6rem" }}>
            <span style={{ fontSize: "0.9rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold-dark)", fontWeight: 600 }}>Floor Plans</span>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2.5rem, 4vw, 4rem)", color: "var(--ink)", marginTop: "1rem" }}>3D Views & Residences</h2>
            <div style={{ width: "60px", height: "2px", background: "var(--gold)", margin: "2rem auto" }}></div>
            <p style={{ fontSize: "1.15rem", color: "var(--ink-2)", marginTop: "1rem", maxWidth: "700px", margin: "0 auto" }}>
              Intelligently designed layouts ensuring 100% Vastu compliance, zero dead space, and unparalleled luxury in every square foot.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))", gap: "4rem" }}>
            {[
              { img: "SECTION 3__ 2290 - f.jpg", flat: "Flat 1", facing: "East Facing", sqft: "2290 sqft", type: "3 BHK" },
              { img: "SECTION 4 __ 2285 -f.jpg", flat: "Flat 2", facing: "West Facing", sqft: "2285 sqft", type: "3 BHK" },
              { img: "SECTION 1__ 2675 - SQ.F.jpg", flat: "Flat 3", facing: "East Facing", sqft: "2675 sqft", type: "3 BHK" },
              { img: "SECTION 2__ 2680 - F.jpg", flat: "Flat 4", facing: "West Facing", sqft: "2680 sqft", type: "3 BHK" }
            ].map((plan, idx) => (
              <div 
                key={idx} 
                className="animate-on-scroll residence-card" 
                style={{ background: "#fff", borderRadius: "16px", padding: "3rem", transitionDelay: `${(idx % 2) * 150}ms`, border: "1px solid rgba(0,0,0,0.03)" }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const xPct = x / rect.width - 0.5;
                  const yPct = y / rect.height - 0.5;
                  const inner = e.currentTarget.querySelector('.residence-card-inner');
                  if(inner) inner.style.transform = `rotateY(${xPct * 10}deg) rotateX(${-yPct * 10}deg)`;
                }}
                onMouseLeave={(e) => {
                  const inner = e.currentTarget.querySelector('.residence-card-inner');
                  if(inner) inner.style.transform = 'rotateY(0deg) rotateX(0deg)';
                }}
              >
                <div className="residence-card-inner" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                  <div style={{ position: "relative", marginBottom: "3rem", flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {/* The mix-blend-mode makes the JPEG white background completely transparent against the #fff card */}
                    <img src={`/lakewood-media/${plan.img}`} alt={plan.flat} className="residence-img" style={{ width: "90%", height: "auto", display: "block", margin: "0 auto" }} loading="lazy" />
                  </div>
                  <div className="residence-details" style={{ borderTop: "1px solid rgba(201,169,110,0.3)", paddingTop: "2rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
                    <div>
                      <h4 style={{ fontSize: "2rem", fontFamily: "Playfair Display, serif", color: "var(--ink)", marginBottom: "0.5rem" }}>{plan.flat}</h4>
                      <p style={{ fontSize: "1.1rem", color: "var(--gold-dark)", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>{plan.facing}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <span style={{ display: "block", fontSize: "1.5rem", color: "var(--ink)", fontWeight: 300 }}>{plan.sqft}</span>
                      <span style={{ display: "block", fontSize: "0.9rem", color: "var(--ink-2)", letterSpacing: "0.1em" }}>{plan.type} Residence</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. MASTER PLAN & MAP */}
      <section style={{ padding: "8rem 2rem", background: "var(--ink)", color: "var(--paper)" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "6rem" }}>
            
            <div className="animate-on-scroll fade-up" style={{ display: "flex", flexWrap: "wrap", gap: "4rem", alignItems: "center" }}>
              <div style={{ flex: "1 1 400px" }}>
                <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: "3rem", color: "var(--gold)" }}>The Masterplan</h3>
                <p style={{ fontSize: "1.15rem", color: "var(--paper-2)", lineHeight: 1.8, marginTop: "1.5rem" }}>
                  A bird's eye view of pure exclusivity. Discover how every amenity, walkway, and green zone is meticulously placed to create the ultimate living environment.
                </p>
              </div>
              <div style={{ flex: "1 1 600px" }}>
                <img src="/lakewood-media/master-plan-min-660a544def095.webp" alt="Masterplan" style={{ width: "100%", height: "auto", borderRadius: "12px" }} loading="lazy" />
              </div>
            </div>

            <div className="animate-on-scroll fade-up" style={{ display: "flex", flexWrap: "wrap-reverse", gap: "4rem", alignItems: "center" }}>
              <div style={{ flex: "1 1 600px" }}>
                <img src="/lakewood-media/map.webp" alt="Location Map" style={{ width: "100%", height: "auto", borderRadius: "12px", background: "#fff", padding: "1rem" }} loading="lazy" />
              </div>
              <div style={{ flex: "1 1 400px" }}>
                <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: "3rem", color: "var(--gold)" }}>Location</h3>
                <p style={{ fontSize: "1.15rem", color: "var(--paper-2)", lineHeight: 1.8, marginTop: "1.5rem" }}>
                  Situated strategically in NCL Colony, Kompally. Unmatched connectivity to major highways, top-tier international schools, and premium retail hubs.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "var(--paper-2)", padding: "5rem 2rem 3rem" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "2rem", marginBottom: "4rem" }}>
            <Link to="/">
              <img src="/logo.png" alt="Bharathi Logo" style={{ height: "60px" }} decoding="async" />
            </Link>
            <nav style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
              {NAV_ITEMS.map(item => (
                <a key={item.href} href={item.href} style={{ textDecoration: "none", color: "var(--ink)", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", fontSize: "0.85rem" }}>{item.label}</a>
              ))}
            </nav>
          </div>
          <div style={{ height: "1px", background: "rgba(0,0,0,0.1)", marginBottom: "2rem" }}></div>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", fontSize: "0.9rem", color: "var(--ink-2)" }}>
            <span> 2026 Bharathi Constructions. All Rights Reserved.</span>
            <span>RERA Registered | Kompally, Hyderabad</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
