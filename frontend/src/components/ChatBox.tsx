import { useState } from 'react';
import { askQuestion } from '../lib/api';

export default function ChatBox() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ from: string; text: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { from: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const data = await askQuestion(input);
      setMessages((prev) => [...prev, { from: 'bot', text: data.answer }]);
    } catch (err) {
      setMessages((prev) => [...prev, { from: 'bot', text: 'Error fetching answer.' }]);
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 border rounded shadow-lg">
      <div className="mb-2 font-bold text-lg">AI Support Agent</div>
      <div className="h-64 overflow-y-auto border p-2 mb-2">
        {messages.map((msg, idx) => (
          <div key={idx} className={msg.from === 'user' ? 'text-right' : 'text-left'}>
            <span className={`inline-block p-1 rounded ${msg.from === 'user' ? 'bg-blue-200' : 'bg-gray-200'}`}>
              {msg.text}
            </span>
          </div>
        ))}
        {loading && <div className="text-gray-500">Loading...</div>}
      </div>
      <div className="flex">
        <input
          className="flex-1 border p-2 rounded-l"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your question..."
        />
        <button className="bg-blue-500 text-white px-4 rounded-r" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}
