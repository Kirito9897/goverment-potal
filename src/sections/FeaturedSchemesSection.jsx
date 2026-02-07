import React, { useEffect, useState } from 'react';
import { fetchSchemes, fetchPolicies } from '../api/portalApi';

function FeaturedCard({ item, type }) {
  return (
    <article className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-xs shadow-sm transition hover:-translate-y-1 hover:border-accentPink/60 hover:shadow-lg hover:shadow-fuchsia-900/40">
      <div>
        <h4 className="text-sm font-semibold text-slate-50">{item.title}</h4>
        <p className="mt-2 line-clamp-3 text-[11px] text-slate-300">{item.description}</p>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex flex-wrap items-center gap-1">
          <span className="rounded-full bg-slate-800 px-2 py-[2px] text-[10px] text-slate-200">
            {type}
          </span>
          <span className="rounded-full bg-slate-900 px-2 py-[2px] text-[10px] text-slate-300">
            {item.category}
          </span>
        </div>
        <a
          href={item.officialLink}
          target="_blank"
          rel="noreferrer"
          className="text-[11px] font-medium text-sky-300 underline-offset-2 hover:text-sky-200 hover:underline"
        >
          View official details
        </a>
      </div>
    </article>
  );
}

function FeaturedSchemesSection() {
  const [schemes, setSchemes] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([fetchSchemes(), fetchPolicies()])
      .then(([sRes, pRes]) => {
        setSchemes(sRes.data.slice(0, 2));
        setPolicies(pRes.data.slice(0, 1));
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError('Unable to load featured schemes and policies.');
      });
  }, []);

  return (
    <section aria-labelledby="featured-schemes-heading">
      <div className="flex items-center justify-between gap-3">
        <h3
          id="featured-schemes-heading"
          className="text-sm font-semibold text-slate-100 md:text-base"
        >
          Featured schemes &amp; policies
        </h3>
        <p className="text-[11px] text-slate-400">
          Curated highlights from key social welfare and digital initiatives
        </p>
      </div>
      {error && <p className="mt-2 text-xs text-rose-300">{error}</p>}
      <div className="mt-3 grid gap-3 md:grid-cols-3">
        {schemes.map((sch) => (
          <FeaturedCard key={sch.id} item={sch} type="Scheme" />
        ))}
        {policies.map((pol) => (
          <FeaturedCard key={pol.id} item={pol} type="Policy" />
        ))}
      </div>
    </section>
  );
}

export default FeaturedSchemesSection;
