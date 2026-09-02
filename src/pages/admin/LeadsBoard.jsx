import React, { useState } from 'react';
import { MoreHorizontal, Phone, Mail, Calendar, UserCircle2, MessageSquare, Save, Trash2, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function LeadsBoard({ leads, updateLeadStatus, updateLeadNote, deleteLead }) {
  const columns = ['New', 'Contacted', 'Site Visit', 'Negotiation', 'Closed'];
  const [projectFilter, setProjectFilter] = useState('All');
  const [editingNotes, setEditingNotes] = useState({});

  const filteredLeads = leads.filter(l => projectFilter === 'All' || l.project === projectFilter);

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
    if (updateLeadStatus) updateLeadStatus(leadId, newStatus);
  };

  const handleNoteChange = (leadId, val) => {
    setEditingNotes(prev => ({ ...prev, [leadId]: val }));
  };

  const saveNote = (leadId) => {
    if (updateLeadNote && editingNotes[leadId] !== undefined) {
      updateLeadNote(leadId, editingNotes[leadId]);
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

    doc.autoTable({
      startY: 20,
      head: [['Date', 'Name', 'Phone', 'Project', 'Status']],
      body: tableData,
    });

    doc.save('leads_export.pdf');
  };

  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* HEADER & FILTERS */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-serif text-gray-900 tracking-wide mb-1">Sales Pipeline</h2>
          <p className="text-gray-500 text-sm">Manage and track your leads through the sales journey.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <select 
            value={projectFilter} 
            onChange={e => setProjectFilter(e.target.value)}
            className="bg-white border border-gray-200 text-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-gray-400"
          >
            <option value="All">All Projects</option>
            <option value="Horizon">Bharathi Horizon</option>
            <option value="Lake Woods">Bharathi Lake Woods</option>
            <option value="General">General Inquiry</option>
          </select>
          
          <button onClick={exportCSV} className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" /> CSV
          </button>
          <button onClick={exportPDF} className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" /> PDF
          </button>
        </div>
      </div>

      {/* PIPELINE BOARD */}
      <div className="flex gap-6 overflow-x-auto pb-8 h-[calc(100vh-200px)] custom-scrollbar">
        {columns.map(col => (
          <div key={col} className="flex-1 min-w-[350px] bg-gray-100/50 border border-gray-200 rounded-2xl p-4 flex flex-col">
            
            {/* Column Header */}
            <div className="flex items-center justify-between mb-4 px-2">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(col)}`} />
                <h3 className="text-gray-900 font-semibold">{col}</h3>
              </div>
              <span className="text-gray-500 text-sm bg-white border border-gray-200 px-2 py-0.5 rounded-md font-medium">
                {filteredLeads.filter(l => l.status === col).length}
              </span>
            </div>

            {/* Cards Container */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              {filteredLeads.filter(l => l.status === col).map(lead => (
                <div key={lead.id} className="bg-white border border-gray-200 p-5 rounded-xl hover:shadow-md transition-all group flex flex-col gap-4 relative">
                  
                  {/* Card Header */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center">
                        <UserCircle2 className="w-6 h-6 text-gray-400" />
                      </div>
                      <div>
                        <h4 className="text-gray-900 font-semibold">{lead.name}</h4>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                          <span className="bg-gray-100 px-2 py-0.5 rounded">{lead.project}</span>
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3"/> {new Date(lead.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => deleteLead && deleteLead(lead.id)}
                      className="text-gray-300 hover:text-red-500 transition-colors p-1"
                      title="Delete Lead"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {/* Contact Info */}
                  <div className="space-y-1.5 bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Phone className="w-4 h-4 text-gray-400" /> {lead.phone}
                    </div>
                    {lead.email && (
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Mail className="w-4 h-4 text-gray-400" /> {lead.email}
                      </div>
                    )}
                  </div>

                  {/* Customer Message */}
                  {lead.message && (
                    <div className="text-sm text-gray-700 bg-blue-50/50 p-3 rounded-lg border border-blue-100/50">
                      <div className="flex items-center gap-1.5 text-blue-600 mb-1 font-medium text-xs uppercase tracking-wider">
                        <MessageSquare className="w-3 h-3" /> Inquiry Message
                      </div>
                      <p className="italic">"{lead.message}"</p>
                    </div>
                  )}

                  {/* Admin Notes */}
                  <div className="mt-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Admin Notes</label>
                    <div className="relative">
                      <textarea 
                        value={editingNotes[lead.id] !== undefined ? editingNotes[lead.id] : (lead.admin_notes || '')}
                        onChange={(e) => handleNoteChange(lead.id, e.target.value)}
                        placeholder="Add notes after contacting..."
                        rows={2}
                        className="w-full bg-white border border-gray-200 text-gray-800 text-sm rounded-lg p-2.5 focus:outline-none focus:border-[#c9a96e] resize-none"
                      />
                      {editingNotes[lead.id] !== undefined && editingNotes[lead.id] !== (lead.admin_notes || '') && (
                        <button 
                          onClick={() => saveNote(lead.id)}
                          className="absolute bottom-2 right-2 bg-[#c9a96e] text-white p-1.5 rounded-md hover:bg-[#b5955a] transition-colors shadow-sm"
                          title="Save Note"
                        >
                          <Save className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Move Actions (Mock Drag & Drop alternatives) */}
                  <div className="flex flex-wrap gap-1.5 mt-2 pt-3 border-t border-gray-100">
                    {columns.filter(c => c !== col).map(dest => (
                      <button 
                        key={dest} 
                        onClick={() => moveLead(lead.id, dest)}
                        className="text-[10px] uppercase tracking-wider px-2 py-1 bg-gray-50 hover:bg-gray-200 text-gray-600 rounded border border-gray-200 transition-colors"
                      >
                        ? {dest}
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
