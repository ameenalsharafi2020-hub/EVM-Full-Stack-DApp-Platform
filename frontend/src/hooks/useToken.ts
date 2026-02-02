'use client';

import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { CONTRACT_ADDRESSES } from '@/config/contracts';
import TokenABI from '@/lib/abis/Token.json';
import { parseEther } from 'viem';

type Address = `0x${string}`;

export function useTokenBalance(address: string | undefined) {
  return useReadContract({
    address: CONTRACT_ADDRESSES.Token as Address,
    abi: TokenABI,
    functionName: 'balanceOf',
    args: address ? [address as Address] : undefined,
    query: {
      enabled: !!address && !!CONTRACT_ADDRESSES.Token,
    },
  });
}

export function useTokenInfo() {
  const { data: name } = useReadContract({
    address: CONTRACT_ADDRESSES.Token as Address,
    abi: TokenABI,
    functionName: 'name',
  });

  const { data: symbol } = useReadContract({
    address: CONTRACT_ADDRESSES.Token as Address,
    abi: TokenABI,
    functionName: 'symbol',
  });

  const { data: totalSupply } = useReadContract({
    address: CONTRACT_ADDRESSES.Token as Address,
    abi: TokenABI,
    functionName: 'totalSupply',
  });

  return {
    name: (name as string) || 'MyToken',
    symbol: (symbol as string) || 'MTK',
    totalSupply: (totalSupply as bigint) || BigInt(0),
  };
}

export function useTokenTransfer() {
  const { data: hash, writeContract, isPending } = useWriteContract();

  const transfer = (to: string, amount: string) => {
    writeContract({
      address: CONTRACT_ADDRESSES.Token as Address,
      abi: TokenABI,
      functionName: 'transfer',
      args: [to as Address, parseEther(amount)],
    });
  };

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  return {
    transfer,
    isPending,
    isConfirming,
    isSuccess,
    hash,
  };
}

export function useTokenMint() {
  const { data: hash, writeContract, isPending } = useWriteContract();

  const mint = (to: string, amount: string) => {
    writeContract({
      address: CONTRACT_ADDRESSES.Token as Address,
      abi: TokenABI,
      functionName: 'mint',
      args: [to as Address, parseEther(amount)],
    });
  };

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  return {
    mint,
    isPending,
    isConfirming,
    isSuccess,
    hash,
  };
}

export function useTokenBurn() {
  const { data: hash, writeContract, isPending } = useWriteContract();

  const burn = (amount: string) => {
    writeContract({
      address: CONTRACT_ADDRESSES.Token as Address,
      abi: TokenABI,
      functionName: 'burn',
      args: [parseEther(amount)],
    });
  };

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  return {
    burn,
    isPending,
    isConfirming,
    isSuccess,
    hash,
  };
}