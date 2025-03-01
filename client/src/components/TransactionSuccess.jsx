import { shortenAddress } from "@/utils/shortenAddress";
import React from "react";

const TransferSuccess = ({
  amountToSendList,
  recipentDetailsList,
  tokenDetails,
  networkFee,
}) => {
  return (
    <div className="flex flex-col items-center justify-between min-h-[75vh]">
      <div className="flex flex-col items-center justify-center w-full p-6">
        <div className="flex items-center justify-center w-[160px] h-[140px] rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#0ca528"
            className="h-[80px]"
          >
            <path
              fillRule="evenodd"
              d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-semibold">Transfer successful</h1>

        <div className="mt-6 w-full bg-white p-6 w-full">
          <div className="flex justify-between text-lg font-medium">
            <span>Amount</span>
            <span className="flex items-center gap-1">
              <img src={tokenDetails.image} alt="ETH" className="w-5 h-5" />{" "}
              {amountToSendList.reduce(
                (sum, amount) => sum + parseFloat(amount),
                0
              )}{" "}
              {tokenDetails.symbol}
            </span>
          </div>
          <div className="flex justify-between text-lg font-medium mt-3">
            <span>To</span>
            <div className="flex flex-col gap-y-[5px]">
              {recipentDetailsList.map((recipient, index) => (
                <div key={index} className="flex items-center gap-2">
                  <img
                    src={recipient.avatar}
                    alt="User"
                    className="w-6 h-6 rounded-full"
                  />
                  {shortenAddress(recipient.address)}
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between text-lg font-medium mt-3">
            <span>Network fee</span>
            <div className="flex items-center gap-x-[5px] text-gray-500">
              <img
                src="/assets/image/420120001.png"
                alt="ETH"
                className="w-[20px] h-[20px] rounded-full"
              />
              <span>
                {networkFee < 0.0001 ? "< $0.0001" : `$ ${networkFee}`}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 w-full px-[20px]">
        <button className="w-full py-3 text-lg font-medium bg-gray-100 rounded-[15px] mb-3 hover:bg-gray-200 cursor-pointer">
          Routescan ↗
        </button>
        <button className="w-full py-3 text-lg font-medium bg-red-600 text-white rounded-[15px] hover:bg-red-500 cursor-pointer">
          Back to wallet
        </button>
      </div>
    </div>
  );
};

export default TransferSuccess;
