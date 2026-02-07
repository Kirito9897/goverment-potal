import { useEffect, useMemo, useState } from 'react';
import { fetchAllCatalogue } from '../api/portalApi';

export function useGlobalSearch() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [data, setData] = useState({ services: [], schemes: [], policies: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchAllCatalogue()
      .then((res) => {
        if (!cancelled) {
          setData(res.data);
          setError(null);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError('Unable to load catalogue data at the moment.');
          console.error(err);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const results = useMemo(() => {
    const allItems = [
      ...data.services.map((item) => ({ ...item, itemType: 'Service' })),
      ...data.schemes.map((item) => ({ ...item, itemType: 'Scheme' })),
      ...data.policies.map((item) => ({ ...item, itemType: 'Policy' }))
    ];

    const normalisedQuery = query.trim().toLowerCase();

    return allItems.filter((item) => {
      if (activeCategory !== 'All' && item.category !== activeCategory) {
        return false;
      }

      if (!normalisedQuery) return true;

      const haystack =
        `${item.title} ${item.description} ${(item.tags || []).join(' ')}`.toLowerCase();

      return haystack.includes(normalisedQuery);
    });
  }, [data, query, activeCategory]);

  return {
    query,
    setQuery,
    activeCategory,
    setActiveCategory,
    results,
    loading,
    error
  };
}
