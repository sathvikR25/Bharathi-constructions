import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import SEO from "../components/SEO";
import KineticText from "../components/KineticText";
import MenuOverlay from "../components/MenuOverlay";
import { ArrowLeft } from "lucide-react";

export default function Policy() {
  const [navOpen, setNavOpen] = React.useState(false);

  return (
    <div style={{ background: "#fdfbf7", color: "#123645", minHeight: "100vh", overflowX: "hidden" }}>
      <SEO 
        title="Privacy Policy | Bharathi Constructions" 
        description="Privacy policy and terms of service for Bharathi Constructions." 
      />

      <Header theme="light" navOpen={navOpen} setNavOpen={setNavOpen} />
      <MenuOverlay navOpen={navOpen} setNavOpen={setNavOpen} />

      <main style={{ paddingTop: "clamp(120px, 15vw, 200px)", paddingBottom: "6rem", maxWidth: "1000px", margin: "0 auto", paddingLeft: "clamp(1.5rem, 4vw, 4rem)", paddingRight: "clamp(1.5rem, 4vw, 4rem)" }}>
        
        <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "#666", textDecoration: "none", marginBottom: "3rem", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.15em" }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <KineticText as="h1" text="Privacy Policy." style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", margin: "0 0 3rem 0", color: "#123645" }} />

        <div style={{ fontSize: "1rem", lineHeight: 1.8, color: "#444" }}>
          
          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.5rem", color: "#123645", marginTop: "3rem", marginBottom: "1rem" }}>1. Information We Collect</h2>
          <p style={{ marginBottom: "1.5rem" }}>
            At Bharathi Constructions, we are committed to protecting your privacy. We may collect personal information such as your name, email address, phone number, and any other details you provide when you interact with our website, fill out contact forms, or inquire about our projects (Horizon, Lake Woods, etc.).
          </p>

          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.5rem", color: "#123645", marginTop: "3rem", marginBottom: "1rem" }}>2. How We Use Your Information</h2>
          <p style={{ marginBottom: "1.5rem" }}>
            The information collected is used solely to respond to your inquiries, provide you with project brochures, and keep you informed about our latest real estate developments. We do not sell, rent, or share your personal data with third parties for marketing purposes without your explicit consent.
          </p>

          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.5rem", color: "#123645", marginTop: "3rem", marginBottom: "1rem" }}>3. Data Security</h2>
          <p style={{ marginBottom: "1.5rem" }}>
            We implement reasonable security measures to protect your personal information from unauthorized access, alteration, or disclosure. However, no internet transmission is entirely secure, and we cannot guarantee the absolute security of your data.
          </p>

          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.5rem", color: "#123645", marginTop: "3rem", marginBottom: "1rem" }}>4. Cookies and Tracking</h2>
          <p style={{ marginBottom: "1.5rem" }}>
            Our website may use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand where our visitors are coming from. You can control cookie preferences through your browser settings.
          </p>

          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.5rem", color: "#123645", marginTop: "3rem", marginBottom: "1rem" }}>5. Contact Us</h2>
          <p style={{ marginBottom: "1.5rem" }}>
            If you have any questions or concerns regarding this Privacy Policy, please contact us at: <br /><br />
            <strong>Corporate Office:</strong> #2301, Plot No.: 51 & 52, Delight Square, 3rd floor, Green Park Avenue, Suchitra 'X' Roads, Hyderabad-500067, Telangana.<br />
            <strong>Email:</strong> bharathiconstructionshyd1@gmail.com <br />
            <strong>Phone:</strong> +91 7997992051
          </p>

        </div>
      </main>

    </div>
  );
}
