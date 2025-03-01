"use client";

import HomePage from "@/components/HomePage";
import RecipientAddress from "@/components/RecipientAddress";
import Review from "@/components/Review";
import SendAmount from "@/components/SendAmount";
import TokenDetails from "@/components/TokenDetails";
import TransferingPage from "@/components/TransferingPage";
import { useState, useEffect, useMemo } from "react";
import { getCryptoPrice } from "@/utils/getCryptoPrice";

export default function Home() {
  const accountDetails = useMemo(
    () => ({
      name: "Supperchain Wallet",
      token: [
        {
          name: "Ethereum",
          symbol: "ETH",
          balance: 12.4,
          price: null,
          image: "/assets/image/eth.png",
          chains: [
            {
              name: "Unichain",
              balance: 6.35656,
              image: "/assets/image/unichain.png",
            },
            {
              name: "Base",
              balance: 5.8744,
              image: "/assets/image/base.png",
            },
          ],
        },
        {
          name: "USDC",
          symbol: "USDC",
          balance: 965.34,
          price: 1,
          image: "/assets/image/usdc.png",
          chains: [],
        },
        {
          name: "DAI",
          symbol: "DAI",
          balance: 2182.14,
          price: 1,
          image: "/assets/image/dai.png",
          chains: [],
        },
      ],
    }),
    []
  );

  const [step, setStep] = useState(1);
  const [tokenPrices, setTokenPrices] = useState({});
  const [selectedToken, setSelectedToken] = useState(null);
  const [amountToSend, setAmountToSend] = useState(0);
  const [recipentDetails, setRecipientDetails] = useState(null);

  useEffect(() => {
    const fetchPrices = async () => {
      const pricePromises = accountDetails.token.map(async (token) => {
        if (token.price === null) {
          const priceData = await getCryptoPrice(token.symbol);
          return { [token.symbol]: priceData.todayPrice };
        }
        return { [token.symbol]: token.price };
      });

      const resolvedPrices = await Promise.all(pricePromises);
      const pricesObject = Object.assign({}, ...resolvedPrices);
      setTokenPrices(pricesObject);
    };

    fetchPrices();
  }, [accountDetails]);

  const [ethPrices, setEthPrices] = useState({
    todayPrice: "N/A",
    prevPrice: "N/A",
  });

  useEffect(() => {
    const fetchEthPrices = async () => {
      const ethPriceData = await getCryptoPrice("ETH");
      setEthPrices({
        todayPrice: ethPriceData.todayPrice,
        prevPrice: ethPriceData.prevPrice, // Store previous price separately
      });
    };

    fetchEthPrices();
  }, []);

  const handleNext = (index, details, amountToSend) => {
    if (step === 1) {
      const token = {
        ...accountDetails.token[index],
        price: tokenPrices[accountDetails.token[index].symbol],
      };
      setSelectedToken(token);
    } else if (step === 3) {
      setRecipientDetails(details);
    } else if (step === 4) {
      setAmountToSend(amountToSend);
    }

    setStep(step + 1);
  };
  console.log(amountToSend);
  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <div className="#f2f3fa">
      <div className="flex flex-col items-center justify-center min-h-screen py-[40px]">
        <div className="bg-white rounded-[20px] border border-gray-300 min-h-[80vh] min-w-[500px]">
          {step === 1 ? (
            <HomePage
              accountDetails={accountDetails}
              tokenPrices={tokenPrices}
              ethPrices={ethPrices}
              handleNext={handleNext}
            />
          ) : step === 2 ? (
            <TokenDetails
              tokenDetails={selectedToken}
              handleNext={handleNext}
              handleBack={handleBack}
            />
          ) : step === 3 ? (
            <RecipientAddress handleNext={handleNext} handleBack={handleBack} />
          ) : step === 4 ? (
            <SendAmount
              tokenDetails={selectedToken}
              handleNext={handleNext}
              handleBack={handleBack}
            />
          ) : step === 5 ? (
            <Review
              walletUsed={accountDetails.name}
              tokenDetails={selectedToken}
              recipientDetails={recipentDetails}
              amountToSend={amountToSend}
              handleNext={handleNext}
              handleBack={handleBack}
              networkFee={0.002}
            />
          ) : (
            <TransferingPage />
          )}
        </div>
      </div>
    </div>
  );
}
