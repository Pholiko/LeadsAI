export const processLeadData = async (photoUrl, audioUrl) => {
  // Simulate network delay for AI processing
  await new Promise(resolve => setTimeout(resolve, 2500));
  
  // Mock AI response
  return {
    name: "Max Mustermann",
    company: "Musterfirma GmbH",
    role: "Head of Sales",
    email: "max.mustermann@musterfirma.de",
    summary: "Interessiert an der neuen Lösung. Budget für Q3 eingeplant. Hat um Use-Cases gebeten.",
    emailDraft: "Hallo Herr Mustermann,\n\nvielen Dank für das tolle Gespräch auf unserem Messestand. Wie besprochen, sende ich Ihnen hiermit unsere Use-Cases für Ihr Projekt.\n\nLassen Sie uns gerne nächste Woche kurz telefonieren, um die nächsten Schritte abzustimmen.\n\nBeste Grüße"
  };
};
