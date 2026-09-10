import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import SEO from '../components/SEO';

export default function Terms() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#f8f9fa] text-[#123645] min-h-screen font-sans relative">
      <SEO 
        title="Terms & Conditions" 
        description="Terms and conditions for using the Bharathi Constructions website."
      />
      <Header />
      <div className="max-w-4xl mx-auto px-6 py-32 md:py-40 relative z-10">
        <h1 className="text-4xl md:text-6xl font-serif mb-12 text-[#123645]">Terms & Conditions</h1>
        
        <div className="space-y-8 text-[#123645]/80 leading-relaxed font-medium">
          <section>
            <h2 className="text-2xl font-serif text-[#123645] mb-4">1. Acceptance of Terms</h2>
            <p>By accessing and using the Bharathi Constructions website, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree with any part of these terms, please do not use our website.</p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-[#123645] mb-4">2. Use of Information</h2>
            <p>All content on this website, including but not limited to floor plans, project images, text, and graphics, is the property of Bharathi Constructions and is protected by copyright laws. You may not reproduce, distribute, or modify any content without explicit written permission.</p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-[#123645] mb-4">3. Accuracy of Project Details</h2>
            <p>The architectural designs, dimensions, amenities, and visual representations shown on this website are conceptual and subject to change. Bharathi Constructions reserves the right to alter plans, specifications, and features without prior notice. These details do not constitute a legal offering or contract.</p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-[#123645] mb-4">4. Limitation of Liability</h2>
            <p>Bharathi Constructions shall not be held liable for any direct, indirect, incidental, or consequential damages arising from your use of this website or reliance on any information provided herein.</p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-[#123645] mb-4">5. Governing Law</h2>
            <p>These terms and conditions are governed by the laws of India. Any disputes arising in relation to this website shall be subject to the exclusive jurisdiction of the courts in Hyderabad, Telangana.</p>
          </section>
        </div>
      </div>
      
      <footer className="py-12 border-t border-[#123645]/10 text-center text-[#123645]/60 text-sm mt-20">
        <div className="flex justify-center gap-6 mb-4">
          <Link to="/" className="hover:text-[#c9a96e]">Home</Link>
          <Link to="/policy" className="hover:text-[#c9a96e]">Privacy Policy</Link>
          <Link to="/contact" className="hover:text-[#c9a96e]">Contact Us</Link>
        </div>
        <p>&copy; {new Date().getFullYear()} Bharathi Constructions. All rights reserved.</p>
      </footer>
    </div>
  );
}