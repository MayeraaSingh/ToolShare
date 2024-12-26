import React from 'react';
import { Button } from 'flowbite-react';

const ToolCard = ({ title, image, description, flatNumber, primaryButtonText, primaryButtonAction, secondaryButtonText, secondaryButtonAction }) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md transform transition-all hover:scale-105 hover:shadow-lg">
      <div className="flex justify-center items-center">
        <img src={image} alt="Tool Image" className="rounded-l-lg w-48 h-48 object-cover" />
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{title}</h2>
        <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-lg dark:bg-blue-900 dark:text-blue-300">
          Flat #{flatNumber}
        </span>
        <p className="mt-2 text-gray-500 dark:text-gray-300">{description}</p>
        <div className="flex justify-between justify-end mt-4">
          <Button onClick={primaryButtonAction}>
            {primaryButtonText}
          </Button>
          <Button outline onClick={secondaryButtonAction}>
            {secondaryButtonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ToolCard;
