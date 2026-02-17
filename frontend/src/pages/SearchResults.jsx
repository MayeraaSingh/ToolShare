import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ToolCard from '../components/ToolCard';

const SearchResultsPage = () => {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Get the search query from the URL
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('q') || '';

  useEffect(() => {
    const fetchTools = async () => {
      if (!query) {
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`/api/tools/search?q=${encodeURIComponent(query)}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTools(data);
      } catch (error) {
        console.error('Error fetching tools:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, [query]);

  if (loading) {
    return <div className="w-full max-w-7xl mx-auto p-6">Loading...</div>;
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-8 text-teal-600 dark:text-teal-400">
        Search Results for "{query}"
      </h1>

      {/* No results message */}
      {tools.length === 0 && (
        <div className="text-center text-gray-600 dark:text-gray-300">
          <p>No tools found for your search term.</p>
        </div>
      )}

      {/* Tool Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <ToolCard
            key={tool._id}
            title={tool.name}
            image={tool.image}
            description={tool.description}
            flatNumber={tool.owner?.flatNumber}
            primaryButtonText="View"
            primaryButtonAction={() => console.log('View tool', tool._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResultsPage;
