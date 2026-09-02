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
    }
  };

  const updateLeadStatus = async (leadId, newStatus) => {
    setLeads(leads.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
    const { error } = await supabase.from('leads').update({ status: newStatus }).eq('id', leadId);
    if (error) {
      console.error("Failed to update status in DB:", error);
      fetchLeads();
    }
  };

  const updateLeadNote = async (leadId, note) => {
    setLeads(leads.map(l => l.id === leadId ? { ...l, admin_notes: note } : l));
    const { error } = await supabase.from('leads').update({ admin_notes: note }).eq('id', leadId);
    if (error) {
      console.error("Failed to update note in DB:", error);
      fetchLeads();
    }
  };

  const deleteLead = async (leadId) => {
    if (!window.confirm("Are you sure you want to permanently delete this lead?")) return;
    setLeads(leads.filter(l => l.id !== leadId));
    const { error } = await supabase.from('leads').delete().eq('id', leadId);
    if (error) {
      console.error("Failed to delete lead in DB:", error);
      fetchLeads();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin');
  };

  if (loadingAuth) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-900 font-serif text-2xl">Loading...</div>;
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
    <div className="flex h-screen bg-gray-50 text-gray-900 font-sans overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-72 bg-white border-r border-gray-200 flex flex-col shadow-sm z-10">
        <div className="p-8 pb-12">
          <Link to="/">
            {/* Dark logo for light theme */}
            <img src="/logo.png" alt="Logo" className="h-10 filter brightness-0" />
          </Link>
          <div className="mt-2 text-xs uppercase tracking-[0.2em] text-[#c9a96e] font-semibold">CRM Platform</div>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map(item => {
            const isActive = location.pathname.includes(item.path);
            return (
              <Link 
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 mt-auto">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full text-left text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col min-w-0 bg-gray-50">
        {/* HEADER */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-10 shadow-sm z-10">
          <div className="flex items-center gap-4 bg-gray-100 border border-gray-200 rounded-full px-4 py-2 w-96">
            <Search className="w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search leads, projects..." className="bg-transparent border-none focus:outline-none text-sm w-full text-gray-900 placeholder-gray-500" />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative text-gray-500 hover:text-gray-900 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#c9a96e] rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 border-l border-gray-200 pl-6">
              <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center font-serif text-[#c9a96e] font-bold">
                A
              </div>
              <div className="hidden md:block text-sm">
                <p className="font-medium text-gray-900">Admin</p>
                <p className="text-gray-500">{user.email}</p>
              </div>
            </div>
          </div>
        </header>

        {/* ROUTES CONTAINER */}
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          <Routes>
            <Route path="dashboard" element={<Overview leads={leads} />} />
            <Route path="pipeline" element={<LeadsBoard leads={leads} updateLeadStatus={updateLeadStatus} updateLeadNote={updateLeadNote} deleteLead={deleteLead} />} />
            
            <Route path="projects" element={<div className="text-gray-500 text-center mt-20">Projects Module Coming Soon</div>} />
            <Route path="settings" element={<div className="text-gray-500 text-center mt-20">Settings Module Coming Soon</div>} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
