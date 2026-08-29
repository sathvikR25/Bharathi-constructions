import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuOverlay from "../components/MenuOverlay";
import Header from "../components/Header";
import CustomCursor from "../components/CustomCursor";
import KineticText from "../components/KineticText";

export default function Legacy() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div style={{ background: "#fdfbf7", color: "#0a0a0a", minHeight: "100vh" }}>
      <CustomCursor />
      
      <Header theme="light" navOpen={navOpen} setNavOpen={setNavOpen} />
      <MenuOverlay navOpen={navOpen} setNavOpen={setNavOpen} />

      <section style={{ paddingTop: "25vh", paddingBottom: "10vh", paddingLeft: "4rem", paddingRight: "4rem", maxWidth: "1200px", margin: "0 auto" }}>
        <span style={{ fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(0,0,0,0.4)", display: "block", marginBottom: "1.5rem" }}>Our Heritage</span>
        <KineticText as="h1" text="Four Decades of" style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(3.5rem, 7vw, 7rem)", margin: 0, fontWeight: 400, color: "#0a0a0a", lineHeight: 1.1 }} />
        <KineticText as="h1" text="Uncompromising Precision." style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(3.5rem, 7vw, 7rem)", margin: "0 0 6rem 0", fontWeight: 400, color: "rgba(0,0,0,0.3)", fontStyle: "italic", lineHeight: 1.1 }} />
        
        <div style={{ borderTop: "1px solid rgba(0,0,0,0.1)", paddingTop: "4rem", display: "flex", flexWrap: "wrap", gap: "6rem" }}>
          <div style={{ flex: "1 1 300px" }}>
            <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: "2rem", margin: "0 0 1rem 0" }}>The Philosophy</h3>
          </div>
          <div style={{ flex: "1 1 500px" }}>
            <p style={{ fontSize: "1.2rem", lineHeight: 1.8, color: "rgba(0,0,0,0.7)", margin: "0 0 2rem 0" }}>
              Bharathi Constructions was founded on a singular premise: a home is not just a structure, but a sanctuary that holds the weight of a family's legacy. For over 40 years, we have refused to compromise on materials, structural integrity, and architectural aesthetic.
            </p>
            <p style={{ fontSize: "1.2rem", lineHeight: 1.8, color: "rgba(0,0,0,0.7)", margin: 0 }}>
              Every beam poured, every landscape manicured, and every vista framed is a testament to our obsession with absolute perfection. We don't just build homes. We engineer legacies.
            </p>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(0,0,0,0.1)", paddingTop: "4rem", marginTop: "6rem", display: "flex", flexWrap: "wrap", gap: "6rem" }}>
          <div style={{ flex: "1 1 300px" }}>
            <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: "2rem", margin: "0 0 1rem 0" }}>By The Numbers</h3>
          </div>
          <div style={{ flex: "1 1 500px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem" }}>
            <div>
              <span style={{ fontFamily: "Playfair Display, serif", fontSize: "4rem", display: "block", lineHeight: 1, marginBottom: "1rem" }}>40+</span>
              <span style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(0,0,0,0.5)" }}>Years of Trust</span>
            </div>
            <div>
              <span style={{ fontFamily: "Playfair Display, serif", fontSize: "4rem", display: "block", lineHeight: 1, marginBottom: "1rem" }}>100%</span>
              <span style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(0,0,0,0.5)" }}>Vastu Compliant</span>
            </div>
            <div>
              <span style={{ fontFamily: "Playfair Display, serif", fontSize: "4rem", display: "block", lineHeight: 1, marginBottom: "1rem" }}>2M+</span>
              <span style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(0,0,0,0.5)" }}>Sq.Ft Delivered</span>
            </div>
            <div>
              <span style={{ fontFamily: "Playfair Display, serif", fontSize: "4rem", display: "block", lineHeight: 1, marginBottom: "1rem" }}>0</span>
              <span style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(0,0,0,0.5)" }}>Compromises</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
