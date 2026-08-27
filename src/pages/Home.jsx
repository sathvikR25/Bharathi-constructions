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
    bg: "/lakewood-media/lakewood-cover.jpg", accent: "Premium Residences",
    units: "40 Exclusive Units", structure: "Premium Residences", floors: "8+2 Floors",
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
  ["ðŸ›ï¸", "Grand Entrance with Waiting Area Lounge"],
  ["ðŸ§˜â€â™€ï¸", "Yoga / Multipurpose / Meditation Hall"],
  ["ðŸ›", "Children's Play Area"],
  ["ðŸ›—", "Lifts"],
  ["ðŸ›’", "Grocery Store"],
  ["ðŸŽ¬", "Mini Theatre"],
  ["âš¡", "100% Power Backup"],
  ["ðŸ”Œ", "EV Charging"],
  ["ðŸ“", "Indoor Games"],
  ["ðŸ“¹", "CC Cameras"]
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
  { href: "#legacy", label: "Our Legacy", img: "/horizon pics/Multi-purpose-Room_FFFF-copy.webp" },
  { href: "#projects", label: "Projects", img: "/horizon pics/VIEW_09_FFFF-copy.webp" },
  { href: "/horizon", label: "Horizon", img: "/horizon pics/hero-night.jpg" },
  { href: "/lake-woods", label: "Lake Woods", img: "/horizon pics/View_13_FFFFFF-copy.webp" },
  { href: "#connectivity", label: "Location", img: "/horizon pics/View_13_FFFFFF-copy.webp" },
  { href: "#booking", label: "Contact Us", img: "/horizon pics/Multi-purpose-Room_FFFF-copy.webp" }
];


import { Link } from "react-router-dom";
import { Leaf, Award, ShieldCheck, Home as HomeIcon } from "lucide-react";
import MenuOverlay from "../components/MenuOverlay";
export default function Home() {
  const [activeProj, setActiveProj] = useState("horizon");
  const [marble, setMarble] = useState("stat");
  const [fixture, setFixture] = useState("champ");
  const [selectedLandmark, setSelectedLandmark] = useState(LANDMARKS[0]);
  const [navOpen, setNavOpen] = useState(false);
  const [headerDark, setHeaderDark] = useState(false);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Paper Reveal Flattening
      if (mainRef.current) {
        ScrollTrigger.create({
          trigger: mainRef.current,
          start: "top bottom",
          end: "top top",
          scrub: true,
          animation: gsap.to(mainRef.current, {
            borderTopLeftRadius: "0px",
            borderTopRightRadius: "0px",
            ease: "none"
          })
        });
      }

      // 2. Hero Cinematic Depth Parallax
      if (heroBgRef.current && mainRef.current) {
        gsap.to(heroBgRef.current, {
          y: "35%", // Pushes down significantly for extreme depth
          ease: "none",
          scrollTrigger: {
            trigger: mainRef.current,
            start: "top bottom",
            end: "top top",
            scrub: true
          }
        });
      }

      // 3. Staggered Stat Reveals (The Wave)
      
      // Hero Typography Reveal
      gsap.fromTo(".reveal", 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, stagger: 0.2, duration: 1.0, ease: "power3.out", delay: 0.2 }
      );
      
      gsap.set(".stat-box", { opacity: 0, y: 50 });
      ScrollTrigger.batch(".stat-box", {
        onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15, duration: 1.2, ease: "power3.out" }),
        start: "top 90%"
      });

      // 4. Project Card Parallax (Asymmetric Scrolling)
      gsap.utils.toArray(".proj-card").forEach((card, i) => {
        if (i % 2 !== 0) {
          // Right-side cards scroll slightly faster/slower for asymmetry
          gsap.to(card, {
            y: -60,
            ease: "none",
            scrollTrigger: {
              trigger: card.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          });
        }
      });
    });

    
      // 6. Scroll Velocity Marquee
      let marqueeTween = gsap.to(".marquee-track", {
        xPercent: -50,
        repeat: -1,
        duration: 10,
        ease: "linear"
      }).totalProgress(0.5);
      
      const updateMarquee = () => {
        // Adjust timeScale based on Lenis velocity if available, otherwise default
        const velocity = window.lenisVelocity || 0;
        let timeScale = 1 + Math.abs(velocity) * 0.05;
        gsap.to(marqueeTween, { timeScale: timeScale, duration: 0.2, ease: "power2.out" });
      };
      gsap.ticker.add(updateMarquee);

      
      // 8. Scroll Progress Bar
      gsap.to(".scroll-progress-bar", {
        width: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.1
        }
      });
  
      // 7. Clip-Path Image Reveals
      gsap.utils.toArray(".mask-img").forEach(img => {
        gsap.fromTo(img.parentElement, 
          { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
          { 
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1.0,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: img.parentElement,
              start: "top 95%"
            }
          }
        );
      });
  

      // 5. Magnetic Buttons (DOM Listeners)
    const btns = document.querySelectorAll(".btn-gold");
    const hMove = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.4;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.4;
      gsap.to(e.currentTarget, { x, y, duration: 0.3, ease: "power2.out" });
    };
    const hLeave = (e) => {
      gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.3)" });
    };
    btns.forEach(btn => {
      btn.addEventListener("mousemove", hMove);
      btn.addEventListener("mouseleave", hLeave);
    });

    return () => {
      gsap.ticker.remove(updateMarquee);
      ctx.revert();
      btns.forEach(btn => {
        btn.removeEventListener("mousemove", hMove);
        btn.removeEventListener("mouseleave", hLeave);
      });
    };
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

  const proj = PROJECTS[activeProj];

  
  useEffect(() => {
    const t = setTimeout(() => setPreloaderHidden(true), 2200);
    return () => clearTimeout(t);
  }, []);

  
  useEffect(() => {
    const tick = () => setTime(new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).format(new Date()));
    tick(); const t = setInterval(tick, 1000); return () => clearInterval(t);
  }, []);

  
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
      window.lenisVelocity = lenis.velocity;
    });
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
    };
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
    
    let ctx = gsap.context(() => {
      // Hero Parallax
      if (heroBgRef.current) {
        gsap.to(heroBgRef.current, { yPercent: 20, ease: "none", scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true } });
      }

      
        // Advanced Media Visibility & 3D Blur Reveal
        gsap.utils.toArray(".mask-wrap").forEach(wrap => {
          const img = wrap.querySelector(".mask-img");
          const block = wrap.querySelector(".mask-block");
          if (img && block) {
            gsap.fromTo(block, { scaleX: 1 }, { scaleX: 0, transformOrigin: "right", duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: wrap, start: "top 95%" } });
            gsap.fromTo(img, 
              { scale: 1.5, rotationX: 45, rotationY: 20, opacity: 0, z: -500 }, 
              { scale: 1, rotationX: 0, rotationY: 0, opacity: 1, z: 0, duration: 3, ease: "expo.out", scrollTrigger: { trigger: wrap, start: "top 95%" } }
            );
            gsap.to(img, { yPercent: 15, ease: "none", scrollTrigger: { trigger: wrap, start: "top bottom", end: "bottom top", scrub: true } });
          }
        });

        // Project Cards (Glass Cards) Horizontal Slide In
      gsap.utils.toArray(".glass-card").forEach((card, i) => {
        gsap.fromTo(card, 
            { opacity: 0, x: i % 2 === 0 ? -200 : 200, rotationY: i % 2 === 0 ? -45 : 45, rotationX: 20, z: -800, transformPerspective: 2500 }, 
            { opacity: 1, x: 0, rotationY: 0, rotationX: 0, z: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: card, start: "top 95%" } }
          );
      });
    
        // 3D Tilt effect for Project Cards
        gsap.utils.toArray(".proj-card").forEach(card => {
          card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const xPct = x / rect.width - 0.5;
            const yPct = y / rect.height - 0.5;
            gsap.to(card.querySelector(".mask-wrap"), {
              rotationY: xPct * 25,
              rotationX: -yPct * 25,
              transformPerspective: 2000,
              ease: "power3.out",
              duration: 0.6
            });
            gsap.to(card.querySelector(".proj-card-info"), {
              x: xPct * 80,
              y: yPct * 80,
              z: 150,
              rotationY: xPct * 30,
              rotationX: -yPct * 30,
              transformPerspective: 2000,
              ease: "power3.out",
              duration: 0.6
            });
          });
          card.addEventListener("mouseleave", () => {
            gsap.to(card.querySelector(".mask-wrap"), { rotationY: 0, rotationX: 0, ease: "power2.out", duration: 0.5 });
            gsap.to(card.querySelector(".proj-card-info"), { x: 0, y: 0, ease: "power2.out", duration: 0.5 });
          });
        });
}, mainRef);

    return () => { obs.disconnect(); ctx.revert(); };
  }, []);

  
  useEffect(() => {
    if (!mapRef.current) return;
    if (leafletMap.current) leafletMap.current.remove();
    const map = L.map(mapRef.current, { center: [17.531, 78.481], zoom: 13, zoomControl: false, scrollWheelZoom: false });
    leafletMap.current = map;
    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", { attribution: "CartoDB" }).addTo(map);
    L.control.zoom({ position: "topright" }).addTo(map);
    L.polyline([
      [17.528, 78.489],
      [17.534, 78.472]
    ], { color: '#C9A96E', weight: 4, opacity: 0.8, dashArray: '5, 10' }).addTo(map);

    LANDMARKS.forEach(lm => {
      
      const isProject = lm.category === "Development Site";
      const htmlStr = isProject 
        ? '<div class="custom-map-pin"><div class="pin-pulse" style="border-color:#C9A96E; animation-duration: 1.0s;"></div><div class="pin-dot" style="background:#C9A96E; width:20px; height:20px; margin-left:-5px; margin-top:-5px;"></div></div>' 
        : '<div class="custom-map-pin"><div class="pin-pulse"></div><div class="pin-dot"></div></div>';
      const icon = L.divIcon({ html: htmlStr, className: "custom-div-icon", iconSize: [30, 30] });

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
      <div className={`preloader ${preloaderHidden ? "hidden" : ""}`}>
        <img src="/logo.png" alt="Bharathi Constructions" className="preloader-logo h-20 w-auto" style={{mixBlendMode:"multiply"}}  decoding="async" />
        <div className="preloader-bar" />
        <p style={{fontSize:"15px", letterSpacing:"0.4em", textTransform:"uppercase", color:"var(--ink-3)"}}>Loading Experience</p>
      </div>

      {}
      <div className="grid-overlay" />
      <div className="orb orb-1" /><div className="orb orb-2" /><div className="orb orb-3" />
      

      {/* -------- MEGA NAV -------- */}
      <MenuOverlay navOpen={navOpen} setNavOpen={setNavOpen} />
      {/* -------- SITE HEADER -------- */}
      <header className={`site-header ${navOpen ? "nav-open" : ""} ${headerDark && !navOpen ? "dark-mode" : ""}`}>
        {}
        <a href="#" className="logo-block" >
          <img src="/logo.png" alt="Bharathi Constructions" className="logo-img"  decoding="async" />
          <div className="logo-text-block">
            <span className="logo-name">Bharathi Constructions</span>
            <span className="logo-sub">Signature Spaces</span>
          </div>
        </a>

        {}
        

        {}
        <div style={{display:"flex", alignItems:"center", gap:"2rem"}}><a href="#booking" className="clay-btn" style={{padding: "0.6rem 1.5rem"}}>Site Visit</a><button className="menu-toggle" onClick={() => setNavOpen(!navOpen)}><span style={{fontSize:"0.8rem", letterSpacing:"0.2em", textTransform:"uppercase"}}>{navOpen ? "Close" : "Menu"}</span></button>
        </div>
        <div className="scroll-progress-container"><div className="scroll-progress-bar" /></div>
      </header>

      
      {/* -------- HERO -------- */}
      <section id="hero" className="hero" style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center"}}>
        <div ref={heroBgRef} className="hero-bg" style={{backgroundImage:`url("/horizon pics/hero-night.jpg")`}} />
        <div className="hero-overlay" style={{background: "rgba(10,10,10,0.4)"}} />
        
        <div style={{position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "0 2rem", marginTop: "10vh"}}>
          <h1 className="reveal" style={{fontFamily: "Playfair Display, serif", fontSize: "clamp(3rem, 8vw, 7rem)", fontWeight: 400, color: "#fff", lineHeight: 1.1, margin: 0, letterSpacing: "-0.02em"}}>
            Bharathi<br/><span style={{fontStyle: "italic", color: "var(--gold)"}}>Constructions</span>
          </h1>
        </div>

        {}
        <div className="reveal" style={{position: "absolute", bottom: "3rem", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem"}}>
          <div style={{width: "1px", height: "80px", background: "rgba(255,255,255,0.15)", position: "relative", overflow: "hidden"}}>
            <div style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "var(--gold)", animation: "scrollLine 2s infinite cubic-bezier(0.65,0,0.35,1)"}} />
          </div>
        </div>
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

      {/* -------- LEGACY -------- */}
      <section id="legacy" style={{padding:"8rem 2rem", maxWidth:"1280px", margin:"0 auto", position:"relative"}}>
        <div style={{display:"grid", gridTemplateColumns:"1fr", gap:"5rem"}} className="lg:grid-cols-2">
          <div className="reveal-l" style={{display:"flex", flexDirection:"column", gap:"2rem"}}>
            <div>
              <span className="section-kicker">The Bharathi Legacy</span>
              <h2 className="section-heading skeuo-gold-text"><span className="curtain-wrap"><span className="curtain-text" style={{display:"block"}}>Quiet luxury,<br/><em>uncompromised.</em></span></span></h2>
            </div>
            <span className="gold-dash" />
            <p className="body-text">Bharathi Constructions crafts architectural masterpieces for HNIs and NRIs ï¿½ a sophisticated sanctuary that balances editorial aesthetics with functional grandeur. Our landmarks in Kompally re-imagine North Hyderabad premium living.</p>
            <p className="body-text-sm">From high-rise sky villas to pristine lakeside gated communities, we source premium natural stone, travertine cladding, and brushed champagne hardware ï¿½ globally sourced, locally finished.</p>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.5rem"}}>
              {[["15+","Years Craftsmanship"],["100%","RERA Compliant"],["2","Active Developments"],["500+","Happy Families"]].map(([n,l]) => (
                <div key={l} className="stat-block">
                  <div className="stat-num skeuo-gold-text">{n}</div>
                  <div className="stat-lbl">{l}</div>
                </div>
              ))}
            </div>
            <div style={{display:"flex", gap:"1rem", flexWrap:"wrap"}}>
              <a href="#projects" className="clay-btn skeuo-gold-text" >View Projects</a>
              <a href="#booking" className="clay-btn" ><span>Get Brochure</span></a>
            </div>
          </div>
          <div className="reveal-r" style={{display:"flex", flexDirection:"column", gap:"1.25rem"}}>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.25rem"}}>
              <div className="mask-wrap" style={{aspectRatio: "16/9", marginTop:"3rem"}}>
                <div className="mask-block" /><img src="/horizon pics/Multi-purpose-Room_FFFF-copy.webp" alt="Lounge" className="mask-img hover:scale-105" style={{width:"100%", height:"100%", objectFit:"cover", transition:"transform 1.4s cubic-bezier(0.16,1,0.3,1)"}}  decoding="async" />
              </div>
              <div className="mask-wrap" style={{aspectRatio: "16/9"}}>
                <div className="mask-block" /><img src="/horizon pics/View_13_FFFFFF-copy.webp" alt="Villa" className="mask-img hover:scale-105" style={{width:"100%", height:"100%", objectFit:"cover", transition:"transform 1.4s cubic-bezier(0.16,1,0.3,1)"}}  decoding="async" />
              </div>
            </div>
            <div className="clay-card" style={{padding:"1.25rem", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
              <span style={{fontSize:"16px", letterSpacing:"0.25em", textTransform:"uppercase", color:"var(--ink-3)"}}>Certified By</span>
              {["RERA","CREDAI","ISO 9001","IGBC"].map(t => (
                <span key={t} style={{fontSize:"16px", letterSpacing:"0.15em", fontWeight:600, color:"#C9A96E", border:"1px solid rgba(201,169,110,0.28)", padding:"0.25rem 0.6rem"}}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* -------- PROJECTS -------- */}
      <section id="projects" style={{padding:"8rem 2rem", background:"var(--paper)"}}>
        <div style={{maxWidth:"1280px", margin:"0 auto"}}>
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"4rem", flexWrap:"wrap", gap:"1.5rem"}} className="reveal">
            <div>
              <span className="section-kicker">Current Developments</span>
              <h2 className="section-heading skeuo-gold-text"><span className="curtain-wrap"><span className="curtain-text" style={{display:"block"}}>The Portfolio</span></span></h2>
            </div>
            <p className="body-text-sm" style={{maxWidth:"280px"}}>Two landmark developments in Kompally ï¿½ one vision of uncompromised luxury living.</p>
          </div>
          <div style={{display:"flex", flexDirection:"column", gap:"2rem"}}>
            {Object.values(PROJECTS).map((p, idx) => (
              <div key={p.id} className="clay-card reveal" style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(400px, 1fr))", overflow:"hidden"}}>
                <div className={`proj-card ${idx%2===1?"order-last":""}`} style={{height:"600px", minHeight: "50vh"}}>
                  <div className="mask-wrap" style={{width:"100%", height:"100%"}} ><div className="mask-block" /><img src={p.bg} alt={p.name} className="mask-img" style={{width:"100%", height:"100%", objectFit:"cover"}}  decoding="async" /></div>
                  <div className="proj-card-overlay" />
                  <div className="proj-card-info" style={{transformStyle: "preserve-3d"}}>
                    <span style={{fontSize:"15px", letterSpacing:"0.35em", textTransform:"uppercase", color:"#C9A96E", display:"block", marginBottom:"0.4rem"}}>{p.accent}</span>
                    <h3 style={{fontFamily:"Playfair Display, serif", fontSize:"1.9rem", color:"var(--ink)", fontWeight:400}}>{p.name}</h3>
                  </div>
                </div>
                <div style={{padding:"3.5rem", display:"flex", flexDirection:"column", justifyContent:"center", gap:"1.75rem"}}>
                  <div>
                    <span className="pill">{p.status}</span>
                    <h3 style={{fontFamily:"Playfair Display, serif", fontSize:"2rem", fontWeight:700, marginTop:"0.75rem", lineHeight:1.1}}>{p.name}</h3>
                    <p style={{fontFamily:"Playfair Display, serif", fontStyle:"italic", fontSize:"1.1rem", color:"#C9A96E", fontWeight:400, marginTop:"0.35rem"}}>{p.tagline} {p.subtitle}</p>
                  </div>
                  <p className="body-text-sm">{p.desc}</p>
                  <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem"}}>
                    {[["Type",p.units],["Structure",p.structure],["Floors",p.floors],["Handover",p.completion],["Location",p.location],].map(([k,v]) => (
                      <div key={k} style={{borderBottom:"1px solid rgba(201,169,110,0.1)", paddingBottom:"0.75rem"}}>
                        <div style={{fontSize:"15px", letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--ink-3)", marginBottom:"0.3rem"}}>{k}</div>
                        <div style={{fontSize:"15px", fontWeight:500, color:"var(--ink)"}}>{v}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{display:"flex", gap:"1rem", flexWrap:"wrap"}}>
                    {p.id === "horizon" ? <Link to="/horizon" className="clay-btn skeuo-gold-text">Explore Horizon</Link> : <Link to="/lake-woods" className="clay-btn skeuo-gold-text">Explore Lake Woods</Link>}
                    <a href="#booking" className="clay-btn" ><span>Book Visit</span></a>
                  </div>
                </div>
              </div>
            ))}
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
            <div className="clay-card reveal-l" style={{height:"500px", overflow:"hidden"}}>
              <div ref={mapRef} style={{width:"100%", height:"100%", border:"2px solid #C9A96E"}} />
            </div>
            <div className="clay-card reveal-r" style={{padding:"2rem", display:"flex", flexDirection:"column", gap:"1.5rem"}}>
              <div style={{borderBottom:"1px solid rgba(201,169,110,0.12)", paddingBottom:"1.5rem"}}>
                <span style={{fontSize:"15px", letterSpacing:"0.3em", textTransform:"uppercase", color:"#C9A96E", fontWeight:600, display:"block", marginBottom:"0.5rem"}}>{selectedLandmark.category}</span>
                <h3 style={{fontFamily:"Playfair Display, serif", fontSize:"1.5rem", fontWeight:400, lineHeight:1.2}}>{selectedLandmark.name}</h3>
                <p style={{fontSize:"15px", color:"var(--ink-2)", marginTop:"0.35rem", letterSpacing:"0.05em"}}>{selectedLandmark.address}</p>
              </div>
              {[["From Horizon", selectedLandmark.times.horizon],["From Lake Woods", selectedLandmark.times.lakewoods]].map(([k,v]) => (
                <div key={k} style={{display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:"1px solid rgba(201,169,110,0.08)", paddingBottom:"0.75rem"}}>
                  <span style={{fontSize:"16px", letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--ink-3)"}}>{k}</span>
                  <span style={{fontSize:"1.1rem", fontWeight:700, color:"#C9A96E"}}>{v}</span>
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
                {[["??","Kompally, North Hyderabad"],["??","+91 98765 43210"],["??","Monï¿½Sat: 10AM ï¿½ 7PM"]].map(([icon,val]) => (
                  <div key={val} style={{display:"flex", alignItems:"center", gap:"0.75rem", fontSize:"16px", color:"var(--ink-2)"}}>{icon} {val}</div>
                ))}
              </div>
              <div style={{display:"flex", flexWrap:"wrap", gap:"0.5rem"}}>
                {["Instagram","Facebook","YouTube","WhatsApp"].map(s => (
                  <button key={s} style={{fontSize:"15px", letterSpacing:"0.2em", textTransform:"uppercase", color:"#C9A96E", border:"1px solid rgba(201,169,110,0.28)", padding:"0.5rem 0.9rem", cursor:"pointer", background:"transparent", transition:"background 0.3s"}} >{s}</button>
                ))}
              </div>
            </div>
            <div className="clay-card reveal-r" style={{padding:"3rem"}}>
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
                  <button type="submit" className="clay-btn skeuo-gold-text" style={{width:"100%", padding:"1.1rem", fontSize:"15px"}} >Request Private Site Visit</button>
                  <p style={{fontSize:"16px", color:"var(--ink-3)", textAlign:"center", letterSpacing:"0.15em", textTransform:"uppercase"}}>Your details are strictly confidential</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* -------- FOOTER ï¿½ DW style -------- */}
      </main>
      <footer className="site-footer" style={{position: "sticky", bottom: 0, zIndex: 0, background:"var(--ink)", color: "var(--paper)", paddingTop:"8rem", paddingBottom: "4rem"}}>
        <div style={{maxWidth:"1600px", margin:"0 auto", padding:"0 2rem"}}>
          
          <div style={{display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "6rem", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "6rem"}}>
            <img src="/logo.png" alt="Bharathi Constructions" style={{height: "120px", filter: "brightness(0) invert(1)", marginBottom: "2rem"}}  decoding="async" />
            <h2 style={{fontFamily: "Playfair Display, serif", fontSize: "clamp(3rem, 8vw, 8rem)", fontWeight: 400, color: "var(--paper)", textAlign: "center", lineHeight: 1.1, margin: 0}}>
              BHARATHI
            </h2>
            <p style={{fontSize: "clamp(1rem, 2vw, 1.5rem)", letterSpacing: "0.5em", textTransform: "uppercase", color: "var(--gold)", marginTop: "1rem"}}>Signature Spaces</p>
          </div>

          <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "4rem", marginBottom: "6rem"}}>
            <div>
              <h4 style={{fontSize: "1.2rem", fontFamily: "Playfair Display, serif", color: "var(--gold)", marginBottom: "1.5rem"}}>Get in Touch</h4>
              <p style={{color: "rgba(255,255,255,0.7)", lineHeight: 1.8, marginBottom: "1rem"}}>NCL Colony, Kompally,<br/>North Hyderabad, 500014</p>
              <p style={{color: "rgba(255,255,255,0.7)", lineHeight: 1.8}}>+91 98765 43210<br/>sales@bharathiconstructions.com</p>
            </div>
            
            <div>
              <h4 style={{fontSize: "1.2rem", fontFamily: "Playfair Display, serif", color: "var(--gold)", marginBottom: "1.5rem"}}>Quick Links</h4>
              <div style={{display: "flex", flexDirection: "column", gap: "0.75rem"}}>
                {["Home", "Portfolio", "Bharathi Horizon", "Bharathi Lake Woods", "Enquiry"].map(link => (
                  <a key={link} href="#" style={{color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "0.9rem", transition: "color 0.3s"}} onMouseEnter={e => e.target.style.color = "var(--gold)"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.7)"}>{link}</a>
                ))}
              </div>
            </div>

            <div>
              <h4 style={{fontSize: "1.2rem", fontFamily: "Playfair Display, serif", color: "var(--gold)", marginBottom: "1.5rem"}}>Accreditations</h4>
              <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem"}}>
                <div style={{display: "flex", alignItems: "center", gap: "0.75rem"}}>
                  <ShieldCheck size={28} color="var(--gold)" />
                  <span style={{fontSize: "0.8rem", color: "rgba(255,255,255,0.7)", letterSpacing: "0.1em"}}>TS RERA<br/>APPROVED</span>
                </div>
                <div style={{display: "flex", alignItems: "center", gap: "0.75rem"}}>
                  <Leaf size={28} color="var(--gold)" />
                  <span style={{fontSize: "0.8rem", color: "rgba(255,255,255,0.7)", letterSpacing: "0.1em"}}>IGBC<br/>GREEN</span>
                </div>
                <div style={{display: "flex", alignItems: "center", gap: "0.75rem"}}>
                  <HomeIcon size={28} color="var(--gold)" />
                  <span style={{fontSize: "0.8rem", color: "rgba(255,255,255,0.7)", letterSpacing: "0.1em"}}>CREDAI<br/>MEMBER</span>
                </div>
                <div style={{display: "flex", alignItems: "center", gap: "0.75rem"}}>
                  <Award size={28} color="var(--gold)" />
                  <span style={{fontSize: "0.8rem", color: "rgba(255,255,255,0.7)", letterSpacing: "0.1em"}}>ISO 9001<br/>CERTIFIED</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "2rem", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "2rem", fontSize: "0.8rem", color: "rgba(255,255,255,0.5)"}}>
            <p> 2026 Bharathi Constructions. All Rights Reserved.</p>
            <div style={{display: "flex", gap: "2rem"}}>
              <a href="#" style={{color: "inherit", textDecoration: "none"}}>Privacy Policy</a>
              <a href="#" style={{color: "inherit", textDecoration: "none"}}>Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}









