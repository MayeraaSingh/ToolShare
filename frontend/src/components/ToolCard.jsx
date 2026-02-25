import { Button } from 'flowbite-react';

const DaysLeftBadge = ({ daysLeft }) => {
  if (daysLeft === null || daysLeft === undefined) return null;
  let color, label;
  if (daysLeft <= 0) {
    color = 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    label = daysLeft === 0 ? 'Due today' : `${Math.abs(daysLeft)}d overdue`;
  } else if (daysLeft <= 3) {
    color = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    label = `${daysLeft}d left`;
  } else {
    color = 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    label = `${daysLeft}d left`;
  }
  return (
    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-lg ${color}`}>
      {label}
    </span>
  );
};

const ToolCard = ({ title, image, description, flatNumber, daysLeft, primaryButtonText, primaryButtonAction, secondaryButtonText, secondaryButtonAction }) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md transform transition-all hover:scale-105 hover:shadow-lg">
      <div className="flex justify-center items-center">
        <img src={image} alt="Tool Image" className="rounded-l-lg w-48 h-48 object-cover" />
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{title}</h2>
        <div className="flex flex-wrap items-center gap-2 mt-1">
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-lg dark:bg-blue-900 dark:text-blue-300">
            Flat #{flatNumber}
          </span>
          <DaysLeftBadge daysLeft={daysLeft} />
        </div>
        <p className="mt-2 text-gray-500 dark:text-gray-300">{description}</p>
        <div className="flex justify-between mt-4">
          <Button onClick={primaryButtonAction}>
            {primaryButtonText}
          </Button>
          {secondaryButtonText && (
            <Button outline onClick={secondaryButtonAction}>
              {secondaryButtonText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolCard;
