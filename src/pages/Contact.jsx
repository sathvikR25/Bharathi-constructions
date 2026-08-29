import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Phone, Mail } from "lucide-react";
import MenuOverlay from "../components/MenuOverlay";
import Header from "../components/Header";
import CustomCursor from "../components/CustomCursor";
import KineticText from "../components/KineticText";

export default function Contact() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div style={{ background: "#050505", color: "#fdfbf7", minHeight: "100vh" }}>
      <CustomCursor />
      
      <Header theme="dark" navOpen={navOpen} setNavOpen={setNavOpen} />
      <MenuOverlay navOpen={navOpen} setNavOpen={setNavOpen} />

      <section style={{ paddingTop: "20vh", paddingBottom: "10vh", paddingLeft: "4rem", paddingRight: "4rem", maxWidth: "1400px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "6rem" }}>
        <div style={{ flex: "1 1 400px" }}>
          <span style={{ fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", display: "block", marginBottom: "1.5rem" }}>Get In Touch</span>
          <KineticText as="h1" text="Let's build" style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(3rem, 6vw, 6rem)", margin: 0, fontWeight: 400, color: "#fff", lineHeight: 1.1 }} />
          <KineticText as="h1" text="your legacy." style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(3rem, 6vw, 6rem)", margin: "0 0 4rem 0", fontWeight: 400, color: "rgba(255,255,255,0.3)", fontStyle: "italic", lineHeight: 1.1 }} />
          
          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
              <MapPin color="rgba(255,255,255,0.4)" />
              <div>
                <span style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", display: "block", marginBottom: "0.5rem" }}>Corporate Office</span>
                <p style={{ margin: 0, fontSize: "1.1rem", lineHeight: 1.6 }}>Bharathi Constructions<br/>Kompally Highway<br/>Hyderabad, Telangana 500014</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
              <Phone color="rgba(255,255,255,0.4)" />
              <div>
                <span style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", display: "block", marginBottom: "0.5rem" }}>Sales Inquiry</span>
                <p style={{ margin: 0, fontSize: "1.1rem" }}>+91 98765 43210</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
              <Mail color="rgba(255,255,255,0.4)" />
              <div>
                <span style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", display: "block", marginBottom: "0.5rem" }}>Email</span>
                <p style={{ margin: 0, fontSize: "1.1rem" }}>sales@bharathiconstructions.com</p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ flex: "1 1 500px", background: "#0a0a0a", padding: "4rem", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.05)" }}>
          <form onSubmit={e => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>Full Name</label>
              <input type="text" className="hover-target" style={{ background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.2)", padding: "0.5rem 0", color: "#fff", fontSize: "1.2rem", outline: "none", transition: "border-color 0.3s" }} onFocus={e => e.target.style.borderColor="#fff"} onBlur={e => e.target.style.borderColor="rgba(255,255,255,0.2)"} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>Phone Number</label>
              <input type="tel" className="hover-target" style={{ background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.2)", padding: "0.5rem 0", color: "#fff", fontSize: "1.2rem", outline: "none", transition: "border-color 0.3s" }} onFocus={e => e.target.style.borderColor="#fff"} onBlur={e => e.target.style.borderColor="rgba(255,255,255,0.2)"} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>Project of Interest</label>
              <select className="hover-target" style={{ background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.2)", padding: "0.5rem 0", color: "#fff", fontSize: "1.2rem", outline: "none", appearance: "none" }}>
                <option value="horizon" style={{ background: "#0a0a0a" }}>Bharathi Horizon</option>
                <option value="lakewood" style={{ background: "#0a0a0a" }}>Bharathi Lake Woods</option>
              </select>
            </div>
            <button type="button" className="hover-target" style={{ marginTop: "1rem", background: "#fff", color: "#000", border: "none", padding: "1.5rem", borderRadius: "100px", fontSize: "0.85rem", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", transition: "transform 0.3s" }} onMouseEnter={e => e.target.style.transform="scale(1.02)"} onMouseLeave={e => e.target.style.transform="scale(1)"}>
              Submit Inquiry
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
