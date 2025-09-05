"use client";
import React, { useRef, useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import FloatingToolbar from './FloatingToolbar';
import { sendMessageToAI } from '../utils/aiApi';
// ...existing code...
interface EditorProps {
  onContentChange?: (content: string) => void;
}

const Editor: React.FC<EditorProps> = ({ onContentChange }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello, start editing!</p>',
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      if (onContentChange) {
        onContentChange(editor.getText());
      }
    },
  });
  const editorRef = useRef<HTMLDivElement>(null);
  const [toolbarPos, setToolbarPos] = useState<{top: number, left: number} | null>(null);
  const [selectedText, setSelectedText] = useState('');
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectionRange, setSelectionRange] = useState<{ from: number, to: number } | null>(null);

  useEffect(() => {
    if (!editor) return;
    const updateToolbar = () => {
      const { from, to } = editor.state.selection;
      if (from === to) {
        setToolbarPos(null);
        setSelectedText('');
        setAiSuggestion(null);
        setShowPreview(false);
        setSelectionRange(null);
        return;
      }
      const dom = editor.view.dom;
      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0) return;
      const range = sel.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const containerRect = dom.getBoundingClientRect();
      setToolbarPos({
        top: rect.bottom - containerRect.top + 8,
        left: rect.left - containerRect.left,
      });
      setSelectedText(editor.state.doc.textBetween(from, to, ' '));
      setSelectionRange({ from, to });
    };
    editor.on('selectionUpdate', updateToolbar);
    return () => {
      editor.off('selectionUpdate', updateToolbar);
    };
  }, [editor]);

  // Handler for AI edit
  const handleEditWithAI = async () => {
    if (!selectedText) return;
    setLoading(true);
    const suggestion = await sendMessageToAI(selectedText);
    setAiSuggestion(suggestion);
    setShowPreview(true);
    setLoading(false);
  };

  // Handler for confirm
  const handleConfirm = () => {
    if (!editor || !aiSuggestion || !selectionRange) return;
    editor.commands.insertContentAt(selectionRange, aiSuggestion);
    setAiSuggestion(null);
    setShowPreview(false);
    setSelectedText('');
    setToolbarPos(null);
  };

  // Handler for cancel
  const handleCancel = () => {
    setAiSuggestion(null);
    setShowPreview(false);
  };

  return (
    <div ref={editorRef} className="relative border rounded-lg p-6 min-h-[300px] bg-gray-900 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
      <EditorContent
        editor={editor}
        className="outline-none bg-transparent text-white text-base min-h-[250px] px-2 py-2 rounded-lg focus:outline-none"
      />
      {toolbarPos && (
        <FloatingToolbar
          top={toolbarPos.top}
          left={toolbarPos.left}
          selectedText={selectedText}
          onEditWithAI={handleEditWithAI}
          onPreview={() => setShowPreview(true)}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          aiSuggestion={aiSuggestion}
          showPreview={showPreview}
          loading={loading}
        />
      )}
    </div>
  );
};

export default Editor;
