import { useState, useEffect } from 'react';
import { getLeads, generateCSV, clearLeads, updateLeadEmail, toggleLeadStatus } from '../services/storage';

const PRIORITY_COLORS = {
  HOT: { bg: 'rgba(239, 68, 68, 0.2)', text: '#ef4444', emoji: '🔥' },
  WARM: { bg: 'rgba(245, 158, 11, 0.2)', text: '#f59e0b', emoji: '☀️' },
  COLD: { bg: 'rgba(59, 130, 246, 0.2)', text: '#3b82f6', emoji: '❄️' }
};

export default function DashboardView({ onCaptureNew, onLogout }) {
  const [leads, setLeads] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [expandedId, setExpandedId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [userName, setUserName] = useState(localStorage.getItem('app_user_name') || '');

  useEffect(() => {
    setLeads(getLeads());
  }, []);

  const handleNameChange = (e) => {
    const val = e.target.value;
    setUserName(val);
    localStorage.setItem('app_user_name', val);
  };

  const handleExport = () => {
    const csvContent = generateCSV(leads);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClear = () => {
    if (confirm('Wirklich alle Leads löschen? Dieser Vorgang kann nicht rückgängig gemacht werden.')) {
      clearLeads();
      setLeads([]);
    }
  };

  const startEditing = (lead) => {
    setEditingId(lead.id);
    setEditContent(lead.data?.emailDraft || '');
  };

  const saveEdit = (id) => {
    const updated = updateLeadEmail(id, editContent);
    setLeads(updated);
    setEditingId(null);
  };

  const handleToggleStatus = (id) => {
    const updated = toggleLeadStatus(id);
    setLeads(updated);
  };

  const filteredLeads = leads.filter(lead => {
    if (filter === 'ALL') return true;
    return lead.data?.priority === filter;
  });

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ width: '40px' }}></div> {/* Spacer */}
        <h1 className="title" style={{ fontSize: '2rem', textAlign: 'center', margin: 0 }}>Lead AI</h1>
        <button 
          onClick={onLogout} 
          style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: '0.85rem', width: '40px', textAlign: 'right' }}
        >
          Logout
        </button>
      </div>

      <div style={{ marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <input 
          type="text" 
          value={userName}
          onChange={handleNameChange}
          placeholder="Dein Name (für E-Mail Unterschrift)"
          style={{ 
            padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', 
            background: 'rgba(0,0,0,0.2)', color: 'white', fontSize: '1rem', width: '100%' 
          }}
        />
      </div>

      <div style={{ marginBottom: '24px' }}>
        <button className="btn-primary" onClick={onCaptureNew} style={{ padding: '16px', fontSize: '1.2rem', width: '100%' }}>📸 Capture New Lead</button>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', overflowX: 'auto', paddingBottom: '4px' }}>
        <button 
          onClick={() => setFilter('ALL')}
          style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid var(--border-color)', background: filter === 'ALL' ? 'var(--primary)' : 'rgba(0,0,0,0.2)', color: 'white', whiteSpace: 'nowrap' }}
        >
          Alle ({leads.length})
        </button>
        <button 
          onClick={() => setFilter('HOT')}
          style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid #ef4444', background: filter === 'HOT' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(0,0,0,0.2)', color: 'white', whiteSpace: 'nowrap' }}
        >
          🔥 Hot
        </button>
        <button 
          onClick={() => setFilter('WARM')}
          style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid #f59e0b', background: filter === 'WARM' ? 'rgba(245, 158, 11, 0.3)' : 'rgba(0,0,0,0.2)', color: 'white', whiteSpace: 'nowrap' }}
        >
          ☀️ Warm
        </button>
        <button 
          onClick={() => setFilter('COLD')}
          style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid #3b82f6', background: filter === 'COLD' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(0,0,0,0.2)', color: 'white', whiteSpace: 'nowrap' }}
        >
          ❄️ Cold
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredLeads.length === 0 ? (
          <div className="card glass" style={{ textAlign: 'center', padding: '40px 20px' }}>
            <p className="subtitle">Keine Leads gefunden.</p>
          </div>
        ) : (
          filteredLeads.map(lead => {
            const pColor = PRIORITY_COLORS[lead.data?.priority] || { bg: 'transparent', text: 'white', emoji: '' };
            const isExpanded = expandedId === lead.id;
            const isEditing = editingId === lead.id;

            // Generate mailto link
            const emailTo = lead.data?.email || '';
            const emailSubject = encodeURIComponent('Nachfassen zur Messe');
            const emailBody = encodeURIComponent(lead.data?.emailDraft || '');
            const mailtoLink = `mailto:${emailTo}?subject=${emailSubject}&body=${emailBody}`;

            return (
              <div key={lead.id} className="card glass" style={{ padding: '16px', border: lead.data?.emailSent ? '1px solid #22c55e' : '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{lead.data?.name || 'Unbekannt'}</h3>
                      {lead.data?.emailSent && (
                        <span style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#22c55e', padding: '2px 6px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 'bold' }}>
                          ✅ Gesendet
                        </span>
                      )}
                    </div>
                    <p className="subtitle" style={{ fontSize: '0.9rem', margin: 0 }}>
                      {lead.data?.role} @ {lead.data?.company}
                    </p>
                  </div>
                  {lead.data?.priority && (
                    <span style={{ background: pColor.bg, color: pColor.text, padding: '4px 8px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                      {pColor.emoji} {lead.data.priority}
                    </span>
                  )}
                </div>

                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '12px' }}>
                  <strong>Notiz:</strong> {lead.data?.summary}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button 
                    onClick={() => {
                      if (isEditing) setEditingId(null);
                      setExpandedId(isExpanded ? null : lead.id);
                    }}
                    style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', padding: 0, fontSize: '0.9rem', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    {isExpanded ? 'E-Mail Entwurf ausblenden ⌃' : 'E-Mail Entwurf lesen ⌄'}
                  </button>

                  <button 
                    onClick={() => handleToggleStatus(lead.id)}
                    style={{ background: 'none', border: 'none', color: lead.data?.emailSent ? 'rgba(255,255,255,0.4)' : '#22c55e', cursor: 'pointer', padding: 0, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    {lead.data?.emailSent ? 'Rückgängig' : '✓ Erledigt'}
                  </button>
                </div>

                {isExpanded && (
                  <div style={{ marginTop: '12px', background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px' }}>
                    {isEditing ? (
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        style={{ width: '100%', minHeight: '150px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--primary)', color: 'white', padding: '8px', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.9rem', marginBottom: '12px' }}
                      />
                    ) : (
                      <div style={{ fontSize: '0.9rem', whiteSpace: 'pre-wrap', fontFamily: 'monospace', lineHeight: '1.4', marginBottom: '12px' }}>
                        {lead.data?.emailDraft || 'Kein Entwurf generiert.'}
                      </div>
                    )}
                    
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {isEditing ? (
                        <>
                          <button className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem', flex: 1 }} onClick={() => setEditingId(null)}>Abbrechen</button>
                          <button className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem', flex: 1 }} onClick={() => saveEdit(lead.id)}>Speichern</button>
                        </>
                      ) : (
                        <>
                          <button className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem', flex: 1 }} onClick={() => startEditing(lead)}>Bearbeiten</button>
                          <a 
                            href={mailtoLink} 
                            className="btn-primary" 
                            onClick={() => {
                              if (!lead.data?.emailSent) {
                                handleToggleStatus(lead.id);
                              }
                            }}
                            style={{ textDecoration: 'none', padding: '8px 16px', fontSize: '0.85rem', flex: 2, textAlign: 'center' }}
                          >
                            📧 Jetzt Senden
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {leads.length > 0 && (
        <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
          <button className="btn-secondary" onClick={handleExport} style={{ flex: 2 }}>CSV Exportieren</button>
          <button className="btn-secondary" onClick={handleClear} style={{ flex: 1, color: 'var(--danger)', borderColor: 'var(--danger)' }}>Löschen</button>
        </div>
      )}
    </div>
  );
}
