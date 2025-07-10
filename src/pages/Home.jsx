import { Link } from 'react-router-dom';
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
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-normal font-[verdana] text-blue-900">
            New:
          </h2>
        </div>

        {loading ? (
          <div className="text-gray-600">Loading...</div>
        ) : (
          <div className="space-y-5 font-[verdana]">
            {latestEssays.map((essay) => (
              <article key={essay.id} className="group">
                <Link 
                  to={`/essays/${essay.id}`}
                  className="block hover:opacity-80 transition-opacity"
                >
                  <h3 className="underline font-normal text-gray-900 mb-3 leading-tight group-hover:text-gray-700">
                    {essay.title}
                  </h3>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home; 