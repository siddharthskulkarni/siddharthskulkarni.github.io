import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { loadEssays } from '../utils/essayLoader';

const Essays = () => {
  const [selectedType, setSelectedType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [essays, setEssays] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load essays on component mount
  useEffect(() => {
    const fetchEssays = async () => {
      try {
        const loadedEssays = await loadEssays();
        setEssays(loadedEssays);
      } catch (error) {
        console.error('Error loading essays:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEssays();
  }, []);

  // Filter essays based on selected criteria
  const filteredEssays = useMemo(() => {
    return essays.filter(essay => {
      // Filter by type
      if (selectedType !== 'all' && essay.type !== selectedType) {
        return false;
      }

      // Filter by search query
      if (searchQuery && !essay.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !essay.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      return true;
    });
  }, [essays, selectedType, searchQuery]);

  const clearFilters = () => {
    setSelectedType('all');
    setSearchQuery('');
  };

  const hasActiveFilters = selectedType !== 'all' || searchQuery;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-gray-600 dark:text-gray-300">Loading essays...</div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-16">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Essays
        </h1>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          Thoughts on technology, mathematics, and the intersection of ideas.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-12 space-y-6">
        {/* Search */}
        <div>
          <input
            type="text"
            placeholder="Search essays..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-0 py-2 border-b border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-gray-900 dark:focus:border-gray-100 transition-colors"
          />
        </div>

        {/* Type Filter */}
        <div className="flex items-center space-x-6">
          {['all', 'technical', 'personal'].map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`text-sm transition-colors ${
                selectedType === type
                  ? 'text-gray-900 dark:text-white font-medium'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="space-y-12">
        {filteredEssays.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No essays found matching your criteria.
            </p>
            <button
              onClick={clearFilters}
              className="mt-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredEssays.map((essay) => (
              <article key={essay.id} className="group">
                <Link 
                  to={`/essays/${essay.id}`}
                  className="block hover:opacity-80 transition-opacity"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(essay.date).getFullYear()}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {essay.type}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 leading-tight group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                    {essay.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {essay.excerpt}
                  </p>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Essays; 