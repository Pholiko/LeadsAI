export const saveLead = (lead) => {
  const existingLeads = getLeads();
  const newLead = {
    ...lead,
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
  };
  localStorage.setItem('leads', JSON.stringify([newLead, ...existingLeads]));
  return newLead;
};

export const getLeads = () => {
  const leads = localStorage.getItem('leads');
  return leads ? JSON.parse(leads) : [];
};

export const updateLeadEmail = (id, newEmailDraft) => {
  const leads = getLeads();
  const updatedLeads = leads.map(lead => {
    if (lead.id === id) {
      return {
        ...lead,
        data: {
          ...lead.data,
          emailDraft: newEmailDraft
        }
      };
    }
    return lead;
  });
  localStorage.setItem('leads', JSON.stringify(updatedLeads));
  return updatedLeads;
};

export const clearLeads = () => {
  localStorage.removeItem('leads');
};

export const generateCSV = (leads) => {
  if (!leads || leads.length === 0) return '';
  
  // Headers
  const headers = ['Datum', 'Priorität', 'Name', 'Firma', 'Rolle', 'Email', 'Zusammenfassung', 'Follow-up Draft'];
  
  const rows = leads.map(lead => {
    const data = lead.data || {};
    return [
      new Date(lead.timestamp).toLocaleDateString(),
      data.priority || '',
      data.name || '',
      data.company || '',
      data.role || '',
      data.email || '',
      data.summary || '',
      data.emailDraft || ''
    ].map(v => `"${String(v).replace(/"/g, '""')}"`).join(','); // Escape quotes
  });
  
  return [headers.join(','), ...rows].join('\n');
};
