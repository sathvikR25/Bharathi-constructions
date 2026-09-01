import React, { useEffect, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HelmetProvider } from "react-helmet-async";

import Background3D from "./components/Background3D";
import WhatsAppWidget from "./components/WhatsAppWidget";

// Lazy load routes to split JS bundle sizes
const Home = lazy(() => import("./pages/Home"));
const ProjectHorizon = lazy(() => import("./pages/ProjectHorizon"));
const ProjectLakeWoods = lazy(() => import("./pages/ProjectLakeWoods"));
const Contact = lazy(() => import("./pages/Contact"));
const Legacy = lazy(() => import("./pages/Legacy"));
const BuilderProfile = lazy(() => import("./pages/BuilderProfile"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Admin = lazy(() => import("./pages/Admin"));

gsap.registerPlugin(ScrollTrigger);

// Global Smooth Scroll Component
function SmoothScroll({ children }) {
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Reset scroll on route change
    lenis.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, [location.pathname]);

  return <>{children}</>;
}

class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null, info: null }; }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, info) { this.setState({ error, info }); console.error("ErrorBoundary caught an error", error, info); }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{padding: "2rem", background: "red", color: "white", minHeight: "100vh"}}>
          <h2>Something went wrong.</h2>
          <pre style={{whiteSpace: "pre-wrap"}}>{this.state.error && this.state.error.toString()}</pre>
          <pre style={{whiteSpace: "pre-wrap"}}>{this.state.info && this.state.info.componentStack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

// Fallback loader for suspense
const PageLoader = () => (
  <div className="h-screen w-screen bg-[#050505] flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-[#c9a96e]/20 border-t-[#c9a96e] rounded-full animate-spin"></div>
  </div>
);

export default function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <BrowserRouter>
          <SmoothScroll>
            <Background3D />
            <WhatsAppWidget />
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/horizon" element={<ProjectHorizon />} />
                <Route path="/lake-woods" element={<ProjectLakeWoods />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/legacy" element={<Legacy />} />
                <Route path="/builder-profile" element={<BuilderProfile />} />
                <Route path="/admin/*" element={<Admin />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </SmoothScroll>
        </BrowserRouter>
      </ErrorBoundary>
    </HelmetProvider>
  );
}
