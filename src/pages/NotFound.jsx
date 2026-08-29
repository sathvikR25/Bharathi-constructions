import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import KineticText from "../components/KineticText";

export default function NotFound() {
  return (
    <div style={{ background: "transparent", color: "#fdfbf7", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(6rem, 15vw, 15rem)", color: "rgba(255,255,255,0.05)", margin: 0, lineHeight: 1 }}>404</h1>
        <KineticText as="h2" text="This space doesn't exist yet." style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2rem, 4vw, 4rem)", margin: "-2rem 0 3rem 0", color: "#fff", position: "relative", zIndex: 10 }} />
        <Link to="/" className="hover-target" style={{ display: "inline-flex", alignItems: "center", gap: "1rem", color: "#fff", textDecoration: "none", fontSize: "0.85rem", letterSpacing: "0.2em", textTransform: "uppercase", padding: "1.5rem 4rem", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "100px", transition: "background 0.3s" }} onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.1)"} onMouseLeave={e => e.currentTarget.style.background="transparent"}>
          Return Home <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
