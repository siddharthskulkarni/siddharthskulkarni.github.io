import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { loadEssays } from "../utils/essayLoader";
import strings from "../strings.json";

const Essays = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState([]);
  const [essays, setEssays] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load essays on component mount
  useEffect(() => {
    const fetchEssays = async () => {
      try {
        const loadedEssays = await loadEssays();
        setEssays(loadedEssays);
        const visibleTags = Array.from(
          new Set(loadedEssays.flatMap((essay) => essay.tags || []))
        )
          .filter((tag) => tag && tag !== "archive")
          .sort();
        setTags(["all", ...visibleTags]);
      } catch (error) {
        console.error("Error loading essays:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEssays();
  }, []);

  const toggleTag = (tag) => {
    if (tag === "all") {
      setSelectedTags([]);
      return;
    }

    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Filter essays based on selected criteria (union of selected tags)
  const filteredEssays = useMemo(() => {
    return essays.filter((essay) => {
      if (selectedTags.length === 0) return true;
      return selectedTags.some((tag) => (essay.tags || []).includes(tag));
    });
  }, [essays, selectedTags]);

  const clearFilters = () => {
    setSelectedTags([]);
  };

  const hasActiveFilters = selectedTags.length > 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mt-8 font-[verdana] text-normal">
      <div className="flex items-center justify-between">
          <h2 className="my-3 text-xl font-normal font-[verdana] text-blue-900">
            {strings.essays.title}
          </h2>
        </div>
      {/* {strings.essays.description ? (
        <p className="mb-8 text-gray-700 leading-relaxed">
          {strings.essays.description}
        </p>
      ) : null} */}
      {/* Filters */}
      <div className="mb-12 space-y-6">
        {/* Type Filter */}
        <div className="flex items-center space-x-6">
          {tags.map((type) => {
            const isActive =
              type === "all"
                ? selectedTags.length === 0
                : selectedTags.includes(type);

            return (
              <button
                key={type}
                onClick={() => toggleTag(type)}
                aria-pressed={type === "all" ? undefined : isActive}
                className={`text-sm  ${
                  isActive
                    ? "text-gray-900 font-medium"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {type}
              </button>
            );
          })}
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
      <div className="space-y-5 font-[verdana]">
        {filteredEssays.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No essays found.</p>
          </div>
        ) : (
          filteredEssays.map((essay) => (
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
          ))
        )}
      </div>
    </div>
  );
};

export default Essays;
