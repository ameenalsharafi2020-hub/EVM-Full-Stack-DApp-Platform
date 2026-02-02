'use client';

import { useAccount } from 'wagmi';
import { useTokenBalance, useTokenInfo } from '@/hooks/useToken';
import Card, { CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { formatEth } from '@/utils/format';
import { Coins } from 'lucide-react';

export default function TokenCard() {
  const { address } = useAccount();
  const { data: balance } = useTokenBalance(address);
  const { name, symbol, totalSupply } = useTokenInfo();

  return (
    <Card variant="elevated">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Coins className="h-6 w-6 text-primary-600" />
            Token Balance
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Your Balance</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {balance ? formatEth(balance as bigint) : '0'} {symbol}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Token Name</p>
              <p className="font-semibold text-gray-900 dark:text-white">{name || 'Loading...'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Total Supply</p>
              <p className="font-semibold text-gray-900 dark:text-white">
                {totalSupply ? formatEth(totalSupply) : '0'}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
