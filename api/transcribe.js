import OpenAI from 'openai';
import { toFile } from 'openai';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
  
  const apiKey = process.env.VITE_OPENAI_API_KEY;

  if (!apiKey || apiKey.includes('DEIN_API_KEY')) {
    return res.status(500).json({ error: "OpenAI API Key fehlt in den Vercel Environment Variables. Bitte trage ihn im Vercel Dashboard unter Settings -> Environment Variables ein und klicke auf Redeploy." });
  }

  try {
    const openai = new OpenAI({ apiKey });

    const { audioBase64, mimeType } = req.body;
    if (!audioBase64) return res.status(400).json({ error: 'Kein Audio empfangen' });

    // Base64 Prefix entfernen
    const base64Data = audioBase64.replace(/^data:audio\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    
    const file = await toFile(buffer, 'audio.webm', { type: mimeType || 'audio/webm' });

    const transcription = await openai.audio.transcriptions.create({
      file: file,
      model: 'whisper-1',
      language: 'de'
    });
    
    res.status(200).json({ transcript: transcription.text });
  } catch (error) {
    console.error("Vercel Function Error (Transcribe):", error);
    res.status(500).json({ error: error.message || "Fehler bei der Transkription" });
  }
}
