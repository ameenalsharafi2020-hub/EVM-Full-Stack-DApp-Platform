'use client';

import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { CONTRACT_ADDRESSES } from '@/config/contracts';
import NFTABI from '@/lib/abis/NFT.json';

type Address = `0x${string}`;

export function useNFTInfo() {
  const { data: name } = useReadContract({
    address: CONTRACT_ADDRESSES.NFT as Address,
    abi: NFTABI,
    functionName: 'name',
  });

  const { data: symbol } = useReadContract({
    address: CONTRACT_ADDRESSES.NFT as Address,
    abi: NFTABI,
    functionName: 'symbol',
  });

  const { data: mintPrice } = useReadContract({
    address: CONTRACT_ADDRESSES.NFT as Address,
    abi: NFTABI,
    functionName: 'mintPrice',
  });

  const { data: currentTokenId } = useReadContract({
    address: CONTRACT_ADDRESSES.NFT as Address,
    abi: NFTABI,
    functionName: 'getCurrentTokenId',
  });

  return {
    name: (name as string) || 'MyNFT',
    symbol: (symbol as string) || 'MNFT',
    mintPrice: (mintPrice as bigint) || BigInt(0),
    currentTokenId: (currentTokenId as bigint) || BigInt(0),
  };
}

export function useNFTMint() {
  const { data: hash, writeContract, isPending } = useWriteContract();

  const { data: mintPrice } = useReadContract({
    address: CONTRACT_ADDRESSES.NFT as Address,
    abi: NFTABI,
    functionName: 'mintPrice',
  });

  const mint = (to: string, uri: string) => {
    writeContract({
      address: CONTRACT_ADDRESSES.NFT as Address,
      abi: NFTABI,
      functionName: 'safeMint',
      args: [to as Address, uri],
      value: mintPrice as bigint,
    });
  };

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  return {
    mint,
    mintPrice: (mintPrice as bigint) || BigInt(0),
    isPending,
    isConfirming,
    isSuccess,
    hash,
  };
}

export function useNFTOwner(tokenId: number) {
  return useReadContract({
    address: CONTRACT_ADDRESSES.NFT as Address,
    abi: NFTABI,
    functionName: 'ownerOf',
    args: [BigInt(tokenId)],
  });
}

export function useNFTTokenURI(tokenId: number) {
  return useReadContract({
    address: CONTRACT_ADDRESSES.NFT as Address,
    abi: NFTABI,
    functionName: 'tokenURI',
    args: [BigInt(tokenId)],
  });
}