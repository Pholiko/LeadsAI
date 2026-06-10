import { useState, useEffect } from 'react'
import CameraView from './components/CameraView'
import AudioView from './components/AudioView'
import DashboardView from './components/DashboardView'
import LandingView from './components/LandingView'
import { transcribeAudio, generateLead } from './services/openaiApi'
import { saveLead } from './services/storage'

export default function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  
  const [step, setStep] = useState(0); 
  // 0: Dashboard, 1: Camera, 2: Audio, 3: Transcribing Loading, 4: Edit Transcript, 5: Priority, 6: Processing
  const [currentLead, setCurrentLead] = useState({ photo: null, audio: null, transcript: '', priority: null });
  const [tempTranscript, setTempTranscript] = useState('');

  useEffect(() => {
    const savedPin = localStorage.getItem('app_pin');
    if (savedPin === '8765') {
      setIsAuthenticated(true);
      setShowLanding(false); // Skip landing if already logged in
    }
  }, []);

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pinInput === '8765') {
      localStorage.setItem('app_pin', '8765');
      setIsAuthenticated(true);
    } else {
      alert('Falscher PIN');
      setPinInput('');
    }
  };

  const handleCapture = (photoDataUrl) => {
    setCurrentLead(prev => ({ ...prev, photo: photoDataUrl }));
    setStep(2);
  };

  const handleAudioSave = async (audioUrl) => {
    setCurrentLead(prev => ({ ...prev, audio: audioUrl }));
    setStep(3); // Ladebildschirm für Transkription
    
    try {
      const text = await transcribeAudio(audioUrl);
      setTempTranscript(text);
      setCurrentLead(prev => ({ ...prev, transcript: text }));
      setStep(4); // Transkription bearbeiten
    } catch (error) {
      console.error(error);
      alert(error.message || "Fehler bei der Transkription");
      setStep(0);
    }
  };

  const handleTranscriptSave = () => {
    setCurrentLead(prev => ({ ...prev, transcript: tempTranscript }));
    setStep(5); // Weiter zur Priorisierung
  };

  const handlePrioritySelect = async (priorityValue) => {
    const leadInput = { ...currentLead, priority: priorityValue };
    setCurrentLead(leadInput);
    setStep(6); // KI verarbeitet finalen Lead
    
    try {
      const userName = localStorage.getItem('app_user_name') || '';
      let processedData = await generateLead(leadInput.photo, leadInput.transcript, userName);
      
      if (!processedData) {
        throw new Error("Die KI hat keine gültigen Daten (null) zurückgegeben. Bitte versuche es erneut.");
      }

      processedData.priority = priorityValue;
      
      saveLead({ data: processedData });
      setCurrentLead({ photo: null, audio: null, transcript: '', priority: null });
      
      // Erfolgs-Screen für 1.5 Sekunden anzeigen
      setStep(7);
      setTimeout(() => {
        setStep(0);
      }, 1500);
      
    } catch (error) {
      console.error(error);
      alert(error.message || "Fehler bei der Verarbeitung");
      setStep(0);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('app_pin');
    setIsAuthenticated(false);
    setShowLanding(true);
  };

  if (!isAuthenticated) {
    if (showLanding) {
      return <LandingView onStart={() => setShowLanding(false)} />;
    }

    return (
      <main style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h1 className="title" style={{ marginBottom: '24px' }}>Lead AI</h1>
        <form onSubmit={handlePinSubmit} className="card glass" style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '300px' }}>
          <p className="subtitle" style={{ textAlign: 'center' }}>Bitte Zugangscode eingeben</p>
          <input 
            type="password" 
            value={pinInput}
            onChange={(e) => setPinInput(e.target.value)}
            placeholder="PIN"
            style={{ 
              padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', 
              background: 'rgba(0,0,0,0.2)', color: 'white', fontSize: '1.2rem', textAlign: 'center' 
            }}
          />
          <button type="submit" className="btn-primary">Entsperren</button>
        </form>
      </main>
    );
  }

  return (
    <main style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
      {step === 0 && <DashboardView onCaptureNew={() => setStep(1)} onLogout={handleLogout} />}
      
      {step === 1 && (
        <CameraView 
          onCapture={handleCapture} 
          onCancel={() => setStep(0)} 
        />
      )}
      
      {step === 2 && (
        <AudioView 
          onSave={handleAudioSave} 
          onBack={() => setStep(1)} 
        />
      )}

      {step === 3 && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', animation: 'fadeIn 0.3s ease' }}>
          <div className="spinner-ring"></div>
          <h2 className="title" style={{ textAlign: 'center' }}>Transkribiere Audio...</h2>
          <p className="subtitle" style={{ textAlign: 'center', maxWidth: '80%' }}>
            Whisper übersetzt deine Sprachnotiz in Text...
          </p>
        </div>
      )}

      {step === 4 && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h2 className="title">Step 2.5: Notiz überprüfen</h2>
          <div className="card glass" style={{ flex: 1, display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
            <p className="subtitle" style={{ marginBottom: '12px' }}>Hier ist der erkannte Text. Du kannst ihn vor dem Generieren der E-Mail anpassen:</p>
            <textarea
              value={tempTranscript}
              onChange={(e) => setTempTranscript(e.target.value)}
              style={{
                flex: 1,
                background: 'rgba(0,0,0,0.2)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'white',
                padding: '16px',
                borderRadius: '12px',
                fontSize: '1.05rem',
                minHeight: '200px',
                lineHeight: '1.5',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
            />
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn-secondary" onClick={() => setStep(2)}>Zurück</button>
            <button className="btn-primary" style={{ flex: 2 }} onClick={handleTranscriptSave}>Bestätigen & Weiter</button>
          </div>
        </div>
      )}

      {step === 5 && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h2 className="title">Step 3: Priorität</h2>
          <div className="card glass" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', gap: '24px' }}>
            <p className="subtitle" style={{ textAlign: 'center' }}>Wie stufst du diesen Lead ein?</p>
            
            <button className="btn-secondary" style={{ padding: '24px', fontSize: '1.5rem', width: '80%', background: 'rgba(239, 68, 68, 0.1)', borderColor: 'var(--danger)', color: 'white' }} onClick={() => handlePrioritySelect('HOT')}>
              🔥 HOT
            </button>
            <button className="btn-secondary" style={{ padding: '24px', fontSize: '1.5rem', width: '80%', background: 'rgba(245, 158, 11, 0.1)', borderColor: '#f59e0b', color: 'white' }} onClick={() => handlePrioritySelect('WARM')}>
              ☀️ WARM
            </button>
            <button className="btn-secondary" style={{ padding: '24px', fontSize: '1.5rem', width: '80%', background: 'rgba(59, 130, 246, 0.1)', borderColor: '#3b82f6', color: 'white' }} onClick={() => handlePrioritySelect('COLD')}>
              ❄️ COLD
            </button>
          </div>
          <button className="btn-secondary" onClick={() => setStep(4)}>Zurück</button>
        </div>
      )}
      
      {step === 6 && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', animation: 'fadeIn 0.3s ease' }}>
          <div className="spinner-ring"></div>
          <h2 className="title" style={{ textAlign: 'center' }}>KI schreibt E-Mail...</h2>
          <p className="subtitle" style={{ textAlign: 'center', maxWidth: '80%' }}>
            Visitenkarte & Notiz werden verarbeitet...
          </p>
        </div>
      )}

      {step === 7 && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', animation: 'slideIn 0.4s ease' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(34, 197, 94, 0.2)', color: '#22c55e', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '40px', marginBottom: '24px' }}>
            ✅
          </div>
          <h2 className="title" style={{ textAlign: 'center' }}>Lead gesichert!</h2>
        </div>
      )}
    </main>
  )
}
