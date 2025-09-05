export async function sendMessageToOpenAI(message: string): Promise<string> {
  const res = await fetch('/api/openai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });
  if (!res.ok) {
    const error = await res.json();
    return error.error || 'OpenAI error.';
  }
  const data = await res.json();
  return data.reply || 'No response from OpenAI.';
}
