import React, { useState } from 'react';
import { auth } from '../../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ArrowRight, Lock } from 'lucide-react';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      onLogin(userCredential.user);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#f8f9fa]">
      {/* Ambient Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#c9a96e] rounded-full mix-blend-multiply filter blur-[120px] opacity-30 animate-pulse" style={{ animationDuration: '8s' }}></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#123645] rounded-full mix-blend-multiply filter blur-[150px] opacity-20 animate-pulse" style={{ animationDuration: '10s' }}></div>

      <div className="w-full max-w-md relative z-10 backdrop-blur-2xl bg-white/50 border border-white/60 rounded-3xl p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-[#123645] to-[#1b4a5e] rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
            <Lock className="w-7 h-7 text-[#c9a96e] -rotate-3" />
          </div>
        </div>
        <h2 className="text-3xl font-serif text-[#123645] text-center mb-2 font-semibold">Admin Portal</h2>
        <p className="text-[#123645]/60 text-center text-sm mb-10 font-medium">Sign in to manage projects and leads.</p>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && <div className="bg-red-50/80 backdrop-blur-md border border-red-200 text-red-600 text-sm p-4 rounded-xl text-center shadow-sm">{error}</div>}
          
          <div className="space-y-1.5">
            <label className="block text-[0.7rem] font-bold text-[#123645]/70 uppercase tracking-widest ml-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-white/60 border border-white/80 text-[#123645] rounded-xl px-5 py-3.5 focus:outline-none focus:border-[#c9a96e] focus:bg-white focus:ring-4 focus:ring-[#c9a96e]/20 transition-all duration-300 shadow-sm placeholder-[#123645]/30 font-medium"
              placeholder="admin@bharathiconstructions.com"
              required 
            />
          </div>
          
          <div className="space-y-1.5">
            <label className="block text-[0.7rem] font-bold text-[#123645]/70 uppercase tracking-widest ml-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-white/60 border border-white/80 text-[#123645] rounded-xl px-5 py-3.5 focus:outline-none focus:border-[#c9a96e] focus:bg-white focus:ring-4 focus:ring-[#c9a96e]/20 transition-all duration-300 shadow-sm placeholder-[#123645]/30 font-medium"
              placeholder="••••••••"
              required 
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#123645] to-[#1b4a5e] text-white font-semibold py-4 rounded-xl hover:shadow-lg hover:shadow-[#123645]/30 transition-all duration-300 flex justify-center items-center gap-3 mt-6 disabled:opacity-50 group border border-[#123645]/50"
          >
            {loading ? 'Authenticating...' : 'Sign In'} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>
    </div>
  );
}
