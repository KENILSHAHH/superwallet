"use client";
import { useState } from "react";

const SendAmount = () => {
  const [amountEth, setAmountEth] = useState("0");
  const [amountUsd, setAmountUsd] = useState("0");
  

  const handleKeyPress = (value) => {
    if (value === "backspace") {
      setAmountEth((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
    } else {
      setAmountEth((prev) => (prev === "0" ? value : prev + value));
    }
  };
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
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          <h1 className="font-[500] text-[26px]">Send</h1>
        </div>
        <div className="">
          <h2 className="text-[50px] font-[600] text-[#11121b]">
            {amountEth} <span className="text-[#cdcdcd] font-[500]">ETH</span>
          </h2>
          <p className="text-gray-500 text-lg">⇅ 0.00 USD</p>
        </div>
        <div className="border-t border-gray-200 my-4"></div>
        <div className="flex flex-col gap-y-[10px] w-full">
          <div className="flex items-center gap-x-[10px] justify-between p-[10px] cursor-pointer hover:bg-[#f4f4f4] rounded-[20px]">
            <div className="flex items-center gap-x-[15px]">
              <div className="relative inline-block">
                <div className="rounded-full p-[5px] border border-gray-300">
                  <img
                    className="h-[40px] w-[40px] rounded-full"
                    src="/assets/image/eth.png"
                  />
                </div>

                <span className="bg-white p-[2px] absolute bottom-0 right-0 translate-x-1/8 translate-y-1/16 rounded-full">
                  <span className="bg-black rounded-full flex items-center w-[20px] h-[20px] justify-center ">
                    <span className="text-white text-[10px] leading-none">
                      2
                    </span>
                  </span>
                </span>
              </div>

              <div className="flex flex-col">
                <h1 className="font-[600] text-[#17161a] text-[18px]">
                  Ethereum
                </h1>
                <h1 className="font-[400] text-[#747474] text-[17px]">
                  12.40 ETH
                </h1>
              </div>
            </div>
            <h1 className="font-[600] text-[#17161a] text-[21px]">
              $49,738.49
            </h1>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center text-2xl font-semibold mt-[10px]">
          {[
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            ".",
            "0",
            "backspace",
          ].map((key) => (
            <button
              key={key}
              className="flex items-center justify-center py-4 rounded-[20px] hover:bg-gray-200 active:bg-gray-300"
              onClick={() => handleKeyPress(key)}
            >
              {key === "backspace" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z"
                  />
                </svg>
              ) : (
                key
              )}
            </button>
          ))}
        </div>
        <button
          className={`mt-6 py-4 text-lg font-semibold w-full rounded-[20px] ${
            amountEth === "0"
              ? "bg-gray-300 text-gray-500"
              : "bg-red-500 text-white"
          }`}
          disabled={amountEth === "0"}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SendAmount;
