import OpenAI from 'openai';

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

    const { photoUrl, transcript, userName } = req.body;
    const authorName = userName || 'dem Vertriebsmitarbeiter';

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

    const content = completion.choices[0].message.content;
    const parsedData = JSON.parse(content);

    if (!parsedData) {
      throw new Error("OpenAI lieferte leeres JSON (null).");
    }

    res.status(200).json(parsedData);
  } catch (error) {
    console.error("Vercel Function Error (Generate):", error);
    res.status(500).json({ error: error.message || "Fehler bei der Lead-Generierung" });
  }
}
