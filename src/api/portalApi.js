// API abstraction layer for the National Government Information Portal.
// Currently reads from local JSON data but mimics axios-based API responses
// so that real HTTP endpoints can be plugged in later without changing callers.

import services from '../data/services.json';
import schemes from '../data/schemes.json';
import policies from '../data/policies.json';
import statistics from '../data/statistics.json';
import news from '../data/news.json';

export async function fetchServices() {
  return Promise.resolve({ data: services });
}

export async function fetchSchemes() {
  return Promise.resolve({ data: schemes });
}

export async function fetchPolicies() {
  return Promise.resolve({ data: policies });
}

export async function fetchStatistics() {
  return Promise.resolve({ data: statistics });
}

export async function fetchNews() {
  return Promise.resolve({ data: news });
}

export async function fetchAllCatalogue() {
  return Promise.all([fetchServices(), fetchSchemes(), fetchPolicies()]).then(
    ([servicesRes, schemesRes, policiesRes]) => ({
      data: {
        services: servicesRes.data,
        schemes: schemesRes.data,
        policies: policiesRes.data
      }
    })
  );
}
