import React from "react";

const TransactionError = () => {
  return (
    <div className="flex flex-col items-center justify-between min-h-[75vh]">
      <div className="flex flex-col items-center justify-center w-full p-6">
        <div className="flex items-center justify-center w-[160px] h-[140px] rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#ff4751"
            className="h-[80px]"
          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {/* Error Message */}
        <h1 className="text-2xl font-semibold text-gray-800 mt-4">
          Oops! Something went wrong
        </h1>
        <p className="text-gray-600 text-center mt-2">
          We couldn't process your request.
        </p>
        <em className="text-gray-600 text-center mt-2">Error Message</em>
      </div>
      <div className="mt-6 w-full px-[20px]">
        <button className="w-full py-3 text-lg font-medium bg-red-600 text-white rounded-[15px] hover:bg-red-500 cursor-pointer">
          Back to wallet
        </button>
      </div>
    </div>
  );
};

export default TransactionError;
