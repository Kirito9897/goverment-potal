import React, { useEffect, useState } from 'react';
import { fetchNews, fetchServices } from '../api/portalApi';

function NewsBadge({ source }) {
  const map = {
    PIB: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
    'News on AIR': 'bg-sky-50 text-sky-700 ring-1 ring-sky-200',
    'DD News': 'bg-rose-50 text-rose-700 ring-1 ring-rose-200'
  };
  const cls = map[source] || 'bg-slate-50 text-slate-700 ring-1 ring-slate-200';
  return <span className={`rounded-md px-2 py-[2px] text-[10px] font-semibold ${cls}`}>{source}</span>;
}

function TrendingServicesSection() {
  const [services, setServices] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    Promise.all([fetchServices(), fetchNews()])
      .then(([svcRes, newsRes]) => {
        if (!cancelled) {
          setServices(svcRes.data.slice(0, 3));
          setNews(newsRes.data.slice(0, 5));
          setError(null);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error(err);
          setError('Unable to load trending services.');
        }
      })
      .finally(() => !cancelled && setLoading(false));

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section aria-labelledby="trending-services-heading">
      <div className="flex items-center justify-between gap-3">
        <h3
          id="trending-services-heading"
          className="text-sm font-semibold text-slate-100 md:text-base"
        >
          Trending government services
        </h3>
        <p className="text-[11px] text-slate-400">
          Frequently accessed by citizens in the last quarter
        </p>
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        {loading && (
          <p className="text-xs text-slate-400">Loading trending services…</p>
        )}
        {error && !loading && <p className="text-xs text-rose-300">{error}</p>}
        {!loading && !error && (
          <>
            <div className="grid gap-3 md:grid-cols-3">
              {services.map((svc) => (
                <article
                  key={svc.id}
                  className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-xs shadow-sm transition hover:-translate-y-1 hover:border-saffron/60 hover:shadow-lg hover:shadow-amber-900/20"
                >
                  <div>
                    <h4 className="text-sm font-semibold text-slate-50">{svc.title}</h4>
                    <p className="mt-2 line-clamp-3 text-[11px] text-slate-300">
                      {svc.description}
                    </p>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="rounded-full bg-slate-800 px-2 py-[2px] text-[10px] text-slate-200">
                      {svc.category}
                    </span>
                    <a
                      href={svc.officialLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] font-medium text-sky-300 underline-offset-2 hover:text-sky-200 hover:underline"
                    >
                      Go to official portal
                    </a>
                  </div>
                </article>
              ))}
            </div>

            <aside className="rounded-xl border border-slate-200/10 bg-white/95 p-4 text-slate-900 shadow-sm">
              <div className="flex items-baseline justify-between gap-2">
                <h4 className="text-sm font-semibold">News / Press Release</h4>
                <span className="text-[11px] text-slate-600">Your gateway to authentic news</span>
              </div>
              <div className="mt-3 space-y-2">
                {news.map((n) => (
                  <a
                    key={n.id}
                    href={n.officialLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-2 hover:bg-slate-50"
                  >
                    <div className="mt-1 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-700">
                      <span className="text-[10px] font-bold">{n.source.split(' ')[0]}</span>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <NewsBadge source={n.source} />
                        <span className="text-[10px] text-slate-500">{n.publishedMinutesAgo} min ago</span>
                      </div>
                      <p className="mt-1 line-clamp-2 text-[11px] font-semibold text-slate-800">
                        {n.title}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
              <div className="mt-3 flex justify-center">
                <button
                  type="button"
                  className="rounded-full border border-slate-300 bg-white px-5 py-2 text-xs font-semibold text-slate-800 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
                >
                  View All
                </button>
              </div>
            </aside>
          </>
        )}
      </div>
    </section>
  );
}

export default TrendingServicesSection;
