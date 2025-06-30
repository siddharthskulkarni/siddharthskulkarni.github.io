import matter from 'gray-matter';

// Import all essay markdown files using the newer Vite glob syntax
const essayModules = import.meta.glob('../essays/*.md', { 
  query: '?raw',
  import: 'default',
  eager: true 
});

console.log('Available essay modules:', Object.keys(essayModules));

export const loadEssays = async () => {
  const essays = [];
  
  console.log('Loading essays...');
  console.log('Essay modules:', essayModules);
  
  for (const path in essayModules) {
    try {
      const content = essayModules[path];
      console.log(`Processing ${path}:`, content.substring(0, 100) + '...');
      
      const { data, content: markdownContent } = matter(content);
      
      // Extract the ID from the filename
      const id = path.split('/').pop().replace('.md', '');
      
      console.log(`Loaded essay: ${id}`, data);
      
      // Ensure all required properties exist with defaults
      const essay = {
        id,
        title: data.title || 'Untitled',
        excerpt: data.excerpt || '',
        date: data.date || new Date().toISOString().split('T')[0],
        type: data.type || 'personal',
        tags: data.tags || [],
        content: markdownContent || ''
      };
      
      console.log(`Processed essay: ${id}`, essay);
      
      essays.push(essay);
    } catch (error) {
      console.error(`Error loading essay from ${path}:`, error);
    }
  }
  
  console.log('Total essays loaded:', essays.length);
  
  // Sort by date (newest first)
  return essays.sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const loadEssayById = async (id) => {
  const essays = await loadEssays();
  return essays.find(essay => essay.id === id);
}; 