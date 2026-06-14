import React from 'react';

export default function LandingView({ onStart }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-color)', overflowY: 'auto', paddingBottom: '40px' }}>
      
      {/* Top Bar */}
      <div style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontWeight: '800', fontSize: '1.2rem', letterSpacing: '-0.5px' }}>
          Lead <span style={{ color: 'var(--primary)' }}>AI</span>
        </div>
      </div>

      {/* Hero Section (Above the fold) */}
      <div style={{ 
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
              background: 'rgba(255, 255, 255, 0.05)', 
              border: '1px solid rgba(255, 255, 255, 0.1)', 
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
              <p style={{ margin: 0, fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>Thomas Müller, CEO NexaCorp</p>
            </div>
          </div>

          <h1 className="title" style={{ fontSize: '2.5rem', marginBottom: '16px', lineHeight: '1.2', fontWeight: '800', textAlign: 'left', letterSpacing: '-1px' }}>
            Nie wieder Messekontakte <br/><span style={{ background: 'linear-gradient(135deg, var(--primary) 0%, #a855f7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>verlieren!</span>
          </h1>
          
          <p className="subtitle" style={{ fontSize: '1.1rem', marginBottom: '32px', color: 'rgba(255,255,255,0.7)', textAlign: 'left', lineHeight: '1.4' }}>
            Fotografieren. Kurz einsprechen. Persönliches Follow-Up in 60 Sekunden.
          </p>

          <button 
            className="btn-primary" 
            onClick={onStart}
            style={{ padding: '16px 24px', fontSize: '1.1rem', width: '100%', maxWidth: '250px', borderRadius: '12px', fontWeight: 'bold', boxShadow: '0 8px 20px rgba(99, 102, 241, 0.4)' }}
          >
            Jetzt App Starten
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
              boxShadow: '0 25px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)', 
              animation: 'slideUp 1s ease 0.2s backwards'
            }} 
          />
        </div>
      </div>

      {/* Problem Awareness Section */}
      <div style={{ padding: '60px 24px 40px', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--danger)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>Das unerkannte Problem</p>
          <h2 style={{ fontSize: '2rem', fontWeight: '800', margin: '0 0 16px', lineHeight: '1.2', letterSpacing: '-0.5px' }}>Der eigentliche Verlust <br/>passiert <span style={{ color: 'var(--danger)' }}>nach</span> der Messe.</h2>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.7)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.5' }}>
            Sie investieren Tausende Euro in teure Messestände und Marketing – und vergessen danach die Hälfte der wertvollen Kontakte.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          
          <div className="card glass" style={{ borderTop: '3px solid rgba(255,255,255,0.1)', padding: '24px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '16px' }}>💸</div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', fontWeight: '700' }}>Teure Akquise</h3>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', lineHeight: '1.5', margin: 0 }}>
              Unternehmen geben Unmengen an Geld für Ausstellungen und Messen aus, um Leads zu generieren.
            </p>
          </div>

          <div className="card glass" style={{ borderTop: '3px solid var(--danger)', padding: '24px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '16px' }}>📉</div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', fontWeight: '700' }}>Mangelhaftes Follow-Up</h3>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', lineHeight: '1.5', margin: 0 }}>
              Gesprächspartner werden im Nachhinein oft komplett vergessen oder viel zu spät kontaktiert.
            </p>
          </div>

          <div className="card glass" style={{ borderTop: '3px solid rgba(255,255,255,0.1)', padding: '24px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '16px' }}>🤝</div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', fontWeight: '700' }}>Die Konkurrenz freut sich</h3>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', lineHeight: '1.5', margin: 0 }}>
              Jeder Kontakt ist potenzieller Umsatz. Fehlt das sofortige Follow-Up, wandert der Kunde zur schnelleren Konkurrenz.
            </p>
          </div>

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
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><span>📝</span> 50 Visitenkarten sammeln</div>
              <div style={{ paddingLeft: '8px', borderLeft: '2px solid rgba(255,255,255,0.1)' }}>↓</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><span>🏨</span> Abends im Hotel abtippen</div>
              <div style={{ paddingLeft: '8px', borderLeft: '2px solid rgba(255,255,255,0.1)' }}>↓</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><span>📊</span> In Excel & CRM übertragen</div>
              <div style={{ paddingLeft: '8px', borderLeft: '2px solid rgba(255,255,255,0.1)' }}>↓</div>
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
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: 'rgba(255,255,255,0.9)', fontSize: '1rem', fontWeight: '500', marginBottom: '32px' }}>
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
      <div style={{ padding: '40px 24px', marginTop: '24px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: '800', margin: '0 0 40px', textAlign: 'center', letterSpacing: '-0.5px' }}>So funktioniert's</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', position: 'relative' }}>
          
          <div className="card glass" style={{ margin: 0, padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ background: 'var(--primary)', color: 'white', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 'bold', marginBottom: '16px', boxShadow: '0 4px 10px rgba(59, 130, 246, 0.5)' }}>1</div>
            <h3 style={{ margin: '0 0 12px', fontSize: '1.1rem' }}>Visitenkarte & Kontext</h3>
            <p style={{ margin: '0 0 24px', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>Künstliche Intelligenz liest die Karte. Sie sprechen einfach kurz ein, worum es ging.</p>
            <img src="/step1-card.jpg" alt="Visitenkarte scannen" style={{ width: '100%', maxWidth: '180px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', marginTop: 'auto' }} />
          </div>

          <div className="card glass" style={{ margin: 0, padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ background: 'var(--primary)', color: 'white', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 'bold', marginBottom: '16px', boxShadow: '0 4px 10px rgba(59, 130, 246, 0.5)' }}>2</div>
            <h3 style={{ margin: '0 0 12px', fontSize: '1.1rem' }}>KI-Transkription</h3>
            <p style={{ margin: '0 0 24px', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>Die Sprachnotiz wird fehlerfrei transkribiert. Sie können alles prüfen.</p>
            <img src="/step2-transcript.jpg" alt="Transkription prüfen" style={{ width: '100%', maxWidth: '180px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', marginTop: 'auto' }} />
          </div>

          <div className="card glass" style={{ margin: 0, padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ background: 'var(--primary)', color: 'white', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 'bold', marginBottom: '16px', boxShadow: '0 4px 10px rgba(59, 130, 246, 0.5)' }}>3</div>
            <h3 style={{ margin: '0 0 12px', fontSize: '1.1rem' }}>E-Mail versenden</h3>
            <p style={{ margin: '0 0 24px', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>Innerhalb von Minuten geht die personalisierte E-Mail an den Kunden raus.</p>
            <img src="/step3-email.jpg" alt="Fertige E-Mail" style={{ width: '100%', maxWidth: '180px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', marginTop: 'auto' }} />
          </div>

        </div>
      </div>

    </div>
  );
}
