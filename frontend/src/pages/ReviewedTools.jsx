import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Spinner } from 'flowbite-react';
import toast from 'react-hot-toast';
import ToolCard from '../components/ToolCard.jsx';

export default function ReviewedTools() {
    const [tools, setTools] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchTools = async () => {
            if (!currentUser) {
                setLoading(false);
                return;
            }
            try {
                // Fetch user data with populated toolsReviewed
                const response = await fetch(`/api/users/${currentUser.email}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch reviewed tools');
                }
                const data = await response.json();
                setTools(data.toolsReviewed || []);
            } catch (err) {
                toast.error('Error fetching reviewed tools. Please try again later.');
                console.error('Error fetching reviewed tools:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchTools();
    }, [currentUser]);
    
    const handleRentClick = (tool) => {
        toast.success(`Rent functionality for ${tool.name} coming soon!`);
    };
    
    const handleRemoveClick = (tool) => {
        toast.success(`Remove functionality for ${tool.name} coming soon!`);
    };

    if (loading) {
        return (
            <div className="w-full max-w-7xl mx-auto p-6 flex justify-center items-center min-h-screen">
                <Spinner size="xl" />
            </div>
        );
    }
    
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Saved</h1>
            {tools.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12">
                    <svg className="w-24 h-24 text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No Saved Tools</h3>
                    <p className="text-gray-500 dark:text-gray-400">Save tools to review them later.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {tools.map((tool) => (
                        <ToolCard
                            key={tool._id}
                            title={tool.name}
                            image={tool.image}
                            description={tool.description}
                            flatNumber={tool.owner?.flatNumber}
                            primaryButtonText={"Rent"}
                            secondaryButtonText={"Remove"}
                            primaryButtonAction={() => handleRentClick(tool)}
                            secondaryButtonAction={() => handleRemoveClick(tool)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
