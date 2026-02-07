import React from 'react';

function TopUtilityBar() {
  return (
    <div className="flex items-center justify-between bg-slate-900 px-4 py-1 text-xs text-slate-100 md:px-10">
      <div className="flex items-center gap-4">
        <button className="underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-govGold">
          Skip to content
        </button>
        <span className="hidden border-l border-slate-600 pl-4 text-slate-300 md:inline">
          Government of India – National Information Portal
        </span>
      </div>
      <div className="flex items-center gap-4">
        <button
          aria-label="Change language"
          className="hover:text-govGold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-govGold"
        >
          हिंदी / English
        </button>
        <button
          aria-label="Accessibility options"
          className="flex items-center gap-1 hover:text-govGold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-govGold"
        >
          <span className="text-lg" aria-hidden="true">
            A
          </span>
          <span className="hidden md:inline">Accessibility</span>
        </button>
      </div>
    </div>
  );
}

export default TopUtilityBar;
