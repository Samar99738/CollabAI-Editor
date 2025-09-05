export async function sendMessageToGemini(message: string): Promise<string> {
  const res = await fetch('/api/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });
  if (!res.ok) {
    const error = await res.json();
    return error.error || 'Gemini error.';
  }
  const data = await res.json();
  return data.reply || 'No response from Gemini.';
}
