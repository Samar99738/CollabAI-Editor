"use client";
"use client";
import React, { useState } from 'react';
import { sendMessageToGemini } from '../utils/geminiApi';
import { sendQueryToAgent } from '../utils/agentApiNew';
import Editor from './Editor';

type Message = {
  sender: 'user' | 'ai' | 'agent';
  text: string;
};

const ChatSidebar = ({ editorContent }: { editorContent: string }) => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'ai', text: 'Hello! How can I help you today?' }
  ]);
  const [agentLoading, setAgentLoading] = useState(false);
  const [input, setInput] = useState('');

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    // Call Gemini API
    const aiReply = await sendMessageToGemini(input);
    setMessages(prev => [...prev, { sender: 'ai', text: aiReply }]);
  };

  // Handler for agent web search
  const handleAgentSearch = async () => {
    if (!input.trim()) return;
    setAgentLoading(true);
    setMessages(prev => [...prev, { sender: 'user', text: `[Web Search] ${input}` }]);
    setInput('');
    const summary = await sendQueryToAgent(input);
    setMessages(prev => [...prev, { sender: 'agent', text: summary }]);
    setAgentLoading(false);
  };

  const handleSummarizeEditor = async () => {
    if (!editorContent.trim()) return;
    const aiReply = await sendMessageToGemini(editorContent);
    setMessages(prev => [...prev, { sender: 'ai', text: aiReply }]);
  };

  return (
    <aside className="w-80 border-l p-4 h-full flex flex-col bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 dark:from-black dark:via-gray-900 dark:to-black transition-colors">
      <div className="flex-1 overflow-y-auto mb-4 space-y-3 pr-1">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[90%] px-3 py-2 rounded-lg shadow-sm text-sm transition-all
              ${msg.sender === 'ai'
                ? 'bg-blue-100 text-blue-900 self-start dark:bg-blue-900 dark:text-blue-100'
                : msg.sender === 'agent'
                  ? 'bg-green-100 text-green-900 self-start dark:bg-green-900 dark:text-green-100'
                  : 'bg-gray-200 text-gray-900 self-end dark:bg-gray-700 dark:text-gray-100'}
            `}
            style={{ alignSelf: msg.sender === 'ai' || msg.sender === 'agent' ? 'flex-start' : 'flex-end' }}
          >
            <span className="font-semibold mr-1">{msg.sender === 'ai' ? 'AI:' : msg.sender === 'agent' ? 'Agent:' : 'You:'}</span>
            {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="flex gap-2 mt-auto">
        <input
          type="text"
          className="flex-1 border rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow transition-all">Send</button>
      </form>
      <button
        className="mt-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow transition-all"
        onClick={handleSummarizeEditor}
      >
        Summarize Editor
      </button>
    </aside>
  );
}

export default ChatSidebar;
export { ChatSidebar };
