import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Users, Building, TrendingUp, Search, Bell } from "lucide-react";

export default function Admin() {
  const [leads, setLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Load leads from local CRM storage
    const data = JSON.parse(localStorage.getItem("crm_leads") || "[]");
    
    // Add some mock data if empty just so the dashboard looks good
    if (data.length === 0) {
      const mockLeads = [
        { id: 1, name: "Arjun Reddy", phone: "+91 98765 11111", project: "Horizon", date: new Date(Date.now() - 86400000).toISOString() },
        { id: 2, name: "Priya Sharma", phone: "+91 98765 22222", project: "Lake Woods", date: new Date(Date.now() - 172800000).toISOString() },
        { id: 3, name: "Rohan Kapoor", phone: "+91 98765 33333", project: "Horizon", date: new Date(Date.now() - 259200000).toISOString() }
      ];
      setLeads(mockLeads);
      localStorage.setItem("crm_leads", JSON.stringify(mockLeads));
    } else {
      setLeads(data);
    }
  }, []);

  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    l.phone.includes(searchTerm)
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "transparent", color: "#fff", fontFamily: "system-ui, sans-serif" }}>
      
      {/* SIDEBAR */}
      <div style={{ width: "260px", background: "#0a0a0a", borderRight: "1px solid rgba(255,255,255,0.05)", padding: "2rem" }}>
        <Link to="/" style={{ display: "block", marginBottom: "4rem" }}>
          <img src="/logo.png" alt="Logo" style={{ height: "40px", filter: "invert(1) brightness(2)" }} />
        </Link>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <span style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>CRM Platform</span>
          <button style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", padding: "1rem", borderRadius: "12px", textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", gap: "1rem" }}><Users size={18}/> Leads</button>
          <button style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.5)", padding: "1rem", borderRadius: "12px", textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", gap: "1rem" }}><Building size={18}/> Projects</button>
          <button style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.5)", padding: "1rem", borderRadius: "12px", textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", gap: "1rem" }}><TrendingUp size={18}/> Analytics</button>
        </div>
      </div>

      {/* MAIN DASHBOARD */}
      <div style={{ flex: 1, padding: "2rem 4rem" }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4rem" }}>
          <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: "2.5rem", margin: 0 }}>Lead Management</h1>
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            <div style={{ position: "relative" }}>
              <Search size={16} color="rgba(255,255,255,0.5)" style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)" }} />
              <input 
                type="text" 
                placeholder="Search leads..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", padding: "0.8rem 1rem 0.8rem 3rem", borderRadius: "100px", outline: "none", width: "250px" }} 
              />
            </div>
            <Bell size={20} color="rgba(255,255,255,0.5)" cursor="pointer" />
            <div style={{ width: "40px", height: "40px", background: "transparent", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#000", fontWeight: "bold" }}>A</div>
          </div>
        </header>

        {/* METRICS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem", marginBottom: "4rem" }}>
          <div style={{ background: "#0a0a0a", padding: "2rem", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.05)" }}>
            <span style={{ fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>Total Inquiries</span>
            <div style={{ fontSize: "3rem", fontFamily: "Playfair Display, serif", marginTop: "1rem" }}>{leads.length}</div>
          </div>
          <div style={{ background: "#0a0a0a", padding: "2rem", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.05)" }}>
            <span style={{ fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>Horizon Leads</span>
            <div style={{ fontSize: "3rem", fontFamily: "Playfair Display, serif", marginTop: "1rem" }}>{leads.filter(l => l.project === 'Horizon').length}</div>
          </div>
          <div style={{ background: "#0a0a0a", padding: "2rem", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.05)" }}>
            <span style={{ fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>Lake Woods Leads</span>
            <div style={{ fontSize: "3rem", fontFamily: "Playfair Display, serif", marginTop: "1rem" }}>{leads.filter(l => l.project === 'Lake Woods').length}</div>
          </div>
        </div>

        {/* TABLE */}
        <div style={{ background: "#0a0a0a", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.05)", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.02)" }}>
                <th style={{ padding: "1.5rem", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", fontWeight: "normal", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>Client Name</th>
                <th style={{ padding: "1.5rem", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", fontWeight: "normal", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>Phone Number</th>
                <th style={{ padding: "1.5rem", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", fontWeight: "normal", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>Project</th>
                <th style={{ padding: "1.5rem", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", fontWeight: "normal", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>Date Received</th>
                <th style={{ padding: "1.5rem", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", fontWeight: "normal", borderBottom: "1px solid rgba(255,255,255,0.05)", textAlign: "right" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ padding: "3rem", textAlign: "center", color: "rgba(255,255,255,0.3)" }}>No leads found.</td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} style={{ transition: "background 0.2s" }} onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.02)"} onMouseLeave={e => e.currentTarget.style.background="transparent"}>
                    <td style={{ padding: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.05)", fontWeight: 500 }}>{lead.name}</td>
                    <td style={{ padding: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.7)" }}>{lead.phone}</td>
                    <td style={{ padding: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <span style={{ padding: "0.4rem 0.8rem", background: lead.project === 'Horizon' ? "rgba(255,255,255,0.1)" : "rgba(201, 169, 110, 0.2)", color: lead.project === 'Horizon' ? "#fff" : "#C9A96E", borderRadius: "100px", fontSize: "0.75rem", letterSpacing: "0.05em" }}>{lead.project}</span>
                    </td>
                    <td style={{ padding: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)", fontSize: "0.9rem" }}>{new Date(lead.date).toLocaleDateString('en-GB')}</td>
                    <td style={{ padding: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.05)", textAlign: "right" }}>
                      <button style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", padding: "0.5rem 1.5rem", borderRadius: "100px", fontSize: "0.75rem", cursor: "pointer", transition: "background 0.2s" }} onMouseEnter={e => {e.target.style.background="#fff"; e.target.style.color="#000"}} onMouseLeave={e => {e.target.style.background="transparent"; e.target.style.color="#fff"}}>View</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
