"use client";
import React, { useState } from 'react';
import Editor from '@/components/Editor';
import ChatSidebar from '@/components/ChatSidebar';
import ThemeToggle from '@/components/ThemeToggle';

export default function Home() {
  const [editorContent, setEditorContent] = useState('');
  return (
    <div className="flex h-screen bg-white dark:bg-black transition-colors">
      <div className="flex-1 flex flex-col">
        <header className="p-6 text-2xl font-extrabold flex items-center justify-center bg-gray-900 dark:bg-black text-white">
          CollabAI Editor
        </header>
        <main className="flex-1 p-4">
          <Editor onContentChange={setEditorContent} />
        </main>
      </div>
      <ChatSidebar editorContent={editorContent} />
    </div>
  );
}
