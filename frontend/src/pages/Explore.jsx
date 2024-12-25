import React, { useState } from 'react';
import { Card, Button } from 'flowbite-react';

const ExplorePage = () => {
  // Example product data (hardcode will be replaced with api))
  const [tools, setTools] = useState([
    { id: 1, productName: "Power Drill", flatNumber: "A101", productImage: "/path/to/image1.jpg" },
    { id: 2, productName: "Lawn Mower", flatNumber: "B202", productImage: "/path/to/image2.jpg" },
    { id: 3, productName: "Electric Saw", flatNumber: "C303", productImage: "/path/to/image3.jpg" },
    { id: 4, productName: "Hammer", flatNumber: "D404", productImage: "/path/to/image4.jpg" },
    { id: 5, productName: "Screwdriver Set", flatNumber: "E505", productImage: "/path/to/image5.jpg" },
    { id: 6, productName: "Wrench Set", flatNumber: "F606", productImage: "/path/to/image6.jpg" },
    { id: 7, productName: "Chainsaw", flatNumber: "G707", productImage: "/path/to/image7.jpg" },
    { id: 8, productName: "Paint Sprayer", flatNumber: "H808", productImage: "/path/to/image8.jpg" },
    { id: 9, productName: "Pressure Washer", flatNumber: "I909", productImage: "/path/to/image9.jpg" },
    {id: 10, productName: "Pressure Cooker", flatNumber: "I1010", productImage: "/path/to/image10.jpg" },
  ]);

  const [visibleTools, setVisibleTools] = useState(tools.length); // Display all tools initially
  const [hasMore, setHasMore] = useState(false); // No need to load more as all tools are visible

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
        {tools.slice(0, visibleTools).map((tool) => (
          <Card key={tool.id} className="p-4 text-center w-full max-w-xs mx-auto">
            <img src={tool.productImage} alt={tool.productName} className="w-full h-32 object-cover mb-4 rounded-md" />
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">{tool.productName}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{tool.flatNumber}</p>
          </Card>
        ))}
      </div>

      {/* Load More Button (hidden as all tools are loaded) */}
      {tools.length>9 && hasMore && (
        <div className="text-center mt-6">
          <Button onClick={() => setVisibleTools(visibleTools + 3)} className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white">
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};

export default ExplorePage;
