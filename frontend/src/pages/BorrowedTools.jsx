import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Spinner } from 'flowbite-react';
import toast from 'react-hot-toast';
import ToolCard from '../components/ToolCard';  // Import ToolCard component

const BorrowedTools = () => {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    // Fetch the tools borrowed by the current user
    const fetchTools = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`/api/tools/borrowed/${currentUser.id}`, {
          credentials: 'include'
        });
        if (!response.ok) {
          throw new Error('Failed to fetch borrowed tools');
        }
        const data = await response.json();
        setTools(data);  // Assuming your API returns an array
      } catch (err) {
        toast.error('Error fetching borrowed tools. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto p-6 flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-left text-teal-600 dark:text-gray-400 mb-6">Borrowed Tools</h1>
      
      {/* Empty state */}
      {tools.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <svg className="w-24 h-24 text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No Borrowed Tools</h3>
          <p className="text-gray-500 dark:text-gray-400">You haven't borrowed any tools yet.</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tools.map((tool) => (
          <ToolCard
            key={tool._id}
            title={tool.name}
            image={tool.image}
            description={tool.description}
            flatNumber={tool.owner?.flatNumber}
            primaryButtonText="Renew"
            primaryButtonAction={() => toast.success('Renew functionality coming soon!')}
            secondaryButtonText="Return"
            secondaryButtonAction={() => toast.success('Return functionality coming soon!')}
          />
        ))}
      </div>
    </div>
  );
};

export default BorrowedTools;
