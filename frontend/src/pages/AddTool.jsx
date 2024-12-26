import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { TextInput, Textarea, FileInput, Button } from 'flowbite-react';

const AddToolPage = () => {
    const currentUser = useSelector((state) => state.user); // Assuming user details are stored in Redux
    const [toolData, setToolData] = useState({
        productName: '',
        description: '',
        owner: currentUser?.name || '',
        flatNumber: currentUser?.flatNumber || '',
        image: '',
        max: 1,
        price: 0.0,
    });

    // Handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setToolData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle file input change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setToolData((prev) => ({
            ...prev,
            image: file,
        }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!currentUser) {
          alert('Please sign in to add a tool');
          return;
      }
  
      const { productName, description, image, flatNumber, max, price } = toolData;
  
      try {
          const response = await fetch('/api/tools/add', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  name: productName,
                  description,
                  owner: currentUser._id,  // Pass current user's ID
                  flatNumber,
                  image,
                  max,
                  price,
              }),
          });
  
          const data = await response.json();
  
          if (response.ok) {
              setToolData({
                  productName: '',
                  description: '',
                  image: '',
                  max: 1,
                  price: 0.00,
                  flatNumber: '',
              });
  
              alert('Tool added successfully!');
          } else {
              alert(`Error: ${data.message}`);
          }
      } catch (error) {
          console.error('Error adding tool:', error);
          alert('Failed to add the tool');
      }
  };
  

    return (
        <div className="w-full max-w-xl mx-auto p-6 bg-white dark:bg-gray-800">
            <h1 className="text-2xl font-semibold text-center mb-6 text-teal-600 dark:text-teal-400">
                Register a New Tool
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Owner Name */}
                <div className="mb-4">
                    <label
                        className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300"
                        htmlFor="owner"
                    >
                        Owner Name
                    </label>
                    <TextInput
                        id="owner"
                        name="owner"
                        value={toolData.owner}
                        onChange={handleChange}
                        required
                        className="dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                    />
                </div>

                {/* Flat Number */}
                <div className="mb-4">
                    <label
                        className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300"
                        htmlFor="flatNumber"
                    >
                        Flat Number
                    </label>
                    <TextInput
                        id="flatNumber"
                        name="flatNumber"
                        value={toolData.flatNumber}
                        onChange={handleChange}
                        required
                        className="dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                    />
                </div>

                {/* Product Name */}
                <div className="mb-4">
                    <label
                        className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300"
                        htmlFor="productName"
                    >
                        Product Name
                    </label>
                    <TextInput
                        id="productName"
                        name="productName"
                        value={toolData.productName}
                        onChange={handleChange}
                        required
                        className="dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                    />
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label
                        className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300"
                        htmlFor="description"
                    >
                        Description
                    </label>
                    <Textarea
                        id="description"
                        name="description"
                        value={toolData.description}
                        onChange={handleChange}
                        rows="4"
                        required
                        className="dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                    />
                </div>

                {/* Product Image */}
                <div className="mb-4">
                    <label
                        className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300"
                        htmlFor="image"
                    >
                        Product Image
                    </label>
                    <FileInput
                        id="image"
                        name="image"
                        onChange={handleFileChange}
                        accept="image/png, image/jpeg"
                        required
                        className="dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                    />
                </div>

                {/* Max Rent Period */}
                <div className="mb-4">
                    <label
                        className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300"
                        htmlFor="max"
                    >
                        Maximum Rental Period (in days)
                    </label>
                    <TextInput
                        type="number"
                        id="max"
                        name="max"
                        value={toolData.max}
                        onChange={handleChange}
                        min="1"
                        required
                        className="dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                    />
                </div>

                {/* Rent Price */}
                <div className="mb-4">
                    <label
                        className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300"
                        htmlFor="price"
                    >
                        Rent Price (in INR)
                    </label>
                    <TextInput
                        type="number"
                        id="price"
                        name="price"
                        value={toolData.price}
                        onChange={handleChange}
                        min="0"
                        required
                        className="dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                    />
                </div>

                {/* Submit Button */}
                <div className="mb-4">
                    <Button
                        type="submit"
                        className="w-full py-2 px-4 text-white font-semibold rounded-md hover:bg-blue-700 dark:bg-teal-700 dark:hover:bg-teal-800"
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddToolPage;
