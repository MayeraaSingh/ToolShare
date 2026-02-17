import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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
                console.error('Error fetching reviewed tools:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchTools();
    }, [currentUser]);
    
    const handleRentClick = (tool) => {
        console.log(`Renting: ${tool.name}`);
    };
    
    const handleRemoveClick = (tool) => {
        console.log(`Removing: ${tool.name}`);
    };

    if (loading) {
        return <div className="container mx-auto px-4 py-8">Loading...</div>;
    }
    
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Saved</h1>
            {tools.length === 0 ? (
                <p>No saved tools yet.</p>
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
