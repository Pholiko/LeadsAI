import { useState, useRef } from 'react';

export default function AudioView({ onSave, onBack }) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Mikrofon-Zugriff verweigert:', err);
      alert('Bitte erlaube den Zugriff auf das Mikrofon.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      // Stop all tracks to release microphone
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const handleSave = () => {
    onSave(audioUrl); // In a real app we'd pass the Blob, not just the local URL
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <h2 className="title">Step 2: Sprachnotiz</h2>
      <div className="card glass" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', flexDirection: 'column', gap: '20px' }}>
         {!audioUrl ? (
           <>
             <button 
               onClick={isRecording ? stopRecording : startRecording}
               className={isRecording ? 'animate-pulse' : ''} 
               style={{ 
                 width: '100px', height: '100px', borderRadius: '50%', 
                 background: isRecording ? 'var(--danger)' : 'var(--primary)', 
                 border: 'none', color: 'white', display: 'flex', 
                 alignItems: 'center', justifyContent: 'center', fontSize: '40px',
                 cursor: 'pointer', transition: 'all 0.2s'
               }}
             >
                {isRecording ? '⏹️' : '🎙️'}
             </button>
             <p className="subtitle" style={{ textAlign: 'center' }}>
               {isRecording ? 'Aufnahme läuft... (Tippen zum Stoppen)' : 'Tippen zum Starten der Aufnahme'}
             </p>
           </>
         ) : (
           <>
             <div style={{ padding: '24px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid #3b82f6', borderRadius: '12px', textAlign: 'center', width: '100%' }}>
               <span style={{ fontSize: '40px' }}>✅</span>
               <h3 style={{ margin: '12px 0 4px', color: 'white' }}>Audio gespeichert</h3>
               <p style={{ margin: 0, fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>Du kannst den Text im nächsten Schritt bearbeiten.</p>
             </div>
             <button className="btn-secondary" onClick={() => setAudioUrl(null)}>Neu aufnehmen</button>
           </>
         )}
      </div>
      <div style={{ display: 'flex', gap: '12px' }}>
        <button className="btn-secondary" onClick={onBack}>Zurück</button>
        <button className="btn-primary" onClick={handleSave} disabled={!audioUrl}>Weiter</button>
      </div>
    </div>
  );
}
