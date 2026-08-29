import React, { useEffect, useRef } from "react";

export default function KineticText({ text, as = "h2", className = "", style = {} }) {
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.querySelectorAll(".kinetic-word").forEach((w, i) => setTimeout(() => w.classList.add("visible"), i * 80)); } });
    }, { threshold: 0.2, rootMargin: "0px 0px -10% 0px" });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const Tag = as;
  return (
    <Tag ref={ref} className={`kinetic-line ${className}`} style={style}>
      {text.split(" ").map((word, i) => (<span key={i} className="kinetic-word"><span style={{ transitionDelay: `${i * 0.05}s` }}>{word}</span></span>))}
    </Tag>
  );
}
