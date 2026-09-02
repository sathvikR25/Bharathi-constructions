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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-8 shadow-xl">
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200">
            <Lock className="w-5 h-5 text-gray-400" />
          </div>
        </div>
        <h2 className="text-3xl font-serif text-gray-900 text-center mb-2">Admin Portal</h2>
        <p className="text-gray-500 text-center text-sm mb-8">Sign in to manage projects and leads.</p>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg text-center">{error}</div>}
          
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg px-4 py-3 focus:outline-none focus:border-gray-400 transition-colors"
              required 
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg px-4 py-3 focus:outline-none focus:border-gray-400 transition-colors"
              required 
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gray-900 text-white font-medium py-3 rounded-lg hover:bg-black transition-colors flex justify-center items-center gap-2 mt-4 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'} <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
