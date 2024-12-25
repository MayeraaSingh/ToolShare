import React, { useState } from 'react';
import { TextInput, Textarea, FileInput, Button } from 'flowbite-react';

const AddToolPage = () => {
  const [formData, setFormData] = useState({
    ownerName: '',
    flatNumber: '',
    productName: '',
    productDescription: '',
    productImage: null,
    maxRentPeriod: '',
    rentPrice: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    const file = files[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      setFormData({
        ...formData,
        productImage: file, // Store the selected file
      });
    } else {
      alert('Please upload a valid image (PNG or JPG).');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    // You can send the data to an API or handle it as needed here
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 bg-white dark:bg-gray-800">
      <h1 className="text-2xl font-semibold text-center mb-6 text-teal-600 dark:text-teal-400">Register a New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Owner Name */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300" htmlFor="ownerName">
            Owner Name
          </label>
          <TextInput
            id="ownerName"
            name="ownerName"
            value={formData.ownerName}
            onChange={handleChange}
            required
            className="dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
          />
        </div>

        {/* Flat Number */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300" htmlFor="flatNumber">
            Flat Number
          </label>
          <TextInput
            id="flatNumber"
            name="flatNumber"
            value={formData.flatNumber}
            onChange={handleChange}
            required
            className="dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
          />
        </div>

        {/* Product Name */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300" htmlFor="productName">
            Product Name
          </label>
          <TextInput
            id="productName"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            required
            className="dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
          />
        </div>

        {/* Product Description */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300" htmlFor="productDescription">
            Product Description (Including damages, etc.)
          </label>
          <Textarea
            id="productDescription"
            name="productDescription"
            value={formData.productDescription}
            onChange={handleChange}
            rows="4"
            required
            className="dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
          />
        </div>

        {/* Product Image */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300" htmlFor="productImage">
            Product Image
          </label>
          <FileInput
            id="productImage"
            name="productImage"
            onChange={handleFileChange}
            accept="image/png, image/jpeg"
            required
            className="dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
          />
        </div>

        {/* Display Image */}
        {formData.productImage && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Uploaded Image</h4>
            <img
              src={URL.createObjectURL(formData.productImage)}
              alt="Product"
              className="mt-2 w-full h-auto max-w-xs mx-auto rounded-md"
            />
          </div>
        )}

        {/* Max Rent Period */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300" htmlFor="maxRentPeriod">
            Max Rent Period (in days)
          </label>
          <TextInput
            type="number"
            id="maxRentPeriod"
            name="maxRentPeriod"
            value={formData.maxRentPeriod}
            onChange={handleChange}
            min="1"
            required
            className="dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
          />
        </div>

        {/* Rent Price */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300" htmlFor="rentPrice">
            Rent Price (in INR)
          </label>
          <TextInput
            type="number"
            id="rentPrice"
            name="rentPrice"
            value={formData.rentPrice}
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
