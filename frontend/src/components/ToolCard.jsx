import React from 'react';
import { Button } from 'flowbite-react';

const ToolCard = ({ title, image, description, flatNumber, primaryButtonText, primaryButtonAction, secondaryButtonText, secondaryButtonAction }) => {
  return (
    <div className=" bg-white border border-gray-200 rounded-lg shadow-md">
      <img src={image} alt="Tool Image" className="rounded-l-lg w-48 h-48 object-cover" />
      <div className="p-6">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-lg dark:bg-blue-900 dark:text-blue-300">
          Flat #{flatNumber}
        </span>
        <p className="mt-2 text-gray-500">{description}</p>
        <div className=" flex justify-between justify-end mt-4">
          <Button  onClick={primaryButtonAction}>
            {primaryButtonText}
          </Button>
          <Button  outline onClick={secondaryButtonAction}>
            {secondaryButtonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ToolCard;