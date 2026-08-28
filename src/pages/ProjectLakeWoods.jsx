import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Star, Award, CheckCircle, Leaf, Building, Zap, Video, Monitor, Gamepad, ShoppingCart, ArrowUpToLine, TreePine, MapPin } from "lucide-react";
import MenuOverlay from "../components/MenuOverlay";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Projects", href: "/#projects" },
  { label: "Locations", href: "/#locations" },
  { label: "Enquiry", href: "/#contact" }
];

const AMENITIES = [
  { icon: <ShieldCheck size={32} />, h: "Security", desc: "24/7 Advanced Surveillance" },
  { icon: <TreePine size={32} />, h: "Landscaping", desc: "Curated Green Spaces" },
  { icon: <Gamepad size={32} />, h: "Recreation", desc: "Mini-Theatre & Lounge" },
  { icon: <Zap size={32} />, h: "Power", desc: "100% DG Backup" },
];

export default function ProjectLakeWoods() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    
    // High-performance Native IntersectionObserver for animations
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });
    
    document.querySelectorAll(".animate-on-scroll").forEach(el => obs.observe(el));
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      obs.disconnect();
    };
  }, []);

  return (
    <div style={{ background: "var(--paper)", color: "var(--ink)", overflowX: "hidden" }}>
      
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

      {/* HERO SECTION */}
      <section style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src="/lakewood-media/lakewood-cover.jpg" alt="Lake Woods Exterior" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 1 }} fetchPriority="high" />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.7) 100%)", zIndex: 2 }}></div>
        
        <div style={{ position: "relative", zIndex: 3, textAlign: "center", padding: "0 2rem", marginTop: "4rem" }} className="animate-on-scroll fade-up">
          <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(3.5rem, 8vw, 7rem)", color: "#fff", lineHeight: 1.1, textShadow: "0 10px 30px rgba(0,0,0,0.5)", margin: 0 }}>
            Bharathi <br/> Lake Woods
          </h1>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginTop: "2rem", color: "var(--gold)" }}>
            <MapPin size={20} />
            <span style={{ fontSize: "1rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#fff" }}>NCL Colony, Kompally</span>
          </div>
        </div>
      </section>

      {/* FLOATING STATS BAR */}
      <section style={{ position: "relative", zIndex: 10, marginTop: "-80px", padding: "0 2rem" }}>
        <div className="animate-on-scroll fade-up" style={{ maxWidth: "1200px", margin: "0 auto", background: "rgba(255, 255, 255, 0.95)", backdropFilter: "blur(20px)", borderRadius: "12px", boxShadow: "0 20px 40px rgba(0,0,0,0.1)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem", padding: "3rem 2rem" }}>
          {[
            { n: "40", l: "Exclusive Units" },
            { n: "8+2", l: "Floors" },
            { n: "2621", l: "Sq. Yds Extent" },
            { n: "3 BHK", l: "Premium Residences" }
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: "center", borderRight: i !== 3 ? "1px solid rgba(0,0,0,0.05)" : "none" }}>
              <span style={{ fontFamily: "Playfair Display, serif", fontSize: "3rem", color: "var(--gold-dark)", display: "block", lineHeight: 1, marginBottom: "0.5rem" }}>{stat.n}</span>
              <span style={{ fontSize: "0.85rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink-2)", fontWeight: 600 }}>{stat.l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* THE VISION - STICKY LAYOUT */}
      <section style={{ padding: "8rem 2rem" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "4rem" }}>
          
          <div style={{ flex: "1 1 400px" }}>
            <div style={{ position: "sticky", top: "150px" }} className="animate-on-scroll fade-right">
              <span style={{ fontSize: "0.9rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold-dark)", fontWeight: 600 }}>The Vision</span>
              <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2.5rem, 4vw, 4rem)", color: "var(--ink)", marginTop: "1rem", marginBottom: "2rem", lineHeight: 1.2 }}>
                Redefining <br/> Exclusivity.
              </h2>
              <div style={{ width: "60px", height: "2px", background: "var(--gold)", marginBottom: "2rem" }}></div>
              <p style={{ fontSize: "1.2rem", color: "var(--ink-2)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                Bharathi Lake Woods is a meticulously designed residential enclave comprising precisely 40 ultra-premium 3 BHK apartments. 
              </p>
              <p style={{ fontSize: "1.2rem", color: "var(--ink-2)", lineHeight: 1.8 }}>
                Rising across 8+2 floors, the architecture seamlessly integrates modern elegance with natural surroundings, offering a holistic, resort-like lifestyle.
              </p>
            </div>
          </div>

          <div style={{ flex: "1 1 600px", display: "flex", flexDirection: "column", gap: "3rem" }}>
            {["View 01_FFFFF copy.jpg", "View 03_FFFFFF copy.jpg", "view 06_FFFFFF copy.jpg"].map((img, idx) => (
              <div key={idx} className="animate-on-scroll fade-up" style={{ overflow: "hidden", borderRadius: "12px", boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}>
                <img src={`/lakewood-media/${img}`} alt={`Lake Woods View ${idx}`} style={{ width: "100%", height: "auto", display: "block", transition: "transform 0.7s ease" }} loading="lazy" decoding="async" className="hover-zoom" />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* AMENITIES GRID */}
      <section style={{ padding: "6rem 2rem", background: "var(--ink)", color: "var(--paper)" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div className="animate-on-scroll fade-up" style={{ textAlign: "center", marginBottom: "5rem" }}>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "3rem", color: "var(--paper)" }}>World-Class Amenities</h2>
            <p style={{ color: "var(--paper-2)", marginTop: "1rem", fontSize: "1.1rem" }}>Curated experiences for the discerning few.</p>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
            {AMENITIES.map((amenity, idx) => (
              <div key={idx} className="animate-on-scroll fade-up" style={{ transitionDelay: `${idx * 100}ms`, padding: "3rem 2rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", textAlign: "center" }}>
                <div style={{ color: "var(--gold)", marginBottom: "1.5rem", display: "flex", justifyContent: "center" }}>{amenity.icon}</div>
                <h3 style={{ fontSize: "1.5rem", fontFamily: "Playfair Display, serif", marginBottom: "1rem" }}>{amenity.h}</h3>
                <p style={{ color: "var(--paper-2)", lineHeight: 1.6 }}>{amenity.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MASTERPLAN & FLOOR PLANS */}
      <section style={{ padding: "8rem 2rem", background: "#f8f9fa" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          
          <div className="animate-on-scroll fade-up" style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "4rem", flexWrap: "wrap", marginBottom: "8rem" }}>
            <div style={{ flex: "1 1 400px" }}>
              <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "3rem", color: "var(--ink)", marginBottom: "1.5rem" }}>The Masterplan</h2>
              <p style={{ fontSize: "1.15rem", color: "var(--ink-2)", lineHeight: 1.8 }}>
                Designed around community and tranquility with dedicated pedestrian zones and extensive landscaping spanning 2,621 Sq. Yds.
              </p>
            </div>
            <div style={{ flex: "1 1 600px", borderRadius: "12px", overflow: "hidden", background: "#fff", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
              <img src="/lakewood-media/master-plan-min-660a544def095.webp" alt="Masterplan" style={{ width: "100%", height: "auto", display: "block" }} loading="lazy" decoding="async" />
            </div>
          </div>

          <div className="animate-on-scroll fade-up" style={{ display: "flex", flexDirection: "row-reverse", alignItems: "center", gap: "4rem", flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 400px" }}>
              <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "3rem", color: "var(--ink)", marginBottom: "1.5rem" }}>Unit Configurations</h2>
              <p style={{ fontSize: "1.15rem", color: "var(--ink-2)", lineHeight: 1.8 }}>
                Expansive drawing rooms, dedicated home theater spaces, and large balconies designed for zero dead space.
              </p>
              <ul style={{ marginTop: "2rem", listStyle: "none", padding: 0, color: "var(--ink-2)", fontSize: "1.1rem", lineHeight: 2.2 }}>
                <li><span style={{color: "var(--gold)", marginRight: "10px"}}></span> West Facing Premium: 2205 Sq. Ft.</li>
                <li><span style={{color: "var(--gold)", marginRight: "10px"}}></span> East Facing Grand: 2600 Sq. Ft.</li>
                <li><span style={{color: "var(--gold)", marginRight: "10px"}}></span> 100% Vastu Compliant</li>
              </ul>
            </div>
            <div style={{ flex: "1 1 600px", borderRadius: "12px", overflow: "hidden", background: "#fff", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
              <img src="/lakewood-media/floor-plans-min-660a55f02974b.webp" alt="Floor Plans" style={{ width: "100%", height: "auto", display: "block" }} loading="lazy" decoding="async" />
            </div>
          </div>

        </div>
      </section>

      {/* FULL GALLERY GRID */}
      <section style={{ padding: "8rem 2rem", background: "var(--paper)" }}>
        <div style={{ maxWidth: "1600px", margin: "0 auto" }}>
          <div className="animate-on-scroll fade-up" style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "3rem", color: "var(--ink)" }}>Gallery</h2>
            <div style={{ width: "60px", height: "2px", background: "var(--gold)", margin: "1.5rem auto" }}></div>
          </div>
          
          <div style={{ columnCount: 2, columnGap: "1.5rem" }} className="masonry-grid">
            {[
              "View 02_FFFFF copy.jpg",
              "View 04_ffffff copy.jpg",
              "View 05_FFFFF copy.jpg",
              "SECTION 2__ 2680 - F.jpg",
              "SECTION 3__ 2290 - f.jpg"
            ].map((img, idx) => (
              <div key={idx} className="animate-on-scroll fade-up" style={{ breakInside: "avoid", marginBottom: "1.5rem", borderRadius: "8px", overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
                <img src={`/lakewood-media/${img}`} alt={`Lake Woods Gallery ${idx}`} style={{ width: "100%", height: "auto", display: "block" }} loading="lazy" decoding="async" className="hover-zoom" />
              </div>
            ))}
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
