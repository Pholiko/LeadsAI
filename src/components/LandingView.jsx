import React from 'react';

export default function LandingView({ onStart }) {
  const [openFaq, setOpenFaq] = React.useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const faqs = [
    { q: "Wie genau funktioniert die KI-Transkription?", a: "Die KI erkennt den Text auf der Visitenkarte automatisch und verknüpft ihn mit Ihrer Sprachnotiz. Selbst bei Hintergrundgeräuschen auf der Messe ist die Erkennung hochpräzise." },
    { q: "Kann ich die E-Mails vor dem Versand noch anpassen?", a: "Ja! Sie sehen immer einen fertigen Entwurf, den Sie mit einem Klick bearbeiten können, bevor die E-Mail an Ihren Kontakt versendet wird." },
    { q: "Ist LeadsAI mit meinem aktuellen CRM kompatibel?", a: "LeadsAI bietet einen bequemen CSV-Export an, der in jedes gängige CRM (HubSpot, Salesforce, Pipedrive) importiert werden kann." },
    { q: "Was passiert, wenn ich auf der Messe schlechtes Internet habe?", a: "Die App speichert Ihre Scans und Sprachnotizen lokal zwischen und verarbeitet sie automatisch, sobald Sie wieder eine stabile Verbindung haben." },
    { q: "Ist die Testphase wirklich kostenlos?", a: "Absolut. Während der Testphase können Sie alle Funktionen von LeadsAI komplett kostenlos und unverbindlich ausprobieren." }
  ];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleLogin = () => {
    setMobileMenuOpen(false);
    onStart();
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingBottom: '40px' }}>
      
      {/* Top Bar Navigation */}
      <div style={{ 
        position: 'sticky', 
        top: 0, 
        zIndex: 100, 
        background: 'var(--nav-bg)', 
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--nav-border)',
        boxShadow: '0 4px 30px rgba(59, 130, 246, 0.15)',
        padding: '16px 24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          
          {/* Logo */}
          <div style={{ fontWeight: '800', fontSize: '1.2rem', letterSpacing: '-0.5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.364 3.636a3 3 0 0 1 4.243 4.243L8.5 22H4v-4.5L18.364 3.636z" stroke="url(#paint0_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15.5 6.5l3 3" stroke="url(#paint0_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 22l4-1 1-4L4 22z" fill="var(--primary)" />
              <defs>
                <linearGradient id="paint0_linear" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
                  <stop stopColor="var(--primary)" />
                  <stop offset="1" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>
            Lead <span style={{ color: 'var(--primary)' }}>AI</span>
          </div>

          {/* Desktop Nav Links */}
          <div className="nav-desktop" style={{ display: 'flex', gap: '8px', fontSize: '0.95rem', fontWeight: '500', alignItems: 'center' }}>
            <a href="#start" className="nav-link" onClick={(e) => { e.preventDefault(); scrollTo('start'); }}>Start</a>
            <a href="#how-it-works" className="nav-link" onClick={(e) => { e.preventDefault(); scrollTo('how-it-works'); }}>Wie es funktioniert</a>
            <a href="#faq" className="nav-link" onClick={(e) => { e.preventDefault(); scrollTo('faq'); }}>FAQ</a>
            <a href="#pricing" className="nav-link" onClick={(e) => { e.preventDefault(); scrollTo('pricing'); }}>Pricing</a>
            <a href="#login" className="nav-link" onClick={(e) => { e.preventDefault(); handleLogin(); }}>Login</a>
          </div>

          {/* Hamburger Button (mobile only) */}
          <button 
            className="hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menü"
            style={{ 
              background: 'none', border: 'none', cursor: 'pointer', padding: '4px',
              display: 'flex', flexDirection: 'column', gap: '5px', width: '28px'
            }}
          >
            <span style={{ 
              display: 'block', height: '2px', background: 'var(--text-primary)', borderRadius: '2px',
              transition: 'all 0.3s ease',
              transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'
            }} />
            <span style={{ 
              display: 'block', height: '2px', background: 'var(--text-primary)', borderRadius: '2px',
              transition: 'all 0.3s ease',
              opacity: mobileMenuOpen ? 0 : 1
            }} />
            <span style={{ 
              display: 'block', height: '2px', background: 'var(--text-primary)', borderRadius: '2px',
              transition: 'all 0.3s ease',
              transform: mobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none'
            }} />
          </button>
        </div>

        {/* Mobile Menu Panel */}
        <div 
          className="nav-mobile-panel"
          style={{ 
            maxHeight: mobileMenuOpen ? '300px' : '0',
            overflow: 'hidden',
            transition: 'max-height 0.3s ease',
            maxWidth: '1200px', margin: '0 auto', width: '100%'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', paddingTop: '16px' }}>
            <a href="#start" className="nav-link" onClick={(e) => { e.preventDefault(); scrollTo('start'); }}>Start</a>
            <a href="#how-it-works" className="nav-link" onClick={(e) => { e.preventDefault(); scrollTo('how-it-works'); }}>Wie es funktioniert</a>
            <a href="#faq" className="nav-link" onClick={(e) => { e.preventDefault(); scrollTo('faq'); }}>FAQ</a>
            <a href="#pricing" className="nav-link" onClick={(e) => { e.preventDefault(); scrollTo('pricing'); }}>Pricing</a>
            <a href="#login" className="nav-link" onClick={(e) => { e.preventDefault(); handleLogin(); }}>Login</a>
          </div>
        </div>
      </div>

      {/* Hero Section (Above the fold) */}
      <div id="start" style={{ 
        padding: '24px', 
        display: 'flex', 
        flexDirection: 'row', 
        flexWrap: 'wrap',
        alignItems: 'center', 
        justifyContent: 'center',
        gap: '40px',
        animation: 'fadeIn 0.5s ease',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        
        {/* Left Column: Text & CTA */}
        <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          
          {/* CSS "Screenshot/Notification" Widget */}
          <div style={{ 
              background: 'var(--border-color)', 
              border: '1px solid var(--border-color)', 
              borderRadius: '16px', 
              padding: '12px 16px', 
              marginBottom: '24px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backdropFilter: 'blur(10px)',
              maxWidth: '100%'
            }}>
            <div style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#22c55e', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>
              ✓
            </div>
            <div style={{ textAlign: 'left' }}>
              <p style={{ margin: '0 0 4px', fontSize: '0.85rem', fontWeight: 'bold' }}>Kontakt gesichert & E-Mail versendet</p>
              <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Thomas Müller, CEO NexaCorp</p>
            </div>
          </div>

          <h1 className="title" style={{ fontSize: '2.5rem', marginBottom: '16px', lineHeight: '1.2', fontWeight: '800', textAlign: 'left', letterSpacing: '-1px' }}>
            Jeder Messekontakt bekommt <span style={{ background: 'linear-gradient(135deg, var(--primary) 0%, #a855f7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>sofort ein persönliches Follow-Up</span>
          </h1>
          
          <p className="subtitle" style={{ fontSize: '1.1rem', marginBottom: '32px', color: 'var(--text-secondary)', textAlign: 'left', lineHeight: '1.4' }}>
            Fotografieren. Kurz einsprechen. Persönliches Follow-Up in 60 Sekunden. Nie wieder einen Messekontakt verlieren.
          </p>

          <button 
            className="btn-primary" 
            onClick={onStart}
            style={{ padding: '14px 28px', fontSize: '1rem', borderRadius: '12px', fontWeight: '600', boxShadow: '0 8px 20px rgba(59, 130, 246, 0.3)' }}
          >
            Jetzt kostenlos testen
          </button>
        </div>

        {/* Right Column: Hero Image / WOW Effect */}
        <div style={{ flex: '1 1 250px', position: 'relative', width: '100%', maxWidth: '250px', margin: '0 auto', marginTop: '16px' }}>
          <img 
            src="/step3-email.jpg" 
            alt="Fertige personalisierte E-Mail" 
            style={{ 
              width: '100%', 
              borderRadius: '16px', 
              boxShadow: '0 25px 50px rgba(0,0,0,0.25), 0 0 0 1px var(--border-color)', 
              animation: 'slideUp 1s ease 0.2s backwards'
            }} 
          />
        </div>
      </div>

      {/* Problem Awareness Section */}
      <div style={{ padding: '60px 24px 40px', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>Das unerkannte Problem</p>
          <h2 style={{ fontSize: '2rem', fontWeight: '800', margin: '0 0 16px', lineHeight: '1.2', letterSpacing: '-0.5px' }}>Der eigentliche Verlust <br/>passiert <span style={{ color: 'var(--primary)' }}>nach</span> der Messe.</h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.5' }}>
            Sie investieren Tausende Euro in teure Messestände und Marketing. Trotzdem werden viele wertvolle Kontakte nur zu spät oder gar nicht kontaktiert. Das sind potenziell verlorene Umsätze.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          
          <div className="card glass" style={{ borderTop: '3px solid var(--border-color)', padding: '24px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '16px' }}>💸</div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', fontWeight: '700' }}>Teure Akquise</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
              Unternehmen geben Unmengen an Geld für Ausstellungen und Messen aus, um Leads zu generieren.
            </p>
          </div>

          <div className="card glass" style={{ borderTop: '3px solid var(--border-color)', padding: '24px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '16px' }}>📉</div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', fontWeight: '700' }}>Mangelhaftes Follow-Up</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
              Gesprächspartner werden im Nachhinein oft komplett vergessen oder viel zu spät kontaktiert.
            </p>
          </div>

          <div className="card glass" style={{ borderTop: '3px solid var(--border-color)', padding: '24px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '16px' }}>🤝</div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', fontWeight: '700' }}>Die Konkurrenz freut sich</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
              Jeder Kontakt ist potenzieller Umsatz. Fehlt das sofortige Follow-Up, wandert der Kunde zur schnelleren Konkurrenz.
            </p>
          </div>

        </div>
      </div>

      {/* Warum Leads AI Section */}
      <div style={{ padding: '40px 24px', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: '800', margin: '0 0 32px', textAlign: 'center', letterSpacing: '-0.5px' }}>Warum Leads AI?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {[
            { icon: "🧠", text: "Merkt sich alle Gespräche." },
            { icon: "✅", text: "Garantiertes personalisiertes Follow-Up." },
            { icon: "⚡️", text: "Dauert nur 60 Sekunden." },
            { icon: "🤩", text: "Wirkt beeindruckend auf den potenziellen Kunden." },
            { icon: "🛡", text: "Keine potenziellen Umsätze mehr verlieren." },
            { icon: "📈", text: "Mehr ROI von Messen." }
          ].map((item, i) => (
            <div key={i} className="card glass" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', margin: 0 }}>
              <div style={{ fontSize: '1.8rem' }}>{item.icon}</div>
              <div style={{ fontSize: '0.95rem', fontWeight: '500', color: 'var(--text-primary)', lineHeight: '1.4' }}>{item.text}</div>
            </div>
          ))}
        </div>
      </div>



      {/* Before / After Section */}
      <div style={{ padding: '40px 24px', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: '800', margin: '0 0 40px', textAlign: 'center', letterSpacing: '-0.5px' }}>Zwei Wege, Ihre Leads zu bearbeiten</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
          
          {/* Aktuell (Before) */}
          <div className="card" style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '32px', margin: 0, display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--danger)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.5rem' }}>❌</span> Der alte Weg
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><span>📝</span> 50 Visitenkarten sammeln</div>
              <div style={{ paddingLeft: '8px', borderLeft: '2px solid var(--border-color)' }}>↓</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><span>🏨</span> Abends im Hotel abtippen</div>
              <div style={{ paddingLeft: '8px', borderLeft: '2px solid var(--border-color)' }}>↓</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><span>📊</span> In Excel & CRM übertragen</div>
              <div style={{ paddingLeft: '8px', borderLeft: '2px solid var(--border-color)' }}>↓</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><span>✉️</span> Standard-Mails schreiben</div>
            </div>
            
            <div style={{ marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid rgba(239, 68, 68, 0.2)', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--danger)' }}>
              ⏱ 2-3 Stunden Arbeit
            </div>
          </div>

          {/* Mit LeadsAI (After) */}
          <div className="card" style={{ background: 'linear-gradient(180deg, rgba(34, 197, 94, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)', border: '1px solid rgba(34, 197, 94, 0.3)', padding: '32px', position: 'relative', overflow: 'hidden', margin: 0, display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', background: 'var(--success)', filter: 'blur(80px)', opacity: '0.2', borderRadius: '50%' }}></div>
            
            <h3 style={{ fontSize: '1.2rem', color: '#22c55e', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.5rem' }}>⚡️</span> Mit Lead AI
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: 'var(--text-primary)', fontSize: '1rem', fontWeight: '500', marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><span>📸</span> Visitenkarte fotografieren</div>
              <div style={{ paddingLeft: '8px', borderLeft: '2px solid rgba(34, 197, 94, 0.3)' }}>↓</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><span>🎙</span> 10 Sekunden Kontext einsprechen</div>
              <div style={{ paddingLeft: '8px', borderLeft: '2px solid rgba(34, 197, 94, 0.3)' }}>↓</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><span>✨</span> Personalisiertes Follow-Up für alle</div>
            </div>
            
            <div style={{ marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid rgba(34, 197, 94, 0.3)', fontSize: '1.5rem', fontWeight: 'bold', color: '#22c55e' }}>
              ⏱ 60 Sekunden Arbeit
            </div>
          </div>

        </div>
      </div>

      {/* Process Section (Below the fold) */}
      <div id="how-it-works" style={{ padding: '40px 24px', marginTop: '24px', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '800', margin: '0 0 32px', textAlign: 'center', letterSpacing: '-0.5px' }}>So funktioniert's</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', position: 'relative' }}>
          
          <div className="card glass" style={{ margin: 0, padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ background: 'var(--primary)', color: 'var(--text-primary)', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '12px', boxShadow: '0 4px 10px rgba(59, 130, 246, 0.5)' }}>1</div>
            <h3 style={{ margin: '0 0 8px', fontSize: '1rem' }}>Visitenkarte & Kontext</h3>
            <p style={{ margin: '0 0 16px', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>Künstliche Intelligenz liest die Karte. Sie sprechen einfach kurz ein, worum es ging.</p>
            <img src="/step1-card.jpg" alt="Visitenkarte scannen" style={{ width: '100%', maxWidth: '200px', borderRadius: '8px', border: '1px solid var(--border-color)', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', marginTop: 'auto' }} />
          </div>

          <div className="card glass" style={{ margin: 0, padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ background: 'var(--primary)', color: 'var(--text-primary)', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '12px', boxShadow: '0 4px 10px rgba(59, 130, 246, 0.5)' }}>2</div>
            <h3 style={{ margin: '0 0 8px', fontSize: '1rem' }}>KI-Transkription</h3>
            <p style={{ margin: '0 0 16px', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>Die Sprachnotiz wird fehlerfrei transkribiert. Sie können alles prüfen.</p>
            <img src="/step2-transcript.jpg" alt="Transkription prüfen" style={{ width: '100%', maxWidth: '200px', borderRadius: '8px', border: '1px solid var(--border-color)', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', marginTop: 'auto' }} />
          </div>

          <div className="card glass" style={{ margin: 0, padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ background: 'var(--primary)', color: 'var(--text-primary)', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '12px', boxShadow: '0 4px 10px rgba(59, 130, 246, 0.5)' }}>3</div>
            <h3 style={{ margin: '0 0 8px', fontSize: '1rem' }}>E-Mail versenden</h3>
            <p style={{ margin: '0 0 16px', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>Innerhalb von Minuten geht die personalisierte E-Mail an den Kunden raus.</p>
            <img src="/step3-email.jpg" alt="Fertige E-Mail" style={{ width: '100%', maxWidth: '200px', borderRadius: '8px', border: '1px solid var(--border-color)', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', marginTop: 'auto' }} />
          </div>

        </div>
      </div>

      {/* Target Audience Section */}
      <div style={{ padding: '40px 24px', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '800', margin: '0 0 32px', textAlign: 'center', letterSpacing: '-0.5px' }}>Für wen ist Lead AI?</h2>
        
        <div className="card glass" style={{ padding: '32px', borderTop: '3px solid var(--primary)' }}>
          <p style={{ fontSize: '1.1rem', marginBottom: '24px', fontWeight: 'bold', color: 'var(--text-primary)' }}>
            B2B Unternehmen mit vielen Messe-Ausstellungen und aktiven Vertrieblern.
          </p>
          
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <span style={{ color: 'var(--primary)', fontSize: '1.2rem', marginTop: '-2px' }}>✓</span>
              <div>
                <strong style={{ display: 'block', marginBottom: '4px', color: 'var(--text-primary)' }}>Ideale Ergänzung zu bestehenden CRM-Systemen</strong>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Kein Ersatz für Ihr CRM, sondern ein Turbo für die Datenerfassung direkt auf der Messe.</span>
              </div>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <span style={{ color: 'var(--primary)', fontSize: '1.2rem', marginTop: '-2px' }}>✓</span>
              <div>
                <strong style={{ display: 'block', marginBottom: '4px', color: 'var(--text-primary)' }}>Schnelle E-Mails, direkt zum Abschicken</strong>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Keine langen Wartezeiten. Follow-Ups können noch auf dem Heimweg von der Messe rausgehen.</span>
              </div>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <span style={{ color: 'var(--primary)', fontSize: '1.2rem', marginTop: '-2px' }}>✓</span>
              <div>
                <strong style={{ display: 'block', marginBottom: '4px', color: 'var(--text-primary)' }}>Alternative: CSV-Export</strong>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Alle erfassten Kontakte und Notizen per Klick als CSV exportieren und bequem in HubSpot, Salesforce oder andere Tools importieren.</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" style={{ padding: '60px 24px', maxWidth: '800px', margin: '0 auto', width: '100%', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', margin: '0 0 16px', letterSpacing: '-1px' }}>Pricing</h2>
        <p style={{ fontSize: '1.2rem', color: 'var(--success)', fontWeight: 'bold', margin: '0 0 8px' }}>
          Aktuell in der kostenlosen und komplett unverbindlichen Testphase.
        </p>
        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', margin: '0 0 32px' }}>
          Jetzt kostenlosen Testzugang anfordern!
        </p>
        <button 
          className="btn-primary" 
          onClick={onStart}
          style={{ padding: '16px 32px', fontSize: '1.1rem', borderRadius: '12px', fontWeight: 'bold', boxShadow: '0 8px 20px rgba(99, 102, 241, 0.4)' }}
        >
          Testzugang anfordern
        </button>
      </div>



      {/* FAQ Section */}
      <div id="faq" style={{ padding: '60px 24px', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', margin: '0 0 32px', textAlign: 'center', letterSpacing: '-1px' }}>FAQ</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {faqs.map((faq, index) => (
            <div key={index} className="card glass" style={{ margin: 0, padding: 0, overflow: 'hidden', cursor: 'pointer', transition: 'all 0.3s ease' }} onClick={() => setOpenFaq(openFaq === index ? null : index)}>
              <div style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600', color: openFaq === index ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{faq.q}</h3>
                <span style={{ fontSize: '1.5rem', color: 'var(--primary)', transform: openFaq === index ? 'rotate(45deg)' : 'none', transition: 'transform 0.3s ease' }}>+</span>
              </div>
              {openFaq === index && (
                <div style={{ padding: '0 24px 24px', color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: '#0f172a', borderTop: '1px solid var(--border-color)', padding: '40px 24px', marginTop: '40px', color: '#94a3b8', fontSize: '0.9rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: '32px' }}>
          
          <div style={{ flex: '1 1 200px' }}>
            <div style={{ fontWeight: '800', fontSize: '1.2rem', color: '#f8fafc', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.364 3.636a3 3 0 0 1 4.243 4.243L8.5 22H4v-4.5L18.364 3.636z" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15.5 6.5l3 3" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Lead <span style={{ color: 'var(--primary)' }}>AI</span>
            </div>
            <p style={{ margin: 0, lineHeight: '1.5', color: '#cbd5e1' }}>Nie wieder Messekontakte verlieren.<br/>Schnelles und personalisiertes Follow-Up.</p>
          </div>

          <div style={{ flex: '1 1 150px' }}>
            <h4 style={{ color: '#f8fafc', marginBottom: '16px', fontWeight: 'bold' }}>Produkt</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><a href="#how-it-works" style={{ color: 'inherit', textDecoration: 'none' }}>So funktioniert's</a></li>
              <li><a href="#pricing" style={{ color: 'inherit', textDecoration: 'none' }}>Pricing</a></li>
              <li><a href="#faq" style={{ color: 'inherit', textDecoration: 'none' }}>FAQ</a></li>
            </ul>
          </div>

          <div style={{ flex: '1 1 150px' }}>
            <h4 style={{ color: '#f8fafc', marginBottom: '16px', fontWeight: 'bold' }}>Rechtliches</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Impressum</a></li>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Datenschutz</a></li>
            </ul>
          </div>
          
        </div>
        
        <div style={{ maxWidth: '1000px', margin: '40px auto 0', textAlign: 'center', color: 'rgba(248, 250, 252, 0.4)' }}>
          &copy; 2026 Lead AI. Alle Rechte vorbehalten.
        </div>
      </footer>
    </div>
  );
}
