import React from 'react';

function AshokaEmblem({ className = '' }) {
  return (
    <div
      className={`flex items-center justify-center rounded-full bg-gradient-to-br from-govGold/90 to-amber-500 shadow-lg shadow-amber-900/40 ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 64 64"
        className="h-9 w-9 text-slate-900"
        role="img"
        aria-label="Ashoka emblem placeholder"
      >
        <circle cx="32" cy="32" r="30" fill="currentColor" />
        <circle cx="32" cy="32" r="22" fill="none" stroke="#fbbf24" strokeWidth="2" />
        <path
          d="M32 14 L26 28 L38 28 Z"
          fill="#fbbf24"
          stroke="#f59e0b"
          strokeWidth="1"
        />
        <path
          d="M22 50 C26 40 38 40 42 50 Z"
          fill="#fbbf24"
          stroke="#f59e0b"
          strokeWidth="1"
        />
        <circle cx="32" cy="32" r="4" fill="#0f172a" />
      </svg>
    </div>
  );
}

export default AshokaEmblem;
