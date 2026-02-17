import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ToolCard from '../components/ToolCard';  // Import ToolCard component

const RegisteredTools = () => {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    // Fetch the tools owned by the current user
    const fetchTools = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`/api/tools/owned/${currentUser.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch tools');
        }
        const data = await response.json();
        setTools(data);
      } catch (err) {
        alert('Error fetching tools. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, [currentUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-left text-teal-600 dark:text-gray-400 mb-6">Registered Tools</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tools.map((tool) => (
          <ToolCard
            key={tool.id}  // Ensure you have a unique id for each tool
            title={tool.title}
            image={tool.image}  // Add your tool's image URL here
            description={tool.description}
            flatNumber={tool.flatNumber}
            primaryButtonText="Action"  // Add appropriate button text
            primaryButtonAction={() => {/* Add action logic here */}}
            secondaryButtonText="More Info"
            secondaryButtonAction={() => {/* Add secondary action logic here */}}
          />
        ))}
      </div>
    </div>
  );
};

export default RegisteredTools;
