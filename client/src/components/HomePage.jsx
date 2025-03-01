"use client";
import React, { useState } from "react";
import { formatAmount } from "@/utils/formatAmount";

const HomePage = ({ accountDetails, ethPrices, tokenPrices, handleNext }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const ethReturns = (
    (parseFloat(ethPrices.todayPrice.replace(/,/g, "")) -
      parseFloat(ethPrices.prevPrice.replace(/,/g, ""))) /
    100
  ).toFixed(2);

  const totalValue = formatAmount(
    accountDetails.token.reduce(
      (sum, token) =>
        sum +
        (tokenPrices[token.symbol]
          ? token.balance * tokenPrices[token.symbol]
          : 0),
      0
    ),
    2
  );

  return (
    <div className="relative">
      {isModalOpen && (
        <div className="absolute rounded-[20px] p-[20px] w-full flex flex-col justify-center items-end top-0 left-0 h-full bg-[#0000006e] backdrop-blur-xs z-50">
          <div className="w-[80%] h-[90%] rounded-[10px] bg-white shadow-[10px] z-index-100 transition-transform transform translate-x-0">
            <div className="h-full">
              <div className="flex justify-between items-center p-4 border-b border-gray-300">
                <h2 className="text-lg text-center w-full font-[700]">
                  Import Tokens
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  ✕
                </button>
              </div>
              <div className="flex flex-col h-[450px] justify-between p-4">
                <div className="flex flex-col gap-y-[10px]">
                  <p className="font-[500] text-gray-700">
                    Token contract address
                  </p>
                  <input
                    type="text"
                    placeholder="Token address"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <button className="bg-blue-500 text-white p-[10px] text-[18px] rounded-full">
                  Import
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-y-[10px] p-[10px]">
        <div className="flex bg-[#f4f4f4] rounded-[20px] items-center gap-x-[10px] justify-between p-[15px]">
          <div className="flex items-center gap-x-[15px]">
            <img
              className="h-[45px] w-[45px] rounded-full"
              src="/assets/image/profile.png"
            />
            <h1 className="font-[600] text-[22px] text-[#17161a]">
              Superchain wallet
            </h1>
          </div>
          <span className="hover:bg-gray-200 p-[10px] rounded-full cursor-pointer transition-all duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </div>
        <div className="flex flex-col bg-[#f4f4f4] p-[15px] rounded-[20px]">
          <h1 className="font-[600] text-[32px]">${totalValue}</h1>
          <div className="flex gap-x-[10px] justify-between">
            <h1 className="font-[600] text-[#a8a8a8] text-[32px]">
              ${ethPrices.todayPrice}
            </h1>
            <h1
              className={`font-[600] text-[32px] ${
                ethReturns >= 0 ? "text-[#00c689]" : "text-[#ff4d4f]"
              }`}
            >
              {ethReturns} %
            </h1>
          </div>
        </div>
        <div className="flex gap-x-[10px]">
          <div className="flex w-full justify-between items-center rounded-[20px] bg-[#f4f4f4] p-[20px] hover:bg-[#ebebeb] cursor-pointer transition-all duration-300">
            <h1 className="font-[500] text-[18px]">Buy</h1>
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
          <div className="flex w-full justify-between items-center rounded-[20px] bg-[#f4f4f4] p-[20px] hover:bg-[#ebebeb] cursor-pointer transition-all duration-300">
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
          <div className="flex w-full justify-between items-center rounded-[20px] bg-[#f4f4f4] p-[20px] hover:bg-[#ebebeb] cursor-pointer transition-all duration-300">
            <h1 className="font-[500] text-[18px]">Swap</h1>
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
                d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex my-[20px] w-full">
        <span className="w-full border-t border-gray-300" />
      </div>
      <div className="flex flex-col gap-y-[10px] p-[10px] px-[20px]">
        <div className="flex items-center gap-x-[10px] justify-between">
          <h1 className="font-[500] text-[17px] text-[#747474]">Tokens</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-x-[5px] rounded-[10px] bg-blue-100 hover:bg-blue-200 border border-blue-500 px-[15px] cursor-pointer transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5"
            >
              <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
            </svg>
            Add Token
          </button>
        </div>
        <div className="flex flex-col gap-y-[10px] w-full">
          {accountDetails.token.map((token, index) => (
            <div
              key={index}
              className="flex items-center gap-x-[10px] justify-between p-[10px] cursor-pointer hover:bg-[#f4f4f4] rounded-[20px] transition-all duration-300"
              onClick={() => handleNext(index, null, null)}
            >
              {/* Token Icon with Badge */}
              <div className="flex items-center gap-x-[15px]">
                <div className="relative inline-block">
                  <div className="rounded-full p-[3px] border border-gray-300">
                    <img
                      className="h-[40px] w-[40px] rounded-full"
                      src={token.image}
                      alt={token.name}
                    />
                  </div>
                  {/* Badge */}
                  <span className="bg-white p-[2px] absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 rounded-full">
                    <span className="bg-black rounded-full flex items-center w-[20px] h-[20px] justify-center">
                      <span className="text-white text-[10px] leading-none">
                        {token.chains.length}
                      </span>
                    </span>
                  </span>
                </div>

                {/* Token Name & Balance */}
                <div className="flex flex-col">
                  <h1 className="font-[600] text-[#17161a] text-[18px]">
                    {token.name}
                  </h1>
                  <h1 className="font-[400] text-[#747474] text-[17px]">
                    {token.balance} {token.symbol}
                  </h1>
                </div>
              </div>

              <h1 className="font-[600] text-[#17161a] text-[21px]">
                {tokenPrices[token.symbol]
                  ? `$${formatAmount(
                      token.balance * tokenPrices[token.symbol],
                      2
                    )}`
                  : "N/A"}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
