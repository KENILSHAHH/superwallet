/** @format */

import { ethers } from 'ethers';
import { parseUnits } from 'viem';
const alpha1rpc = 'https://interop-alpha-0.optimism.io';
const alpha2rpc = 'https://interop-alpha-1.optimism.io';
const alpha1rpcblockscout = 'https://optimism-interop-alpha-0.blockscout.com';
const alpha2rpcblockscout = 'https://optimism-interop-alpha-1.blockscout.com';

const provider1 = new ethers.JsonRpcProvider(alpha1rpc);
const provider2 = new ethers.JsonRpcProvider(alpha2rpc);
const providerArray = [alpha1rpc, alpha2rpc];

/**
 * Get ETH Balance for a given wallet address on a specific RPC.
 */

export async function getRpcUrl(chainId) {
  const rpcUrls = {
    1: 'https://mainnet.infura.io/', // Ethereum Mainnet
    56: 'https://bsc-dataseed.binance.org/', // BNB Smart Chain Mainnet
    137: 'https://rpc-mainnet.maticvigil.com/', // Polygon Mainnet
    10: 'https://mainnet.optimism.io', // Optimism Mainnet
    42161: 'https://arb1.arbitrum.io/rpc', // Arbitrum One
    43114: 'https://api.avax.network/ext/bc/C/rpc', // Avalanche C-Chain
    8453: 'https://mainnet.base.org', // Base Mainnet
    250: 'https://rpc.ftm.tools/', // Fantom Opera
    100: 'https://rpc.gnosischain.com/', // Gnosis Chain
    128: 'https://http-mainnet.hecochain.com', // Huobi ECO Chain Mainnet
    25: 'https://evm.cronos.org', // Cronos Mainnet
    2222: 'https://rpc.kava.io', // Kava Mainnet
    1088: 'https://andromeda.metis.io/?owner=1088', // Metis Andromeda Mainnet
    8217: 'https://public-node-api.klaytnapi.com/v1/cypress', // Klaytn Mainnet Cypress
    592: 'https://astar.api.onfinality.io/public', // Astar Mainnet
    1313161554: 'https://mainnet.aurora.dev', // Aurora Mainnet
    314: 'https://api.node.glif.io', // Filecoin Mainnet
    30: 'https://public-node.rsk.co', // Rootstock Mainnet
    1284: 'https://rpc.api.moonbeam.network', // Moonbeam
    40: 'https://mainnet.telos.net/evm', // Telos EVM Mainnet
    4689: 'https://babel-api.mainnet.iotex.io', // IoTeX Network Mainnet
    7700: 'https://canto.slingshot.finance', // Canto
    1030: 'https://evm.confluxrpc.com', // Conflux eSpace
    5000: 'https://rpc.mantle.xyz', // Mantle
    59144: 'https://rpc.linea.build', // Linea
    747: 'https://mainnet.evm.nodes.onflow.org', // Flow EVM Mainnet
    980: 'https://ethapi.topnetwork.org', // TOP Mainnet EVM
    420120000: 'https://interop-alpha-0.optimism.io',
    420120001: 'https://interop-alpha-1.optimism.io',
  };

  return rpcUrls[chainId] || null; // Return null if the chainId is not found
}

export async function getChainName(chainId) {
  const chainNames = {
    1: 'Ethereum Mainnet',
    56: 'Binance Smart Chain',
    137: 'Polygon Mainnet',
    10: 'Optimism Mainnet',
    42161: 'Arbitrum One',
    43114: 'Avalanche C-Chain',
    8453: 'Base Mainnet',
    250: 'Fantom Opera',
    100: 'Gnosis Chain',
    128: 'Huobi ECO Chain',
    25: 'Cronos Mainnet',
    2222: 'Kava Mainnet',
    1088: 'Metis Andromeda',
    8217: 'Klaytn Mainnet Cypress',
    592: 'Astar Mainnet',
    1313161554: 'Aurora Mainnet',
    314: 'Filecoin Mainnet',
    30: 'Rootstock Mainnet',
    1284: 'Moonbeam',
    40: 'Telos EVM Mainnet',
    4689: 'IoTeX Network Mainnet',
    7700: 'Canto',
    1030: 'Conflux eSpace',
    5000: 'Mantle',
    59144: 'Linea',
    747: 'Flow EVM Mainnet',
    980: 'TOP Mainnet EVM',
    420120000: 'Interop Alpha 0',
    420120001: 'Interop Alpha 1',
  };

  return chainNames[chainId] || null; // Return null if the chainId is not found
}

export async function getEthBalance(rpc, walletAddress) {
  const provider = new ethers.JsonRpcProvider(rpc);
  const balance = ethers
    .formatEther(await provider.getBalance(walletAddress))
    .slice(0, 7);
  console.log(`ETH Balance: ${balance} ETH`);
  return balance;
}

/**
 * Get total ETH balance across multiple RPC providers.
 */
export async function totalEthBalance(rpcArray, walletAddress) {
  let balance = 0n;
  for (const rpc of rpcArray) {
    const provider = new ethers.JsonRpcProvider(rpc);
    balance += await provider.getBalance(walletAddress);
  }
  const totalBalance = ethers.formatEther(balance).slice(0, 7);
  console.log(`Total ETH Balance: ${totalBalance} ETH`);
  return totalBalance;
}

/**
 * Get Token Balance for a wallet address.
 */
export async function getTokenBalance(rpc, walletAddress, tokenAddress) {
  const provider = new ethers.JsonRpcProvider(rpc);
  const abi = ['function balanceOf(address) view returns (uint256)'];
  const tokenContract = new ethers.Contract(tokenAddress, abi, provider);
  const balance = ethers
    .formatUnits(await tokenContract.balanceOf(walletAddress), 18)
    .slice(0, 7);
  console.log(`Token Balance: ${balance}`);
  return balance;
}

/**
 * Get total Token Balance across multiple chains.
 */
export async function totalTokenBalance(rpcArray, walletAddress, tokenAddress) {
  let balance = 0n;
  for (const rpc of rpcArray) {
    const provider = new ethers.JsonRpcProvider(rpc);
    const abi = ['function balanceOf(address) view returns (uint256)'];
    const tokenContract = new ethers.Contract(tokenAddress, abi, provider);
    balance += await tokenContract.balanceOf(walletAddress);
  }
  const totalBalance = ethers.formatUnits(balance, 18).slice(0, 7);
  console.log(`Total Token Balance: ${totalBalance}`);
  return totalBalance;
}

/**
 * Bridge ETH from Alpha-2 to Alpha-1.
 */
export async function bridgeEthFrom2To1(toAddress, amount) {
  const abi = ['function sendETH(address _to, uint256 _chainId)'];
  const bridgeAddress = '0x4200000000000000000000000000000000000023';
  const provider = new ethers.JsonRpcProvider(alpha2rpc);
  const contract = new ethers.Contract(bridgeAddress, abi, provider);
  const tx = await contract.sendETH(toAddress, 420120000, {
    value: ethers.parseEther(amount),
  });

  console.log(
    'View the transaction on Blockscout: ',
    `${alpha1rpcblockscout}/tx/${tx.hash}`
  );
  return tx;
}

/**
 * Bridge Token from Alpha-2 to Alpha-1.
 */

  
export async function bridgeTokenFrom1To2(
  toAddress,
  tokenAmount,
  tokenAddress
) {
  const abi = [
    'function sendERC20(address _tokenAddress, address _to, uint256 _amount, uint256 _chainId)',
  ];
  const bridgeAddress = '0x4200000000000000000000000000000000000028';
  const provider = new ethers.JsonRpcProvider(alpha2rpc);
  const contract = new ethers.Contract(bridgeAddress, abi, provider);
  const tx = await contract.sendERC20(
    tokenAddress,
    toAddress,
    tokenAmount,
    420120001
  );

  console.log(
    'View the transaction on Blockscout: ',
    `${alpha1rpcblockscout}/tx/${tx.hash}`
  );
  return tx;
}

/**
 * Send ETH across multiple chains.
 */
export async function sendMultiEth(fromAddress, toAddress, amountToSend) {
  const amount = parseUnits(amountToSend, 18);
  let remainingAmount = amount;
  const balanceOn1 = await getEthBalance(alpha1rpc, fromAddress);
  if (!window.ethereum) {
    console.error('MetaMask is not installed!');
    return;
  }

  // Request account access
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  console.log(provider);
  const tx1 = await signer.sendTransaction({
    to: toAddress,
    value: ethers.parseEther(balanceOn1.toString()),
  });
  console.log(
    'View the transaction on Blockscout: ',
    `${alpha1rpcblockscout}/tx/${tx1.hash}`
  );
  remainingAmount -= parseUnits(balanceOn1, 18);
  const formatted = Number(remainingAmount) / 1e18;
  console.log(remainingAmount.toString().slice(0, 7));
  try {
    // Attempt to switch to the chain
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x190A85C1' }], // 420120001 in hex
    });

    console.log('Successfully switched to Interop Alpha 1 (Optimism)');
  } catch (error) {
    // If the chain is not added, prompt the user to add it
    if (error.code === 4902) {
      console.log('Chain not found, adding it...');
      await addOptimismInteropChain();
    } else {
      console.error('Error switching chain:', error);
    }
  }
  setTimeout(async () => {
    const provider1 = new ethers.BrowserProvider(window.ethereum);
    const signer1 = await provider1.getSigner();
    if (remainingAmount > 0) {
      const tx2 = await signer1.sendTransaction({
        to: toAddress,
        value: ethers.parseEther(formatted.toString()),
      });
      console.log(
        'View the transaction on Blockscout: ',
        `${alpha2rpcblockscout}/tx/${tx2.hash}`
      );
    }
  }, 5000);
}
async function addOptimismInteropChain() {
  try {
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: '0x190A85C1', // 420120001 in hex
          chainName: 'Interop Alpha 1 (Optimism)',
          nativeCurrency: {
            name: 'Ether',
            symbol: 'ETH',
            decimals: 18,
          },
          rpcUrls: ['https://interop-alpha-1.optimism.io'],
          blockExplorerUrls: ['https://explorer.interop-alpha-1.optimism.io'],
        },
      ],
    });

    console.log('Interop Alpha 1 (Optimism) added successfully!');
  } catch (error) {
    console.error('Error adding chain:', error);
  }
}
/**
 * Send ETH to multiple addresses.
 */
export async function sendToMultipleAddresses(toAddressesArray, amounts) {
  if (toAddressesArray.length !== amounts.length) {
    throw new Error('Addresses and amounts length mismatch');
  }

  const provider = new ethers.JsonRpcProvider(alpha1rpc);
  for (let i = 0; i < toAddressesArray.length; i++) {
    const tx = await provider.sendTransaction({
      to: toAddressesArray[i],
      value: ethers.parseEther(amounts[i]),
    });

    console.log(
      'View the transaction on Blockscout: ',
      `${alpha1rpcblockscout}/tx/${tx.hash}`
    );
  }
}
