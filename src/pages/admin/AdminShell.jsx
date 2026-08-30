import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Building, Settings, LogOut, Search, Bell } from 'lucide-react';
import Overview from './Overview';
import LeadsBoard from './LeadsBoard';

// MOCK DATA
const initialLeads = [
  { id: 1, name: "Rahul Sharma", email: "rahul.s@example.com", phone: "+91 9876543210", project: "Lake Woods", status: "New", date: "2026-08-30T10:00:00Z" },
  { id: 2, name: "Priya Patel", email: "priya.p@example.com", phone: "+91 8765432109", project: "Horizon", status: "Contacted", date: "2026-08-29T14:30:00Z" },
  { id: 3, name: "Amit Kumar", email: "amit.k@example.com", phone: "+91 7654321098", project: "Lake Woods", status: "Site Visit", date: "2026-08-28T09:15:00Z" },
  { id: 4, name: "Sneha Reddy", email: "sneha.r@example.com", phone: "+91 6543210987", project: "Horizon", status: "Negotiation", date: "2026-08-27T16:45:00Z" },
  { id: 5, name: "Vikram Singh", email: "vikram.s@example.com", phone: "+91 5432109876", project: "Lake Woods", status: "Closed", date: "2026-08-20T11:20:00Z" }
];

export default function AdminShell() {
  const [leads, setLeads] = useState(initialLeads);
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect /admin to /admin/dashboard
  useEffect(() => {
    if (location.pathname === '/admin' || location.pathname === '/admin/') {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [location, navigate]);

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Pipeline', path: '/admin/pipeline', icon: Users },
    { name: 'Projects', path: '/admin/projects', icon: Building },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-[#050505] text-white font-sans overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-72 bg-[#0a0a0a] border-r border-white/5 flex flex-col">
        <div className="p-8 pb-12">
          <Link to="/">
            <img src="/logo.png" alt="Logo" className="h-10 filter invert brightness-200" />
          </Link>
          <div className="mt-2 text-xs uppercase tracking-[0.2em] text-[#c9a96e]">CRM Platform</div>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map(item => {
            const isActive = location.pathname.includes(item.path);
            return (
              <Link 
                key={item.name} 
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-white/10 text-white' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}
              >
                <item.icon size={20} className={isActive ? 'text-[#c9a96e]' : ''} />
                <span className="font-medium tracking-wide">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-8 border-t border-white/5">
          <div className="flex items-center gap-4 text-white/50 hover:text-white cursor-pointer transition-colors">
            <LogOut size={20} />
            <span className="font-medium tracking-wide">Logout</span>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        
        {/* TOPBAR */}
        <header className="h-24 px-10 flex items-center justify-between border-b border-white/5 bg-[#0a0a0a]/50 backdrop-blur-md sticky top-0 z-10">
          <div className="relative group">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[#c9a96e] transition-colors" />
            <input 
              type="text" 
              placeholder="Search leads, projects..." 
              className="w-80 bg-white/5 border border-white/10 focus:border-[#c9a96e]/50 text-white pl-12 pr-4 py-3 rounded-full outline-none transition-all placeholder:text-white/20"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-white/40 hover:text-white transition-colors">
              <Bell size={22} />
              <span className="absolute top-1 right-2 w-2 h-2 bg-[#c9a96e] rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#c9a96e] to-[#e3c05c] flex items-center justify-center text-black font-bold text-lg">
                S
              </div>
              <div className="hidden md:block text-sm">
                <p className="font-medium">Sales Admin</p>
                <p className="text-white/40">admin@bharathi.com</p>
              </div>
            </div>
          </div>
        </header>

        {/* ROUTES CONTAINER */}
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          <Routes>
            <Route path="dashboard" element={<Overview leads={leads} />} />
            <Route path="pipeline" element={<LeadsBoard leads={leads} setLeads={setLeads} />} />
            
            {/* Fallbacks for unbuilt routes */}
            <Route path="projects" element={<div className="text-white/50 text-center mt-20">Projects Module Coming Soon</div>} />
            <Route path="settings" element={<div className="text-white/50 text-center mt-20">Settings Module Coming Soon</div>} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
