import React from 'react';
import { useGlobalSearch } from '../hooks/useGlobalSearch';
import categories from '../data/categories.json';

const INDIA_GATE_IMAGE =
  'https://images.pexels.com/photos/1536335/pexels-photo-1536335.jpeg?auto=compress&cs=tinysrgb&w=1600';

function HeroSection() {
  const { query, setQuery, results, loading, error } = useGlobalSearch();

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg shadow-slate-900/40 hero-glow"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${INDIA_GATE_IMAGE})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/92 via-slate-950/80 to-slate-900/70" />

      <div className="relative z-10 px-4 py-10 md:px-10 md:py-14">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="flex items-center justify-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20 backdrop-blur">
              <svg viewBox="0 0 64 64" className="h-10 w-10 text-white" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M32 6c6 8 14 10 14 20 0 9-6 14-14 14s-14-5-14-14C18 16 26 14 32 6Zm-10 36h20l4 16H18l4-16Zm6-11h8v6h-8v-6Z"
                  opacity="0.9"
                />
              </svg>
            </div>
          </div>
          <h2 id="hero-heading" className="mt-3 text-3xl font-bold text-white md:text-5xl">
            india.gov.in <span className="align-middle rounded-md bg-yellow-300 px-2 py-1 text-xs font-extrabold text-slate-900">BETA</span>
          </h2>
          <p className="mt-2 text-sm text-slate-200 md:text-base">
            National Portal of India
          </p>
          <p className="mt-1 text-[11px] text-slate-300">
            Where Government Information Converges
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-3 text-[11px] text-slate-200">
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/80 px-3 py-1 ring-1 ring-slate-700/70">
            <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
            Live catalogue preview
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/70 px-3 py-1 ring-1 ring-slate-700/70">
            Trusted redirects only
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/70 px-3 py-1 ring-1 ring-slate-700/70">
            AI-style eligibility assistance
          </span>
        </div>

        <div className="mx-auto mt-6 w-full max-w-4xl">
          <label htmlFor="global-search" className="sr-only">
            Search
          </label>
          <div className="flex flex-col gap-2 md:flex-row md:items-stretch">
            <div className="flex flex-1 items-center gap-3 rounded-xl bg-white/95 px-4 py-3 text-slate-900 shadow-lg ring-1 ring-black/5">
              <span className="text-slate-500" aria-hidden="true">
                🔍
              </span>
              <input
                id="global-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search here"
                className="h-8 w-full bg-transparent text-sm placeholder:text-slate-500 focus:outline-none"
              />
              <select
                className="hidden h-9 rounded-md border border-slate-200 bg-white px-2 text-xs text-slate-700 md:block"
                aria-label="Search category"
                defaultValue="all"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title === 'All' ? 'All Categories' : c.title}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              className="rounded-xl bg-red-600 px-8 py-3 text-sm font-semibold text-white shadow-lg hover:bg-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300"
            >
              Search
            </button>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-[11px] text-slate-200">
            <span className="mr-1 text-slate-300">Trending Searches:</span>
            {['Apply Aadhaar', 'DigiLocker', 'New Voter Registration', 'Tatkaal Passport Service', 'Driving Licence'].map(
              (t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setQuery(t)}
                  className="rounded-md border border-white/20 bg-white/10 px-3 py-1 text-[11px] hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300"
                >
                  {t}
                </button>
              )
            )}
          </div>
        </div>

        <div className="mx-auto mt-5 max-h-52 w-full max-w-4xl overflow-auto rounded-xl bg-slate-950/75 p-3 text-xs text-slate-100 ring-1 ring-slate-800 backdrop-blur-sm">
          {loading && <p className="text-slate-400">Loading catalogue from ministries…</p>}
          {error && !loading && <p className="text-rose-300">{error}</p>}
          {!loading && !error && results.length === 0 && (
            <p className="text-slate-400">
              No matches found. Try a different keyword such as &quot;scholarship&quot;,
              &quot;farmer&quot; or &quot;passport&quot;.
            </p>
          )}
          {!loading &&
            !error &&
            results.slice(0, 6).map((item) => (
              <div
                key={item.id}
                className="mb-2 flex items-start justify-between gap-3 rounded-lg bg-slate-900/80 p-2 last:mb-0"
              >
                <div>
                  <p className="text-[13px] font-semibold text-slate-50">
                    {item.title}{' '}
                    <span className="ml-1 rounded-full bg-sky-900/60 px-2 py-[1px] text-[10px] font-semibold uppercase tracking-wide text-sky-200">
                      {item.itemType}
                    </span>
                  </p>
                  <p className="mt-1 line-clamp-2 text-[11px] text-slate-300">
                    {item.description}
                  </p>
                </div>
                <div className="mt-1 flex flex-col items-end gap-1">
                  <span className="rounded-full bg-slate-800 px-2 py-[1px] text-[10px] text-slate-200">
                    {item.category}
                  </span>
                  <a
                    href={item.officialLink}
                    className="text-[10px] text-sky-300 underline-offset-2 hover:text-sky-200 hover:underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Visit official site
                  </a>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
