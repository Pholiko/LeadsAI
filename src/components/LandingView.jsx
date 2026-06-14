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
        padding: '16px', 
        display: 'flex', 
        flexDirection: 'row', 
        flexWrap: 'nowrap',
        alignItems: 'center', 
        justifyContent: 'center',
        gap: '12px',
        animation: 'fadeIn 0.5s ease',
        maxWidth: '1000px',
        margin: '0 auto',
        width: '100%'
      }}>
        
        {/* Left Column: Text & CTA */}
        <div style={{ flex: '1 1 50%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: 0 }}>
          
          {/* CSS "Screenshot/Notification" Widget */}
          <div style={{ 
              background: 'rgba(255, 255, 255, 0.05)', 
              border: '1px solid rgba(255, 255, 255, 0.1)', 
              borderRadius: '12px', 
              padding: '8px 10px', 
              marginBottom: '16px',
              boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backdropFilter: 'blur(10px)',
              maxWidth: '100%',
              overflow: 'hidden'
            }}>
            <div style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#22c55e', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', flexShrink: 0 }}>
              ✓
            </div>
            <div style={{ textAlign: 'left', minWidth: 0 }}>
              <p style={{ margin: '0 0 2px', fontSize: 'clamp(0.6rem, 1.5vw, 0.85rem)', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Kontakt gesichert & E-Mail versendet</p>
              <p style={{ margin: 0, fontSize: 'clamp(0.5rem, 1.2vw, 0.75rem)', color: 'rgba(255,255,255,0.6)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Thomas Müller, CEO NexaCorp</p>
            </div>
          </div>

          <h1 className="title" style={{ fontSize: 'clamp(1.2rem, 3.5vw, 2.5rem)', marginBottom: '12px', lineHeight: '1.2', fontWeight: '800', textAlign: 'left', letterSpacing: '-0.5px', wordBreak: 'break-word' }}>
            Nie wieder Messekontakte <br/><span style={{ background: 'linear-gradient(135deg, var(--primary) 0%, #a855f7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>verlieren!</span>
          </h1>
          
          <p className="subtitle" style={{ fontSize: 'clamp(0.8rem, 2vw, 1.1rem)', marginBottom: '24px', color: 'rgba(255,255,255,0.7)', textAlign: 'left', lineHeight: '1.4' }}>
            Fotografieren. Kurz einsprechen. Persönliches Follow-Up in 60 Sekunden.
          </p>

          <button 
            className="btn-primary" 
            onClick={onStart}
            style={{ padding: '10px 16px', fontSize: 'clamp(0.8rem, 2vw, 1.1rem)', width: '100%', maxWidth: '200px', borderRadius: '10px', fontWeight: 'bold', boxShadow: '0 8px 20px rgba(99, 102, 241, 0.4)' }}
          >
            Jetzt App Starten
          </button>
        </div>

        {/* Right Column: Hero Image / WOW Effect */}
        <div style={{ flex: '1 1 50%', position: 'relative', width: '100%', maxWidth: '300px', minWidth: 0, display: 'flex', justifyContent: 'center' }}>
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
          {/* Subtle glow effect behind the image */}
          <div style={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            right: '10%',
            bottom: '0',
            background: 'linear-gradient(135deg, var(--primary) 0%, #a855f7 100%)',
            filter: 'blur(50px)',
            opacity: '0.3',
            zIndex: '-1',
            borderRadius: '50%'
          }}></div>
        </div>
      </div>

      {/* Process Section (Below the fold) */}
      <div style={{ padding: '24px', marginTop: '24px' }}>
        <p style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>So funktioniert's</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', paddingLeft: '16px' }}>
          
          {/* Vertical Timeline Line */}
          <div style={{ position: 'absolute', left: '26px', top: '20px', bottom: '20px', width: '2px', background: 'rgba(255,255,255,0.1)' }}></div>

          <div style={{ display: 'flex', gap: '20px', marginBottom: '32px', position: 'relative', zIndex: 1 }}>
            <div style={{ background: 'var(--bg-color)', border: '2px solid var(--primary)', color: 'white', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold', flexShrink: 0, marginTop: '2px' }}>1</div>
            <div>
              <h3 style={{ margin: '0 0 8px', fontSize: '1.1rem' }}>Karte scannen & Kontext einsprechen</h3>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>Künstliche Intelligenz liest die Visitenkarte. Sie sprechen einfach kurz ein, worum es ging.</p>
              <img src="/step1-card.jpg" alt="Visitenkarte scannen" style={{ width: '100%', maxWidth: '280px', borderRadius: '12px', marginTop: '16px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '20px', marginBottom: '32px', position: 'relative', zIndex: 1 }}>
            <div style={{ background: 'var(--bg-color)', border: '2px solid var(--primary)', color: 'white', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold', flexShrink: 0, marginTop: '2px' }}>2</div>
            <div>
              <h3 style={{ margin: '0 0 8px', fontSize: '1.1rem' }}>KI-Transkription & Auswertung</h3>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>Die Sprachnotiz wird fehlerfrei transkribiert. Sie können alles vor dem nächsten Schritt überprüfen.</p>
              <img src="/step2-transcript.jpg" alt="Transkription prüfen" style={{ width: '100%', maxWidth: '280px', borderRadius: '12px', marginTop: '16px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '20px', position: 'relative', zIndex: 1 }}>
            <div style={{ background: 'var(--bg-color)', border: '2px solid var(--primary)', color: 'white', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold', flexShrink: 0, marginTop: '2px' }}>3</div>
            <div>
              <h3 style={{ margin: '0 0 8px', fontSize: '1.1rem' }}>E-Mail versenden</h3>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>Innerhalb von Minuten geht die perfekt personalisierte E-Mail direkt an den Kunden raus.</p>
              <img src="/step3-email.jpg" alt="Fertige E-Mail" style={{ width: '100%', maxWidth: '280px', borderRadius: '12px', marginTop: '16px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }} />
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
