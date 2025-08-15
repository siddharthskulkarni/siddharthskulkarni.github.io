import { useState, useMemo, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { loadEssays } from "../utils/essayLoader";

const Essays = () => {
  const location = useLocation();
  const [selectedTag, setSelectedTag] = useState("all");
  const [tags, setTags] = useState([]);
  const [essays, setEssays] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load essays on component mount
  useEffect(() => {
    const fetchEssays = async () => {
      try {
        const type = location.pathname.includes("math") ? "math" : "misc";        
        const loadedEssays = await loadEssays(type);
        setEssays(loadedEssays);
        setTags([
          "all",
          ...new Set(loadedEssays.map((essay) => essay.tags).flat()),
        ]);
      } catch (error) {
        console.error("Error loading essays:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEssays();
  }, [location.pathname]);

  // Filter essays based on selected criteria
  const filteredEssays = useMemo(() => {
    return essays.filter((essay) => {
      // Filter by tags
      if (selectedTag !== "all" && !essay.tags.includes(selectedTag)) {
        return false;
      }

      return true;
    });
  }, [essays, selectedTag]);

  const clearFilters = () => {
    setSelectedTag("all");
  };

  const hasActiveFilters = selectedTag !== "all";

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto font-[verdana] text-normal">
      <div className="flex items-center justify-between">
          <h2 className="my-3 text-xl font-normal font-[verdana] text-blue-900">
            Essays / Notes
          </h2>
        </div>
      {/* Filters */}
      <div className="mb-12 space-y-6">
        {/* Type Filter */}
        <div className="flex items-center space-x-6">
          {tags.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedTag(type)}
              className={`text-sm  ${
                selectedTag === type
                  ? "text-gray-90text-lg 0 font-medium"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {type}
            </button>
          ))}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm underline text-gray-500 hover:text-gray-700"
            >
              clear
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="space-y-12">
        {filteredEssays.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No essays found.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredEssays.map((essay) => (
              <article key={essay.id} className="group">
                <Link
                  to={`/essays/${essay.id}`}
                  className="block transition-opacity"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight group-hover:text-gray-700">
                    {essay.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    {essay.excerpt}
                  </p>
                </Link>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-4">
                    {/* <span className="text-sm text-gray-500">
                        {new Date(essay.date).toLocaleString('en-US', {month: "short"}) + ' ' +new Date(essay.date).getFullYear()}
                      </span> */}
                    {/* <span className="text-sm text-gray-500">
                        {essay.tags.join(' ')}
                      </span> */}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Essays;
