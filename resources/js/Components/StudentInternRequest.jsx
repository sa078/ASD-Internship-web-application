import React from 'react';

const StudentInternRequest = ({ imageSrc, imageAlt }) => {
  // Buttons defined INSIDE the component
  const buttons = [
    {
      label: "Accept",
      styleType: "primary",
      onClick: () => console.log("Primary button clicked")
    },
    {
      label: "View Profile",
      styleType: "secondary",
      onClick: () => console.log("Secondary button clicked")
    },
    {
      label: "Reject",
      styleType: "danger",
      onClick: () => console.log("Delete button clicked")
    }
  ];

  return (
    <div className="p-6 text-gray-900 dark:text-gray-100">
      <div className="flex items-center gap-8">
        {/* Image Section */}
        <div className="flex-none w-48 h-48">
          <img 
            src={imageSrc} 
            alt={imageAlt}
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
        </div>
        {/* Student Information Section */}
        <div className="flex-1 space-y-2">
          <div>
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Student Name</label>
            <p className="text-lg font-semibold dark:text-white"></p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">University Name</label>
            <p className="text-gray-700 dark:text-gray-300"></p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Course Name</label>
            <p className="text-gray-700 dark:text-gray-300"></p>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="flex flex-col gap-4 ml-auto min-w-[200px]">
          {buttons.map((button, index) => (
            <button
              key={index}
              onClick={button.onClick}
              className={`
                px-6 py-3 rounded-lg transition-colors shadow-sm
                ${button.styleType === 'primary' && 'bg-blue-600 text-white hover:bg-blue-700'}
                ${button.styleType === 'secondary' && 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800'}
                ${button.styleType === 'danger' && 'text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20'}
              `}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentInternRequest;