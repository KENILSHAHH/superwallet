"use client";
import React, { useEffect, useState } from "react";
import { getCryptoPrice } from "@/utils/getCryptoPrice";

const HomePage = ({ accountDetails, ethPrices, tokenPrices, handleNext }) => {
  const ethReturns = (
    (parseFloat(ethPrices.todayPrice.replace(/,/g, "")) -
      parseFloat(ethPrices.prevPrice.replace(/,/g, ""))) /
    100
  ).toFixed(2);

  const totalValue = accountDetails.token
    .reduce(
      (sum, token) =>
        sum +
        (tokenPrices[token.symbol]
          ? token.balance * tokenPrices[token.symbol]
          : 0),
      0
    )
    .toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div>
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
        <h1 className="font-[500] text-[17px] text-[#747474]">Tokens</h1>
        <div className="flex flex-col gap-y-[10px] w-full">
          {accountDetails.token.map((token, index) => (
            <div
              key={index}
              className="flex items-center gap-x-[10px] justify-between p-[10px] cursor-pointer hover:bg-[#f4f4f4] rounded-[20px] transition-all duration-300"
              onClick={() => handleNext(index, null)}
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
                  ? `$${(
                      token.balance * tokenPrices[token.symbol]
                    ).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`
                  : token.balance}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
