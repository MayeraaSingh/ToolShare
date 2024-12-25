import React from 'react';
import ToolCard from '../components/ToolCard.jsx'; // Assuming you saved the component as ToolCard.js

export default function ReviewedTools() {
    const tools = [
        {
          title: 'Product 1',
          image: 'path/to/image1.jpg',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
          title: 'Product 2',
          image: 'path/to/image2.jpg',
          description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        // ... more tools
      ];
    
      const handleRentClick = (tool) => {
        // Handle rent click logic here
        console.log(`Renting: ${tool.title}`);
      };
    
      const handleRemoveClick = (tool) => {
        // Handle remove click logic here
        console.log(`Removing: ${tool.title}`);
      };
    
      return (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Saved</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {tools.map((tool) => (
              <ToolCard
                key={tool.title}
                title={tool.title}
                image={tool.image}
                description={tool.description}
                primaryButtonText={"Rent"}
                secondaryButtonText={"Remove"}
                primaryButtonAction={() => handleRentClick(tool)}
                secondaryButtonAction={() => handleRemoveClick(tool)}
              />
            ))}
          </div>
        </div>
      );
    }
