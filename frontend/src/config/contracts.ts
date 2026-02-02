export const CONTRACT_ADDRESSES = {
  Token: (process.env.NEXT_PUBLIC_TOKEN_ADDRESS || '') as `0x${string}`,
  NFT: (process.env.NEXT_PUBLIC_NFT_ADDRESS || '') as `0x${string}`,
  Vault: (process.env.NEXT_PUBLIC_VAULT_ADDRESS || '') as `0x${string}`,
} as const;

export const BLOCK_EXPLORERS: Record<number, string> = {
  1: 'https://etherscan.io',
  5: 'https://goerli.etherscan.io',
  11155111: 'https://sepolia.etherscan.io',
};

export const NETWORK_NAMES: Record<number, string> = {
  1: 'Ethereum Mainnet',
  5: 'Goerli Testnet',
  11155111: 'Sepolia Testnet',
};

export const SUPPORTED_CHAINS = [1, 5, 11155111] as const;

export function getExplorerUrl(chainId: number, hash: string, type: 'tx' | 'address' = 'tx'): string {
  const baseUrl = BLOCK_EXPLORERS[chainId] || BLOCK_EXPLORERS[11155111];
  return `${baseUrl}/${type}/${hash}`;
}

export function getNetworkName(chainId: number): string {
  return NETWORK_NAMES[chainId] || 'Unknown Network';
}

export function isChainSupported(chainId: number): boolean {
  return SUPPORTED_CHAINS.includes(chainId as any);
}