import React, { useEffect, useRef, useState } from "react";
import { MapPin, Phone, Mail, CheckCircle, ArrowRight } from "lucide-react";
import MenuOverlay from "../components/MenuOverlay";
import Header from "../components/Header";
import KineticText from "../components/KineticText";
import SEO from "../components/SEO";
import { gsap } from "gsap";

export default function Contact() {
  const [navOpen, setNavOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const pageRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    project: "Horizon",
    message: "",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".contact-reveal",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 1, ease: "power3.out" }
      );
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    
    const newLead = { ...formData, id: Date.now(), date: new Date().toISOString() };
    const existingLeads = JSON.parse(localStorage.getItem("crm_leads") || "[]");
    localStorage.setItem("crm_leads", JSON.stringify([newLead, ...existingLeads]));
    
    setSubmitted(true);
    setFormData({ name: "", email: "", phone: "", project: "Horizon", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const INPUT_STYLE = {
    background: "transparent", border: "none",
    borderBottom: "1px solid rgba(255,255,255,0.15)",
    padding: "0.75rem 0", color: "#fff", fontSize: "1.1rem",
    outline: "none", width: "100%", transition: "border-color 0.3s",
    fontFamily: "inherit",
  };

  const LABEL_STYLE = {
    fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase",
    color: "rgba(255,255,255,0.4)", marginBottom: "0.5rem", display: "block",
  };

  return (
    <div ref={pageRef} style={{ background: "transparent", color: "#fdfbf7", minHeight: "100vh", overflowX: "hidden" }}>
      <SEO title="Contact Us" description="Get in touch with Bharathi Constructions. Visit us at our Hyderabad office or call our sales team." />
      <Header theme="dark" navOpen={navOpen} setNavOpen={setNavOpen} />
      <MenuOverlay navOpen={navOpen} setNavOpen={setNavOpen} />

      <section style={{
        paddingTop: "22vh", paddingBottom: "10vh",
        paddingLeft: "clamp(2rem,5vw,6rem)", paddingRight: "clamp(2rem,5vw,6rem)",
        maxWidth: "1400px", margin: "0 auto",
      }}>
        {/* Heading */}
        <div className="contact-reveal" style={{ marginBottom: "6rem" }}>
          <span style={{ fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", display: "block", marginBottom: "1.5rem" }}>
            Get In Touch
          </span>
          <KineticText as="h1" text="Let's build your legacy." style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(3rem, 7vw, 7rem)", margin: 0, fontWeight: 400, color: "#fff", lineHeight: 1.05 }} />
        </div>

        {/* Two column layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "6rem", alignItems: "start" }}>
          
          {/* LEFT — Contact Info */}
          <div className="contact-reveal" style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
            
            {/* Address */}
            <div style={{ display: "flex", gap: "1.5rem" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(201,169,110,0.1)", border: "1px solid rgba(201,169,110,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <MapPin size={18} color="#c9a96e" />
              </div>
              <div>
                <span style={LABEL_STYLE}>Corporate Office</span>
                <p style={{ margin: 0, fontSize: "1rem", lineHeight: 1.8, color: "rgba(255,255,255,0.75)" }}>
                  #2301, Plot No.: 51 & 52<br />
                  Delight Square, 3rd Floor<br />
                  Green Park Avenue, Suchitra X Roads<br />
                  Hyderabad, Telangana — 500067
                </p>
              </div>
            </div>

            {/* Phone */}
            <div style={{ display: "flex", gap: "1.5rem" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(201,169,110,0.1)", border: "1px solid rgba(201,169,110,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Phone size={18} color="#c9a96e" />
              </div>
              <div>
                <span style={LABEL_STYLE}>Sales Inquiry</span>
                <a href="tel:+917997992051" style={{ display: "block", fontSize: "1rem", color: "rgba(255,255,255,0.75)", textDecoration: "none", lineHeight: 2, transition: "color 0.3s" }} onMouseEnter={e => e.target.style.color = "#c9a96e"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.75)"}>
                  +91 79979 92051
                </a>
                <a href="tel:+917997992052" style={{ display: "block", fontSize: "1rem", color: "rgba(255,255,255,0.75)", textDecoration: "none", lineHeight: 2, transition: "color 0.3s" }} onMouseEnter={e => e.target.style.color = "#c9a96e"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.75)"}>
                  +91 79979 92052
                </a>
              </div>
            </div>

            {/* Email */}
            <div style={{ display: "flex", gap: "1.5rem" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(201,169,110,0.1)", border: "1px solid rgba(201,169,110,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Mail size={18} color="#c9a96e" />
              </div>
              <div>
                <span style={LABEL_STYLE}>Email</span>
                <a href="mailto:info@bharathiconstructionshyd.com" style={{ display: "block", fontSize: "1rem", color: "rgba(255,255,255,0.75)", textDecoration: "none", lineHeight: 2, transition: "color 0.3s" }} onMouseEnter={e => e.target.style.color = "#c9a96e"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.75)"}>
                  info@bharathiconstructionshyd.com
                </a>
              </div>
            </div>

            {/* Map embed */}
            <div style={{ borderRadius: "16px", overflow: "hidden", height: "220px", border: "1px solid rgba(255,255,255,0.06)" }}>
              <iframe
                title="Bharathi Constructions Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.1234!2d78.4867!3d17.5234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb8f6f6f6f6f6f%3A0x6f6f6f6f6f6f6f6f!2sSuchitra%20X%20Roads%2C%20Hyderabad!5e0!3m2!1sen!2sin!4v1"
                width="100%" height="100%" style={{ border: 0, filter: "grayscale(0.8) contrast(1.1) invert(0.9)" }}
                allowFullScreen loading="lazy"
              />
            </div>
          </div>

          {/* RIGHT — Form */}
          <div className="contact-reveal" style={{
            background: "rgba(255,255,255,0.03)", padding: "3.5rem",
            borderRadius: "24px", border: "1px solid rgba(255,255,255,0.07)",
            backdropFilter: "blur(12px)",
          }}>
            {submitted ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "400px", gap: "2rem", textAlign: "center" }}>
                <CheckCircle size={64} color="#c9a96e" />
                <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: "2rem", margin: 0, color: "#fff" }}>Inquiry Received</h3>
                <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.6, maxWidth: "320px" }}>
                  A sales representative will contact you within 24 hours to discuss your dream home.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
                <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.8rem", color: "#fff", margin: 0 }}>
                  Send an Inquiry
                </h3>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                  <div>
                    <label style={LABEL_STYLE}>Full Name *</label>
                    <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} type="text" placeholder="Your name" style={INPUT_STYLE} onFocus={e => e.target.style.borderColor = "#c9a96e"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.15)"} />
                  </div>
                  <div>
                    <label style={LABEL_STYLE}>Phone Number *</label>
                    <input required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} type="tel" placeholder="+91 99999 99999" style={INPUT_STYLE} onFocus={e => e.target.style.borderColor = "#c9a96e"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.15)"} />
                  </div>
                </div>

                <div>
                  <label style={LABEL_STYLE}>Email Address</label>
                  <input value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} type="email" placeholder="your@email.com" style={INPUT_STYLE} onFocus={e => e.target.style.borderColor = "#c9a96e"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.15)"} />
                </div>

                <div>
                  <label style={LABEL_STYLE}>Project of Interest</label>
                  <select value={formData.project} onChange={e => setFormData({...formData, project: e.target.value})} style={{...INPUT_STYLE, appearance: "none", cursor: "pointer"}}>
                    <option value="Horizon" style={{ background: "#0a0a0a" }}>Bharathi Horizon</option>
                    <option value="Lake Woods" style={{ background: "#0a0a0a" }}>Bharathi Lake Woods</option>
                    <option value="General" style={{ background: "#0a0a0a" }}>General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label style={LABEL_STYLE}>Message (Optional)</label>
                  <textarea value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} rows={3} placeholder="Tell us about your requirements..." style={{...INPUT_STYLE, resize: "none"}} onFocus={e => e.target.style.borderColor = "#c9a96e"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.15)"} />
                </div>

                <button type="submit" style={{
                  padding: "1.4rem 2rem", borderRadius: "100px",
                  background: "#c9a96e", color: "#000",
                  border: "none", fontSize: "0.85rem",
                  letterSpacing: "0.15em", textTransform: "uppercase",
                  cursor: "pointer", fontWeight: 600,
                  transition: "transform 0.3s, background 0.3s",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem",
                }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                >
                  Submit Inquiry <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
