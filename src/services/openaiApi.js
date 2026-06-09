export const transcribeAudio = async (audioBlobUrl) => {
  const formData = new FormData();
  
  if (!audioBlobUrl) return "";

  const audioBlob = await fetch(audioBlobUrl).then(r => r.blob());
  formData.append('audio', audioBlob, 'audio.webm');

  console.log("Sende Audio an lokales Backend...");

  const response = await fetch('/api/transcribe', {
    method: 'POST',
    body: formData 
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
  console.log("Generiere Lead mit Backend...");

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
