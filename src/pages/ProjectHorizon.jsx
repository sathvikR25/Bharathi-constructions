import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import Lenis from "@studio-freight/lenis";
import L from "leaflet";

/* --- Data ----------------------------------------------- */
const PROJECTS = {
  horizon: {
    id: "horizon", name: "Bharathi Horizon", tagline: "An Iconic Project Of 3 BHK Apartments At Suchitra X Roads", subtitle: "the Horizon",
    desc: "A soaring architectural masterpiece in Kompally ï¿½ high-rise sky villas capturing panoramic views of Hyderabad and pristine northern winds.",
    bg: "/horizon pics/hero-night.jpg", accent: "Sky Residences",
    units: "3 & 4 BHK Sky Villas", structure: "2 High-Rise Towers", floors: "G+28 Floors",
    status: "Under Construction", location: "Kompally, Hyderabad", completion: "2027", price: "1.8 Cr onwards"
  },
  lakewoods: {
    id: "lakewoods", name: "Bharathi Lake Woods", tagline: "Live Beside", subtitle: "the Lake",
    desc: "An exclusive low-density gated community designed around a serene natural lake ï¿½ pristine tranquility meets clean-lined modernism.",
    bg: "/horizon pics/hero-night.jpg", accent: "Curated Villas",
    units: "Premium Curated Villas", structure: "Lakeside Gated Layout", floors: "G+2 Villas",
    status: "Under Construction", location: "Kompally, Hyderabad", completion: "2027", price: "3.2 Cr onwards"
  }
};

const LANDMARKS = [
  { name: "Bharathi Horizon", latlng: [17.528, 78.489], category: "Development Site", desc: "Premium tower with major shopping and hospital access nearby.", times: { horizon: "0 Mins", lakewoods: "5 Mins" }, address: "Kompally Highway, Hyderabad" },
  { name: "Bharathi Lake Woods", latlng: [17.534, 78.472], category: "Development Site", desc: "Exclusive villa layout next to Kompally tranquil lake zone.", times: { horizon: "5 Mins", lakewoods: "0 Mins" }, address: "Gundlapochampally, Kompally" },
  { name: "DRS International School", latlng: [17.5292, 78.4812], category: "Education", desc: "Premier international school offering IB curriculum.", times: { horizon: "3 Mins", lakewoods: "3 Mins" }, address: "Kompally Road, Hyderabad" },
  { name: "Malla Reddy Narayana Hospital", latlng: [17.5458, 78.4901], category: "Healthcare", desc: "Super-specialty hospital providing advanced medical care.", times: { horizon: "6 Mins", lakewoods: "8 Mins" }, address: "Suraram, Kompally" },
  { name: "Decathlon & Cineplanet", latlng: [17.5186, 78.487], category: "Retail & Leisure", desc: "Retail complex, cinemas, and fitness centers.", times: { horizon: "4 Mins", lakewoods: "6 Mins" }, address: "NH-44, Kompally" },
  { name: "ORR Exit 5 Kandlakoya", latlng: [17.5685, 78.4412], category: "Connectivity", desc: "Outer Ring Road to HITEC City in under 30 mins.", times: { horizon: "8 Mins", lakewoods: "9 Mins" }, address: "Kandlakoya Junction, ORR" }
];

const PROJECT_HIGHLIGHTS = [
  [<Building size={40} color="var(--gold)" strokeWidth={1} />, "Grand Entrance with Waiting Area Lounge"],
  [<Flower2 size={40} color="var(--gold)" strokeWidth={1} />, "Yoga / Multipurpose / Meditation Hall"],
  [<TreePine size={40} color="var(--gold)" strokeWidth={1} />, "Children's Play Area"],
  [<ArrowUpToLine size={40} color="var(--gold)" strokeWidth={1} />, "Lifts"],
  [<ShoppingCart size={40} color="var(--gold)" strokeWidth={1} />, "Grocery Store"],
  [<Monitor size={40} color="var(--gold)" strokeWidth={1} />, "Mini Theatre"],
  [<Zap size={40} color="var(--gold)" strokeWidth={1} />, "100% Power Backup"],
  [<Gamepad size={40} color="var(--gold)" strokeWidth={1} />, "Indoor Games"],
  [<Video size={40} color="var(--gold)" strokeWidth={1} />, "CC Cameras"]
];

const MASTERPLAN_LEGEND = [
  "1. Entry / Exit",
  "2. Entrance Plaza",
  "3. Party Lawn",
  "4. Children's Play Area",
  "5. Multi Use Play Court",
  "6. Senior Citizen Area with Gazebo",
  "7. Cricket Pitch",
  "8. Lawn with Gazebo",
  "9. Toddler Play Area",
  "10. Jogging Track",
  "11. Driveway Floor Pattern"
];

const MARBLES = [
  { id: "stat", label: "Statuario Gold", color: "#F2EAD8", desc: "Italian veined gold" },
  { id: "calc", label: "Calacatta Grey", color: "#E8E4E0", desc: "Grey veining, Swiss" },
  { id: "nero", label: "Nero Marquina", color: "#2a2a2a", desc: "Spanish black marble" }
];
const FIXTURES = [
  { id: "champ", label: "Brushed Champagne Gold", color: "#E5D3B3" },
  { id: "bronze", label: "Matte Architectural Bronze", color: "#6B4F3A" },
  { id: "steel", label: "Polished Stainless Steel", color: "#C0C0C0" }
];

const NAV_ITEMS = [
  { href: "/", label: "Home", img: "/horizon pics/Multi-purpose-Room_FFFF-copy.webp" },
  { href: "#amenities", label: "Masterplan", img: "/horizon pics/View_13_FFFFFF-copy.webp" },
  { href: "#configurator", label: "Configure", img: "/horizon pics/floor-scaled.webp" },
  { href: "#connectivity", label: "Location", img: "/horizon pics/View_13_FFFFFF-copy.webp" },
  { href: "#booking", label: "Contact Us", img: "/horizon pics/Multi-purpose-Room_FFFF-copy.webp" }
];


import { Link } from "react-router-dom";
import { Building, Flower2, TreePine, ArrowUpToLine, ShoppingCart, Monitor, Zap, Gamepad, Video, MapPin, Phone, Clock } from "lucide-react";
import MenuOverlay from "../components/MenuOverlay";
export default function ProjectHorizon() {
  const activeProj = "horizon";
  const [marble, setMarble] = useState("stat");
  const [fixture, setFixture] = useState("champ");
  const [selectedLandmark, setSelectedLandmark] = useState(LANDMARKS[0]);
  const [navOpen, setNavOpen] = useState(false);
  const [headerDark, setHeaderDark] = useState(false);
  
  
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll(".reveal, .reveal-l, .reveal-r, .text-reveal").forEach(el => obs.observe(el));

    let ctx = gsap.context(() => {
      // 1. Hero Parallax
      if (heroBgRef.current) {
        gsap.to(heroBgRef.current, { yPercent: 20, ease: "none", scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true } });
      }

      // 2. Amenities Stagger
      const amenities = gsap.utils.toArray(".amenity-item");
      if (amenities.length > 0) {
        gsap.fromTo(amenities, 
          { opacity: 0, x: 150, rotationY: 90, z: -500, transformPerspective: 1200, transformOrigin: "left center" },
          { opacity: 1, x: 0, rotationY: 0, z: 0, stagger: 0.15, duration: 1, ease: "power3.out", scrollTrigger: { trigger: "#amenities", start: "top 80%" } }
        );
      }

      
      // 3. Advanced Parallax & Blur for Floor Plans
      gsap.utils.toArray(".floor-plan-img").forEach(img => {
        gsap.fromTo(img, 
          { scale: 1.3, opacity: 0, rotationX: 60, rotationY: 15, transformPerspective: 2500, z: -1000 },
          { scale: 1, opacity: 1, rotationX: 0, rotationY: 0, z: 0, duration: 2.5, ease: "expo.out", scrollTrigger: { trigger: img, start: "top 85%" } }
        );
        gsap.to(img,
          { yPercent: 5, ease: "none", scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true } }
        );
      });

    }, mainRef);

    return () => { obs.disconnect(); ctx.revert(); };
  }, []);

  useEffect(() => {
    const hS = () => {
      if (mainRef.current) {
        const rect = mainRef.current.getBoundingClientRect();
        setHeaderDark(rect.top <= 120);
      }
    };
    window.addEventListener("scroll", hS);
    return () => window.removeEventListener("scroll", hS);
  }, []);
  const [navHoverImg, setNavHoverImg] = useState(NAV_ITEMS[0].img);
  const [activeNavImg, setActiveNavImg] = useState(0);
  const [time, setTime] = useState("--:--:--");
  const [formData, setFormData] = useState({ name: "", phone: "", project: "Bharathi Horizon", date: "" });
  const [formSent, setFormSent] = useState(false);
  const [preloaderHidden, setPreloaderHidden] = useState(false);

  const mainRef = useRef(null);
  
  const heroBgRef = useRef(null);
  const heroRef = useRef(null);
  const mapRef = useRef(null);
  const leafletMap = useRef(null);

  const proj = PROJECTS["horizon"];

  
  useEffect(() => {
    const t = setTimeout(() => setPreloaderHidden(true), 2200);
    return () => clearTimeout(t);
  }, []);

  
  useEffect(() => {
    const tick = () => setTime(new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).format(new Date()));
    tick(); const t = setInterval(tick, 1000); return () => clearInterval(t);
  }, []);

  
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.5, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    const raf = t => { window.lenisVelocity = lenis.velocity; lenis.raf(t); requestAnimationFrame(raf); };
    lenis.on("scroll", ScrollTrigger.update);
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  

  
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          e.target.querySelectorAll(".progress-fill").forEach(b => b.classList.add("run"));
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll(".reveal, .reveal-l, .reveal-r, .reveal-s").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  
  useEffect(() => {
    if (!mapRef.current) return;
    if (leafletMap.current) leafletMap.current.remove();
    const map = L.map(mapRef.current, { center: [17.531, 78.481], zoom: 13, zoomControl: false });
    leafletMap.current = map;
    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", { attribution: "CartoDB" }).addTo(map);
    L.control.zoom({ position: "topright" }).addTo(map);
    LANDMARKS.forEach(lm => {
      const icon = L.divIcon({ html: '<div class="custom-map-pin"><div class="pin-pulse"></div><div class="pin-dot"></div></div>', className: "custom-div-icon", iconSize: [30, 30] });
      L.marker(lm.latlng, { icon }).addTo(map).on("click", () => { map.setView(lm.latlng, 14); setSelectedLandmark(lm); });
    });
  }, []);

  
  const onHeroMove = e => { if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return;
    if (!heroRef.current || !heroBgRef.current) return;
    const { width, height } = heroRef.current.getBoundingClientRect();
    gsap.to(heroBgRef.current, { x: ((e.clientX - width/2)/width)*20, y: ((e.clientY - height/2)/height)*10, duration: 1.8, ease: "power2.out" });
  };

  
  
  

    
  
  const handleSubmit = e => {
    e.preventDefault();
    const t = `Hello Bharathi Concierge, interested in ${formData.project}. Name: ${formData.name}, Phone: ${formData.phone}, Date: ${formData.date}. Marble: ${marble}, Fixtures: ${fixture}.`;
    window.open(`https://api.whatsapp.com/send?phone=919876543210&text=${encodeURIComponent(t)}`, "_blank");
    setFormSent(true); setTimeout(() => setFormSent(false), 5000);
  };


  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{fontFamily:"Inter, system-ui, sans-serif", background:"var(--paper)", color:"var(--ink)"}}>
      {}
      <div className="aurora-wrap">
        <div className="aurora-blob aurora-1"></div>
        <div className="aurora-blob aurora-2"></div>
        <div className="aurora-blob aurora-3"></div>
      </div>

      {}
      <div className={`preloader ${preloaderHidden ? "hidden" : ""}`}>
        <img src="/logo.png" alt="Bharathi Constructions" className="preloader-logo h-20 w-auto" style={{mixBlendMode:"multiply"}} loading="lazy" decoding="async" />
        <div className="preloader-bar" />
        <p style={{fontSize:"15px", letterSpacing:"0.4em", textTransform:"uppercase", color:"var(--ink-3)"}}>Loading Experience</p>
      </div>

      {}
      <div className="grid-overlay" />
      <div className="orb orb-1" /><div className="orb orb-2" /><div className="orb orb-3" />
      

      {/* -------- MEGA NAV -------- */}
      <MenuOverlay navOpen={navOpen} setNavOpen={setNavOpen} />`n      {/* -------- SITE HEADER -------- */}
      <header className={`site-header ${navOpen ? "nav-open" : ""} ${headerDark && !navOpen ? "dark-mode" : ""}`}>
        {}
        <a href="#" className="logo-block" >
          <img src="/logo.png" alt="Bharathi Constructions" className="logo-img" loading="lazy" decoding="async" />
          <div className="logo-text-block">
            <span className="logo-name">Bharathi Constructions</span>
            <span className="logo-sub">Luxury Residences ï¿½ Hyderabad</span>
          </div>
        </a>

        {}
        <nav className="header-nav">
          {NAV_ITEMS.map(item => (
            <a key={item.href} href={item.href} className="header-nav-link" >{item.label}</a>
          ))}
        </nav>

        {}
        <div style={{display:"flex", alignItems:"center", gap:"1.5rem"}}>
          <a href="#booking" className="header-cta" >Reserve Visit</a>
          <button className={`hamburger ${navOpen ? "open" : ""}`} onClick={() => setNavOpen(!navOpen)}  aria-label="Menu">
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </div>
        <div className="scroll-progress-container"><div className="scroll-progress-bar" /></div>
      </header>

      
      {/* -------- HERO -------- */}
      <section id="hero" className="hero">
        <div ref={heroBgRef} className="hero-bg" style={{backgroundImage:`url("${proj.bg}")`}} />
        <div className="hero-overlay" />
      </section>

      <main ref={mainRef} className="content-wrapper">
      {}
      <div className="marquee-strip">
        <div className="marquee-track gsap-marquee" style={{fontSize:"15px", letterSpacing:"0.45em", textTransform:"uppercase", color:"rgba(201,169,110,0.7)"}}>
          {Array(12).fill(["Bharathi Horizon","Bharathi Lake Woods","Kompally Hyderabad","Premium Residences"]).flat().map((item, i) => (
            <span key={i} style={{paddingRight:"3rem"}}>âœ¦ {item}</span>
          ))}
        </div>
      </div>

      {/* -------- PROJECT HIGHLIGHTS & LEGEND -------- */}
      <section id="amenities" style={{padding:"8rem 2rem", position:"relative"}}>
        <div style={{maxWidth:"1280px", margin:"0 auto"}}>
          <div className="reveal" style={{textAlign:"center", marginBottom:"4rem"}}>
            <span className="section-kicker">Masterplan</span>
            <h2 className="section-heading skeuo-gold-text"><span className="curtain-wrap"><span className="curtain-text" style={{display:"block"}}>Legend</span></span></h2>
            <div className="gold-rule" style={{maxWidth:"120px", margin:"1.5rem auto 3rem", height:"1px", background:"var(--gold)"}} />
            
            {}
            <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(240px, 1fr))", gap:"1.25rem", textAlign:"left", marginBottom:"6rem"}} className="reveal">
              {MASTERPLAN_LEGEND.map((item) => (
                <p key={item} className="body-text" style={{fontSize:"1rem", display:"flex", alignItems:"center", gap:"0.75rem"}}>
                  <span style={{color:"var(--gold)", fontWeight:600}}>{item.split('.')[0]}.</span>
                  <span>{item.split('.')[1]}</span>
                </p>
              ))}
            </div>
          </div>

          <div className="reveal" style={{textAlign:"center", marginBottom:"4rem"}}>
            <h2 className="section-heading skeuo-gold-text"><span className="curtain-wrap"><span className="curtain-text" style={{display:"block"}}>Project Highlights</span></span></h2>
            <div className="gold-rule" style={{maxWidth:"120px", margin:"1.5rem auto 3rem", height:"1px", background:"var(--gold)"}} />
          </div>

          <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(180px, 1fr))", gap:"2rem"}} className="reveal">
            {PROJECT_HIGHLIGHTS.map(([icon, label], i) => (
              <div key={label} className="amenity-item stat-box" style={{textAlign:"center", padding:"2rem 1rem", background:"rgba(255,255,255,0.3)", backdropFilter:"blur(10px)", border:"1px solid var(--border)", borderRadius:"4px"}}>
                <span style={{fontSize:"2.5rem", display:"block", marginBottom:"1.25rem", filter:"drop-shadow(0 4px 10px rgba(201,169,110,0.2))"}}>{icon}</span>
                <p style={{fontSize:"0.8rem", letterSpacing:"0.05em", color:"var(--ink-2)", fontWeight:500, lineHeight:1.5}}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------- CONFIGURATOR -------- */}
      <section id="configurator" style={{padding:"8rem 2rem", background:"var(--paper-2)"}}>
        <div style={{maxWidth:"1280px", margin:"0 auto"}}>
          <div className="reveal" style={{textAlign:"center", marginBottom:"4rem"}}>
            <span className="section-kicker">Personalise Your Residence</span>
            <h2 className="section-heading skeuo-gold-text"><span className="curtain-wrap"><span className="curtain-text" style={{display:"block"}}>{proj.name} ï¿½ Finishes</span></span></h2>
            <div className="gold-rule" style={{maxWidth:"240px", margin:"1.5rem auto 0"}} />
          </div>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3.5rem", alignItems:"start"}}>
            <div className="glass-card reveal-l" style={{padding:"2.5rem"}}>
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1.5rem"}}>
                <span className="pill">Floor Plan</span>
                <span style={{fontSize:"16px", letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--ink-3)"}}>{proj.units}</span>
              </div>
              <div style={{background:"rgba(255,255,255,0.6)", padding:"1.5rem"}}>
                <img className="floor-plan-img" src="/horizon pics/floor-scaled.webp" alt="Floor Plan" style={{width:"100%", height:"auto", objectFit:"contain"}} loading="lazy" decoding="async" />
              </div>
              <p style={{fontSize:"15px", letterSpacing:"0.25em", textTransform:"uppercase", color:"var(--ink-3)", textAlign:"center", marginTop:"1rem"}}>Indicative ï¿½ actual may vary</p>
            </div>
            <div className="reveal-r" style={{display:"flex", flexDirection:"column", gap:"2.5rem"}}>
              <div>
                <span style={{fontSize:"16px", letterSpacing:"0.35em", textTransform:"uppercase", color:"#C9A96E", fontWeight:600, display:"block", marginBottom:"1.25rem"}}>01 / Living Floor Marble</span>
                <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"1rem"}}>
                  {MARBLES.map(m => (
                    <button key={m.id} onClick={() => setMarble(m.id)} className={`swatch glass-card ${marble===m.id?"selected":""}`}
                      style={{padding:"1.25rem", textAlign:"left"}} >
                      <div style={{width:"100%", height:"56px", borderRadius:"2px", marginBottom:"0.75rem", background:m.color, border:"1px solid rgba(201,169,110,0.14)"}} />
                      <p style={{fontSize:"16px", fontWeight:600, letterSpacing:"0.05em", color:"var(--ink)", lineHeight:1.3}}>{m.label}</p>
                      <p style={{fontSize:"15px", color:"var(--ink-2)", marginTop:"0.2rem"}}>{m.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <span style={{fontSize:"16px", letterSpacing:"0.35em", textTransform:"uppercase", color:"#C9A96E", fontWeight:600, display:"block", marginBottom:"1.25rem"}}>02 / Metal Trims & Fixtures</span>
                <div style={{display:"flex", flexDirection:"column", gap:"0.75rem"}}>
                  {FIXTURES.map(f => (
                    <button key={f.id} onClick={() => setFixture(f.id)} className={`swatch glass-card ${fixture===f.id?"selected":""}`}
                      style={{display:"flex", alignItems:"center", gap:"1rem", padding:"1rem", textAlign:"left"}} >
                      <div style={{width:"2.25rem", height:"2.25rem", borderRadius:"50%", background:f.color, border:"2px solid rgba(255,255,255,0.7)", flexShrink:0}} />
                      <span style={{fontSize:"16px", fontWeight:500, color:"var(--ink)"}}>{f.label}</span>
                      {fixture===f.id && <span style={{marginLeft:"auto", fontSize:"15px", color:"#C9A96E", fontWeight:600}}>?</span>}
                    </button>
                  ))}
                </div>
              </div>
              <div className="glass-card" style={{padding:"1.5rem"}}>
                <div style={{fontSize:"16px", letterSpacing:"0.25em", textTransform:"uppercase", color:"var(--ink-3)", marginBottom:"0.5rem"}}>Active Specification</div>
                <div style={{fontFamily:"Playfair Display, serif", fontSize:"1.1rem", color:"var(--ink)"}}>
                  {MARBLES.find(m=>m.id===marble)?.label} <span style={{color:"#C9A96E"}}>+</span> {FIXTURES.find(f=>f.id===fixture)?.label}
                </div>
                <div className="progress-bar" style={{marginTop:"0.75rem"}}><div className="progress-fill run" /></div>
              </div>
              <div style={{display:"flex", gap:"1rem", flexWrap:"wrap"}}>
                <a href="/horizon pics/Horizon_Brohure_15x12_057.webp" target="_blank" className="btn-gold" >Download Brochure</a>
                <a href="#booking" className="clay-btn skeuo-gold-text" ><span>Reserve with Config</span></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------- CONNECTIVITY -------- */}
      <section id="connectivity" style={{padding:"8rem 2rem", position:"relative"}}>
        <div style={{maxWidth:"1280px", margin:"0 auto"}}>
          <div className="reveal" style={{textAlign:"center", marginBottom:"4rem"}}>
            <span className="section-kicker">Kompally Region</span>
            <h2 className="section-heading skeuo-gold-text"><span className="curtain-wrap"><span className="curtain-text" style={{display:"block"}}>Connected Living</span></span></h2>
            <div className="gold-rule" style={{maxWidth:"240px", margin:"1.5rem auto 0"}} />
            <p className="body-text-sm" style={{maxWidth:"480px", margin:"1.5rem auto 0"}}>Schools, hospitals, retail, and highways ï¿½ all within minutes of your doorstep.</p>
          </div>
          <div style={{display:"grid", gridTemplateColumns:"2fr 1fr", gap:"2rem"}}>
            <div className="glass-card reveal-l" style={{height:"500px", overflow:"hidden"}}>
              <div ref={mapRef} style={{width:"100%", height:"100%", border:"2px solid #C9A96E"}} />
            </div>
            <div className="glass-card reveal-r" style={{padding:"2rem", display:"flex", flexDirection:"column", gap:"1.5rem"}}>
              <div style={{borderBottom:"1px solid rgba(201,169,110,0.12)", paddingBottom:"1.5rem"}}>
                <span style={{fontSize:"15px", letterSpacing:"0.3em", textTransform:"uppercase", color:"#C9A96E", fontWeight:600, display:"block", marginBottom:"0.5rem"}}>{selectedLandmark.category}</span>
                <h3 style={{fontFamily:"Playfair Display, serif", fontSize:"1.5rem", fontWeight:400, lineHeight:1.2}}>{selectedLandmark.name}</h3>
                <p style={{fontSize:"15px", color:"var(--ink-2)", marginTop:"0.35rem", letterSpacing:"0.05em"}}>{selectedLandmark.address}</p>
              </div>
              {[
                ["Ankura Hospitals", "1 Min"],
                ["ORR Exit No 6", "8 Mins"],
                ["Secunderabad Railway Station", "12 Mins"],
                ["Malla Reddy University", "12 Mins"],
                ["Biotech Park", "15 Mins"]
              ].map(([k,v]) => (
                <div key={k} style={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:"1rem 0", borderBottom:"1px solid var(--border)"}}>
                  <span style={{fontSize:"0.9rem", color:"var(--ink-2)", fontWeight:500}}>{k}</span>
                  <span style={{fontSize:"1.1rem", fontFamily:"Playfair Display, serif", color:"var(--gold-dark)"}}>{v}</span>
                </div>
              ))}
              <p className="body-text-sm">{selectedLandmark.desc}</p>
              <div style={{marginTop:"auto"}}>
                <p style={{fontSize:"15px", letterSpacing:"0.3em", textTransform:"uppercase", color:"var(--ink-3)", marginBottom:"0.75rem"}}>Click map pins or jump to:</p>
                <div style={{display:"flex", flexWrap:"wrap", gap:"0.5rem"}}>
                  {LANDMARKS.map(lm => (
                    <button key={lm.name}
                      onClick={() => { leafletMap.current?.setView(lm.latlng, 14); setSelectedLandmark(lm); }}
                      style={{fontSize:"15px", letterSpacing:"0.15em", textTransform:"uppercase", border:`1px solid ${selectedLandmark.name===lm.name?"#C9A96E":"rgba(201,169,110,0.18)"}`, color: selectedLandmark.name===lm.name?"#C9A96E":"#7A7165", padding:"0.25rem 0.6rem", background: selectedLandmark.name===lm.name?"rgba(201,169,110,0.06)":"transparent", transition:"all 0.3s", cursor:"pointer"}}>
                      {lm.name.split(" ")[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------- BOOKING -------- */}
      <section id="booking" style={{padding:"8rem 2rem", background:"var(--paper)"}}>
        <div style={{maxWidth:"1280px", margin:"0 auto"}}>
          <div style={{display:"grid", gridTemplateColumns:"2fr 3fr", gap:"4rem", alignItems:"start"}}>
            <div className="reveal-l" style={{display:"flex", flexDirection:"column", gap:"2rem"}}>
              <div>
                <span className="section-kicker">Private Concierge</span>
                <h2 className="section-heading skeuo-gold-text"><span className="curtain-wrap"><span className="curtain-text" style={{display:"block"}}>Book Your<br/><em>Private Visit</em></span></span></h2>
              </div>
              <span className="gold-dash" />
              <p className="body-text">Experience your dream residence with a personal guided tour. Our concierge team will arrange an exclusive walkthrough, tailored entirely to your schedule and preferences.</p>
              <div style={{display:"flex", flexDirection:"column", gap:"1rem"}}>
                {[[<MapPin size={20} color="var(--gold)" />,"Kompally, North Hyderabad"], [<Phone size={20} color="var(--gold)" />,"+91 98765 43210"], [<Clock size={20} color="var(--gold)" />,"Mon–Sat: 10AM – 7PM"]].map(([icon,val]) => (
                  <div key={val} style={{display:"flex", alignItems:"center", gap:"0.75rem", fontSize:"16px", color:"var(--ink-2)"}}>{icon} {val}</div>
                ))}
              </div>
              <div style={{display:"flex", flexWrap:"wrap", gap:"0.5rem"}}>
                {["Instagram","Facebook","YouTube","WhatsApp"].map(s => (
                  <button key={s} style={{fontSize:"15px", letterSpacing:"0.2em", textTransform:"uppercase", color:"#C9A96E", border:"1px solid rgba(201,169,110,0.28)", padding:"0.5rem 0.9rem", cursor:"pointer", background:"transparent", transition:"background 0.3s"}} >{s}</button>
                ))}
              </div>
            </div>
            <div className="glass-card reveal-r" style={{padding:"3rem"}}>
              {formSent ? (
                <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"5rem 0", gap:"1.25rem", textAlign:"center"}}>
                  <span style={{fontSize:"3.5rem"}}>?</span>
                  <h3 style={{fontFamily:"Playfair Display, serif", fontSize:"1.75rem"}}>Request Received</h3>
                  <p className="body-text-sm" style={{maxWidth:"260px"}}>Our concierge team will reach out within 24 hours to confirm your exclusive visit.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column", gap:"1.5rem"}}>
                  <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.25rem"}}>
                    <div><label className="form-label">Full Name</label><input required className="luxury-input" placeholder="Your full name" value={formData.name} onChange={e => setFormData({...formData,name:e.target.value})} /></div>
                    <div><label className="form-label">Phone Number</label><input required type="tel" className="luxury-input" placeholder="+91 XXXXX XXXXX" value={formData.phone} onChange={e => setFormData({...formData,phone:e.target.value})} /></div>
                  </div>
                  <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.25rem"}}>
                    <div><label className="form-label">Development</label><select className="luxury-input" value={formData.project} onChange={e => setFormData({...formData,project:e.target.value})}><option>Bharathi Horizon</option><option>Bharathi Lake Woods</option><option>Both Developments</option></select></div>
                    <div><label className="form-label">Preferred Visit Date</label><input required type="date" className="luxury-input" value={formData.date} onChange={e => setFormData({...formData,date:e.target.value})} /></div>
                  </div>
                  <div><label className="form-label">Message (Optional)</label><textarea className="luxury-input" style={{height:"88px", resize:"none"}} placeholder="Any specific requirements or preferences..." /></div>
                  <button type="submit" className="btn-gold" style={{width:"100%", padding:"1.1rem", fontSize:"15px"}} >Request Private Site Visit</button>
                  <p style={{fontSize:"16px", color:"var(--ink-3)", textAlign:"center", letterSpacing:"0.15em", textTransform:"uppercase"}}>Your details are strictly confidential</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* -------- FOOTER ï¿½ DW style -------- */}
      </main>
      <footer className="site-footer" style={{position: "sticky", bottom: 0, zIndex: 0, background:"var(--paper-2)", paddingTop:"5rem"}}>
        <div style={{maxWidth:"1280px", margin:"0 auto"}}>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", alignItems:"center", gap:"2rem", marginBottom:"2.5rem"}}>
            {}
            <div className="footer-logo-block">
              <img src="/logo.png" alt="Bharathi Constructions" className="footer-logo-img" style={{mixBlendMode:"multiply"}} loading="lazy" decoding="async" />
              <div>
                <div style={{fontFamily:"Playfair Display, serif", fontSize:"1rem", fontWeight:700, letterSpacing:"0.03em", color:"var(--ink)"}}>Bharathi Constructions</div>
                <div style={{fontSize:"15px", letterSpacing:"0.3em", textTransform:"uppercase", color:"#C9A96E", marginTop:"0.15rem"}}>Luxury Residences ï¿½ Hyderabad</div>
              </div>
            </div>
            {}
            <nav style={{display:"flex", justifyContent:"center", flexWrap:"wrap", gap:"1.5rem"}}>
              {NAV_ITEMS.map(item => (
                <a key={item.href} href={item.href} className="header-nav-link" >{item.label}</a>
              ))}
            </nav>
            {}
            <div style={{display:"flex", justifyContent:"flex-end", gap:"0.75rem"}}>
              {["IG","FB","YT","WA"].map(s => (
                <button key={s} style={{width:"2.25rem", height:"2.25rem", border:"1px solid rgba(201,169,110,0.25)", fontSize:"15px", color:"#C9A96E", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.3s"}} onMouseEnter={e => { e.currentTarget.style.background="#C9A96E"; e.currentTarget.style.color="#fff";  }} onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.color="#C9A96E";  }}>{s}</button>
              ))}
            </div>
          </div>
          <div className="gold-rule" style={{marginBottom:"1.75rem"}} />
          <div style={{display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:"1rem", fontSize:"15px", color:"var(--ink-3)", letterSpacing:"0.1em"}}>
            <span>ï¿½ 2026 Bharathi Constructions. All Rights Reserved.</span>
            <span>RERA Registered ï¿½ Kompally, Hyderabad, Telangana</span>
            <span>Architectural renders are indicative only.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}






