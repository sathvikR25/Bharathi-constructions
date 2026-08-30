import React from 'react';
import { Users, Building, TrendingUp, ArrowUpRight, Clock, CheckCircle } from 'lucide-react';

export default function Overview({ leads }) {
  const stats = [
    { label: 'Total Inquiries', value: leads.length, icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Site Visits', value: leads.filter(l => l.status === 'Site Visit').length, icon: Building, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { label: 'Conversions', value: leads.filter(l => l.status === 'Closed').length, icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h2 className="text-3xl font-serif text-white tracking-wide">Dashboard Overview</h2>
      
      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[#111] border border-white/10 rounded-2xl p-6 hover:bg-[#161616] transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <ArrowUpRight className="w-5 h-5 text-white/30" />
            </div>
            <h3 className="text-4xl font-serif text-white mb-2">{stat.value}</h3>
            <p className="text-sm uppercase tracking-widest text-white/40">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* RECENT ACTIVITY */}
      <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
        <h3 className="text-lg text-white font-medium mb-6 flex items-center gap-2">
          <Clock className="w-5 h-5 text-white/50" /> Recent Activity
        </h3>
        <div className="space-y-4">
          {leads.slice(0, 5).map(lead => (
            <div key={lead.id} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
              <div>
                <p className="text-white font-medium">{lead.name} <span className="text-white/40 text-sm font-normal">inquired about</span> {lead.project}</p>
                <p className="text-xs text-white/40 mt-1">{new Date(lead.date).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</p>
              </div>
              <span className="px-3 py-1 bg-white/5 text-white/60 text-xs rounded-full border border-white/10">{lead.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
