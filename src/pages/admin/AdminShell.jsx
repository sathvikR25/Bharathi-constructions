import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Building, Settings, LogOut, Search, Bell, Image as ImageIcon } from 'lucide-react';
import Overview from './Overview';
import LeadsBoard from './LeadsBoard';
import MediaManager from './MediaManager';
import Login from './Login';
import { auth, db } from '../../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, getDocs, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';

export default function AdminShell() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('Sales Manager'); // Default role
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
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchUserRole(currentUser.email);
        fetchLeads();
      }
      setLoadingAuth(false);
    });

    return () => unsubscribe();
  }, []);

  const fetchUserRole = async (email) => {
    // Attempt to fetch from profiles collection
    try {
      // For now we keep the same fallback logic we had in Supabase
      if (email.toLowerCase().includes('md') || email.toLowerCase().includes('admin')) setRole('MD');
      else if (email.toLowerCase().includes('tech')) setRole('Tech Handler');
      else setRole('Sales Manager');
    } catch (e) {
      console.error(e);
    }
  };

  const fetchLeads = async () => {
    try {
      const leadsRef = collection(db, 'leads');
      const q = query(leadsRef, orderBy('created_at', 'desc'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLeads(data);
    } catch (error) {
      console.error("Error fetching leads from Firebase:", error);
    }
  };

  const updateLeadStatus = async (leadId, newStatus) => {
    setLeads(leads.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
    try {
      const leadRef = doc(db, 'leads', leadId);
      await updateDoc(leadRef, { status: newStatus });
    } catch (error) {
      console.error("Failed to update status in DB:", error);
      fetchLeads();
    }
  };

  const updateLeadNote = async (leadId, note) => {
    setLeads(leads.map(l => l.id === leadId ? { ...l, admin_notes: note } : l));
    try {
      const leadRef = doc(db, 'leads', leadId);
      await updateDoc(leadRef, { admin_notes: note });
    } catch (error) {
      console.error("Failed to update note in DB:", error);
      fetchLeads();
    }
  };

  const deleteLead = async (leadId) => {
    if (!window.confirm("Are you sure you want to permanently delete this lead?")) return;
    setLeads(leads.filter(l => l.id !== leadId));
    try {
      const leadRef = doc(db, 'leads', leadId);
      await deleteDoc(leadRef);
    } catch (error) {
      console.error("Failed to delete lead in DB:", error);
      fetchLeads();
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
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
    { name: 'Pipeline (Table)', path: '/admin/pipeline', icon: Users },
    { name: 'Media Library', path: '/admin/media', icon: ImageIcon },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-[#f8f9fa] relative overflow-hidden text-[#123645] font-sans">
      {/* Ambient Glassmorphism Background Orbs */}
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-[#c9a96e] rounded-full mix-blend-multiply filter blur-[150px] opacity-20 pointer-events-none animate-pulse" style={{ animationDuration: '10s' }}></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#123645] rounded-full mix-blend-multiply filter blur-[150px] opacity-10 pointer-events-none animate-pulse" style={{ animationDuration: '12s' }}></div>

      {/* SIDEBAR */}
      <aside className="w-72 relative z-20 backdrop-blur-2xl bg-white/60 border-r border-white/60 shadow-[4px_0_24px_rgba(0,0,0,0.02)] flex flex-col">
        <div className="p-8 pb-12">
          <Link to="/">
            <img src="/logo.png" alt="Logo" className="h-10 drop-shadow-sm" style={{ mixBlendMode: 'multiply' }} />
          </Link>
          <div className="mt-2 text-xs uppercase tracking-[0.2em] text-[#c9a96e] font-bold">CRM Platform</div>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map(item => {
            const isActive = location.pathname.includes(item.path);
            return (
              <Link 
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 font-medium ${isActive ? 'bg-white/80 text-[#123645] shadow-sm border border-white/80' : 'text-[#123645]/60 hover:bg-white/50 hover:text-[#123645]'}`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-[#c9a96e]' : ''}`} />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-6 mt-auto border-t border-white/50 bg-white/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#123645] to-[#1b4a5e] shadow-md flex items-center justify-center font-serif text-[#c9a96e] font-bold text-lg">
              {user.email.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="font-semibold text-[#123645] truncate text-sm">{user.email}</p>
              <p className="text-[0.65rem] text-[#c9a96e] font-bold uppercase tracking-wider mt-0.5">{role}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2.5 w-full text-left text-[#123645]/60 hover:text-red-600 hover:bg-red-50/80 hover:shadow-sm hover:border-red-100 border border-transparent rounded-xl transition-all duration-300">
            <LogOut className="w-4 h-4" />
            <span className="font-semibold text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col min-w-0 relative z-10">
        {/* HEADER */}
        <header className="h-20 relative z-20 backdrop-blur-2xl bg-white/50 border-b border-white/60 flex items-center justify-between px-10 shadow-sm">
          <div className="flex items-center gap-4 bg-white/50 border border-white/80 shadow-inner rounded-full px-5 py-2.5 w-96 focus-within:ring-4 focus-within:ring-[#c9a96e]/20 focus-within:bg-white transition-all duration-300">
            <Search className="w-4 h-4 text-[#123645]/40" />
            <input type="text" placeholder="Search leads, projects..." className="bg-transparent border-none focus:outline-none text-sm w-full text-[#123645] placeholder-[#123645]/40 font-medium" />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative text-[#123645]/60 hover:text-[#c9a96e] transition-colors p-2 bg-white/50 rounded-full border border-white/80 shadow-sm hover:shadow-md">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#c9a96e] border-2 border-white rounded-full"></span>
            </button>
          </div>
        </header>

        {/* ROUTES CONTAINER */}
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar relative z-10">
          <Routes>
            <Route path="dashboard" element={<Overview leads={leads} />} />
            <Route path="pipeline" element={<LeadsBoard leads={leads} updateLeadStatus={updateLeadStatus} updateLeadNote={updateLeadNote} deleteLead={deleteLead} role={role} />} />
            <Route path="media" element={<MediaManager role={role} />} />
            <Route path="settings" element={<div className="text-[#123645]/60 text-center mt-20 font-medium bg-white/40 p-10 rounded-3xl border border-white/60 backdrop-blur-xl max-w-md mx-auto">Settings Module Coming Soon</div>} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
