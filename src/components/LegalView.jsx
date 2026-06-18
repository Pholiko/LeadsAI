import React, { useEffect } from 'react';

export default function LegalView({ type, onBack }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type]);

  const renderImpressum = () => (
    <>
      <h1 className="title" style={{ fontSize: '2.5rem', marginBottom: '32px' }}>Impressum</h1>
      <p style={{ marginBottom: '16px', fontSize: '1.1rem' }}><strong>Angaben gemäß § 5 TMG</strong></p>
      <p style={{ marginBottom: '24px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
        Esat Emre Atasoy<br />
        AtasoyLabs<br />
        Eberstrasse 7c<br />
        44145 Dortmund<br />
      </p>
      <p style={{ marginBottom: '16px', fontSize: '1.1rem' }}><strong>Kontakt</strong></p>
      <p style={{ marginBottom: '32px', color: 'var(--text-secondary)' }}>
        E-Mail: contact@atasoylabs.com<br />
      </p>
    </>
  );

  const renderDatenschutz = () => (
    <>
      <h1 className="title" style={{ fontSize: '2.5rem', marginBottom: '32px' }}>Datenschutzerklärung</h1>
      
      <h2 style={{ fontSize: '1.5rem', marginTop: '32px', marginBottom: '16px' }}>1. Datenschutz auf einen Blick</h2>
      <h3 style={{ fontSize: '1.2rem', marginTop: '24px', marginBottom: '12px' }}>Allgemeine Hinweise</h3>
      <p style={{ marginBottom: '16px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
        Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
      </p>
      
      <h3 style={{ fontSize: '1.2rem', marginTop: '24px', marginBottom: '12px' }}>Datenerfassung auf dieser Website</h3>
      <p style={{ marginBottom: '16px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
        <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
        Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
      </p>
      <p style={{ marginBottom: '16px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
        <strong>Wie erfassen wir Ihre Daten?</strong><br />
        Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben oder während des App-Logins angeben (z.B. Audio-Aufnahmen, Visitenkarten-Fotos). Diese Daten werden lokal in Ihrem Browser (Local Storage) gespeichert und zur Verarbeitung über eine sichere Schnittstelle an externe KI-Dienste (wie OpenAI) gesendet, jedoch nicht dauerhaft auf unseren eigenen Servern gespeichert, es sei denn, dies ist für den Service ausdrücklich notwendig.
      </p>
      
      <h2 style={{ fontSize: '1.5rem', marginTop: '32px', marginBottom: '16px' }}>2. Hosting und externe Dienste</h2>
      <p style={{ marginBottom: '16px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
        Diese App kommuniziert mit externen APIs, insbesondere OpenAI, zur Transkription von Audiodaten und zur Texterstellung. Bitte beachten Sie, dass hierbei Audio- und Bilddaten (z.B. Fotos von Visitenkarten) an die Server des jeweiligen API-Anbieters übertragen werden. Wir haben keinen direkten Einfluss auf die Datenspeicherung durch diese Drittanbieter und verweisen diesbezüglich auf deren Datenschutzrichtlinien.
      </p>
    </>
  );

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: '24px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center' }}>
        <button 
          onClick={onBack}
          style={{ 
            background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', 
            fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '500' 
          }}
        >
          ← Zurück zur Startseite
        </button>
      </header>
      
      <main style={{ padding: '40px 24px', maxWidth: '800px', margin: '0 auto', width: '100%', flex: 1 }}>
        {type === 'impressum' ? renderImpressum() : renderDatenschutz()}
      </main>
      
      <footer style={{ borderTop: '1px solid var(--border-color)', padding: '24px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
        &copy; 2026 Lead AI. Alle Rechte vorbehalten.
      </footer>
    </div>
  );
}
