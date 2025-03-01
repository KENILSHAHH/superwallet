import React from "react";

const BridgeToken = ({ setIsSwap, tokenDetails }) => {
  return (
    <div className="flex flex-col p-[10px] min-h-[80vh] justify-between">
      <div className="flex flex-col gap-y-[10px] p-[10px] px-[20px]">
        <div className="flex gap-x-[20px] items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 cursor-pointer"
            onClick={() => {
              setIsSwap(false);
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          <h1 className="font-[500] text-[26px]">Bridge</h1>
        </div>
        {/* Input Section */}
        <div className="flex w-full p-4">
          <div className="flex flex-col w-full gap-y-2">
            <input
              type="number"
              className=" w-[180px] text-[32px] font-semibold bg-transparent outline-none"
              placeholder="0.0005"
              defaultValue={0.0005}
            />
            <span className="text-gray-500 text-[18px]">$1.08</span>
          </div>

          <div className="">
            <select
              name="token"
              id="token"
              className="w-full p-2 bg-gray-100 rounded-lg"
            >
              <option value="">Alpha-1</option>
              <option value="alpha2">Alpha-2</option>
            </select>
            <span className="text-gray-500 text-sm">0.0005 ETH</span>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex items-center justify-center w-full">
          <div className="border border-gray-300 rounded-full p-[5px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"
              />
            </svg>
          </div>
        </div>

        {/* Output Section */}
        <div className="flex items-center w-full p-4">
          <div className="flex flex-col w-full gap-y-2">
            <input
              type="number"
              className=" w-[180px] text-[32px] font-semibold bg-transparent outline-none"
              value={0.0005}
              readOnly
            />
            <span className="text-gray-500 text-[18px]">$1.08</span>
          </div>

          <div className="flex flex-col gap-y-2 items-center">
            <p className="w-[120px] text-center p-2 bg-gray-100 rounded-lg">
              Alpha-2
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-[15px] px-[25px]">
        <button className="bg-blue-500 hover:bg-blue-600 text-white p-[10px] text-[18px] rounded-full cursor-pointer transition-all duration-300">
          Swap
        </button>
        <p className="text-center w-full text-[18px] text-gray-600 font-[600]">
          Select Token and Amount
        </p>
      </div>
    </div>
  );
};

export default BridgeToken;
