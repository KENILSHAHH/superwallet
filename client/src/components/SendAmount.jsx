"use client";
import { formatAmount } from "@/utils/formatAmount";
import { useState, useEffect } from "react";

const SendAmount = ({ tokenDetails, handleNext, handleBack }) => {
  const [amountEth, setAmountEth] = useState("0");
  const [amountUsd, setAmountUsd] = useState("0");
  const [isTypeEth, setIsTypeEth] = useState(true);
  console.log(tokenDetails.balance);
  // Update USD when ETH changes
  useEffect(() => {
    if (isTypeEth) {
      setAmountUsd(
        (parseFloat(amountEth || "0") * tokenDetails.price).toFixed(2)
      );
    }
  }, [amountEth, isTypeEth, tokenDetails.price]);

  // Update ETH when USD changes
  useEffect(() => {
    if (!isTypeEth) {
      setAmountEth(
        (parseFloat(amountUsd || "0") / tokenDetails.price).toFixed(6)
      );
    }
  }, [amountUsd, isTypeEth, tokenDetails.price]);

  const handleKeyPress = (value) => {
    if (value === "backspace") {
      if (isTypeEth) {
        setAmountEth((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
        setAmountUsd(parseFloat(amountEth) * tokenDetails.price);
      } else {
        setAmountUsd((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
        setAmountEth(parseFloat(amountUsd) / tokenDetails.price);
      }
    } else {
      if (isTypeEth) {
        const newAmountEth = amountEth === "0" ? value : amountEth + value;
        const parsedEth = parseFloat(newAmountEth);

        if (!isNaN(parsedEth) && parsedEth <= tokenDetails.balance) {
          setAmountEth(newAmountEth);
          setAmountUsd(parsedEth * tokenDetails.price);
        }
      } else {
        const newAmountUsd = amountUsd === "0" ? value : amountUsd + value;
        const parsedUsd = parseFloat(newAmountUsd);
        const convertedEth = parsedUsd / tokenDetails.price;

        if (!isNaN(convertedEth) && convertedEth <= tokenDetails.balance) {
          setAmountUsd(newAmountUsd);
          setAmountEth(convertedEth);
        }
      }
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
            className="size-6 cursor-pointer"
            onClick={handleBack}
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
            {isTypeEth
              ? `${formatAmount(amountEth)}`
              : `${formatAmount(amountUsd)}`}
            <span className="text-[#cdcdcd] font-[500]">
              {" "}
              {isTypeEth ? tokenDetails.symbol : "USD"}
            </span>
          </h2>

          <p
            className="text-gray-500 text-lg cursor-pointer"
            onClick={() => setIsTypeEth((prev) => !prev)}
          >
            ⇅{" "}
            {isTypeEth
              ? `${formatAmount(amountUsd)} USD`
              : `${formatAmount(amountEth)} ${tokenDetails.symbol}`}
          </p>
        </div>
        <div className="border-t border-gray-200 my-4"></div>
        <div className="flex flex-col gap-y-[10px] w-full">
          <div
            className="flex items-center gap-x-[10px] justify-between p-[10px] cursor-pointer hover:bg-[#f4f4f4] rounded-[20px]"
            onClick={() => {
              setAmountEth(tokenDetails.balance);
              setAmountUsd(tokenDetails.balance * tokenDetails.price);
            }}
          >
            <div className="flex items-center gap-x-[15px]">
              <div className="relative inline-block">
                <div className="rounded-full p-[5px] border border-gray-300">
                  <img
                    className="h-[40px] w-[40px] rounded-full"
                    src={tokenDetails.image}
                  />
                </div>

                <span className="bg-white p-[2px] absolute bottom-0 right-0 translate-x-1/8 translate-y-1/16 rounded-full">
                  <span className="bg-black rounded-full flex items-center w-[20px] h-[20px] justify-center ">
                    <span className="text-white text-[10px] leading-none">
                      {tokenDetails.chains.length}
                    </span>
                  </span>
                </span>
              </div>

              <div className="flex flex-col">
                <h1 className="font-[600] text-[#17161a] text-[18px]">
                  {tokenDetails.name}
                </h1>
                <h1 className="font-[400] text-[#747474] text-[17px]">
                  {tokenDetails.balance} {tokenDetails.symbol}
                </h1>
              </div>
            </div>
            <h1 className="font-[600] text-[#17161a] text-[21px]">
              ${formatAmount(tokenDetails.balance * tokenDetails.price, 2)}
            </h1>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 px-[15px] gap-4 text-center text-2xl font-semibold mt-[10px]">
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
            {key === "backspace" ? "⌫" : key}
          </button>
        ))}
      </div>
      <div className="p-[15px]">
        <button
          className={` mt-6 py-4 text-lg font-semibold w-full rounded-[20px] ${
            amountEth === "0"
              ? "bg-gray-300 text-gray-500"
              : "bg-red-500 text-white hover:bg-red-600 cursor-pointer transition-all duration-300"
          }`}
          onClick={() => handleNext(null, null, amountEth)}
          disabled={amountEth === "0"}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SendAmount;
