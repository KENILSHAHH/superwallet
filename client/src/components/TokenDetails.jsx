import { formatAmount } from "@/utils/formatAmount";
import React from "react";

const TokenDetails = ({ tokenDetails, handleNext, handleBack }) => {
  console.log(tokenDetails);

  return (
    <div>
      <div className="flex flex-col gap-y-[10px] p-[10px] px-[20px]">
        <div className="flex gap-x-[20px] items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 cursor-pointer"
            onClick={handleBack}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          <h1 className="font-[500] text-[26px]">{tokenDetails.name}</h1>
        </div>

        <div className="w-full">
          <img className="max-w-[450px]" src="assets/image/chart.png" />
          <div className="flex gap-x-[10px] justify-between px-[10px]">
            <div className="flex justify-center text-[17px] font-[500] bg-[#e6e6e6] w-full hover:bg-[#e6e6e6] cursor-pointer p-[10px] rounded-[10px] transition-all duration-300">
              1H
            </div>
            <div className="flex justify-center text-[#717171] text-[17px] font-[500] w-full hover:bg-[#e6e6e6] cursor-pointer p-[10px] rounded-[10px] transition-all duration-300">
              1D
            </div>
            <div className="flex justify-center text-[#717171] text-[17px] font-[500] w-full hover:bg-[#e6e6e6] cursor-pointer p-[10px] rounded-[10px] transition-all duration-300">
              1W
            </div>
            <div className="flex justify-center text-[#717171] text-[17px] font-[500] w-full hover:bg-[#e6e6e6] cursor-pointer p-[10px] rounded-[10px] transition-all duration-300">
              1M
            </div>
            <div className="flex justify-center text-[#717171] text-[17px] font-[500] w-full hover:bg-[#e6e6e6] cursor-pointer p-[10px] rounded-[10px] transition-all duration-300">
              1Y
            </div>
            <div className="flex justify-center text-[#717171] text-[17px] font-[500] w-full hover:bg-[#e6e6e6] cursor-pointer p-[10px] rounded-[10px] transition-all duration-300">
              ALL
            </div>
          </div>
        </div>
      </div>
      <div className="flex my-[15px] w-full">
        <span className="w-full border-t border-gray-300" />
      </div>
      <div className="px-[20px]">
        <h2 className="text-[#6c6c6c] font-[500] text-[20px]"> Your balance</h2>
        <h1 className="text-[32px] font-[600]">
          ${formatAmount(tokenDetails.balance * tokenDetails.price, 2)}
        </h1>
        <h3 className="text-[#6c6c6c] font-[400] text-[20px]">
          {tokenDetails.balance} {tokenDetails.symbol}
        </h3>
        <div className="py-[25px] flex gap-x-[10px]">
          <div className="flex justify-between rounded-[20px] bg-[#f4f4f4] p-[20px] py-[15px] w-full cursor-pointer hover:bg-[#ebebeb] transition-all duration-300">
            <h1 className="font-[600] text-[18px]">Buy</h1>
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </div>
          <div
            className="flex justify-between rounded-[20px] bg-[#f4f4f4] p-[20px] py-[15px] w-full cursor-pointer hover:bg-[#ebebeb] transition-all duration-300"
            onClick={handleNext}
          >
            <h1 className="font-[500] text-[18px]">Send</h1>
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
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </div>
        </div>
        <div>
          <div className="flex items-center mb-[10px] justify-between">
            <h2 className="font-[500] text-[18px] text-[#6c6c6c]">
              Balance across networks
            </h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="#6c6c6c"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </div>
          <div className="flex flex-col gap-y-[10px] w-full">
            {tokenDetails.chains.map((chain, index) => (
              <div
                key={index}
                className="flex items-center gap-x-[10px] justify-between p-[10px] cursor-pointer hover:bg-[#f4f4f4] rounded-[20px] transition-all duration-300"
              >
                {/* Token Icon with Badge */}
                <div className="flex items-center gap-x-[15px]">
                  <div className="relative inline-block">
                    <div className="rounded-full p-[3px] border border-gray-300">
                      <img
                        className="h-[40px] w-[40px] rounded-full"
                        src={tokenDetails.image}
                        alt={tokenDetails.name}
                      />
                    </div>
                    {/* Badge */}
                    <span className="bg-white p-[2px] absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 rounded-full">
                      <span className="bg-white rounded-full flex items-center w-[20px] h-[20px] justify-center">
                        <img src={chain.image} />
                      </span>
                    </span>
                  </div>

                  {/* Token Name & Balance */}
                  <div className="flex flex-col">
                    <h1 className="font-[600] text-[#17161a] text-[18px]">
                      ${formatAmount(chain.balance * tokenDetails.price, 2)}
                    </h1>
                    <h1 className="font-[400] text-[#747474] text-[17px]">
                      {chain.name}
                    </h1>
                  </div>
                </div>

                {/* Token Price */}
                <h1 className="font-[600] text-[#17161a] text-[21px]">
                  {chain.balance} {tokenDetails.symbol}
                </h1>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenDetails;
