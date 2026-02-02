'use client';

import { useDisconnect as useWagmiDisconnect } from 'wagmi';
import { useEffect } from 'react';
import { clearWalletConnectCache } from '@/utils/walletconnect';
import toast from 'react-hot-toast';

export function useCustomDisconnect() {
  const { disconnect, ...rest } = useWagmiDisconnect();

  const handleDisconnect = () => {
    try {
      // First disconnect from wagmi
      disconnect();
      
      // Then clear WalletConnect cache
      setTimeout(() => {
        clearWalletConnectCache();
        toast.success('Wallet disconnected successfully');
      }, 500);
    } catch (error) {
      console.error('Disconnect error:', error);
      // Clear cache anyway
      clearWalletConnectCache();
      toast.error('Disconnected with cleanup');
    }
  };

  return {
    disconnect: handleDisconnect,
    ...rest,
  };
}