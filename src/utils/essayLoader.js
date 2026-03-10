const ESSAYS_INDEX_URL = '/essays/index.json';

let essaysIndexPromise = null;

const fetchEssaysIndex = async () => {
  const res = await fetch(ESSAYS_INDEX_URL, { cache: 'no-cache' });
  if (!res.ok) {
    throw new Error(`Failed to load essays index (${res.status})`);
  }
  const data = await res.json();
  return Array.isArray(data) ? data : [];
};

export const loadEssays = async (type = null) => {
  if (!essaysIndexPromise) {
    essaysIndexPromise = fetchEssaysIndex();
  }

  const essays = await essaysIndexPromise;
  const filteredEssays = type ? essays.filter((e) => e.type === type) : essays;

  return filteredEssays
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const loadEssayById = async (id, type = null) => {
  const essays = await loadEssays(type);
  const essayMeta = essays.find((e) => e.id === id);
  if (!essayMeta) return null;

  const cacheKey = essayMeta.hash ? `?v=${encodeURIComponent(essayMeta.hash)}` : '';
  const res = await fetch(`/essays/${encodeURIComponent(id)}.md${cacheKey}`, {
    cache: 'no-cache',
  });
  if (!res.ok) return null;
  const content = await res.text();

  return { ...essayMeta, content };
};
