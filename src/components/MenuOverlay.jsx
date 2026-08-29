import React from "react";
import { Link } from "react-router-dom";

const MENU_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Our Legacy", href: "/legacy" },
  { label: "Bharathi Horizon", href: "/horizon", isSub: true },
  { label: "Bharathi Lake Woods", href: "/lake-woods", isSub: true },
  { label: "Contact Us", href: "/contact" }
];

export default function MenuOverlay({ navOpen, setNavOpen }) {
  if (!navOpen) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100vh",
      background: "rgba(5, 5, 5, 0.98)",
      backdropFilter: "blur(20px)",
      zIndex: 99,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem", textAlign: "center" }}>
        {MENU_ITEMS.map((item, i) => (
          <Link 
            key={i} 
            to={item.href} 
            className="hover-target"
            onClick={() => setNavOpen(false)} 
            style={{
              textDecoration: "none", 
              fontFamily: "Playfair Display, serif", 
              fontSize: item.isSub ? "clamp(2rem, 4vw, 3rem)" : "clamp(3rem, 6vw, 5rem)", 
              color: item.isSub ? "rgba(255,255,255,0.5)" : "#fff",
              fontStyle: item.isSub ? "italic" : "normal",
              transition: "color 0.3s"
            }}
            onMouseEnter={e => e.target.style.color = "#fff"}
            onMouseLeave={e => e.target.style.color = item.isSub ? "rgba(255,255,255,0.5)" : "#fff"}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
