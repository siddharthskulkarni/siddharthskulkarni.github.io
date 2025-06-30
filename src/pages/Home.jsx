import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { loadEssays } from '../utils/essayLoader';

const Home = () => {
  const [essays, setEssays] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const latestEssays = essays.slice(0, 3);

  return (
    <div className="max-w-3xl mx-auto space-y-16">
      {/* Hero Section */}
      <section className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Siddharth Kulkarni
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          I write about technology, mathematics, and the intersection of ideas. 
          Currently exploring the frontiers of AI and computational thinking.
        </p>
      </section>

      {/* Latest Work */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Latest Essays
          </h2>
          <Link 
            to="/essays" 
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <span>View all</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="text-gray-600 dark:text-gray-300">Loading essays...</div>
        ) : (
          <div className="space-y-8">
            {latestEssays.map((essay) => (
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
                  
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 leading-tight group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
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
      </section>

      {/* About Section */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          About
        </h2>
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            I'm passionate about understanding complex systems and sharing insights through writing. 
            My work spans across mathematics, computer science, and their applications in the real world. 
            I believe in the power of clear thinking and elegant solutions.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            When I'm not writing or coding, you can find me exploring new ideas, 
            reading about emerging technologies, or working on interesting problems.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home; 