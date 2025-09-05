// Simple AI API utility for chat integration
// Replace with your actual API endpoint and key

export async function sendMessageToAI(message: string): Promise<string> {
  // Example: OpenAI API (replace with your endpoint and key)
  // const response = await fetch('/api/ai', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ message }),
  // });
  // const data = await response.json();
  // return data.reply;

  // For demo, just echo the message
  return `AI response to: "${message}"`;
}
