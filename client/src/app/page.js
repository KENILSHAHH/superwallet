/** @format */

"use client";

import HomePage from "@/components/HomePage";
import RecipientAddress from "@/components/RecipientAddress";
import Review from "@/components/Review";
import SendAmount from "@/components/SendAmount";
import TokenDetails from "@/components/TokenDetails";
import TransferingPage from "@/components/TransferingPage";
import { useState, useEffect, useMemo } from "react";
import { getCryptoPrice } from "@/utils/getCryptoPrice";
import { ethers } from "ethers";
import { getChainName, getEthBalance, getRpcUrl } from "@/utils/superWallet";
import { getWalletTokens } from "@/utils/getTokenList";
import BridgeToken from "@/components/Bridge";
import { sendMultiEth } from "@/utils/superWallet";
import TransactionError from "@/components/TransactionError";
import TransactionSuccess from "@/components/TransactionSuccess";

export default function Home() {
  const [accountDetails, setAccountDetails] = useState({
    walletAddress: "", // ✅ Initially empty, updates when wallet connects
    token: [
      {
        name: "Ethereum",
        symbol: "ETH",
        balance: 0, // ✅ Total balance across all chains
        price: null,
        image: "/assets/image/eth.png",
        chains: [], // ✅ Chains will be dynamically updated
      },
      {
        name: "USDC",
        symbol: "USDC",
        balance: 0,
        price: 1,
        image: "/assets/image/usdc.png",
        chains: [],
      },
      {
        name: "DAI",
        symbol: "DAI",
        balance: 0,
        price: 1,
        image: "/assets/image/dai.png",
        chains: [],
      },
    ],
  });

  const [step, setStep] = useState(1);
  const [tokenPrices, setTokenPrices] = useState({});
  const [selectedToken, setSelectedToken] = useState(null);
  const [recipentDetailsList, setRecipientDetailsList] = useState([]);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [isSwap, setIsSwap] = useState(false);
  const [amountToSendList, setAmountToSendList] = useState([]);

  const [tokens, setTokens] = useState([]);
  const [provider, setProvider] = useState(null);

  const [isTransferring, setIsTransferring] = useState(false);
  const [transferSuccess, setTransferSuccess] = useState(false);

  const tokenList = [
    { symbol: "USDT", address: "0xdAC17F958D2ee523a2206206994597C13D831ec7" }, // USDT
    { symbol: "DAI", address: "0x6B175474E89094C44Da98b954EedeAC495271d0F" }, // DAI
    { symbol: "USDC", address: "0xA0b86991c6218b36c1d19D4a2e9eb0cE3606eB48" }, // USDC
  ];

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask is not installed. Please install it to continue.");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const network = await provider.getNetwork(); // ✅ Corrected here
      const chainId = Number(network.chainId);

      setWalletAddress(address);
      setIsWalletConnected(true);

      // ✅ Call the function to update account details
      updateAccountDetails(address, chainId);
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress("");
    setIsWalletConnected(false);
    setAccountDetails({
      walletAddress: "",
      token: accountDetails.token.map((token) => ({
        ...token,
        balance: 0,
        chains: [],
      })),
    });
  };

  const updateAccountDetails = async (walletAddress) => {
    try {
      const chainIdsToCheck = [420120000, 420120001];
      const provider = new ethers.BrowserProvider(window.ethereum);

      let updatedChains = [];
      let totalBalance = 0;
      let allTokens = [];

      for (const chainId of chainIdsToCheck) {
        const rpcUrl = await getRpcUrl(chainId);
        if (!rpcUrl) {
          console.error(`Unsupported chain: ${chainId}`);
          continue;
        }

        const ethBalance = await getEthBalance(rpcUrl, walletAddress);
        const balanceFloat = parseFloat(ethBalance);

        let chainTokens = await getWalletTokens(
          walletAddress,
          chainId,
          provider
        );
        allTokens.push(...chainTokens);

        if (balanceFloat > 0 || chainTokens.length > 0) {
          updatedChains.push({
            name: getChainName(chainId),
            chainId,
            balance: balanceFloat,
            tokens: chainTokens,
            image: `/assets/image/${chainId}.png`,
          });
          totalBalance += balanceFloat;
        }
      }

      setAccountDetails((prev) => ({
        ...prev,
        walletAddress,
        token: [
          ...prev.token.map((token) =>
            token.symbol === "ETH"
              ? { ...token, balance: totalBalance, chains: updatedChains }
              : token
          ),
          ...allTokens.filter(
            (token) => !prev.token.some((t) => t.symbol === token.symbol)
          ),
        ],
      }));
    } catch (error) {
      console.error("Error updating account details:", error);
    }
  };

  const sendTokens = async (token, recipient, amount) => {
    await sendMultiEth(
      "0xdb5D6E7FCb63eF163Dd453962f3f1bFa52621108",
      "0x64Ab79D6aBFcBd9B316d0b987638871D08B24315",
      "1.0"
    );
    console.log("Tokens sent successfully!");
  };

  useEffect(() => {
    const fetchEthBalance = async () => {
      if (isWalletConnected && walletAddress) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const network = await provider.getNetwork(); // ✅ Corrected here
          const chainId = Number(network.chainId);
          const rpcUrl = await getRpcUrl(chainId); // Get RPC based on connected chain

          const ethBalance = await getEthBalance(rpcUrl, walletAddress);
          setAccountDetails((prev) => ({
            ...prev,
            token: prev.token.map((token) =>
              token.symbol === "ETH"
                ? { ...token, balance: parseFloat(ethBalance) }
                : token
            ),
          }));
        } catch (error) {
          console.error("Failed to fetch ETH balance:", error);
        }
      }
    };

    const updateAccountDetail = async () => {
      if (isWalletConnected && walletAddress) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const network = await provider.getNetwork(); // ✅ Corrected here
        const chainId = Number(network.chainId);
        updateAccountDetails(walletAddress, chainId);
      }
    };

    updateAccountDetail();
    fetchEthBalance();
  }, [walletAddress, isWalletConnected]);

  console.log("Account Details:", accountDetails);

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setIsWalletConnected(true);
        }
      }
    };

    checkWalletConnection();
  }, []);

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

  const handleNext = async (index, details, amountToSend) => {
    if (step === 1) {
      const token = {
        ...accountDetails.token[index],
        price: tokenPrices[accountDetails.token[index].symbol],
      };
      setSelectedToken(token);
    } else if (step === 3) {
      setRecipientDetailsList((prev) => [...prev, details]);
    } else if (step === 4) {
      if (amountToSend > 0) {
        setAmountToSendList((prev) => [...prev, amountToSend]);
      }
      setSelectedToken((prev) => ({
        ...prev,
        balance: prev.balance - amountToSend,
      }));
    } else if (step === 5) {
      setIsTransferring(true);


      try {
        for (let i = 0; i < recipentDetailsList.length; i++) {
          await sendMultiEth(
            walletAddress.address,
            recipentDetailsList[i].address,
            amountToSendList[i]
          );
        }
        setTransferSuccess(true);
      } catch (error) {
        console.error("Transaction failed:", error);
        setTransferSuccess(false);
      } finally {
        setIsTransferring(false);
      }
    }

    setStep(step + 1);
  };

  const addMoreRecipient = () => {
    setStep(3);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const fetchBalance = async () => {
    const balance = await getEthBalance(
      "https://mainnet.base.org",
      "0xdb5D6E7FCb63eF163Dd453962f3f1bFa52621108"
    );
    console.log("ETH Balance:", balance);
  };

  fetchBalance();

  return (
    <div className="#f2f3fa">
      <div className="flex flex-col items-center justify-center min-h-screen py-[40px]">
        <div className="bg-white rounded-[20px] border border-gray-300 min-h-[80vh] min-w-[500px]">
          {!isWalletConnected ? (
            <div className="flex flex-col gap-y-[10px] items-center justify-center min-h-[80vh]">
              <button
                className="rounded-full p-[10px] px-[20px] text-white text-[18px] bg-blue-500 cursor-pointer hover:bg-blue-600 transition-all duration-300"
                onClick={connectWallet}
              >
                Connect Wallet
              </button>
              <p className="text-center text-[#6c6c6c] font-[500] text-[18px]">
                Connect across all chains
              </p>
            </div>
          ) : (
            <>
              {step === 1 ? (
                <>
                  {isSwap ? (
                    <BridgeToken
                      tokenDetails={accountDetails.token[0]}
                      setIsSwap={setIsSwap}
                    />
                  ) : (
                    <HomePage
                      setIsSwap={setIsSwap}
                      disconnectWallet={disconnectWallet}
                      accountDetails={accountDetails}
                      tokenPrices={tokenPrices}
                      ethPrices={ethPrices}
                      handleNext={handleNext}
                    />
                  )}
                </>
              ) : step === 2 ? (
                <TokenDetails
                  tokenDetails={selectedToken}
                  handleNext={handleNext}
                  handleBack={handleBack}
                />
              ) : step === 3 ? (
                <RecipientAddress
                  handleNext={handleNext}
                  handleBack={handleBack}
                />
              ) : step === 4 ? (
                <SendAmount
                  tokenDetails={selectedToken}
                  handleNext={handleNext}
                  handleBack={handleBack}
                />
              ) : step === 5 ? (
                <Review
                  walletAddress={walletAddress}
                  tokenDetails={selectedToken}
                  addMoreRecipient={addMoreRecipient}
                  recipentDetailsList={recipentDetailsList}
                  amountToSendList={amountToSendList}
                  handleNext={handleNext}
                  handleBack={handleBack}
                  networkFee={0.002}
                />
              ) : step == 6 ? (
                <>
                  {isTransferring ? (
                    <TransferingPage />
                  ) : (
                    <>
                      {transferSuccess ? (
                        <TransactionSuccess
                          recipentDetailsList={recipentDetailsList}
                          tokenDetails={selectedToken}
                          amountToSendList={amountToSendList}
                          networkFee={0.002}
                        />
                      ) : (
                        <TransactionError />
                      )}
                    </>
                  )}
                </>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
