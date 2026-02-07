import React, { useMemo, useState } from 'react';
import schemes from '../data/schemes.json';
import { evaluateEligibilityForSchemes } from '../eligibility/engine';

const INCOME_OPTIONS = [
  { label: 'Below ₹2,50,000', value: 200000 },
  { label: '₹2,50,000 – ₹5,00,000', value: 400000 },
  { label: '₹5,00,000 – ₹10,00,000', value: 800000 },
  { label: 'Above ₹10,00,000', value: 1200000 }
];

const CATEGORY_OPTIONS = ['General', 'SC', 'ST', 'OBC', 'Minority'];

const STATE_OPTIONS = [
  'Andhra Pradesh',
  'Delhi',
  'Gujarat',
  'Karnataka',
  'Maharashtra',
  'Tamil Nadu',
  'Uttar Pradesh',
  'West Bengal',
  'Other'
];

function EligibilitySection() {
  const [age, setAge] = useState('');
  const [incomeValue, setIncomeValue] = useState(INCOME_OPTIONS[0].value);
  const [state, setState] = useState('Delhi');
  const [category, setCategory] = useState('General');
  const [profileTag, setProfileTag] = useState('student');
  const [submitted, setSubmitted] = useState(false);

  const results = useMemo(() => {
    if (!submitted) return [];
    const income = Number(incomeValue) || 0;
    const parsedAge = Number(age) || 0;

    return evaluateEligibilityForSchemes(schemes, {
      age: parsedAge,
      income,
      state,
      category,
      tags: [profileTag]
    });
  }, [submitted, age, incomeValue, state, category, profileTag]);

  const anyEligible = results.some((r) => r.eligible);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      aria-labelledby="eligibility-heading"
      className="rounded-2xl border border-emerald-700/60 bg-slate-950/80 p-4 shadow-lg shadow-emerald-900/40 md:p-6"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="md:max-w-sm">
          <h3
            id="eligibility-heading"
            className="text-sm font-semibold text-emerald-300 md:text-base"
          >
            AI-style eligibility checker
          </h3>
          <p className="mt-2 text-[11px] text-slate-300 md:text-xs">
            Answer a few questions to see which flagship schemes you may be eligible
            for. This checker uses rule-based logic and does not collect or store any
            personal data.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="mt-3 grid flex-1 gap-3 text-xs md:mt-0 md:grid-cols-2"
        >
          <div>
            <label
              htmlFor="elig-age"
              className="block text-[11px] font-medium text-slate-200"
            >
              Age (years)
            </label>
            <input
              id="elig-age"
              type="number"
              min="0"
              max="120"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              className="mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-50 outline-none ring-0 focus:border-govGold"
            />
          </div>
          <div>
            <label
              htmlFor="elig-income"
              className="block text-[11px] font-medium text-slate-200"
            >
              Approximate annual family income
            </label>
            <select
              id="elig-income"
              value={incomeValue}
              onChange={(e) => setIncomeValue(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-50 outline-none focus:border-govGold"
            >
              {INCOME_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="elig-state"
              className="block text-[11px] font-medium text-slate-200"
            >
              State / Union Territory
            </label>
            <select
              id="elig-state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-50 outline-none focus:border-govGold"
            >
              {STATE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="elig-category"
              className="block text-[11px] font-medium text-slate-200"
            >
              Social category
            </label>
            <select
              id="elig-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-50 outline-none focus:border-govGold"
            >
              {CATEGORY_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <div>
            <span className="block text-[11px] font-medium text-slate-200">
              Profile
            </span>
            <div className="mt-1 flex flex-wrap gap-2">
              {['student', 'farmer', 'urban poor', 'worker'].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setProfileTag(tag)}
                  className={`rounded-full border px-3 py-1 text-[11px] ${
                    profileTag === tag
                      ? 'border-emerald-400 bg-emerald-400 text-slate-900'
                      : 'border-slate-700 bg-slate-900 text-slate-100 hover:border-slate-500'
                  }`}
                >
                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-end justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-md bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-900 shadow-sm hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              Check eligibility
            </button>
          </div>
        </form>
      </div>

      <div className="mt-4 rounded-xl border border-emerald-700/60 bg-slate-950/90 p-3 text-xs">
        {!submitted && (
          <p className="text-[11px] text-slate-300">
            Once you fill the details and select &quot;Check eligibility&quot;, a
            summary of potentially relevant schemes will appear here, along with a clear
            explanation of the logic used.
          </p>
        )}
        {submitted && results.length > 0 && (
          <>
            <p
              className={`mb-2 text-[11px] font-semibold ${
                anyEligible ? 'text-emerald-300' : 'text-amber-300'
              }`}
            >
              {anyEligible
                ? 'Based on your inputs, you may be eligible for the following schemes:'
                : 'Based on your inputs, no featured scheme appears to fully match all conditions. Please review the explanations below and confirm details on official portals.'}
            </p>
            <div className="space-y-2">
              {results.map((res) => (
                <div
                  key={res.scheme.id}
                  className="rounded-lg border border-slate-800 bg-slate-900/80 p-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[12px] font-semibold text-slate-50">
                      {res.scheme.title}
                    </p>
                    <span
                      className={`rounded-full px-2 py-[1px] text-[10px] font-semibold ${
                        res.eligible
                          ? 'bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-400/60'
                          : 'bg-rose-500/5 text-rose-300 ring-1 ring-rose-400/40'
                      }`}
                    >
                      {res.eligible ? 'Eligible' : 'Not eligible'}
                    </span>
                  </div>
                  <p className="mt-1 whitespace-pre-line text-[11px] text-slate-300">
                    {res.reason}
                  </p>
                  <a
                    href={res.scheme.officialLink}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-block text-[11px] text-sky-300 underline-offset-2 hover:text-sky-200 hover:underline"
                  >
                    View full eligibility on official portal
                  </a>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default EligibilitySection;
