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
        description="Comprehensive privacy policy and terms of service for Bharathi Constructions." 
      />

      <Header theme="light" navOpen={navOpen} setNavOpen={setNavOpen} />
      <MenuOverlay navOpen={navOpen} setNavOpen={setNavOpen} />

      <main style={{ paddingTop: "clamp(120px, 15vw, 200px)", paddingBottom: "6rem", maxWidth: "1000px", margin: "0 auto", paddingLeft: "clamp(1.5rem, 4vw, 4rem)", paddingRight: "clamp(1.5rem, 4vw, 4rem)" }}>
        
        <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "#666", textDecoration: "none", marginBottom: "3rem", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.15em" }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <KineticText as="h1" text="Privacy Policy." style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", margin: "0 0 1rem 0", color: "#123645" }} />
        <p style={{ color: "#666", marginBottom: "4rem", fontSize: "0.9rem" }}>Last Updated: September 2026</p>

        <div style={{ fontSize: "1rem", lineHeight: 1.8, color: "#444" }}>
          
          <p style={{ marginBottom: "2rem" }}>
            At <strong>Bharathi Constructions</strong>, your privacy and the protection of your personal data are of paramount importance to us. This Privacy Policy details how we collect, use, share, and protect your information when you visit our website, submit inquiries, or interact with our digital services regarding our premium projects such as <em>Bharathi Horizon</em> and <em>Lake Woods</em>.
          </p>

          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.5rem", color: "#123645", marginTop: "3rem", marginBottom: "1rem" }}>1. Information We Collect</h2>
          <p style={{ marginBottom: "1rem" }}>We collect information to provide better services to all our users. The types of personal information we collect include:</p>
          <ul style={{ paddingLeft: "1.5rem", marginBottom: "1.5rem", listStyleType: "disc" }}>
            <li style={{ marginBottom: "0.5rem" }}><strong>Personal Identification Information:</strong> Name, email address, phone number, and physical address when you voluntarily fill out our contact forms, download brochures, or register your interest.</li>
            <li style={{ marginBottom: "0.5rem" }}><strong>Communication Data:</strong> Records of your correspondence with us via email, WhatsApp, or phone calls regarding property inquiries.</li>
            <li style={{ marginBottom: "0.5rem" }}><strong>Technical and Usage Data:</strong> IP address, browser type and version, time zone setting, operating system, and information about how you navigate and interact with our website.</li>
          </ul>

          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.5rem", color: "#123645", marginTop: "3rem", marginBottom: "1rem" }}>2. How We Use Your Information</h2>
          <p style={{ marginBottom: "1rem" }}>We use the collected data for various purposes, including but not limited to:</p>
          <ul style={{ paddingLeft: "1.5rem", marginBottom: "1.5rem", listStyleType: "disc" }}>
            <li style={{ marginBottom: "0.5rem" }}><strong>Fulfilling Requests:</strong> To send you requested project brochures, floor plans, and pricing details.</li>
            <li style={{ marginBottom: "0.5rem" }}><strong>Customer Service:</strong> To respond promptly to your inquiries, schedule site visits, and provide comprehensive support.</li>
            <li style={{ marginBottom: "0.5rem" }}><strong>Marketing & Updates:</strong> To send you relevant updates regarding new project launches, construction milestones, and exclusive offers (only if you have opted in to receive such communications).</li>
            <li style={{ marginBottom: "0.5rem" }}><strong>Website Improvement:</strong> To analyze user behavior and traffic to optimize our website's layout, performance, and user experience.</li>
          </ul>

          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.5rem", color: "#123645", marginTop: "3rem", marginBottom: "1rem" }}>3. Data Sharing and Disclosure</h2>
          <p style={{ marginBottom: "1.5rem" }}>
            Bharathi Constructions strictly respects your privacy. <strong>We do not sell, trade, or rent your personal identification information to third parties.</strong> We may share generic aggregated demographic information not linked to any personal identification information with our business partners and trusted affiliates for the purposes outlined above. We may also disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or a government agency).
          </p>

          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.5rem", color: "#123645", marginTop: "3rem", marginBottom: "1rem" }}>4. Data Security</h2>
          <p style={{ marginBottom: "1.5rem" }}>
            We adopt robust data collection, storage, and processing practices alongside strict security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information, username, password, transaction information, and data stored on our site. While we strive to use commercially acceptable means to protect your Personal Data, please acknowledge that no method of transmission over the Internet, or method of electronic storage is 100% secure.
          </p>

          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.5rem", color: "#123645", marginTop: "3rem", marginBottom: "1rem" }}>5. Cookies and Tracking Technologies</h2>
          <p style={{ marginBottom: "1.5rem" }}>
            Our website uses "cookies" to enhance user experience. Your web browser places cookies on your hard drive for record-keeping purposes and sometimes to track information about you. You may choose to set your web browser to refuse cookies or to alert you when cookies are being sent. If you do so, note that some parts of the site may not function properly.
          </p>

          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.5rem", color: "#123645", marginTop: "3rem", marginBottom: "1rem" }}>6. Your Data Rights</h2>
          <p style={{ marginBottom: "1.5rem" }}>
            Depending on your jurisdiction, you may have the right to request access to the personal data we hold about you, request corrections to any inaccurate data, or request the deletion of your data entirely. If you wish to unsubscribe from our marketing emails or WhatsApp communications, you can do so at any time by following the instructions provided in those communications or by contacting us directly.
          </p>

          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.5rem", color: "#123645", marginTop: "3rem", marginBottom: "1rem" }}>7. Third-Party Websites</h2>
          <p style={{ marginBottom: "1.5rem" }}>
            You may find advertising or other content on our Site that link to the sites and services of our partners, suppliers, advertisers, sponsors, licensors, and other third parties. We do not control the content or links that appear on these sites and are not responsible for the practices employed by websites linked to or from our Site.
          </p>

          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.5rem", color: "#123645", marginTop: "3rem", marginBottom: "1rem" }}>8. Changes to this Privacy Policy</h2>
          <p style={{ marginBottom: "1.5rem" }}>
            Bharathi Constructions has the discretion to update this privacy policy at any time. When we do, we will revise the updated date at the top of this page. We encourage users to frequently check this page for any changes to stay informed about how we are helping to protect the personal information we collect.
          </p>

          <div style={{ background: "rgba(0,0,0,0.03)", padding: "2.5rem", borderRadius: "16px", marginTop: "4rem" }}>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.5rem", color: "#123645", margin: "0 0 1rem 0" }}>9. Contacting Us</h2>
            <p style={{ marginBottom: "1rem" }}>
              If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us at:
            </p>
            <p style={{ marginBottom: "0.5rem" }}><strong>Bharathi Constructions Corporate Office:</strong></p>
            <p style={{ marginBottom: "1.5rem", color: "#666" }}>
              #2301, Plot No.: 51 & 52, Delight Square, 3rd floor,<br/>
              Green Park Avenue, Suchitra 'X' Roads,<br/>
              Hyderabad-500067, Telangana.
            </p>
            <p style={{ marginBottom: "0.5rem" }}><strong>Email:</strong> <a href="mailto:bharathiconstructionshyd1@gmail.com" style={{ color: "#c9a96e", textDecoration: "none" }}>bharathiconstructionshyd1@gmail.com</a></p>
            <p style={{ marginBottom: "0" }}><strong>Phone:</strong> +91 7997992051 / +91 7997992052</p>
          </div>

        </div>
      </main>

    </div>
  );
}
