import React from 'react';
import ToolCard from '../components/ToolCard.jsx'; // Assuming you saved the component as ToolCard.js

export default function ReviewedTools() {
    const tools = [
      
        {
          "id": 1,
          "title": "Hammer",
          "image": "data:image/jpeg;base64,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",
          "description": "A sturdy hammer for construction and repairs.",
          "flatNumber": "101"
        },
        {
          "id": 2,
          "title": "Drill",
          "image": "https://media.istockphoto.com/id/184639599/photo/power-drill-with-large-bit.jpg?s=612x612&w=0&k=20&c=TJczKvZqLmWc5c5O6r86jelaUbYFLCZnwA_uWlhHOG0=",
          "description": "A powerful drill for various DIY projects.",
          "flatNumber": "102"
        },
        {
          "id": 3,
          "title": "Wrench",
          "image": "https://www.harborfreight.com/media/catalog/product/cache/95ddc68b3b409c753b895e31eaf85ef8/9/5/95552_W3.jpg",
          "description": "A versatile wrench for tightening and loosening bolts.",
          "flatNumber": "103"
        }
      
      
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
                flatNumber={tool.flatNumber}
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
