// Hilfsfunktion: Wandelt Audio-Blob in Base64 um
const blobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const transcribeAudio = async (audioBlobUrl) => {
  if (!audioBlobUrl) return "";

  const audioBlob = await fetch(audioBlobUrl).then(r => r.blob());
  const audioBase64 = await blobToBase64(audioBlob);

  const payload = {
    audioBase64: audioBase64,
    mimeType: audioBlob.type
  };

  console.log("Sende Audio an Vercel Serverless Function...");

  const response = await fetch('/api/transcribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload) 
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error("Backend Error Response:", errorData);
    throw new Error(errorData.error || `Server Fehler: ${response.status}`);
  }

  const data = await response.json();
  return data.transcript;
};

export const generateLead = async (photoUrl, transcript, userName) => {
  console.log("Generiere Lead mit Vercel Serverless Function...");

  const payload = {
    photoUrl: photoUrl || null,
    transcript: transcript || "",
    userName: userName || ""
  };

  const response = await fetch('/api/generate-lead', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error("Backend Error Response:", errorData);
    throw new Error(errorData.error || `Server Fehler: ${response.status}`);
  }

  return response.json();
};
