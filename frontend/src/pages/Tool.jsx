import React from "react";
import {Button} from 'flowbite-react';
function ProductDetails() {
  return (
    <div className="container mx-auto p-4">
      <header className="flex items-center justify-between border-b pb-2">
        <h1 className="text-2xl font-bold">TOOLSHARE</h1>
      </header>

      <div className="grid grid-cols-3 gap-4 mt-4">
        {/* Image Section */}
        <div className="col-span-1 border rounded-lg flex items-center justify-center">
          <p>Image</p>
        </div>

        {/* Product Details Section */}
        <div className="col-span-2 space-y-4">
          <h2 className="text-xl font-bold">EXACT PRODUCT MODEL</h2>

          {/* Price and flat*/}
          <div className="flex justify-between">
            <div className="border rounded-lg p-2 w-32">
              <p className="text-center">Price</p>
            </div>
            <div className="border rounded-lg p-2 w-32">
              <p className="text-center">Flat</p>
            </div>
          </div>

          {/* Details */}
          <div className="border rounded-lg p-4">
            <ul className="space-y-2">
              <li>Product details</li>
              <li>Owner Name</li>
              <li>Maximum Renting Period</li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex justify-between space-x-4">
            <Button className=" text-white rounded-lg hover:bg-teal-600">
              Rent Now
            </Button>
            <Button className="rounded-lg hover:bg-gray-300" outline>
              Review For Later
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
