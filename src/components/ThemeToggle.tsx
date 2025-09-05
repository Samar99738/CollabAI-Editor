"use client";
import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  return (
    <button
      className="absolute top-4 right-4 px-3 py-1 rounded bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-900 shadow"
      onClick={() => setDark(d => !d)}
      aria-label="Toggle theme"
    >
      {dark ? '🌙 Dark' : '☀️ Light'} Mode
    </button>
  );
};

export default ThemeToggle;
