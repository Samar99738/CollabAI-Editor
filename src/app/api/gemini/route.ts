import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Missing Gemini API key.' }, { status: 500 });
    }

    // Gemini API endpoint (updated to latest model and version)
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-2.5-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: message }] }],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', errorText);
      return NextResponse.json({ error: 'Gemini API error', details: errorText }, { status: response.status });
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from Gemini.';
    return NextResponse.json({ reply });
  } catch (err: unknown) {
    console.error('API route error:', err);
    const errorMsg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: 'API route error', details: errorMsg }, { status: 500 });
  }
}
