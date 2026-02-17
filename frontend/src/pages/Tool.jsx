import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Button, Spinner } from 'flowbite-react';
import toast from 'react-hot-toast';

function ProductDetails() {
  const { toolId } = useParams();
  const [tool, setTool] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTool = async () => {
      try {
        const response = await fetch(`/api/tools/${toolId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch tool details');
        }
        const data = await response.json();
        setTool(data);
      } catch (error) {
        toast.error('Failed to load tool details. Please try again later.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (toolId) {
      fetchTool();
    }
  }, [toolId]);

  const handleRentNow = () => {
    toast.success('Rent functionality coming soon!');
  };

  const handleReviewLater = () => {
    toast.success('Review for later functionality coming soon!');
  };

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto p-6 flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex flex-col items-center justify-center py-12">
          <svg className="w-24 h-24 text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Tool Not Found</h3>
          <p className="text-gray-500 dark:text-gray-400">This tool doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <header className="flex items-center justify-between border-b pb-2 mb-6">
        <h1 className="text-2xl font-bold text-teal-600 dark:text-teal-400">TOOLSHARE</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Image Section */}
        <div className="col-span-1 border rounded-lg flex items-center justify-center bg-gray-100 dark:bg-gray-800 overflow-hidden">
          {tool.image ? (
            <img src={tool.image} alt={tool.name} className="w-full h-auto object-cover" />
          ) : (
            <div className="p-8 text-center">
              <svg className="w-24 h-24 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-500 mt-2">No Image</p>
            </div>
          )}
        </div>

        {/* Product Details Section */}
        <div className="col-span-1 md:col-span-2 space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{tool.name}</h2>

          {/* Price and flat */}
          <div className="flex gap-4">
            <div className="border rounded-lg p-4 flex-1 bg-teal-50 dark:bg-teal-900">
              <p className="text-sm text-gray-600 dark:text-gray-300">Price</p>
              <p className="text-xl font-bold text-teal-600 dark:text-teal-400">₹{tool.price || 0}/day</p>
            </div>
            <div className="border rounded-lg p-4 flex-1 bg-teal-50 dark:bg-teal-900">
              <p className="text-sm text-gray-600 dark:text-gray-300">Owner Flat</p>
              <p className="text-xl font-bold text-teal-600 dark:text-teal-400">{tool.owner?.flatNumber || 'N/A'}</p>
            </div>
          </div>

          {/* Details */}
          <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
            <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">Details</h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li><strong>Description:</strong> {tool.description || 'No description available'}</li>
              <li><strong>Owner Name:</strong> {tool.owner?.username || 'Unknown'}</li>
              <li><strong>Maximum Quantity:</strong> {tool.max || 1}</li>
              <li><strong>Available:</strong> {tool.currentlyAvailable ? 'Yes' : 'No'}</li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <Button 
              className="flex-1" 
              onClick={handleRentNow}
              disabled={!tool.currentlyAvailable}
            >
              {tool.currentlyAvailable ? 'Rent Now' : 'Not Available'}
            </Button>
            <Button 
              className="flex-1" 
              outline
              onClick={handleReviewLater}
            >
              Save For Later
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
