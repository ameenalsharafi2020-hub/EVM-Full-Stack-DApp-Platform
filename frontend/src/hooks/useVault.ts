'use client';

import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { CONTRACT_ADDRESSES } from '@/config/contracts';
import VaultABI from '@/lib/abis/Vault.json';
import { parseEther } from 'viem';

type Address = `0x${string}`;

export function useVaultDeposit() {
  const { data: hash, writeContract, isPending } = useWriteContract();

  const deposit = (tokenAddress: string, amount: string, lockDuration: number) => {
    writeContract({
      address: CONTRACT_ADDRESSES.Vault as Address,
      abi: VaultABI,
      functionName: 'deposit',
      args: [
        tokenAddress as Address,
        parseEther(amount),
        BigInt(lockDuration),
      ],
    });
  };

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  return {
    deposit,
    isPending,
    isConfirming,
    isSuccess,
    hash,
  };
}

export function useVaultWithdraw() {
  const { data: hash, writeContract, isPending } = useWriteContract();

  const withdraw = (tokenAddress: string, depositId: number) => {
    writeContract({
      address: CONTRACT_ADDRESSES.Vault as Address,
      abi: VaultABI,
      functionName: 'withdraw',
      args: [tokenAddress as Address, BigInt(depositId)],
    });
  };

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  return {
    withdraw,
    isPending,
    isConfirming,
    isSuccess,
    hash,
  };
}

export function useVaultDepositsCount(userAddress: string | undefined, tokenAddress: string) {
  return useReadContract({
    address: CONTRACT_ADDRESSES.Vault as Address,
    abi: VaultABI,
    functionName: 'getDepositsCount',
    args: userAddress ? [userAddress as Address, tokenAddress as Address] : undefined,
    query: {
      enabled: !!userAddress,
    },
  });
}

export function useVaultDepositInfo(
  userAddress: string | undefined,
  tokenAddress: string,
  depositId: number
) {
  return useReadContract({
    address: CONTRACT_ADDRESSES.Vault as Address,
    abi: VaultABI,
    functionName: 'getDeposit',
    args: userAddress
      ? [userAddress as Address, tokenAddress as Address, BigInt(depositId)]
      : undefined,
    query: {
      enabled: !!userAddress,
    },
  });
}