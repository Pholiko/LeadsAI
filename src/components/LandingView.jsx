import React from 'react';

export default function LandingView({ onStart }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center', animation: 'fadeIn 0.5s ease' }}>
      
      <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, var(--primary) 0%, #6366f1 100%)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', marginBottom: '24px', boxShadow: '0 10px 25px rgba(59, 130, 246, 0.4)' }}>
        🚀
      </div>

      <h1 className="title" style={{ fontSize: '2.2rem', marginBottom: '16px', lineHeight: '1.2' }}>
        Kein Lead bleibt auf der Strecke.
      </h1>
      
      <p className="subtitle" style={{ fontSize: '1.1rem', marginBottom: '32px', maxWidth: '400px', color: 'rgba(255,255,255,0.8)' }}>
        Verlorene Leads = verpasster Umsatz. Erfasse Messekontakte in 10 Sekunden und melde dich noch am selben Tag mit dem perfekten Follow-up.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '350px', marginBottom: '40px', textAlign: 'left' }}>
        
        <div className="card glass" style={{ margin: 0, padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', animationDelay: '0.1s' }}>
          <div style={{ fontSize: '1.5rem' }}>📸</div>
          <div>
            <h3 style={{ margin: '0 0 4px', fontSize: '1rem' }}>KI-Visitenkarten Scanner</h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Erkennt sofort Namen, Firma und E-Mail.</p>
          </div>
        </div>

        <div className="card glass" style={{ margin: 0, padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', animationDelay: '0.2s' }}>
          <div style={{ fontSize: '1.5rem' }}>🎙️</div>
          <div>
            <h3 style={{ margin: '0 0 4px', fontSize: '1rem' }}>Sprachnotizen</h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Einfach reinsprechen. Die KI transkribiert alles fehlerfrei.</p>
          </div>
        </div>

        <div className="card glass" style={{ margin: 0, padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', animationDelay: '0.3s' }}>
          <div style={{ fontSize: '1.5rem' }}>⚡</div>
          <div>
            <h3 style={{ margin: '0 0 4px', fontSize: '1rem' }}>Sekundenschnelles Follow-up</h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Innerhalb von Minuten die E-Mail an den Kunden rausschicken.</p>
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
