import React from 'react';

export default function LandingView({ onStart }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center', animation: 'fadeIn 0.5s ease' }}>
      
      <img 
        src="/hero-mockup.png" 
        alt="Lead AI Dashboard Mockup" 
        style={{ width: '100%', maxWidth: '350px', borderRadius: '24px', marginBottom: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }} 
      />

      <h1 className="title" style={{ fontSize: '2.2rem', marginBottom: '16px', lineHeight: '1.2' }}>
        Lead-Erfassung in Echtzeit. <br />Ohne Datenverlust.
      </h1>
      
      <p className="subtitle" style={{ fontSize: '1.05rem', marginBottom: '32px', maxWidth: '400px', color: 'rgba(255,255,255,0.8)' }}>
        Messen sind kostenintensiv. Sichern Sie sich den maximalen ROI aus jedem Kontakt. Erfassen Sie Leads in Sekunden und versenden Sie hochpersonalisierte Follow-ups – während Ihr Wettbewerb noch Visitenkarten abtippt.
      </p>

      <div style={{ width: '100%', maxWidth: '350px', marginBottom: '40px', textAlign: 'left' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '24px', textAlign: 'center', color: 'rgba(255,255,255,0.9)', fontWeight: '600' }}>
          In 3 simplen Schritten:
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div className="card glass" style={{ margin: 0, padding: '16px', display: 'flex', alignItems: 'center', gap: '16px', animationDelay: '0.1s', position: 'relative' }}>
            <div style={{ background: 'var(--primary)', color: 'white', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 'bold', flexShrink: 0 }}>1</div>
            <div>
              <h3 style={{ margin: '0 0 4px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>📸 Karte Scannen</h3>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>KI liest präzise alle Kontaktdaten aus.</p>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', opacity: 0.5 }}>
            <div style={{ width: '2px', height: '16px', background: 'var(--primary)' }}></div>
          </div>

          <div className="card glass" style={{ margin: 0, padding: '16px', display: 'flex', alignItems: 'center', gap: '16px', animationDelay: '0.2s' }}>
            <div style={{ background: 'var(--primary)', color: 'white', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 'bold', flexShrink: 0 }}>2</div>
            <div>
              <h3 style={{ margin: '0 0 4px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>🎙️ Kontext einsprechen</h3>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Einfach kurz zusammenfassen, worum es ging.</p>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', opacity: 0.5 }}>
            <div style={{ width: '2px', height: '16px', background: 'var(--primary)' }}></div>
          </div>

          <div className="card glass" style={{ margin: 0, padding: '16px', display: 'flex', alignItems: 'center', gap: '16px', animationDelay: '0.3s' }}>
            <div style={{ background: 'var(--primary)', color: 'white', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 'bold', flexShrink: 0 }}>3</div>
            <div>
              <h3 style={{ margin: '0 0 4px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>⚡ E-Mail versenden</h3>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Die perfekt personalisierte Mail geht in Minuten raus.</p>
            </div>
          </div>

        </div>
      </div>

      <button 
        className="btn-primary" 
        onClick={onStart}
        style={{ padding: '18px 32px', fontSize: '1.2rem', width: '100%', maxWidth: '350px', borderRadius: '16px' }}
      >
        App Starten
      </button>

      <p style={{ marginTop: '24px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
        Beta-Zugang nur mit Einladungscode.
      </p>

    </div>
  );
}
