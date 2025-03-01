"use client";

import { useState } from "react";
import { shortenAddress } from "@/utils/shortenAddress";

const previousAddresses = [
  {
    name: "pikasheepy.base.eth",
    address: "0xAbC1234567890dEF1234567890aBCdEf12345678",
    avatar: "/assets/image/avatar1.png",
  },
  {
    name: "b0bby.eth",
    address: "0xDef9876543210AbC9876543210dEFaBC98765432",
    avatar: "/assets/image/avatar2.png",
  },
];

const RecipientAddress = ({ handleNext, handleBack }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [error, setError] = useState(false);

  const checkAddress = () => {
    if (walletAddress.length === 42 && walletAddress.startsWith("0x")) {
      setError(false);
    } else if (walletAddress.length > 0) {
      setError(true);
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
          <h1 className="font-[500] text-[26px]">Choose recipient</h1>
        </div>
        <div className="flex flex-col gap-y-[20px] py-[20px]">
          <input
            className="px-[15px] py-[10px] rounded-[10px] border border-2 border-gray-200 w-full text-[17px] text-gray-700 font-[500]"
            placeholder="Enter wallet address"
            type="text"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            onBlur={checkAddress}
          />
          {error && (
            <p className="font-[500] text-red-500 ml-[10px]">
              Enter valid address
            </p>
          )}
          <div
            className="flex justify-between rounded-[20px] bg-blue-200 border border-blue-300 p-[10px] w-[150px] px-[20px] cursor-pointer hover:bg-blue-300 transition-all duration-300"
            onClick={() => {
              checkAddress();
              if (!error) {
                handleNext(null, {
                  name: "Custom",
                  address: walletAddress,
                  avatar: "/assets/image/avatar3.png",
                }, null);
              }
            }}
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
          <h1 className="text-[#6c6c6c] font-[500]">Previous addresses</h1>
          <div className="flex flex-col gap-y-[5px] py-[15px]">
            {previousAddresses.map((user, index) => (
              <div
                key={index}
                className="flex items-center gap-x-[10px] p-[10px] rounded-[12px] cursor-pointer hover:bg-gray-100 transition-all duration-300"
                onClick={() => handleNext(null, user, null)}
              >
                {/* Profile Image */}
                <img
                  src={user.avatar}
                  className="h-[40px] w-[40px] rounded-full"
                  alt={user.name}
                />

                {/* User Info */}
                <div className="flex flex-col">
                  <h1 className="text-[16px] font-[500]">{user.name}</h1>
                  <h1 className="text-[14px] text-gray-500">
                    {shortenAddress(user.address)}
                  </h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipientAddress;
