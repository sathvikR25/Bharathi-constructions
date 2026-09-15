import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import SEO from '../components/SEO';

export default function Terms() {
  const [content, setContent] = React.useState(null);

  useEffect(() => {
    import("../lib/firebase").then(({ db }) => {
      import("firebase/firestore").then(({ doc, getDoc }) => {
        getDoc(doc(db, "legal", "terms")).then((d) => {
          if(d.exists()) setContent(d.data().content);
          else setContent("Terms & Conditions content not yet uploaded. Please configure in Admin Panel.");
        });
      });
    });
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
          {content ? (
            <div dangerouslySetInnerHTML={{ __html: content }} style={{ whiteSpace: "pre-wrap" }} />
          ) : (
            <p>Loading Terms & Conditions...</p>
          )}
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