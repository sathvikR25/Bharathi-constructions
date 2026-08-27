import React from "react";
import { Link } from "react-router-dom";

const MENU_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Projects", href: "/#projects" },
  { label: "Bharathi Horizon", href: "/horizon", isSub: true },
  { label: "Bharathi Lake Woods", href: "/lake-woods", isSub: true },
  { label: "Locations", href: "/#connectivity" },
  { label: "Enquiry", href: "/#booking" }
];

export default function MenuOverlay({ navOpen, setNavOpen }) {
  return (
    <div className={`mega-nav ${navOpen ? "open" : ""}`} style={{overflowY: "auto", display: "flex", flexDirection: "column"}}>
      <div className="mega-nav-bg" />
      <div className="mega-nav-content" style={{width: "100%", maxWidth: "1600px", margin: "0 auto", padding: "120px 2rem 6rem", flex: 1, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "4rem", alignItems: "center"}}>
        
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", paddingRight: "4rem"}}>
          <img src="/logo.png" alt="Bharathi Constructions" style={{width: "80%", maxWidth: "400px", opacity: navOpen ? 1 : 0, transform: navOpen ? "scale(1)" : "scale(0.9)", transition: "all 1s ease 0.3s", mixBlendMode: "multiply"}} />
          <h2 style={{fontFamily: "Playfair Display, serif", fontSize: "2rem", color: "var(--ink)", marginTop: "2rem", opacity: navOpen ? 1 : 0, transition: "opacity 1s ease 0.5s"}}>Bharathi Constructions</h2>
          <p style={{letterSpacing: "0.4em", textTransform: "uppercase", fontSize: "0.8rem", color: "var(--gold)", marginTop: "0.5rem", opacity: navOpen ? 1 : 0, transition: "opacity 1s ease 0.6s"}}>Signature Spaces</p>
        </div>

        <div style={{display:"flex", flexDirection:"column", gap:"2rem"}}>
          {MENU_ITEMS.map((item, i) => (
            <div key={i} className="menu-item-wrapper" style={{transform: navOpen ? "translateY(0)" : "translateY(40px)", opacity: navOpen ? 1 : 0, transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.05}s`}}>
              {item.href.startsWith("/") && !item.href.includes("#") ? (
                <Link to={item.href} onClick={() => setNavOpen(false)} style={{
                  textDecoration: "none", 
                  fontFamily: "Playfair Display, serif", 
                  fontSize: item.isSub ? "clamp(2rem, 4vw, 2.5rem)" : "clamp(3rem, 5vw, 4rem)", 
                  color: "var(--ink)", 
                  display: "block",
                  paddingLeft: item.isSub ? "4rem" : "0",
                  opacity: item.isSub ? 0.7 : 1
                }}>
                  {item.label}
                </Link>
              ) : (
                <a href={item.href} onClick={() => setNavOpen(false)} style={{
                  textDecoration: "none", 
                  fontFamily: "Playfair Display, serif", 
                  fontSize: item.isSub ? "clamp(2rem, 4vw, 2.5rem)" : "clamp(3rem, 5vw, 4rem)", 
                  color: "var(--ink)", 
                  display: "block",
                  paddingLeft: item.isSub ? "4rem" : "0",
                  opacity: item.isSub ? 0.7 : 1
                }}>
                  {item.label}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
