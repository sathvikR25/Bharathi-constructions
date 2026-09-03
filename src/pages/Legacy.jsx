import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Award, CheckCircle } from "lucide-react";
import MenuOverlay from "../components/MenuOverlay";
import Header from "../components/Header";
import SEO from "../components/SEO";
import KineticText from "../components/KineticText";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 12, suffix: "+", label: "Years of Excellence" },
  { value: 100, suffix: "%", label: "Vastu Compliant" },
  { value: 56, suffix: "+", label: "Happy Families" },
  { value: 0, suffix: "", label: "Compromises" },
];

const AWARDS = [
  "CREDAI Member", "HMDA Approved", "TSRERA Registered"
];

export default function Legacy() {
  const [navOpen, setNavOpen] = useState(false);
  const sectionRef = useRef(null);
  const statsRef = useRef([]);
  statsRef.current = [];

  const addStatRef = (el) => { if (el && !statsRef.current.includes(el)) statsRef.current.push(el); };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text reveal
      gsap.fromTo(".legacy-hero-line",
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 1.2, ease: "power3.out" }
      );

      // Philosophy text scrub
      const words = gsap.utils.toArray(".philosophy-word");
      gsap.fromTo(words,
        { opacity: 0.08 },
        {
          opacity: 1, stagger: 0.05,
          scrollTrigger: { trigger: ".philosophy-section", start: "top 70%", end: "bottom 40%", scrub: 1 }
        }
      );

      // Stats counter
      statsRef.current.forEach((el) => {
        const target = parseInt(el.getAttribute("data-target"), 10);
        const obj = { val: 0 };
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              val: target, duration: 2, ease: "power2.out",
              onUpdate: () => { el.textContent = Math.round(obj.val); }
            });
          }
        });
      });

      // Reveal sections
      gsap.utils.toArray(".legacy-reveal").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 82%", once: true }
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const philosophyText = "A home is not a structure. It is a sanctuary that holds the weight of a family's legacy. For over a decade, we have refused to compromise on materials, structural integrity, or architectural purpose. Every beam poured, every space crafted, is a testament to our obsession with absolute perfection.".split(" ");

  return (
    <div ref={sectionRef} style={{ background: "transparent", color: "#0a0a0a", minHeight: "100vh", overflowX: "hidden" }}>
      <SEO title="Our Legacy" description="Over a decade of quality construction in Hyderabad. Discover the story, philosophy and track record of Bharathi Constructions." />
      <Header theme="light" navOpen={navOpen} setNavOpen={setNavOpen} />
      <MenuOverlay navOpen={navOpen} setNavOpen={setNavOpen} />

      {/* HERO */}
      <section style={{ paddingTop: "30vh", paddingBottom: "12vh", paddingLeft: "clamp(2rem,5vw,6rem)", paddingRight: "clamp(2rem,5vw,6rem)", maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{ overflow: "hidden", marginBottom: "0.5rem" }}>
          <span className="legacy-hero-line" style={{ fontSize: "0.7rem", letterSpacing: "0.45em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", display: "block" }}>
            Our Heritage Since 2013
          </span>
        </div>
        <div style={{ overflow: "hidden" }}>
          <KineticText as="h1" text="Built on Trust," style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(3.5rem, 7.5vw, 8rem)", margin: 0, fontWeight: 400, color: "#0a0a0a", lineHeight: 1.05 }} />
        </div>
        <div style={{ overflow: "hidden" }}>
          <KineticText as="h1" text="Refined by Time." style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(3.5rem, 7.5vw, 8rem)", margin: "0 0 6rem 0", fontWeight: 400, color: "rgba(0,0,0,0.25)", fontStyle: "italic", lineHeight: 1.05 }} />
        </div>
      </section>

      {/* HERO IMAGE */}
      <div className="legacy-reveal" style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 clamp(2rem,5vw,6rem)", marginBottom: "12rem" }}>
        <div style={{ borderRadius: "24px", overflow: "hidden" }}>
          <img src="/lakewood-media/View 03_FFFFFF copy.jpg" alt="Bharathi Constructions" style={{ width: "100%", height: "auto", display: "block", filter: "brightness(0.9)" }} />
        </div>
      </div>

      {/* PHILOSOPHY — Scrub Reveal */}
      <section className="philosophy-section" style={{ padding: "8rem clamp(2rem,5vw,6rem)", maxWidth: "1200px", margin: "0 auto" }}>
        <span className="legacy-reveal" style={{ fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", display: "block", marginBottom: "4rem" }}>
          The Philosophy
        </span>
        <p style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(1.8rem, 3.5vw, 3.5rem)", lineHeight: 1.5, margin: 0, display: "flex", flexWrap: "wrap", gap: "0.4em" }}>
          {philosophyText.map((word, i) => (
            <span key={i} className="philosophy-word" style={{ opacity: 0.08 }}>{word}</span>
          ))}
        </p>
      </section>

      {/* STATS */}
      <section style={{ padding: "8rem clamp(2rem,5vw,6rem)", borderTop: "1px solid rgba(0,0,0,0.06)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "4rem" }}>
          {STATS.map((s, i) => (
            <div key={i} className="legacy-reveal" style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(3.5rem, 6vw, 6rem)", lineHeight: 1, marginBottom: "1rem", display: "flex", justifyContent: "center", alignItems: "baseline", gap: "0.1em" }}>
                <span ref={addStatRef} data-target={s.value}>{s.value}</span>
                <span style={{ fontSize: "0.6em", color: "#c9a96e" }}>{s.suffix}</span>
              </div>
              <span style={{ fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(0,0,0,0.4)" }}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section style={{ padding: "6rem clamp(2rem,5vw,6rem)" }}>
        <div className="legacy-reveal" style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "1.5rem", alignItems: "center", justifyContent: "center" }}>
          {AWARDS.map((a, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: "0.75rem",
              padding: "0.9rem 2rem", border: "1px solid rgba(0,0,0,0.1)",
              borderRadius: "100px", background: "rgba(0,0,0,0.02)",
            }}>
              <CheckCircle size={16} color="#c9a96e" />
              <span style={{ fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(0,0,0,0.6)" }}>{a}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "10rem clamp(2rem,5vw,6rem)", textAlign: "center" }}>
        <div className="legacy-reveal" style={{ maxWidth: "900px", margin: "0 auto" }}>
          <KineticText as="h2" text="See what we have built." style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2.5rem, 5vw, 5rem)", margin: "0 0 3rem 0", color: "#0a0a0a" }} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", justifyContent: "center" }}>
            <Link to="/horizon" style={{ padding: "1.2rem 3rem", borderRadius: "100px", background: "#0a0a0a", color: "#fff", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.15em", fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "0.75rem", transition: "transform 0.3s" }} onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
              Bharathi Horizon <ArrowRight size={14} />
            </Link>
            <Link to="/lake-woods" style={{ padding: "1.2rem 3rem", borderRadius: "100px", border: "1px solid rgba(0,0,0,0.2)", color: "#0a0a0a", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.15em", fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "0.75rem", transition: "background 0.3s, color 0.3s" }} onMouseEnter={e => { e.currentTarget.style.background = "#0a0a0a"; e.currentTarget.style.color = "#fff"; }} onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#0a0a0a"; }}>
              Bharathi Lake Woods <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
