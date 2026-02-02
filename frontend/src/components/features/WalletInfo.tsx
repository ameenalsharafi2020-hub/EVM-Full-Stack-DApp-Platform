'use client';

import { useAccount, useBalance, useDisconnect } from 'wagmi';
import { Copy, ExternalLink, LogOut, CheckCircle } from 'lucide-react';
import Card, { CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { formatAddress, formatEth } from '@/utils/format';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function WalletInfo() {
  const { address, chain } = useAccount();
  const { data: balance } = useBalance({ address });
  const { disconnect } = useDisconnect();
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      toast.success('Address copied!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!address) return null;

  return (
    <Card variant="elevated">
      <CardHeader>
        <CardTitle>Wallet Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg bg-gradient-to-r from-primary-50 to-secondary-50 p-4 dark:from-primary-900/20 dark:to-secondary-900/20">
          <p className="text-sm text-gray-600 dark:text-gray-400">Connected Address</p>
          <div className="mt-2 flex items-center justify-between">
            <code className="text-lg font-mono">{formatAddress(address)}</code>
            <button
              onClick={copyAddress}
              className="rounded-lg p-2 transition-colors hover:bg-white/50 dark:hover:bg-gray-800/50"
            >
              {copied ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <Copy className="h-5 w-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
            <p className="text-sm text-gray-600 dark:text-gray-400">Balance</p>
            <p className="mt-1 text-2xl font-bold">
              {balance ? formatEth(balance.value) : '0.00'}
            </p>
            <p className="text-sm text-gray-500">{balance?.symbol || 'ETH'}</p>
          </div>

          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
            <p className="text-sm text-gray-600 dark:text-gray-400">Network</p>
            <p className="mt-1 text-lg font-bold">{chain?.name || 'Unknown'}</p>
            <p className="text-sm text-gray-500">Chain ID: {chain?.id || 'N/A'}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => window.open(https://etherscan.io/address/, '_blank')}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            View on Explorer
          </Button>
          <Button variant="outline" size="sm" className="flex-1" onClick={() => disconnect()}>
            <LogOut className="mr-2 h-4 w-4" />
            Disconnect
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
