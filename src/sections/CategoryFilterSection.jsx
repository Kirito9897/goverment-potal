import React from 'react';
import { useGlobalSearch } from '../hooks/useGlobalSearch';
import infoCategories from '../data/informationCategories.json';

function CategoryFilterSection() {
  const { activeCategory, setActiveCategory } = useGlobalSearch();

  return (
    <section aria-label="Information categories">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-100 md:text-base">
            Information Categories
          </h3>
          <p className="mt-1 text-[11px] text-slate-400">
            Discover government information by theme
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {['All', 'Citizen', 'Government', 'Tourist'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-govGold ${
                activeCategory === cat
                  ? 'border-saffron bg-saffron text-slate-900'
                  : 'border-slate-700 bg-slate-900/70 text-slate-100 hover:border-slate-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {infoCategories.map((c) => (
          <article
            key={c.id}
            className="group flex items-start gap-3 rounded-xl border border-slate-200/10 bg-white/95 p-4 text-slate-900 shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus-within:ring-2 focus-within:ring-saffron"
          >
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-red-600 text-white shadow-sm">
              <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M12 2a10 10 0 1 0 10 10A10.01 10.01 0 0 0 12 2Zm1 14.93V20h-2v-3.07A8.001 8.001 0 0 1 4.07 13H7v-2H4.07A8.001 8.001 0 0 1 11 4.07V7h2V4.07A8.001 8.001 0 0 1 19.93 11H17v2h2.93A8.001 8.001 0 0 1 13 16.93Z"
                />
              </svg>
            </div>
            <div className="min-w-0">
              <h4 className="text-sm font-semibold text-slate-900">{c.title}</h4>
              <p className="mt-1 line-clamp-2 text-[11px] text-slate-600">
                {c.description}
              </p>
              <a
                href="#"
                className="mt-2 inline-flex text-[11px] font-semibold text-red-600 underline-offset-2 hover:underline"
              >
                Explore
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-4 flex justify-center">
        <button
          type="button"
          className="rounded-full border border-slate-300 bg-white px-5 py-2 text-xs font-semibold text-slate-800 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
        >
          View All
        </button>
      </div>
    </section>
  );
}

export default CategoryFilterSection;
