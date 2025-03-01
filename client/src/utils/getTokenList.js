import { ethers } from "ethers";

const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
];

export const getTokenList = async (chainId) => {
    // Fetch the token list for the given chain ID
    const tokenLists = {
      1: [
        { symbol: "USDT", address: "0xdAC17F958D2ee523a2206206994597C13D831ec7", decimals: 6 },
        { symbol: "DAI", address: "0x6B175474E89094C44Da98b954EedeAC495271d0F", decimals: 18 },
      ],
      137: [
        { symbol: "MATIC", address: "0x0000000000000000000000000000000000001010", decimals: 18 },
        { symbol: "USDC", address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174", decimals: 6 },
      ],
    };
  
    return tokenLists[chainId] || [];
  };
  

export const getWalletTokens = async (walletAddress, chainId, provider) => {
  if (!walletAddress || !provider) {
    console.error("Wallet address or provider is missing.");
    return [];
  }

  try {
    const erc20Tokens = [];
    const tokenList = await getTokenList(chainId); // Ensure this function fetches token data

    for (const token of tokenList) {
      const contract = new ethers.Contract(
        token.address,
        ["function balanceOf(address owner) view returns (uint256)"],
        provider
      );

      const balance = await contract.balanceOf(walletAddress);
      if (balance.gt(0)) {
        erc20Tokens.push({
          symbol: token.symbol,
          address: token.address,
          balance: ethers.formatUnits(balance, token.decimals),
        });
      }
    }

    return erc20Tokens;
  } catch (error) {
    console.error("Error fetching wallet tokens:", error);
    return [];
  }
};
