/** @format */

import { ethers } from 'ethers';
import { get } from 'node:https';

const alpha1rpc = 'https://interop-alpha-0.optimism.io';
const alpha2rpc = 'https://interop-alpha-1.optimism.io';
const alpha1rpcblockscout = 'https://optimism-interop-alpha-0.blockscout.com';
const alpha2rpcblockscout = 'https://optimism-interop-alpha-1.blockscout.com';
const devnet1chainid = '420120000';
const devnet2chainid = '420120001';
const provider1 = new ethers.JsonRpcProvider(alpha1rpc);
const provider2 = new ethers.JsonRpcProvider(alpha2rpc);
const providerArray = [provider1, provider2];

async function getEthBalance(rpc, walletAddress) {
  const provider = new ethers.JsonRpcProvider(rpc);
  const balance = ethers
    .formatEther(await provider.getBalance(walletAddress))
    .slice(0, 7);
  console.log(`ETH Balance: ${balance} ETH`);
  return balance;
}

async function totalEthBalance(rpcArray, walletAddress) {
  let balance = 0n;
  for (let i = 0; i < rpcArray.length; i++) {
    const provider = new ethers.JsonRpcProvider(rpcArray[i]);
    balance = balance + (await provider.getBalance(walletAddress));
  }
  const totalEthBalance = ethers.formatEther(balance).slice(0, 7);
  console.log(totalEthBalance);
  return totalEthBalance;
}

async function getTokenBalance(rpc, walletAddress, tokenAddress) {
  const provider = new ethers.JsonRpcProvider(rpc);
  const abi = ['function balanceOf(address) view returns (uint256)'];
  const tokenContract = new ethers.Contract(tokenAddress, abi, provider);

  const balance = ethers
    .formatUnits(await tokenContract.balanceOf(userAddress), 18)
    .slice(0, 7);
  console.log(`Balance: ${balance}`); // Adjust decimals if needed
}

async function totalTokenBalance(rpcArray, walletAddress, tokenAddress) {
  let balance = 0n;
  for (let i = 0; i < rpcArray.length; i++) {
    const provider = new ethers.JsonRpcProvider(rpcArray[i]);
    const abi = ['function balanceOf(address) view returns (uint256)'];
    const tokenContract = new ethers.Contract(tokenAddress, abi, provider);
    balance = balance + (await tokenContract.balanceOf(walletAddress));
  }
  const totalTokenBalance = ethers.formatUnits(balance, 18).slice(0, 7);
  console.log(totalTokenBalance);
  return totalTokenBalance;
}

async function totalTokenBalanceInUSD(rpcArray, walletAddress, tokenAddress) {}

async function totalEthBalanceInUSD(rpcArray, walletAddress) {}

async function bridgeEthFrom2To1(toAddress, amount) {
  const abi = ['sendETH(address _to, uint256 _chainId)'];
  const address = '0x4200000000000000000000000000000000000023';
  const provider = new ethers.JsonRpcProvider(alpha2rpc);
  const contract = new ethers.Contract(address, abi, provider);
  const tx = await contract.sendETH(toAddress, 420120000, {
    value: ethers.utils.parseEther(amount),
  });
  console.log(
    'View the transaction on Blockscout: ',
    `${alpha1rpcblockscout}/tx/${tx.hash}`
  );
}

async function bridgeTokenFrom2To1(toAddress, tokenAmount, tokenAddress) {
  const abi = [
    'sendERC20(address _tokenAddress, address _to, uint256 _amount, uint256 _chainId)',
  ];
  const address = '0x4200000000000000000000000000000000000028';
  const provider = new ethers.JsonRpcProvider(alpha2rpc);
  const contract = new ethers.Contract(address, abi, provider);
  const tx = await contract.sendERC20(
    tokenAddress,
    toAddress,
    tokenAmount,
    420120000
  );
  console.log(
    'View the transaction on Blockscout: ',
    `${alpha1rpcblockscout}/tx/${tx.hash}`
  );
}

async function sendMultiEth(fromAddress, toAddress, amount) {
    let totalAmount = amount;
    const provider = new ethers.JsonRpcProvider(alpha1rpc);
    const balanceOn1 = await getEthBalance(alpha1rpc, fromAddress);
    const tx1 = await provider.sendTransaction({
      to: toAddress,
      value: ethers.utils.parseEther(balanceOn1),
    });
    console.log(
      'View the transaction on Blockscout: ',
      `${alpha1rpcblockscout}/tx/${tx.hash}`
    );
    totalAmount = totalAmount - balanceOn1;
    const tx2 = await provider.sendTransaction({
      to: toAddress,
      value: ethers.utils.parseEther(totalAmount),
    });
    console.log(
      'View the transaction on Blockscout: ',
      `${alpha1rpcblockscout}/tx/${tx.hash}`
    );
}

async function sendToMultipleAddresses( toAddressesArray, amounts) {

}

