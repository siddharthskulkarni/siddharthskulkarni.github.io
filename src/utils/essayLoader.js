import matter from 'gray-matter';

// Import all writing markdown files using the newer Vite glob syntax
const writingModules = import.meta.glob('../essays/*.md', { 
  query: '?raw',
  import: 'default',
  eager: true 
});

export const loadEssays = async (type = null) => {
  const essays = [];
  
  for (const path in writingModules) {
    try {
      const content = writingModules[path];
      const { data, content: markdownContent } = matter(content);
      const id = path.split('/').pop().replace('.md', '');

      const writing = {
        id,
        title: data.title || 'Untitled',
        excerpt: data.excerpt || '',
        date: data.date || new Date().toISOString().split('T')[0],
        type: data.type || 'draft',
        tags: data.tags || [],
        content: markdownContent || ''
      };

      essays.push(writing);
    } catch (error) {
      console.error(`Error loading writing from ${path}:`, error);
    }
  }

  // Filter by type if provided
  const filteredEssays = type ? essays.filter(e => e.type === type) : essays;

  // Sort by date (newest first)
  return filteredEssays.sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const loadEssayById = async (id, type = null) => {
  const essays = await loadEssays(type);
  return essays.find(writing => writing.id === id);
};