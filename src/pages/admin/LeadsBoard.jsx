import React, { useState } from 'react';
import { MoreHorizontal, Phone, Mail, Calendar, CheckCircle2, UserCircle2 } from 'lucide-react';

export default function LeadsBoard({ leads, updateLeadStatus }) {
  const columns = ['New', 'Contacted', 'Site Visit', 'Negotiation', 'Closed'];

  const getStatusColor = (status) => {
    const colors = {
      'New': 'bg-blue-500',
      'Contacted': 'bg-yellow-500',
      'Site Visit': 'bg-purple-500',
      'Negotiation': 'bg-orange-500',
      'Closed': 'bg-emerald-500'
    };
    return colors[status] || 'bg-gray-500';
  };

  const moveLead = (leadId, newStatus) => {
    if (updateLeadStatus) {
      updateLeadStatus(leadId, newStatus);
    }
  };

  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-serif text-white tracking-wide">Sales Pipeline</h2>
        <button className="bg-white text-black px-6 py-2 rounded-full text-sm font-medium hover:bg-white/90 transition-colors">
          + Add Lead
        </button>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-8 h-[calc(100vh-200px)]">
        {columns.map(col => (
          <div key={col} className="flex-1 min-w-[320px] bg-[#0a0a0a] border border-white/10 rounded-2xl p-4 flex flex-col">
            {/* Column Header */}
            <div className="flex items-center justify-between mb-6 px-2">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(col)}`} />
                <h3 className="text-white font-medium">{col}</h3>
              </div>
              <span className="text-white/40 text-sm bg-white/5 px-2 py-1 rounded-md">
                {leads.filter(l => l.status === col).length}
              </span>
            </div>

            {/* Cards Container */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              {leads.filter(l => l.status === col).map(lead => (
                <div key={lead.id} className="bg-[#141414] border border-white/5 p-5 rounded-xl hover:border-white/20 transition-all cursor-grab group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                        <UserCircle2 className="w-6 h-6 text-white/50" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{lead.name}</h4>
                        <p className="text-xs text-white/40">{lead.project}</p>
                      </div>
                    </div>
                    <button className="text-white/30 hover:text-white transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-white/50 text-xs">
                      <Phone className="w-3 h-3" /> {lead.phone}
                    </div>
                    <div className="flex items-center gap-2 text-white/50 text-xs">
                      <Mail className="w-3 h-3" /> {lead.email || 'N/A'}
                    </div>
                  </div>

                  {/* Actions (Mock Drag & Drop alternatives) */}
                  <div className="flex gap-2 overflow-x-auto pb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {columns.filter(c => c !== col).map(dest => (
                      <button 
                        key={dest} 
                        onClick={() => moveLead(lead.id, dest)}
                        className="whitespace-nowrap text-[10px] uppercase tracking-wider px-2 py-1 bg-white/5 hover:bg-white/20 text-white/60 rounded border border-white/10 transition-colors"
                      >
                        Move to {dest}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
