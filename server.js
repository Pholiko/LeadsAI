import express from 'express';
import cors from 'cors';
import multer from 'multer';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';
import { toFile } from 'openai';

// Lade .env.local Variablen
dotenv.config({ path: '.env.local' });

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

const upload = multer();

const openai = new OpenAI({
  apiKey: process.env.VITE_OPENAI_API_KEY,
});

const checkAuth = () => {
  if (!process.env.VITE_OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY.includes('DEIN_API_KEY')) {
    throw new Error("Backend: OpenAI API Key fehlt in der .env.local Datei.");
  }
};

app.post('/api/transcribe', upload.single('audio'), async (req, res) => {
  try {
    checkAuth();
    const audioFile = req.file;
    if (!audioFile) throw new Error("Kein Audio empfangen");

    console.log("Backend: Transkribiere Audio...");
    const file = await toFile(audioFile.buffer, 'audio.webm', { type: audioFile.mimetype });
    
    const transcription = await openai.audio.transcriptions.create({
      file: file,
      model: 'whisper-1',
      language: 'de'
    });
    console.log("Backend: Transkription erfolgreich.");
    res.json({ transcript: transcription.text });
  } catch (error) {
    console.error("Backend Error:", error);
    res.status(500).json({ error: error.message || "Fehler bei der Transkription" });
  }
});

app.post('/api/generate-lead', async (req, res) => {
  try {
    checkAuth();
    const { photoUrl, transcript, userName } = req.body;
    const authorName = userName || 'dem Vertriebsmitarbeiter';

    console.log("Backend: Analysiere Lead mit GPT-4o...");
    
    const systemPrompt = `
Du bist ein erstklassiger B2B-Sales-Assistent. 
Deine Aufgabe ist es, aus einer Visitenkarte (Bild) und einer gesprochenen Notiz (Text) einen strukturierten Datensatz und eine Follow-up E-Mail zu generieren.

Schreibe die E-Mail im Namen von: ${authorName}. 
WICHTIG: Unterschreibe die E-Mail am Ende verbindlich mit diesem Namen. Verwende KEINE Platzhalter wie [Ihr Name] oder [Dein Name].

1. Extrahiere aus der Visitenkarte: Name, Firma, Rolle/Titel und E-Mail. Falls etwas fehlt, lass es leer.
2. Nimm die gesprochene Notiz des Vertrieblers und fasse sie in einem Satz unter 'summary' zusammen.
3. Schreibe basierend auf der Notiz eine höfliche, professionelle E-Mail (Feld 'emailDraft'). Wenn aus der Notiz hervorgeht, dass sich die Personen gut kennen oder duzen, verwende das "Du", ansonsten das "Sie". 

Antworte AUSSCHLIESSLICH mit einem validen JSON-Objekt im folgenden Format:
{
  "name": "...",
  "company": "...",
  "role": "...",
  "email": "...",
  "summary": "...",
  "emailDraft": "..."
}
`;

    const messages = [
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: [
          { type: "text", text: `Hier ist die (editierte) Sprachnotiz des Vertrieblers:\n\n"${transcript}"` }
        ]
      }
    ];

    if (photoUrl && photoUrl !== 'null') {
      messages[1].content.push({ type: "image_url", image_url: { url: photoUrl } });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      response_format: { type: "json_object" },
      messages: messages
    });

    const resultJson = completion.choices[0].message.content;
    res.json(JSON.parse(resultJson));
  } catch (error) {
    console.error("Backend Error:", error);
    res.status(500).json({ error: error.message || "Fehler bei der Lead-Generierung" });
  }
});

app.listen(port, () => {
  console.log(`Backend Proxy läuft auf http://localhost:${port}`);
});
