import React, { useEffect, useMemo, useState } from 'react';
import { fetchPolicies } from '../api/portalApi';

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}

function UpdatesSection() {
  const [policies, setPolicies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPolicies()
      .then((res) => {
        setPolicies(res.data);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError('Unable to load latest policy highlights.');
      });
  }, []);

  const sortedPolicies = useMemo(
    () =>
      [...policies].sort(
        (a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
      ),
    [policies]
  );

  return (
    <section aria-labelledby="updates-heading" className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-saffron via-white/30 to-indiaGreen opacity-80" />
      <div className="flex items-center justify-between gap-3">
        <h3
          id="updates-heading"
          className="text-sm font-semibold text-slate-100 md:text-base"
        >
          Latest policy highlights
        </h3>
        <span className="rounded-full bg-slate-900/70 px-3 py-1 text-[10px] uppercase tracking-wide text-slate-300 ring-1 ring-slate-700/80">
          Auto-curated • Read-only
        </span>
      </div>

      {error && <p className="mt-2 text-xs text-rose-300">{error}</p>}

      <div className="mt-3 grid gap-3 md:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)]">
        <div className="space-y-3">
          {sortedPolicies.slice(0, 3).map((pol, index) => (
            <article
              key={pol.id}
              className="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-950/80 p-4 text-xs shadow-sm transition hover:-translate-y-1 hover:border-accentBlue/70 hover:shadow-lg hover:shadow-sky-900/40"
            >
              <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-saffron via-white/70 to-indiaGreen" />
              <div className="pl-3">
                <p className="text-[11px] text-slate-400">
                  Updated on {formatDate(pol.lastUpdated)}
                </p>
                <h4 className="mt-1 text-sm font-semibold text-slate-50">
                  {pol.title}
                  {index === 0 && (
                    <span className="ml-2 rounded-full bg-emerald-500/10 px-2 py-[1px] text-[10px] font-semibold text-emerald-300 ring-1 ring-emerald-400/50">
                      Most recent
                    </span>
                  )}
                </h4>
                <p className="mt-2 text-[11px] text-slate-300">{pol.description}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  {pol.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-900 px-2 py-[1px] text-[10px] text-slate-300 ring-1 ring-slate-700/80"
                    >
                      {tag}
                    </span>
                  ))}
                  <a
                    href={pol.officialLink}
                    target="_blank"
                    rel="noreferrer"
                    className="ml-auto text-[11px] text-accentBlue underline-offset-2 group-hover:text-sky-300 group-hover:underline"
                  >
                    View policy document
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="card-float rounded-xl border border-slate-800 bg-gradient-to-br from-slate-950/95 via-slate-900/95 to-slate-950/95 p-4 text-[11px] shadow-lg shadow-slate-900/50">
          <h4 className="text-xs font-semibold tracking-wide text-slate-100">
            About this portal
          </h4>
          <p className="mt-2 text-slate-300">
            This National Government Information Portal is designed as a single window
            for discovering services, schemes and policy information from multiple
            ministries and departments.
          </p>
          <p className="mt-2 text-slate-300">
            It does not collect personal data or process applications. When you are
            ready to apply, you will always be redirected to the respective official
            government website.
          </p>
          <p className="mt-2 text-slate-400">
            Data illustrated here is sample information curated for demonstration and
            academic purposes, closely mirroring the structure of real government
            catalogues.
          </p>
        </aside>
      </div>
    </section>
  );
}

export default UpdatesSection;

