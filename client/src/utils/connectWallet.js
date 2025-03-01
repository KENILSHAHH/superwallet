// utils/wallet.js
import { ethers } from "ethers";
import { getEthBalance, getRpcUrl } from "@/utils/superwallet";

export const connectWallet = async () => {
  try {
    if (!window.ethereum) {
      alert("MetaMask is not installed. Please install it to continue.");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    const network = await provider.getNetwork();
    const chainId = Number(network.chainId);

    setWalletAddress(address);
    setIsWalletConnected(true);

    // ✅ Call the new function to update account details
    updateAccountDetails(address, chainId);
  } catch (error) {
    console.error("Wallet connection failed:", error);
  }
};
