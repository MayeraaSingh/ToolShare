import React, { useState, useEffect } from 'react';
import { Card } from 'flowbite-react';

const ExplorePage = () => {
  // State to store tools data
  const [tools, setTools] = useState([]);

  // Fetch tools data from API when component mounts
  useEffect(() => {
    const fetchTools = async () => {
      try {
        // Fetch the tools from your backend using fetch
        const response = await fetch('/api/tools/gettools'); // Replace with your actual API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTools(data);
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchTools();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-8 text-teal-600 dark:text-teal-400">Explore Tools</h1>

      {/* No tools available message */}
      {tools.length === 0 && (
        <div className="text-center text-gray-600 dark:text-gray-300">
          <p>No tools available at the moment.</p>
        </div>
      )}

      {/* Tool Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <Card key={tool.id} className="p-4 text-center w-full max-w-xs mx-auto">
            <img src={tool.productImage} alt={tool.productName} className="w-full h-32 object-cover mb-4 rounded-md" />
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">{tool.productName}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{tool.flatNumber}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;
