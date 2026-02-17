import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Spinner } from 'flowbite-react';
import toast from 'react-hot-toast';
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
        const response = await fetch(`/api/tools/search?q=${encodeURIComponent(query)}`, {
          credentials: 'include'
        });
        if (!response.ok) {
          throw new Error('Failed to search tools');
        }
        const data = await response.json();
        setTools(data);
      } catch (error) {
        toast.error('Error searching tools. Please try again later.');
        console.error('Error fetching tools:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, [query]);

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto p-6 flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-8 text-teal-600 dark:text-teal-400">
        Search Results for "{query}"
      </h1>

      {/* No results message */}
      {tools.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <svg className="w-24 h-24 text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No Results Found</h3>
          <p className="text-gray-500 dark:text-gray-400">Try searching with different keywords.</p>
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
