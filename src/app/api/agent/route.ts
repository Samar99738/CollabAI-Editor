import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();
    if (!query) {
      return NextResponse.json({ error: 'Missing search query.' }, { status: 400 });
    }
    // DuckDuckGo Instant Answer API (free, no key required)
    const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_redirect=1&no_html=1`;
    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: 'DuckDuckGo API error', details: errorText }, { status: response.status });
    }
    const data = await response.json();
    // Extract summary from DuckDuckGo response
    const summary = data.AbstractText || data.Answer || data.Definition || 'No summary found.';
    return NextResponse.json({ summary });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: 'API route error', details: errorMsg }, { status: 500 });
  }
}
