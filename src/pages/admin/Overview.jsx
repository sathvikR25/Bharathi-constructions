import React from 'react';
import { Users, Building, TrendingUp, ArrowUpRight, Clock } from 'lucide-react';

export default function Overview({ leads }) {
  const stats = [
    { label: 'Total Inquiries', value: leads.length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Site Visits', value: leads.filter(l => l.status === 'Site Visit').length, icon: Building, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Conversions', value: leads.filter(l => l.status === 'Closed').length, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h2 className="text-3xl font-serif text-gray-900 tracking-wide">Dashboard Overview</h2>
      
      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <ArrowUpRight className="w-5 h-5 text-gray-400" />
            </div>
            <h3 className="text-4xl font-serif text-gray-900 mb-2">{stat.value}</h3>
            <p className="text-sm uppercase tracking-widest text-gray-500 font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* RECENT ACTIVITY */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg text-gray-900 font-bold mb-6 flex items-center gap-2">
          <Clock className="w-5 h-5 text-gray-400" /> Recent Activity
        </h3>
        <div className="space-y-4">
          {leads.slice(0, 5).map(lead => (
            <div key={lead.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div>
                <p className="text-gray-900 font-medium">{lead.name} <span className="text-gray-500 text-sm font-normal">inquired about</span> {lead.project}</p>
                <p className="text-xs text-gray-400 mt-1">{new Date(lead.created_at || new Date()).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</p>
              </div>
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full border border-gray-200 font-medium">{lead.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
