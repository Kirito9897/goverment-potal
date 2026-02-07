import React, { useEffect, useState } from 'react';
import { fetchStatistics } from '../api/portalApi';

function StatItem({ label, value, iconPath }) {
  return (
    <div className="flex items-center gap-3 px-3 py-3 md:px-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600/10 text-red-600 ring-1 ring-red-600/20">
        <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
          <path fill="currentColor" d={iconPath} />
        </svg>
      </div>
      <div className="leading-tight">
        <p className="text-lg font-extrabold text-slate-900">{value.toLocaleString('en-IN')}</p>
        <p className="text-[11px] font-semibold text-slate-600">{label}</p>
      </div>
    </div>
  );
}

function StatisticsSection() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStatistics()
      .then((res) => {
        setStats(res.data);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError('Unable to load statistics currently.');
      });
  }, []);

  if (error) {
    return (
      <section aria-label="Portal statistics">
        <p className="text-xs text-rose-300">{error}</p>
      </section>
    );
  }

  if (!stats) {
    return (
      <section aria-label="Portal statistics">
        <p className="text-xs text-slate-400">Loading statistics…</p>
      </section>
    );
  }

  return (
    <section aria-label="Portal statistics">
      <div className="rounded-2xl border border-slate-200/20 bg-white/95 shadow-lg ring-1 ring-black/5">
        <div className="grid divide-y divide-slate-200 md:grid-cols-4 md:divide-x md:divide-y-0">
          <StatItem
            label="Online Services"
            value={stats.totalServices}
            iconPath="M4 6h16v12H4V6zm2 2v8h12V8H6z"
          />
          <StatItem
            label="Govt. Schemes"
            value={stats.totalSchemes}
            iconPath="M12 2l9 5-9 5-9-5 9-5zm0 11l9-5v10l-9 5-9-5V8l9 5z"
          />
          <StatItem
            label="Citizen"
            value={5465}
            iconPath="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm-8 10a8 8 0 0 1 16 0H4z"
          />
          <StatItem
            label="Tourist"
            value={3878}
            iconPath="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9a2 2 0 1 1 2-2 2 2 0 0 1-2 2z"
          />
        </div>
      </div>
    </section>
  );
}

export default StatisticsSection;
