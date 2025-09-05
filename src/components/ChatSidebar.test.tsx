import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChatSidebar from './ChatSidebar';



describe('ChatSidebar', () => {
  it('renders initial AI message and sends user message', async () => {
    render(<ChatSidebar editorContent="" />);
    // Initial AI message
    expect(screen.getByText(/how can i help/i)).toBeInTheDocument();
    // Type and send a message
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Hello Gemini' } });
    fireEvent.click(screen.getByRole('button', { name: /send/i }));
    // User message appears
    expect(screen.getByText('You:')).toBeInTheDocument();
    expect(screen.getByText('Hello Gemini')).toBeInTheDocument();
    // AI reply appears
    await waitFor(() => {
      // There should be at least two 'AI:' labels (initial + reply)
      expect(screen.getAllByText('AI:').length).toBeGreaterThan(1);
      expect(screen.getByText('Echo: Hello Gemini')).toBeInTheDocument();
    });
  });
});
