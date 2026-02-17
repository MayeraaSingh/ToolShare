import { useState, useEffect } from 'react';
import { Spinner } from 'flowbite-react';
import toast from 'react-hot-toast';
import ToolCard from '../components/ToolCard';

const ExplorePage = () => {
  // State to store tools data
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch tools data from API when component mounts
  useEffect(() => {
    const fetchTools = async () => {
      try {
        // Fetch the tools from your backend using fetch
        const response = await fetch('/api/tools/gettools'); // Replace with your actual API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch tools');
        }
        const data = await response.json();
        setTools(data);
      } catch (error) {
        toast.error('Failed to load tools. Please try again later.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto p-6 flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-8 text-teal-600 dark:text-teal-400">Explore Tools</h1>

      {/* No tools available message */}
      {tools.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <svg className="w-24 h-24 text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No Tools Available</h3>
          <p className="text-gray-500 dark:text-gray-400">Check back later for new tools to borrow!</p>
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

export default ExplorePage;
