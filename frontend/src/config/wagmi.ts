'use client';

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia, mainnet } from 'wagmi/chains';

// Export projectId explicitly
export const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '';

export const config = getDefaultConfig({
  appName: 'EVM Smart Contract DApp',
  projectId: walletConnectProjectId,
  chains: [sepolia, mainnet],
  ssr: false,
});