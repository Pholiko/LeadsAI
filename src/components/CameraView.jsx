import { useRef, useEffect, useState } from 'react';

export default function CameraView({ onCapture, onCancel }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let stream = null;
    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } // Prefer back camera
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          // Safari PWA Fix: explizites Play nach Zuweisung
          videoRef.current.play().catch(e => console.error("Video play error:", e));
        }
      } catch (err) {
        setError('Kamera-Zugriff verweigert oder nicht verfügbar.');
        console.error(err);
      }
    };
    
    startCamera();
    
    return () => {
      // Cleanup stream on unmount
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
      onCapture(imageDataUrl);
    }
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <h2 className="title">Step 1: Visitenkarte</h2>
      <div className="card glass" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', minHeight: '300px', overflow: 'hidden', padding: 0 }}>
        {error ? (
          <p className="subtitle" style={{ padding: '20px', textAlign: 'center' }}>{error}</p>
        ) : (
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted // WICHTIG für iOS/Safari Autoplay
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
      <div style={{ display: 'flex', gap: '12px' }}>
        <button className="btn-secondary" onClick={onCancel}>Abbrechen</button>
        <button className="btn-primary" onClick={handleCapture} disabled={!!error}>Foto aufnehmen</button>
      </div>
    </div>
  );
}
