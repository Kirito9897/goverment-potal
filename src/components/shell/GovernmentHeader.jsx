import React from 'react';
import AshokaEmblem from '../visual/AshokaEmblem';

function GovernmentHeader() {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 md:px-10">
        <AshokaEmblem className="h-12 w-12 flex-shrink-0" />
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
            Government of India
          </p>
          <h1 className="text-lg font-semibold text-slate-50 md:text-2xl">
            National Government Information Portal
          </h1>
          <p className="text-[11px] text-slate-400 md:text-xs">
            A single-window access to government services, schemes and policies
          </p>
        </div>
      </div>
    </header>
  );
}

export default GovernmentHeader;
