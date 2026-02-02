'use client';

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia, mainnet } from 'wagmi/chains';

// نستخدم Project ID الخاص بك من .env.local
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '';

export const config = getDefaultConfig({
  appName: 'EVM Smart Contract DApp',
  projectId,
  chains: [sepolia, mainnet],
  ssr: false,

  // لا نضيف coinbaseWallet أو metamask sdk هنا، نخلي RainbowKit يتعامل مع connectors الافتراضية
});