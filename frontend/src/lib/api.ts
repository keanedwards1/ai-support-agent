// simple function to call the /ask endpoint
export async function askQuestion(question: string) {
  const res = await fetch('https://ai-support-agent-3oli.onrender.com/ask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question }),
  });

  if (!res.ok) throw new Error('Failed to fetch from backend');
  return res.json();
}
