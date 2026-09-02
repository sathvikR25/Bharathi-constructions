import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Building, Settings, LogOut, Search, Bell } from 'lucide-react';
import Overview from './Overview';
import LeadsBoard from './LeadsBoard';
import Login from './Login';
import { supabase } from '../../lib/supabase';

export default function AdminShell() {
  const [user, setUser] = useState(null);
  const [leads, setLeads] = useState([]);
  const [loadingAuth, setLoadingAuth] = useState(true);
  
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect /admin to /admin/dashboard
  useEffect(() => {
    if (user && (location.pathname === '/admin' || location.pathname === '/admin/')) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [location, navigate, user]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      if (session) fetchLeads();
      setLoadingAuth(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      if (session) fetchLeads();
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchLeads = async () => {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setLeads(data);
    } else {
      console.error("Error fetching leads from Supabase:", error);
      // Fallback for UI testing if Supabase is missing tables
      setLeads([
        { id: 1, name: "Sample Lead (Supabase Not Configured)", email: "sample@example.com", phone: "+91 0000000000", project: "Lake Woods", status: "New", created_at: new Date().toISOString() }
      ]);
    }
  };

  const updateLeadStatus = async (leadId, newStatus) => {
    // Optimistic UI update
    setLeads(leads.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
    
    // Supabase update
    const { error } = await supabase
      .from('leads')
      .update({ status: newStatus })
      .eq('id', leadId);
      
    if (error) {
      console.error("Failed to update status in DB:", error);
      // Revert if error
      fetchLeads();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin');
  };

  if (loadingAuth) {
    return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white font-serif text-2xl">Loading...</div>;
  }

  if (!user) {
    return <Login onLogin={setUser} />;
  }

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
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-white/10 text-white' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 mt-auto">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full text-left text-white/50 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* HEADER */}
        <header className="h-20 bg-[#0a0a0a]/50 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-10">
          <div className="flex items-center gap-4 bg-[#111] border border-white/10 rounded-full px-4 py-2 w-96">
            <Search className="w-4 h-4 text-white/40" />
            <input type="text" placeholder="Search leads, projects..." className="bg-transparent border-none focus:outline-none text-sm w-full text-white" />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative text-white/60 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#c9a96e] rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 border-l border-white/10 pl-6">
              <div className="w-10 h-10 rounded-full bg-[#111] border border-white/10 flex items-center justify-center font-serif text-[#c9a96e]">
                A
              </div>
              <div className="hidden md:block text-sm">
                <p className="font-medium">Admin</p>
                <p className="text-white/40">{user.email}</p>
              </div>
            </div>
          </div>
        </header>

        {/* ROUTES CONTAINER */}
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          <Routes>
            <Route path="dashboard" element={<Overview leads={leads} />} />
            <Route path="pipeline" element={<LeadsBoard leads={leads} setLeads={setLeads} updateLeadStatus={updateLeadStatus} />} />
            
            <Route path="projects" element={<div className="text-white/50 text-center mt-20">Projects Module Coming Soon</div>} />
            <Route path="settings" element={<div className="text-white/50 text-center mt-20">Settings Module Coming Soon</div>} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
