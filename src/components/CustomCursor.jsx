import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const outline = useRef(null);
  const dot = useRef(null);
  useEffect(() => {
    const xO = gsap.quickTo(outline.current, "x", { duration: 0.5, ease: "power3" });
    const yO = gsap.quickTo(outline.current, "y", { duration: 0.5, ease: "power3" });
    const xD = gsap.quickSetter(dot.current, "x", "px");
    const yD = gsap.quickSetter(dot.current, "y", "px");
    const move = (e) => { xO(e.clientX); yO(e.clientY); xD(e.clientX); yD(e.clientY); };
    const hIn = () => outline.current?.classList.add("active");
    const hOut = () => outline.current?.classList.remove("active");
    window.addEventListener("mousemove", move);
    const attach = () => { document.querySelectorAll("a, button, .hover-target").forEach(el => { el.addEventListener("mouseenter", hIn); el.addEventListener("mouseleave", hOut); }); };
    attach();
    const obs = new MutationObserver(attach);
    obs.observe(document.body, { childList: true, subtree: true });
    return () => { window.removeEventListener("mousemove", move); obs.disconnect(); };
  }, []);
  return (<><div ref={outline} className="custom-cursor-outline" /><div ref={dot} className="custom-cursor-dot" /></>);
}
