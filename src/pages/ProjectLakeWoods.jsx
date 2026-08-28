import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Star, Award, CheckCircle, Leaf, Building, Zap, Video, Monitor, Gamepad, ShoppingCart, ArrowUpToLine, TreePine } from "lucide-react";
import MenuOverlay from "../components/MenuOverlay";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

const NAV_ITEMS = [
  { href: "/", label: "Home", img: "/horizon pics/Multi-purpose-Room_FFFF-copy.webp" },
  { href: "#philosophy", label: "Philosophy", img: "/lakewood-media/lake-woods-brohure-page-0005.jpg" },
  { href: "#gallery", label: "Gallery", img: "/lakewood-media/lakewood-cover.jpg" },
  { href: "#amenities", label: "Masterplan", img: "/lakewood-media/master-plan-min-660a544def095.webp" },
  { href: "#specifications", label: "Specifications", img: "/lakewood-media/floor-plans-min-660a55f02974b.webp" },
  { href: "#connectivity", label: "Location", img: "/lakewood-media/map.webp" }
];

const MASTERPLAN_LEGEND = [
  "1. Entry/Exit", "2. Wooden Deck", "3. Seating", "4. Children's Play Area",
  "5. Stepping Stones", "6. Lawn", "7. Half Basketball Court", "8. Jogging Track",
  "9. Driveway", "10. Screen Wall"
];

const HIGHLIGHTS = [
  "Grand Entrance with Waiting Area Lounge",
  "Children's Play Area",
  "Lifts",
  "Grocery Store",
  "Mini Theatre",
  "100% Power Backup",
  "EV Charging",
  "Indoor Games",
  "CC Cameras"
];

// Curated specifically to avoid text-heavy brochure pages
const GALLERY_IMAGES = [
  "/lakewood-media/lake-woods-brohure-page-0003.jpg",
  "/lakewood-media/lake-woods-brohure-page-0016.jpg",
  "/lakewood-media/lake-woods-brohure-page-0017.jpg",
  "/lakewood-media/lake-woods-brohure-page-0018.jpg",
];

const MASONRY_IMAGES = [
  "/lakewood-media/lake-woods-brohure-page-0019.jpg",
  "/lakewood-media/lake-woods-brohure-page-0020.jpg",
  
  
  "/lakewood-media/lake-woods-brohure-page-0010.jpg",
];

export default function ProjectLakeWoods() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const handleScroll = () => setScrolled(window.scrollY > 50); window.addEventListener("scroll", handleScroll); return () => window.removeEventListener("scroll", handleScroll); }, []);
  const [headerDark, setHeaderDark] = useState(false);
  
  const heroWrapperRef = useRef(null);
  const heroImgRef = useRef(null);
  const mainRef = useRef(null);
  const galleryRef = useRef(null);
  
  
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll(".reveal, .reveal-l, .reveal-r, .text-reveal").forEach(el => obs.observe(el));

      let ctx = gsap.context(() => {});
    return () => { obs.disconnect(); ctx.revert(); };
  }, []);

  useEffect(() => {
    }, []); // Lenis removed


  return (
    <div style={{background:"var(--paper)", color:"var(--ink)", overflowX:"hidden"}}>
      {}
      <header className={`site-header dark-mode ${navOpen ? "nav-open" : ""} ${scrolled ? "scrolled" : ""}`} style={{position: "fixed", width: "100%", zIndex: 100}}>
        <div className="header-inner" style={{maxWidth:"1600px", margin:"0 auto", padding:"0 2rem", height:"100px", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <Link to="/" className="logo-block" style={{textDecoration:"none"}}>
            <img src="/logo.png" alt="Bharathi Constructions" className="logo-img"  decoding="async" />
          </Link>
          <div style={{display:"flex", alignItems:"center", gap:"2rem"}}>
            <a href="/#booking" className="clay-btn skeuo-gold-text" style={{padding: "0.6rem 1.5rem"}}>Site Visit</a>
            <button className="menu-toggle" onClick={() => setNavOpen(!navOpen)}>
              <span style={{fontSize:"0.8rem", letterSpacing:"0.2em", textTransform:"uppercase"}}>{navOpen ? "Close" : "Menu"}</span>
            </button>
          </div>
        </div>
        <div className="scroll-progress-container"><div className="scroll-progress-bar" /></div>
      </header>

      <MenuOverlay navOpen={navOpen} setNavOpen={setNavOpen} />
      {}
      <section ref={heroWrapperRef} style={{position: "relative", width: "100%", height: "120vh", background: "var(--paper)"}}>
        <div style={{position: "sticky", top: 0, left: 0, width: "100%", height: "100vh", overflow: "hidden"}}>
          
          <div ref={heroImgRef} style={{position: "absolute", inset: 0, zIndex: 5}}>
            <img src="/lakewood-media/lakewood-cover.jpg" alt="Lake Woods Exterior" style={{width: "100%", height: "100%", objectFit: "cover", objectPosition: "center"}}  decoding="async" />
            <div style={{position:"absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.8) 0%, transparent 40%)", pointerEvents: "none"}} />
          </div>

          <div className="hero-logo-box" style={{position: "absolute", bottom: "4rem", left: "4rem", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
            <img src="/lakewood-media/lakewood-logo.png" alt="Lake Woods" style={{width: "280px", marginBottom: "1rem"}}  decoding="async" />
            <h1 style={{fontSize:"0.85rem", letterSpacing:"0.3em", textTransform:"uppercase", color:"#fff", margin: 0}}>NCL Colony, Kompally</h1>
          </div>

        </div>
      </section>

      {}
      <main ref={mainRef} className="content-wrapper" style={{position:"relative", zIndex:2, background:"var(--paper)", overflow:"hidden", boxShadow:"0 -20px 50px rgba(0,0,0,0.2)"}}>
      {}
      <div className="hidden">
        <div className="aurora-blob aurora-1"></div>
        <div className="aurora-blob aurora-2"></div>
        <div className="aurora-blob aurora-3"></div>
      </div>
        
        {}
        <section id="philosophy" style={{padding:"4rem 2rem", background:"var(--paper-2)"}}>
          <div style={{maxWidth:"1280px", margin:"0 auto"}}>
            <div className="text-reveal" style={{textAlign:"center", marginBottom:"6rem"}}>
              <span className="section-kicker">Project Overview</span>
              <h2 className="section-heading skeuo-gold-text"><span className="curtain-wrap"><span className="curtain-text" style={{display:"block"}}>A Benchmark of Luxury</span></span></h2>
              <div className="gold-rule" style={{maxWidth:"240px", margin:"1.5rem auto 3rem"}} />
              <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(400px, 1fr))", gap:"4rem", textAlign:"left", maxWidth:"1000px", margin:"0 auto"}}>
                <div>
                  <h3 style={{fontFamily:"Playfair Display, serif", fontSize:"2rem", color:"var(--gold-dark)", marginBottom:"1.5rem"}}>Architectural Brilliance</h3>
                  <p style={{fontSize:"1.15rem", color:"var(--ink-2)", lineHeight:1.8, marginBottom:"2rem"}}>
                    Bharathi Lake Woods is a meticulously designed residential enclave comprising precisely 40 ultra-premium 3 BHK apartments in NCL Colony, Kompally. Rising across 8+2 floors, the architecture seamlessly integrates modern elegance with natural surroundings.
                  </p>
                </div>
                <div>
                  <h3 style={{fontFamily:"Playfair Display, serif", fontSize:"2rem", color:"var(--gold-dark)", marginBottom:"1.5rem"}}>A Serene Lifestyle</h3>
                  <p style={{fontSize:"1.15rem", color:"var(--ink-2)", lineHeight:1.8, marginBottom:"2rem"}}>
                    From the grand entrance lounge to the fully equipped mini-theatre and interactive communal zones, every inch is engineered to provide a holistic, resort-like lifestyle right in the heart of Hyderabad.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-reveal">
              {[
                ["40", "Exclusive Units"],
                ["8+2", "Floors"],
                ["2621", "Sq. Yds Extent"],
                ["3 BHK", "Premium Residences"]
              ].map(([n,l]) => (
                <div key={l} className="flex flex-col gap-2 stat-box" style={{textAlign:"center", padding:"3rem 1rem", background:"var(--paper-2)", borderRadius:"4px", boxShadow:"0 10px 30px rgba(0,0,0,0.03)"}}>
                  <span style={{fontFamily:"Playfair Display, serif", fontSize:"3.5rem", color:"var(--gold)", lineHeight:1}}>{n}</span>
                  <span style={{fontSize:"0.8rem", letterSpacing:"0.15em", textTransform:"uppercase", color:"var(--ink-2)", fontWeight:600}}>{l}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        
        {/* -------- SPECIFICATIONS (Text instead of Images) -------- */}
        
        
        {/* -------- CURATED FLOOR PLANS & MASTERPLAN -------- */}
        <section id="plans" style={{padding:"4rem 2rem", background:"#fff"}}>
          <div style={{maxWidth:"1280px", margin:"0 auto"}}>
            <div className="text-reveal" style={{textAlign:"center", marginBottom:"6rem"}}>
              <span className="section-kicker">The Layout</span>
              <h2 className="section-heading skeuo-gold-text"><span className="curtain-wrap"><span className="curtain-text" style={{display:"block"}}>Intelligent Spaces</span></span></h2>
              <div className="gold-rule" style={{maxWidth:"240px", margin:"1.5rem auto 3rem"}} />
              <p style={{fontSize:"1.2rem", color:"var(--ink-2)", maxWidth:"800px", margin:"0 auto", lineHeight:1.8}}>
                Discover our detailed masterplan and floor plans, engineered to maximize natural light, ventilation, and absolute privacy.
              </p>
            </div>

            <div style={{display: "flex", flexDirection: "column", gap: "4rem"}}>
              {}
              <div className="text-reveal" style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "4rem", flexWrap: "wrap"}}>
                <div style={{flex: "1 1 400px"}}>
                  <h3 style={{fontFamily:"Playfair Display, serif", fontSize:"2.5rem", color:"var(--ink)", marginBottom:"1.5rem"}}>Unit Configurations</h3>
                  <p style={{fontSize:"1.15rem", color:"var(--ink-2)", lineHeight:1.8}}>
                    Expansive drawing rooms, dedicated home theater spaces, and large balconies.
                  </p>
                  <ul style={{marginTop: "2rem", listStyle: "none", padding: 0, color: "var(--ink-2)", fontSize: "1.1rem", lineHeight: 2}}>
                    <li>✓ West Facing Premium: 2205 Sq. Ft.</li>
                    <li>✓ East Facing Grand: 2600 Sq. Ft.</li>
                    <li>✓ Vastu Compliant Design</li>
                    <li>✓ Zero Dead Space Corridors</li>
                  </ul>
                  <div className="gold-rule" style={{margin:"2rem 0 0 0", width:"100px"}} />
                </div>
                <div style={{flex: "1 1 500px", width: "100%", background:"#fff", borderRadius:"8px"}}>
                  <img 
                    src="/lakewood-media/floor-plans-min-660a55f02974b.webp" 
                    alt="Lake Woods Floor Plans" 
                    
                    style={{width: "100%", height: "auto", display: "block", mixBlendMode: "multiply"}} 
                  decoding="async" />
                </div>
              </div>

              {}
              <div className="text-reveal" style={{display: "flex", flexDirection: "row-reverse", alignItems: "center", gap: "4rem", flexWrap: "wrap"}}>
                <div style={{flex: "1 1 400px"}}>
                  <h3 style={{fontFamily:"Playfair Display, serif", fontSize:"2.5rem", color:"var(--ink)", marginBottom:"1.5rem"}}>The Masterplan</h3>
                  <p style={{fontSize:"1.15rem", color:"var(--ink-2)", lineHeight:1.8}}>
                    Designed around community and tranquility with dedicated pedestrian zones and extensive landscaping.
                  </p>
                  <ul style={{marginTop: "2rem", listStyle: "none", padding: 0, color: "var(--ink-2)", fontSize: "1.1rem", lineHeight: 2}}>
                    <li>✓ 40 Exclusive Units</li>
                    <li>✓ 8+2 Floors Elevation</li>
                    <li>✓ Grand Entrance & Lounge</li>
                    <li>✓ Comprehensive Security</li>
                  </ul>
                  <div className="gold-rule" style={{margin:"2rem 0 0 0", width:"100px"}} />
                </div>
                <div style={{flex: "1 1 500px", width: "100%", background:"#fff", borderRadius:"8px"}}>
                  <img 
                    src="/lakewood-media/master-plan-min-660a544def095.webp" 
                    alt="Lake Woods Masterplan" 
                    
                    style={{width: "100%", height: "auto", display: "block", mixBlendMode: "multiply"}} 
                  decoding="async" />
                </div>
              </div>
            </div>
          </div>
        </section>

<section id="specifications" style={{padding:"4rem 2rem", background:"var(--paper)"}}>
          <div style={{maxWidth:"1280px", margin:"0 auto"}}>
             <div className="text-reveal" style={{textAlign:"center", marginBottom:"6rem"}}>
              <span className="section-kicker">The Details</span>
              <h2 className="section-heading skeuo-gold-text"><span className="curtain-wrap"><span className="curtain-text" style={{display:"block"}}>Premium Specifications</span></span></h2>
              <div className="gold-rule" style={{maxWidth:"240px", margin:"1.5rem auto 3rem"}} />
            </div>

            <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "3rem"}}>
              {[
                { title: "Structure", desc: "R.C.C framed structure designed to withstand wind and seismic loads. 9â€ thick lightweight red bricks/concrete blocks for external walls and 4â€ for internal walls." },
                { title: "Plastering", desc: "External and internal wall cement plaster with smooth finish. Joints of the R.C.C. structure and brick wall covered with mesh before plastering." },
                { title: "Doors & Windows", desc: "Manufactured teak wood frame with melamine spray finish for main doors. UPVC/Aluminium windows of reputed profile sections with tinted toughened glass and mosquito mesh track." },
                { title: "Wall Finishes", desc: "Textured finish with 2 coats of weather-proof external emulsion paint. Smooth putty finish internally with 2 coats of premium acrylic emulsion paint." },
                { title: "Security & Flooring", desc: "Premium 800x800 vitrified tiles for living, dining, and bedrooms. Comprehensive CC Camera surveillance and 100% Power Backup for total peace of mind." },
                { title: "Telecom & Electrical", desc: "Concealed copper wiring of reputed make. Power outlets for air conditioners in all bedrooms and living areas. Provision for EV charging in parking." }
              ].map(spec => (
                <div key={spec.title} className="text-reveal glass-card" style={{padding: "2.5rem"}}>
                  <h3 style={{fontFamily:"Playfair Display, serif", fontSize:"1.5rem", color:"var(--gold-dark)", marginBottom:"1rem"}}>{spec.title}</h3>
                  <p style={{color: "var(--ink-2)", lineHeight: 1.6}}>{spec.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        
        {/* -------- ARCHITECTURAL HIGHLIGHTS -------- */}
        <section id="gallery" style={{padding:"6rem 2rem", background:"var(--paper)"}}>
          <div style={{maxWidth:"1400px", margin:"0 auto"}}>
            <div className="text-reveal" style={{textAlign:"center", marginBottom:"6rem"}}>
              <span className="section-kicker">3D Visualizations</span>
              <h2 className="section-heading skeuo-gold-text"><span className="curtain-wrap"><span className="curtain-text" style={{display:"block"}}>Architectural Grandeur</span></span></h2>
              <div className="gold-rule" style={{maxWidth:"120px", margin:"1.5rem auto 3rem", height:"1px", background:"var(--gold)"}} />
            </div>

            <div style={{display:"flex", flexDirection:"column", gap:"6rem"}}>
              {["View 01_FFFFF copy.jpg", "View 02_FFFFF copy.jpg", "View 03_FFFFFF copy.jpg", "View 04_ffffff copy.jpg", "View 05_FFFFF copy.jpg", "view 06_FFFFFF copy.jpg"].map((view, i) => (
                <div key={i} className="clay-card " style={{padding: "2rem", width: "100%"}}>
                  <div className="" style={{width: "100%", height: "auto", overflow: "hidden", borderRadius: "20px"}}>
                    <img 
                      className="media-reveal-img" 
                      src={`/lakewood-media/${view}`} 
                      alt={`Lake Woods View ${i+1}`} 
                      style={{width: "100%", height: "auto", objectFit: "contain", display: "block", background: "var(--paper-2)"}} 
                      
                    decoding="async" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* -------- 3D LAYOUT VIEWS -------- */}
        <section id="layouts" style={{padding:"6rem 2rem", background:"var(--paper-2)"}}>
          <div style={{maxWidth:"1400px", margin:"0 auto"}}>
            <div className="text-reveal" style={{textAlign:"center", marginBottom:"6rem"}}>
              <span className="section-kicker">Floor Plans</span>
              <h2 className="section-heading skeuo-gold-text"><span className="curtain-wrap"><span className="curtain-text" style={{display:"block"}}>3D Layout Sections</span></span></h2>
              <div className="gold-rule" style={{maxWidth:"120px", margin:"1.5rem auto 3rem", height:"1px", background:"var(--gold)"}} />
            </div>

            <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(600px, 1fr))", gap:"4rem"}}>
              {["SECTION 1__ 2675 - SQ.F.jpg", "SECTION 2__ 2680 - F.jpg", "SECTION 3__ 2290 - f.jpg", "SECTION 4 __ 2285 -f.jpg"].map((plan, i) => (
                <div key={i} className="clay-card " style={{padding: "1.5rem"}}>
                  <div className="" style={{width: "100%", height: "auto", overflow: "hidden", borderRadius: "16px"}}>
                    <img 
                      className="media-reveal-img" 
                      src={`/lakewood-media/${plan}`} 
                      alt={`Lake Woods Section ${i+1}`} 
                      style={{width: "100%", height: "auto", objectFit: "contain", display: "block"}} 
                      
                    decoding="async" />
                  </div>
                  <h3 style={{fontFamily:"Playfair Display, serif", fontSize:"1.5rem", color:"var(--gold-dark)", textAlign: "center", marginTop: "2rem"}}>{plan.split('__')[1].split('.')[0]}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* -------- PROJECT HIGHLIGHTS & LEGEND -------- */}
        <section id="amenities" style={{padding:"4rem 2rem", background:"var(--paper-2)"}}>
          <div style={{maxWidth:"1280px", margin:"0 auto"}}>
            <div className="text-reveal" style={{textAlign:"center", marginBottom:"4rem"}}>
              <span className="section-kicker">Amenities</span>
              <h2 className="section-heading skeuo-gold-text"><span className="curtain-wrap"><span className="curtain-text" style={{display:"block"}}>Lifestyle & Leisure</span></span></h2>
              <div className="gold-rule" style={{maxWidth:"120px", margin:"1.5rem auto 3rem", height:"1px", background:"var(--gold)"}} />
            </div>

            <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))", gap:"1.5rem", marginBottom: "6rem"}} className="text-reveal">
              {HIGHLIGHTS.map(h => (
                <div key={h} style={{padding: "1.5rem", background: "var(--paper-2)", borderLeft: "4px solid var(--gold)", boxShadow:"0 10px 30px rgba(0,0,0,0.03)"}}>
                  <p style={{fontSize: "1.1rem", fontWeight: 500, color: "var(--ink)"}}>{h}</p>
                </div>
              ))}
            </div>

            <div className="text-reveal" style={{textAlign:"center", marginBottom:"4rem"}}>
              <h2 className="section-heading skeuo-gold-text" style={{fontSize: "2.5rem"}}><span className="curtain-wrap"><span className="curtain-text" style={{display:"block"}}>Masterplan</span></span></h2>
              <div className="gold-rule" style={{maxWidth:"120px", margin:"1.5rem auto 3rem", height:"1px", background:"var(--gold)"}} />
            </div>
            
            <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(240px, 1fr))", gap:"1.25rem", textAlign:"left", marginBottom:"6rem"}} className="text-reveal">
              {MASTERPLAN_LEGEND.map((item) => (
                <p key={item} className="body-text" style={{fontSize:"1rem", display:"flex", alignItems:"center", gap:"0.75rem"}}>
                  <span style={{color:"var(--gold)", fontWeight:600}}>{item.split('.')[0]}.</span>
                  <span>{item.split('.')[1]}</span>
                </p>
              ))}
            </div>
            
            {}
            <div style={{width:"100%", marginBottom:"8rem", overflow:"hidden", borderRadius:"4px"}}>
              <div className="mask-img" style={{width:"100%", height:"100%"}}>
                <img src="/lakewood-media/master-plan-min-660a544def095.webp" alt="Masterplan" style={{width:"100%", display:"block"}}  decoding="async" />
              </div>
            </div>
          </div>
        </section>

        {/* -------- CONNECTIVITY -------- */}
        <section id="connectivity" style={{padding:"4rem 2rem", background:"var(--paper)"}}>
          <div style={{maxWidth:"1280px", margin:"0 auto"}}>
            <div className="text-reveal" style={{textAlign:"center", marginBottom:"6rem"}}>
              <span className="section-kicker">Location</span>
              <h2 className="section-heading skeuo-gold-text"><span className="curtain-wrap"><span className="curtain-text" style={{display:"block"}}>Unrivaled Access</span></span></h2>
              <div className="gold-rule" style={{maxWidth:"240px", margin:"1.5rem auto 3rem"}} />
              <p style={{fontSize:"1.1rem", color:"var(--ink-2)"}}>Prime connectivity to major hubs from NCL Colony, Kompally.</p>
            </div>
            <div style={{display:"grid", gridTemplateColumns:"1fr", gap:"2rem"}}>
              <div className="clay-card text-reveal" style={{overflow:"hidden", border:"2px solid var(--gold)", display:"flex", alignItems:"center", justifyContent:"center", padding:"1rem"}}>
                <img src="/lakewood-media/map.webp" alt="Lake Woods Map" style={{width:"100%", height:"auto", objectFit:"contain", background:"var(--paper-2)"}}  decoding="async" />
              </div>
              <div className="clay-card text-reveal" style={{padding:"3rem"}}>
                <h3 style={{fontFamily:"Playfair Display, serif", fontSize:"2rem", color:"var(--gold)", marginBottom:"2rem"}}>Proximity Matrix</h3>
                {[
                  ["Ankura Hospitals", "1 Min"],
                  ["ORR Exit No 6", "8 Mins"],
                  ["Secunderabad Railway Station", "12 Mins"],
                  ["Malla Reddy University", "12 Mins"],
                  ["Biotech Park", "15 Mins"]
                ].map(([k,v]) => (
                  <div key={k} style={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:"1.25rem 0", borderBottom:"1px solid var(--border)"}}>
                    <span style={{fontSize:"1rem", color:"var(--ink-2)", fontWeight:500}}>{k}</span>
                    <span style={{fontSize:"1.2rem", fontFamily:"Playfair Display, serif", color:"var(--gold-dark)"}}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
      </main>
      <footer className="site-footer" style={{position: "sticky", bottom: 0, zIndex: 0, background:"var(--paper-2)", paddingTop:"5rem"}}>
        <div style={{maxWidth:"1280px", margin:"0 auto"}}>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", alignItems:"center", gap:"2rem", marginBottom:"2.5rem"}}>
            <Link to="/" className="footer-logo-block" style={{textDecoration:"none"}}>
              <img src="/logo.png" alt="Bharathi Logo" className="logo-img"  decoding="async" />
            </Link>
            <nav style={{display:"flex", justifyContent:"center", flexWrap:"wrap", gap:"1.5rem"}}>
              {NAV_ITEMS.map(item => (
                <a key={item.href} href={item.href} className="header-nav-link" >{item.label}</a>
              ))}
            </nav>
            <div style={{display:"flex", justifyContent:"flex-end", gap:"0.75rem"}}>
              {["IG","FB","YT","WA"].map(s => (
                <button key={s} style={{width:"2.25rem", height:"2.25rem", border:"1px solid rgba(201,169,110,0.25)", fontSize:"15px", color:"#C9A96E", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.3s"}} onMouseEnter={e => { e.currentTarget.style.background="#C9A96E"; e.currentTarget.style.color="#fff";  }} onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.color="#C9A96E";  }}>{s}</button>
              ))}
            </div>
          </div>
          <div className="gold-rule" style={{marginBottom:"1.75rem"}} />
          <div style={{display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:"1rem", fontSize:"15px", color:"var(--ink-2)", letterSpacing:"0.1em"}}>
            <span> 2026 Bharathi Constructions. All Rights Reserved.</span>
            <span>RERA Registered  Kompally, Hyderabad, Telangana</span>
            <span>Architectural renders are indicative only.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}















