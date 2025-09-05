import React from 'react';

interface FloatingToolbarProps {
  top: number;
  left: number;
  selectedText: string;
  onEditWithAI: () => void;
  onPreview: () => void;
  onConfirm: () => void;
  onCancel: () => void;
  aiSuggestion: string | null;
  showPreview: boolean;
  loading: boolean;
}

const FloatingToolbar: React.FC<FloatingToolbarProps> = ({
  top,
  left,
  selectedText,
  onEditWithAI,
  onPreview,
  onConfirm,
  onCancel,
  aiSuggestion,
  showPreview,
  loading,
}) => {
  return (
    <div
      className="absolute bg-white border rounded shadow p-2 z-10 w-72"
      style={{ top, left }}
    >
      <div className="mb-2 text-xs text-gray-500">Selected: "{selectedText}"</div>
      <div className="flex gap-2 mb-2">
        <button className="px-2 py-1 bg-blue-500 text-white rounded text-xs" onClick={onEditWithAI}>Edit with AI</button>
        <button className="px-2 py-1 bg-gray-200 rounded text-xs" onClick={onPreview}>Preview</button>
        <button className="px-2 py-1 bg-green-500 text-white rounded text-xs" onClick={onConfirm}>✅ Confirm</button>
        <button className="px-2 py-1 bg-red-500 text-white rounded text-xs" onClick={onCancel}>❌ Cancel</button>
      </div>
      {showPreview && aiSuggestion && (
        <div className="bg-gray-50 border rounded p-2 text-xs">
          <div><b>Original:</b> {selectedText}</div>
          <div className="mt-2"><b>AI Suggestion:</b> {aiSuggestion}</div>
        </div>
      )}
    </div>
  );
};

export default FloatingToolbar;
