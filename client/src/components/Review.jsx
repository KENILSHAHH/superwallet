import { formatAmount } from "@/utils/formatAmount";
import { shortenAddress } from "@/utils/shortenAddress";
import { sendMultiEth } from '@/utils/superWallet';
import React from "react";

const Review = ({
  walletAddress,
  walletUsed,
  tokenDetails,
  recipientDetails,
  networkFee,
  amountToSend,
  handleNext,
  handleBack,
}) => {
  return (
    <div className="flex flex-col min-h-[80vh] justify-between">
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
          <h1 className="font-[500] text-[26px]">Review</h1>
        </div>
        <div className="flex flex-col p-[15px] gap-y-[10px] w-full border border-gray-200 rounded-[20px]">
          <div className="flex items-center gap-x-[10px] justify-between">
            <div className="flex items-center gap-x-[10px]">
              <div className="rounded-full p-[5px] border border-gray-300">
                <img
                  className="h-[40px] w-[40px] rounded-full"
                  src={tokenDetails.image}
                />
              </div>
              <h1 className="font-[600] text-[#17161a] text-[20px]">
                {tokenDetails.name}
              </h1>
            </div>
            <div className="flex flex-col">
              <h1 className="font-[600] text-[#17161a] text-[18px]">
                $ {formatAmount(amountToSend * tokenDetails.price, 2)}
              </h1>
              <h1 className="font-[400] text-[#747474] text-[17px]">
                {formatAmount(amountToSend)} {tokenDetails.symbol}
              </h1>
            </div>
          </div>
          <div className="flex items-center justify-center w-[50px] h-[40px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#747474"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"
              />
            </svg>
          </div>
          <div className="flex items-center px-[5px] gap-x-[10px]">
            <img
              src={recipientDetails.avatar}
              className="h-[45px] w-[45px] rounded-full"
              alt="User"
            />

            {/* User Info */}
            <div className="flex flex-col">
              <h1 className="text-[20px] font-[500]">
                {recipientDetails.name}
              </h1>
              <h1 className="text-[16px] text-gray-500">
                {shortenAddress(recipientDetails.address)}
              </h1>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-[10px] py-[20px] p-[10px] text-[17px] text-[#17161a]">
          <div className="flex justify-between">
            <span className="text-gray-500">Wallet used</span>
            <span>{walletUsed}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Networks</span>
            <span>
              {tokenDetails.chains.map((chain, index) => (
                <span key={index} className="text-[#747474]">
                  {chain.name}
                  {index < tokenDetails.chains.length - 1 ? ", " : ""}
                </span>
              ))}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Network fee</span>
            <span>{networkFee < 0.0001 ? "< $0.0001" : `$ ${networkFee}`}</span>
          </div>
          <div className="flex justify-between font-[600]">
            <span>Total cost</span>
            <span>$ {formatAmount(amountToSend * tokenDetails.price + networkFee, 2)}</span>
          </div>
        </div>
      </div>
      <div className="flex justify-between p-[10px] gap-x-[10px]">
        <button className="py-[15px] border border-gray-600 rounded-[10px] font-[600] cursor-pointer hover:bg-gray-200 text-[20px] bg-white w-full">
          Cancel
        </button>
        <button className="py-[15px] rounded-[10px] font-[600] cursor-pointer text-white text-[20px] hover:bg-red-600 bg-red-500 w-full" onClick={()=> sendMultiEth(walletAddress,recipientDetails.address,amountToSend)}> 
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Review;
