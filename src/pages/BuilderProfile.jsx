import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, GraduationCap, MapPin, Building2, Users } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function BuilderProfile() {
  const pageRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Fade in the hero elements
      gsap.fromTo(
        ".hero-text",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" }
      );

      // Scroll animations for timeline items
      gsap.utils.toArray(".timeline-item").forEach((item, index) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            },
          }
        );
      });

      // Scroll animations for partner cards
      gsap.fromTo(
        ".partner-card",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".partners-grid",
            start: "top 80%",
          },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const timelineData = [
    {
      title: "B.Tech, Mechanical Engineering",
      subtitle: "Education & Postgraduate Study",
      description: "Followed by a postgraduate qualification in Project Management and Consulting (PMC), completed in the United Kingdom, 2009.",
      icon: <GraduationCap className="w-6 h-6 text-[#c9a96e]" />,
      date: "Pre-2009",
    },
    {
      title: "Project Manager, IJM Constructions",
      subtitle: "Early Career",
      description: "Joined immediately after B.Tech; worked on the Malaysian Township residential development, Kukatpally, Hyderabad, for about one year before leaving for postgraduate study.",
      icon: <Briefcase className="w-6 h-6 text-[#c9a96e]" />,
      date: "Pre-2009",
    },
    {
      title: "Investing & Working Partner",
      subtitle: "ARR Projects",
      description: "Contributed to two completed gated-community developments: Mahalaxmi Residency, Kompally (18 villas) and Kavery Homes, Ameenpur (38 villas).",
      icon: <Building2 className="w-6 h-6 text-[#c9a96e]" />,
      date: "2009 - 2013",
    },
    {
      title: "Co-founded Bharathi Constructions",
      subtitle: "Firm Established (2013)",
      description: "Established with his father in Karimnagar; grew the firm's footprint to Hyderabad to pursue the city's residential housing potential.",
      icon: <MapPin className="w-6 h-6 text-[#c9a96e]" />,
      date: "2013",
    },
    {
      title: "Partner, Family Industrial Businesses",
      subtitle: "Diversification",
      description: "Partner in Mahalaxmi Modern Rice Mill, Sri Rama Industries, and Mahadevi Industries, Karimnagar.",
      icon: <Users className="w-6 h-6 text-[#c9a96e]" />,
      date: "Ongoing",
    },
  ];

  return (
    <div ref={pageRef} className="min-h-screen bg-[#050505] text-[#eae5da] pt-32 pb-20 font-sans selection:bg-[#c9a96e] selection:text-[#050505]">
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="hero-text inline-block px-4 py-1 border border-[#c9a96e]/30 rounded-full text-sm font-medium tracking-widest text-[#c9a96e] mb-6 uppercase">
          Company Legacy
        </div>
        <h1 className="hero-text text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight">
          Builder <span className="text-[#c9a96e] italic">Profile</span>
        </h1>
        <p className="hero-text text-lg md:text-xl text-white/70 max-w-3xl leading-relaxed">
          At Bharathi Construction, we bring decades of experience and expertise to the table. Our journey began with a passion for construction and a vision to create spaces that inspire and endure. Over the years, we have evolved into a trusted name synonymous with quality, integrity, and innovation.
        </p>
      </section>

      {/* The Firm & Partners Section */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="hero-text">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              The <span className="text-[#c9a96e]">Firm</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              A family partnership built on residential construction. What Bharathi Constructions is, who holds it, and what it was formed to do. 
            </p>
            <div className="p-8 bg-[#111] rounded-2xl border border-white/5 inline-block">
              <div className="text-sm text-white/50 uppercase tracking-widest mb-2">Firm Registered</div>
              <div className="text-5xl font-bold text-[#c9a96e]">2013</div>
            </div>
          </div>

          <div className="partners-grid grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { name: "Sri Adavelly Jaychander Reddy", role: "Managing Partner" },
              { name: "Sri A. Ramreddy", role: "Partner" },
              { name: "Mrs. A. Bharathi", role: "Partner" },
              { name: "Mrs. A. Anusha", role: "Partner" }
            ].map((partner, i) => (
              <div key={i} className="partner-card bg-[#0a0a0a] p-6 border border-white/10 rounded-xl hover:border-[#c9a96e]/50 transition-colors duration-300">
                <Users className="w-8 h-8 text-[#c9a96e] mb-4 opacity-50" />
                <h3 className="text-xl font-semibold text-white mb-1">{partner.name}</h3>
                <p className="text-[#c9a96e] text-sm tracking-wider uppercase">{partner.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Profile / Timeline Section */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Sri Adavelly <span className="text-[#c9a96e]">Jaychander Reddy</span>
          </h2>
          <p className="text-xl text-white/50 tracking-wide">Managing Partner, Bharathi Constructions</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#c9a96e]/0 via-[#c9a96e]/30 to-[#c9a96e]/0 transform md:-translate-x-1/2"></div>

          <div className="space-y-16">
            {timelineData.map((item, index) => (
              <div key={index} className={`timeline-item relative flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row-reverse" : ""} items-center gap-8`}>
                
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 w-12 h-12 bg-[#050505] border-2 border-[#c9a96e] rounded-full flex items-center justify-center transform -translate-x-1/2 z-10 hidden md:flex">
                  {item.icon}
                </div>
                
                {/* Mobile Icon (since dot is hidden on small screens) */}
                <div className="md:hidden flex items-center gap-4 mb-4 self-start">
                  <div className="w-10 h-10 bg-[#111] border border-[#c9a96e]/50 rounded-full flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="text-[#c9a96e] font-semibold">{item.date}</span>
                </div>

                {/* Content */}
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pl-16" : "md:pr-16 text-left md:text-right"}`}>
                  <div className="bg-[#111] p-8 rounded-2xl border border-white/5 hover:border-[#c9a96e]/30 transition-colors">
                    <span className="hidden md:block text-[#c9a96e] text-sm font-bold tracking-widest mb-3 uppercase">{item.date}</span>
                    <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                    <h4 className="text-md text-white/50 uppercase tracking-wider mb-4">{item.subtitle}</h4>
                    <p className="text-white/70 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
