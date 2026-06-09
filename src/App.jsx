import { useState, useEffect } from 'react'
import CameraView from './components/CameraView'
import AudioView from './components/AudioView'
import DashboardView from './components/DashboardView'
import { transcribeAudio, generateLead } from './services/openaiApi'
import { saveLead } from './services/storage'

export default function App() {
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
      const processedData = await generateLead(leadInput.photo, leadInput.transcript, userName);
      processedData.priority = priorityValue;
      
      saveLead({ data: processedData });
      setCurrentLead({ photo: null, audio: null, transcript: '', priority: null });
      setStep(0); // Back to dashboard
    } catch (error) {
      console.error(error);
      alert(error.message || "Fehler bei der Verarbeitung");
      setStep(0);
    }
  };

  if (!isAuthenticated) {
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
      {step === 0 && <DashboardView onCaptureNew={() => setStep(1)} />}
      
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
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div className="animate-pulse" style={{ fontSize: '64px', marginBottom: '24px' }}>🎧</div>
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
                border: '1px solid var(--primary)',
                color: 'white',
                padding: '12px',
                borderRadius: '8px',
                fontSize: '1rem',
                minHeight: '200px'
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn-secondary" onClick={() => setStep(2)}>Zurück</button>
            <button className="btn-primary" onClick={handleTranscriptSave}>Bestätigen & Weiter</button>
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
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div className="animate-pulse" style={{ fontSize: '64px', marginBottom: '24px' }}>🤖</div>
          <h2 className="title" style={{ textAlign: 'center' }}>KI schreibt E-Mail...</h2>
          <p className="subtitle" style={{ textAlign: 'center', maxWidth: '80%' }}>
            Lese Visitenkarte & verarbeite deine Notiz...
          </p>
        </div>
      )}
    </main>
  )
}
