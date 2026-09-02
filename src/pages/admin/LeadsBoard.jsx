import React, { useState } from 'react';
import { Download, Search, Trash2, Save, MessageSquare } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function LeadsBoard({ leads, updateLeadStatus, updateLeadNote, deleteLead, role }) {
  const [projectFilter, setProjectFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [editingNotes, setEditingNotes] = useState({});
  const [expandedMessage, setExpandedMessage] = useState(null);

  const statuses = ['New', 'Contacted', 'Site Visit', 'Negotiation', 'Closed'];

  // Apply filters
  const filteredLeads = leads.filter(l => {
    const matchProject = projectFilter === 'All' || l.project === projectFilter;
    const matchStatus = statusFilter === 'All' || l.status === statusFilter;
    return matchProject && matchStatus;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'New': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Contacted': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Site Visit': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Negotiation': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Closed': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const exportCSV = () => {
    const headers = ['Date', 'Name', 'Email', 'Phone', 'Project', 'Status', 'Message', 'Admin Notes'];
    const csvContent = [
      headers.join(','),
      ...filteredLeads.map(l => 
        [
          new Date(l.created_at).toLocaleDateString(),
          `"${l.name || ''}"`,
          `"${l.email || ''}"`,
          `"${l.phone || ''}"`,
          `"${l.project || ''}"`,
          `"${l.status || ''}"`,
          `"${(l.message || '').replace(/"/g, '""')}"`,
          `"${(l.admin_notes || '').replace(/"/g, '""')}"`
        ].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'leads_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Leads Export', 14, 15);
    const tableData = filteredLeads.map(l => [
      new Date(l.created_at).toLocaleDateString(),
      l.name,
      l.phone,
      l.project,
      l.status
    ]);
    doc.autoTable({ startY: 20, head: [['Date', 'Name', 'Phone', 'Project', 'Status']], body: tableData });
    doc.save('leads_export.pdf');
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 h-full flex flex-col">
      {/* HEADER & FILTERS */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-3xl font-serif text-gray-900 tracking-wide mb-1">Sales Leads</h2>
          <p className="text-gray-500 text-sm">Manage and track your leads in a dense table format.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-2">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider pl-2">Project:</span>
            <select 
              value={projectFilter} 
              onChange={e => setProjectFilter(e.target.value)}
              className="bg-transparent text-gray-700 py-2 pr-4 text-sm focus:outline-none cursor-pointer"
            >
              <option value="All">All</option>
              <option value="Horizon">Bharathi Horizon</option>
              <option value="Lake Woods">Bharathi Lake Woods</option>
              <option value="General">General</option>
            </select>
          </div>

          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-2">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider pl-2">Status:</span>
            <select 
              value={statusFilter} 
              onChange={e => setStatusFilter(e.target.value)}
              className="bg-transparent text-gray-700 py-2 pr-4 text-sm focus:outline-none cursor-pointer"
            >
              <option value="All">All</option>
              {statuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          
          <button onClick={exportCSV} className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm">
            <Download className="w-4 h-4" /> CSV
          </button>
          <button onClick={exportPDF} className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm">
            <Download className="w-4 h-4" /> PDF
          </button>
        </div>
      </div>

      {/* DATA TABLE */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm flex-1 overflow-hidden flex flex-col">
        <div className="overflow-x-auto flex-1 custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-semibold whitespace-nowrap">Date</th>
                <th className="p-4 font-semibold">Contact Info</th>
                <th className="p-4 font-semibold">Project</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold min-w-[250px]">Admin Notes</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredLeads.map(lead => (
                <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="p-4 whitespace-nowrap text-sm text-gray-600 align-top">
                    {new Date(lead.created_at).toLocaleDateString()}
                    <div className="text-xs text-gray-400 mt-1">{new Date(lead.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                  </td>
                  
                  <td className="p-4 align-top">
                    <div className="font-medium text-gray-900">{lead.name}</div>
                    <div className="text-sm text-gray-600 mt-0.5">{lead.phone}</div>
                    {lead.email && <div className="text-sm text-gray-500">{lead.email}</div>}
                    
                    {/* Inquiry Message Inline Toggle */}
                    {lead.message && (
                      <div className="mt-2">
                        <button 
                          onClick={() => setExpandedMessage(expandedMessage === lead.id ? null : lead.id)}
                          className="text-xs text-blue-600 flex items-center gap-1 hover:underline"
                        >
                          <MessageSquare className="w-3 h-3" /> 
                          {expandedMessage === lead.id ? 'Hide Inquiry' : 'View Inquiry'}
                        </button>
                        {expandedMessage === lead.id && (
                          <div className="mt-2 p-2 bg-blue-50 border border-blue-100 rounded text-sm text-gray-700 italic">
                            "{lead.message}"
                          </div>
                        )}
                      </div>
                    )}
                  </td>
                  
                  <td className="p-4 align-top">
                    <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md text-xs font-medium border border-gray-200">
                      {lead.project}
                    </span>
                  </td>
                  
                  <td className="p-4 align-top">
                    <div className={`inline-flex rounded-lg border ${getStatusColor(lead.status)} px-1 py-0.5 transition-colors`}>
                      <select
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                        className="bg-transparent border-none text-sm font-semibold focus:outline-none cursor-pointer pl-2 pr-6 appearance-none"
                        style={{ background: 'transparent' }}
                      >
                        {statuses.map(s => <option key={s} value={s} className="text-gray-900 bg-white">{s}</option>)}
                      </select>
                      {/* Custom dropdown arrow */}
                      <div className="pointer-events-none flex items-center pr-2 -ml-5">
                        <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </td>
                  
                  <td className="p-4 align-top">
                    <div className="relative group/note">
                      <textarea
                        value={editingNotes[lead.id] !== undefined ? editingNotes[lead.id] : (lead.admin_notes || '')}
                        onChange={(e) => setEditingNotes({...editingNotes, [lead.id]: e.target.value})}
                        placeholder="Add notes..."
                        rows={2}
                        className="w-full bg-white border border-gray-200 rounded-lg p-2 text-sm focus:border-gray-400 focus:outline-none resize-none"
                      />
                      {editingNotes[lead.id] !== undefined && editingNotes[lead.id] !== (lead.admin_notes || '') && (
                        <button 
                          onClick={() => {
                            if(updateLeadNote) updateLeadNote(lead.id, editingNotes[lead.id]);
                            setEditingNotes(prev => { const n = {...prev}; delete n[lead.id]; return n; });
                          }}
                          className="absolute bottom-2 right-2 bg-gray-900 text-white p-1 rounded hover:bg-black transition-colors"
                          title="Save Note"
                        >
                          <Save className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                  
                  <td className="p-4 align-top text-right">
                    <button 
                      onClick={() => deleteLead && deleteLead(lead.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-50 inline-flex"
                      title="Delete Lead"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              
              {filteredLeads.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500 font-medium">
                    No leads found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
