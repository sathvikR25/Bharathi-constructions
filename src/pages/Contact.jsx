import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, ArrowRight, CheckCircle } from 'lucide-react';
import MenuOverlay from "../components/MenuOverlay";
import Header from "../components/Header";
import KineticText from "../components/KineticText";
import SEO from "../components/SEO";
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { gsap } from "gsap";

export default function Contact() {
  const [navOpen, setNavOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const pageRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+91",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    const fullPhone = `${formData.countryCode} ${formData.phone}`;
    
    try {
      await addDoc(collection(db, 'leads'), {
        name: formData.name, 
        email: formData.email, 
        phone: fullPhone, 
        project: formData.project, 
        status: 'New',
        message: formData.message,
        created_at: serverTimestamp()
      });
      
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", countryCode: "+91", project: "Horizon", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error("Error submitting lead:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const INPUT_STYLE = {
    width: "100%", padding: "1.2rem", background: "rgba(255,255,255,0.03)", 
    border: "1px solid rgba(255,255,255,0.15)", borderRadius: "12px", color: "#fff",
    fontSize: "0.95rem", outline: "none", transition: "border-color 0.3s"
  };
  const LABEL_STYLE = {
    display: "block", fontSize: "0.75rem", textTransform: "uppercase",
    letterSpacing: "0.15em", color: "rgba(255,255,255,0.5)", marginBottom: "0.75rem", fontWeight: 600
  };

  return (
    <div ref={pageRef} style={{ background: "#050505", color: "#fff", minHeight: "100vh", overflowX: "hidden" }}>
      <SEO title="Contact Us - Bharathi Constructions" description="Get in touch with our sales team to find your dream luxury home in Hyderabad." />
      
      <Header theme="dark" navOpen={navOpen} setNavOpen={setNavOpen} />
      <MenuOverlay navOpen={navOpen} setNavOpen={setNavOpen} />

      <section style={{ paddingTop: "12rem", paddingBottom: "6rem", px: "2rem" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "6rem", padding: "0 2rem" }}>
          
          {/* LEFT ?" Info */}
          <div className="contact-reveal" style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
            <div>
              <span style={{ fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#c9a96e", display: "block", marginBottom: "1.5rem" }}>
                Connect With Us
              </span>
              <KineticText as="h1" text="Begin Your Journey." style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(3.5rem, 6vw, 6rem)", margin: "0 0 2rem 0", lineHeight: 1.1, color: "#fff" }} />
              <p style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)", color: "rgba(255,255,255,0.6)", lineHeight: 1.8, maxWidth: "450px" }}>
                Whether you are seeking a skyline residence or a tranquil villa, our advisors are here to assist you.
              </p>
            </div>

            {/* Address */}
            <div style={{ display: "flex", gap: "1.5rem" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(201,169,110,0.1)", border: "1px solid rgba(201,169,110,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <MapPin size={18} color="#c9a96e" />
              </div>
              <div>
                <span style={LABEL_STYLE}>Corporate Office</span>
                <p style={{ margin: 0, fontSize: "1.1rem", color: "#fff", lineHeight: 1.6 }}>
                  #2301, Plot No.: 51 & 52, Delight Square<br/>
                  3rd floor, Green Park Avenue,<br/>
                  Suchitra 'X' Roads, Hyderabad-500067.
                </p>
              </div>
            </div>

            {/* Phones */}
            <div style={{ display: "flex", gap: "1.5rem" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(201,169,110,0.1)", border: "1px solid rgba(201,169,110,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Phone size={18} color="#c9a96e" />
              </div>
              <div>
                <span style={LABEL_STYLE}>Direct Lines</span>
                <p style={{ margin: 0, fontSize: "1.2rem", color: "#fff", marginBottom: "0.5rem" }}>
                  +91 7997992051
                </p>
                <p style={{ margin: 0, fontSize: "1.2rem", color: "#fff" }}>
                  +91 7997992052
                </p>
              </div>
            </div>

            {/* Email */}
            <div style={{ display: "flex", gap: "1.5rem" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(201,169,110,0.1)", border: "1px solid rgba(201,169,110,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Mail size={18} color="#c9a96e" />
              </div>
              <div>
                <span style={LABEL_STYLE}>Email Us</span>
                <p style={{ margin: 0, fontSize: "1.1rem", color: "#fff" }}>
                  info@bharathiconstructionshyd.com
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT ?" Form */}
          <div className="contact-reveal" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "30px", padding: "clamp(2rem, 4vw, 4rem)", position: "relative", overflow: "hidden" }}>
            {/* Glow accent */}
            <div style={{ position: "absolute", top: 0, right: 0, width: "300px", height: "300px", background: "radial-gradient(circle, rgba(201,169,110,0.15) 0%, transparent 70%)", transform: "translate(30%, -30%)", pointerEvents: "none" }} />
            
            {submitted ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", height: "100%", minHeight: "400px", gap: "1.5rem" }}>
                <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "rgba(201,169,110,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <CheckCircle size={30} color="#c9a96e" />
                </div>
                <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: "2rem", color: "#fff", margin: 0 }}>Thank You.</h3>
                <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.6, maxWidth: "320px" }}>
                  A sales representative will contact you within 24 hours to discuss your dream home.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
                <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.8rem", color: "#fff", margin: 0 }}>
                  Send an Inquiry
                </h3>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))", gap: "2rem" }}>
                  <div>
                    <label style={LABEL_STYLE}>Full Name *</label>
                    <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} type="text" placeholder="Your name" style={INPUT_STYLE} onFocus={e => e.target.style.borderColor = "#c9a96e"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.15)"} />
                  </div>
                  <div>
                    <label style={LABEL_STYLE}>Phone Number *</label>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: "1rem" }}>
                      <select 
                        value={formData.countryCode} 
                        onChange={e => setFormData({...formData, countryCode: e.target.value})} 
                        style={{ ...INPUT_STYLE, width: "auto", flexShrink: 0, appearance: "none", cursor: "pointer", background: "transparent", color: "#fff" }}
                      >
                        <option value="+91" style={{ background: "#0a0a0a" }}>IND (+91)</option>
                        <option value="+1" style={{ background: "#0a0a0a" }}>USA (+1)</option>
                        <option value="+44" style={{ background: "#0a0a0a" }}>UK (+44)</option>
                        <option value="+971" style={{ background: "#0a0a0a" }}>UAE (+971)</option>
                        <option value="+61" style={{ background: "#0a0a0a" }}>AUS (+61)</option>
                        <option value="+65" style={{ background: "#0a0a0a" }}>SGP (+65)</option>
                      </select>
                      <input 
                        required 
                        value={formData.phone} 
                        onChange={e => setFormData({...formData, phone: e.target.value})} 
                        type="tel" 
                        placeholder="99999 99999" 
                        style={{ ...INPUT_STYLE, flex: 1 }} 
                        onFocus={e => e.target.style.borderColor = "#c9a96e"} 
                        onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.15)"} 
                      />
                    </div>
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

                <button type="submit" disabled={submitting || submitted} style={{
                  padding: "1.4rem 2rem", borderRadius: "100px",
                  background: "#c9a96e", color: "#000",
                  border: "none", fontSize: "0.85rem",
                  letterSpacing: "0.15em", textTransform: "uppercase",
                  cursor: (submitting || submitted) ? "not-allowed" : "pointer", fontWeight: 600,
                  transition: "transform 0.3s, background 0.3s",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem",
                  opacity: (submitting || submitted) ? 0.7 : 1
                }}
                  onMouseEnter={e => { if(!submitting && !submitted) e.currentTarget.style.transform = "scale(1.02)" }}
                  onMouseLeave={e => { if(!submitting && !submitted) e.currentTarget.style.transform = "scale(1)" }}
                >
                  {submitting ? "Submitting..." : "Submit Inquiry"} <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}
