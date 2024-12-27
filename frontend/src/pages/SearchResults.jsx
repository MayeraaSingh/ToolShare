import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Card } from 'flowbite-react';

const SearchResultsPage = () => {
  const [tools, setTools] = useState([]);
  const location = useLocation();

  // Get the search query from the URL
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('q') || ''; // Default to empty string if no query

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await fetch('/api/tools/search'); // Replace with your actual API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTools(data);
      } catch (error) {
        console.error('Error fetching tools:', error);
      }
    };

    fetchTools();
  }, []);

  // Filter tools based on the search query
  const filteredTools = tools.filter(
    (tool) =>
      tool.productName.toLowerCase().includes(query.toLowerCase()) ||
      tool.flatNumber.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-8 text-teal-600 dark:text-teal-400">
        Search Results for "{query}"
      </h1>

      {/* No results message */}
      {filteredTools.length === 0 && (
        <div className="text-center text-gray-600 dark:text-gray-300">
          <p>No tools found for your search term.</p>
        </div>
      )}

      {/* Tool Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredTools.map((tool) => (
          <Card key={tool.id} className="p-4 text-center w-full max-w-xs mx-auto">
            <img
              src={tool.productImage}
              alt={tool.productName}
              className="w-full h-32 object-cover mb-4 rounded-md"
            />
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
              {tool.productName}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{tool.flatNumber}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SearchResultsPage;
