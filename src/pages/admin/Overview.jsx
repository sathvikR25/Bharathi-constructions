import React from 'react';
import { Users, Building, TrendingUp, ArrowUpRight, Clock, Target, BarChart3, Activity } from 'lucide-react';

export default function Overview({ leads = [] }) {
  const stats = [
    { label: 'Total Inquiries', value: leads.length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Site Visits', value: leads.filter(l => l.status === 'Site Visit').length, icon: Building, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Conversions', value: leads.filter(l => l.status === 'Closed').length, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  ];

  // A/B Testing Data
  const variantA = leads.filter(l => l.ab_variant === 'A').length;
  const variantB = leads.filter(l => l.ab_variant === 'B').length;
  const abTotal = variantA + variantB;
  const aPercentage = abTotal === 0 ? 0 : Math.round((variantA / abTotal) * 100);
  const bPercentage = abTotal === 0 ? 0 : Math.round((variantB / abTotal) * 100);

  // Source Breakdown
  const sources = leads.reduce((acc, lead) => {
    const s = lead.source || 'Organic / Direct';
    acc[s] = (acc[s] || 0) + 1;
    return acc;
  }, {});
  const sortedSources = Object.entries(sources).sort((a, b) => b[1] - a[1]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-3xl font-serif text-gray-900 tracking-wide">Dashboard Overview</h2>
        <div className="px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-sm font-semibold border border-blue-100 flex items-center gap-2">
          <Activity className="w-4 h-4" /> Live Tracking Active
        </div>
      </div>
      
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* A/B TESTING RESULTS */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg text-gray-900 font-bold mb-1 flex items-center gap-2">
            <Target className="w-5 h-5 text-[#c9a96e]" /> A/B Test Results (Home CTA)
          </h3>
          <p className="text-sm text-gray-500 mb-6">Real-time conversion tracking for your active UI experiments.</p>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm font-medium mb-2">
                <span className="text-gray-700">Variant A: "Our Legacy"</span>
                <span className="text-blue-600 font-bold">{variantA} Leads ({aPercentage}%)</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3 border border-gray-200 overflow-hidden">
                <div className="bg-blue-500 h-3 rounded-full transition-all duration-1000" style={{ width: `${aPercentage}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm font-medium mb-2">
                <span className="text-gray-700">Variant B: "Schedule Viewing"</span>
                <span className="text-purple-600 font-bold">{variantB} Leads ({bPercentage}%)</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3 border border-gray-200 overflow-hidden">
                <div className="bg-purple-500 h-3 rounded-full transition-all duration-1000" style={{ width: `${bPercentage}%` }}></div>
              </div>
            </div>

            {abTotal === 0 && <p className="text-xs text-gray-400 italic text-center mt-4">Waiting for first experimental lead...</p>}
          </div>
        </div>

        {/* LEAD SOURCES */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg text-gray-900 font-bold mb-1 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-600" /> Lead Sources
          </h3>
          <p className="text-sm text-gray-500 mb-6">Where your inquiries are originating from.</p>
          
          <div className="space-y-4">
            {sortedSources.length > 0 ? sortedSources.map(([source, count], index) => {
              const maxCount = sortedSources[0][1];
              const percentage = Math.round((count / maxCount) * 100);
              return (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-32 truncate text-sm font-medium text-gray-700" title={source}>{source}</div>
                  <div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden border border-gray-200">
                    <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
                  </div>
                  <div className="w-10 text-right text-sm font-bold text-gray-900">{count}</div>
                </div>
              );
            }) : (
              <p className="text-xs text-gray-400 italic text-center">No source data available yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg text-gray-900 font-bold mb-6 flex items-center gap-2">
          <Clock className="w-5 h-5 text-gray-400" /> Recent Activity
        </h3>
        <div className="space-y-4">
          {leads.slice(0, 5).map(lead => (
            <div key={lead.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 px-2 rounded-lg transition-colors -mx-2">
              <div>
                <p className="text-gray-900 font-medium">{lead.name} <span className="text-gray-500 text-sm font-normal">inquired about</span> <span className="font-semibold">{lead.project}</span></p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-400">{new Date(lead.created_at || new Date()).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</span>
                  {lead.source && <span className="px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded text-[0.6rem] font-bold uppercase tracking-wider">{lead.source}</span>}
                </div>
              </div>
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full border border-gray-200 font-medium">{lead.status}</span>
            </div>
          ))}
          {leads.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-4">No recent activity.</p>
          )}
        </div>
      </div>
    </div>
  );
}