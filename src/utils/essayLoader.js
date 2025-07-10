import matter from 'gray-matter';

// Import all writing markdown files using the newer Vite glob syntax
const writingModules = import.meta.glob('../essays/*.md', { 
  query: '?raw',
  import: 'default',
  eager: true 
});

// console.log('Available writing modules:', Object.keys(writingModules));

export const loadEssays = async () => {
  const essays = [];
  
  // console.log('Loading...');
  // console.log('Essay modules:', writingModules);
  
  for (const path in writingModules) {
    try {
      const content = writingModules[path];
      // console.log(`Processing ${path}:`, content.substring(0, 100) + '...');
      
      const { data, content: markdownContent } = matter(content);
      
      // Extract the ID from the filename
      const id = path.split('/').pop().replace('.md', '');
      
      // console.log(`Loaded writing: ${id}`, data);
      
      // Ensure all required properties exist with defaults
      const writing = {
        id,
        title: data.title || 'Untitled',
        excerpt: data.excerpt || '',
        date: data.date || new Date().toISOString().split('T')[0],
        tags: data.tags || [],
        content: markdownContent || ''
      };
      
      // console.log(`Processed writing: ${id}`, writing);
      
      essays.push(writing);
    } catch (error) {
      console.error(`Error loading writing from ${path}:`, error);
    }
  }
  
  // console.log('Total essays loaded:', essays.length);
  
  // Sort by date (newest first)
  return essays.sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const loadEssayById = async (id) => {
  const essays = await loadEssays();
  return essays.find(writing => writing.id === id);
}; 