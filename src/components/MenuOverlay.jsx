import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

const MENU_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Our Legacy", href: "/legacy" },
  { label: "Bharathi Horizon", href: "/horizon", isSub: true },
  { label: "Bharathi Lake Woods", href: "/lake-woods", isSub: true },
  { label: "Contact Us", href: "/contact" }
];

export default function MenuOverlay({ navOpen, setNavOpen }) {
  const overlayRef = useRef(null);
  const linksRef = useRef([]);
  linksRef.current = [];

  const addToRefs = (el) => {
    if (el && !linksRef.current.includes(el)) {
      linksRef.current.push(el);
    }
  };

  useEffect(() => {
    if (navOpen) {
      gsap.to(overlayRef.current, { yPercent: 0, duration: 0.8, ease: "power4.inOut" });
      gsap.fromTo(linksRef.current, 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: "power3.out", delay: 0.4 }
      );
    } else {
      gsap.to(overlayRef.current, { yPercent: -100, duration: 0.8, ease: "power4.inOut" });
    }
  }, [navOpen]);

  return (
    <div ref={overlayRef} style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100vh",
      background: "#050505",
      zIndex: 95, // Below header
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transform: "translateY(-100%)",
      willChange: "transform"
    }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem", textAlign: "center" }}>
        <span style={{ fontSize: "0.8rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "2rem" }}>Navigation</span>
        {MENU_ITEMS.map((item, i) => (
          <div key={i} style={{ overflow: "hidden" }}>
            <Link 
              ref={addToRefs}
              to={item.href} 
              className="hover-target"
              onClick={() => setNavOpen(false)} 
              style={{
                textDecoration: "none", 
                fontFamily: "Playfair Display, serif", 
                fontSize: item.isSub ? "clamp(2rem, 4vw, 3rem)" : "clamp(3.5rem, 6vw, 5.5rem)", 
                color: item.isSub ? "rgba(255,255,255,0.4)" : "#fff",
                fontStyle: item.isSub ? "italic" : "normal",
                display: "block",
                transition: "color 0.3s, transform 0.3s"
              }}
              onMouseEnter={e => {
                e.target.style.color = "#fff";
                e.target.style.transform = "translateX(20px)";
              }}
              onMouseLeave={e => {
                e.target.style.color = item.isSub ? "rgba(255,255,255,0.4)" : "#fff";
                e.target.style.transform = "translateX(0px)";
              }}
            >
              {item.label}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
