'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { motion } from 'framer-motion';
import { ArrowDownUp, Settings, Repeat } from 'lucide-react';
import Card, { CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Alert from '@/components/ui/Alert';
import toast from 'react-hot-toast';

const tokens = [
  { symbol: 'ETH', name: 'Ethereum', balance: '1.5' },
  { symbol: 'MTK', name: 'MyToken', balance: '1000' },
  { symbol: 'USDC', name: 'USD Coin', balance: '500' },
  { symbol: 'DAI', name: 'Dai', balance: '250' },
];

export default function SwapPage() {
  const { isConnected } = useAccount();
  const [fromToken, setFromToken] = useState(tokens[0]);
  const [toToken, setToToken] = useState(tokens[1]);
  const [fromAmount, setFromAmount] = useState('');
  const [slippage, setSlippage] = useState('0.5');

  const handleSwap = () => {
    if (!fromAmount) {
      toast.error('Please enter an amount');
      return;
    }
    toast.success('Swap initiated!');
  };

  const handleFlip = () => {
    setFromToken(toToken);
    setToToken(fromToken);
  };

  if (!isConnected) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <ArrowDownUp className="mx-auto h-20 w-20 text-gray-400" />
          <h2 className="mt-4 text-2xl font-bold">Connect Your Wallet</h2>
          <p className="mt-2 text-gray-600">Start swapping tokens</p>
        </div>
      </div>
    );
  }

  const estimatedOutput = fromAmount ? (parseFloat(fromAmount) * 1.5).toFixed(6) : '0.00';

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Swap Tokens</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Trade tokens instantly with the best rates
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card variant="elevated">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Swap</CardTitle>
              <Button variant="ghost" size="sm">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* From Token */}
            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-gray-500">From</span>
                <span className="text-sm text-gray-500">
                  Balance: {fromToken.balance}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  placeholder="0.0"
                  className="flex-1 bg-transparent text-3xl font-bold outline-none"
                />
                <select
                  value={fromToken.symbol}
                  onChange={(e) =>
                    setFromToken(tokens.find((t) => t.symbol === e.target.value)!)
                  }
                  className="rounded-lg bg-white px-4 py-2 font-semibold dark:bg-gray-700"
                >
                  {tokens.map((token) => (
                    <option key={token.symbol} value={token.symbol}>
                      {token.symbol}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <button
                onClick={handleFlip}
                className="rounded-full bg-white p-2 shadow-lg transition-transform hover:scale-110 dark:bg-gray-800"
              >
                <Repeat className="h-6 w-6 text-primary-600" />
              </button>
            </div>

            {/* To Token */}
            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-gray-500">To</span>
                <span className="text-sm text-gray-500">
                  Balance: {toToken.balance}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  value={estimatedOutput}
                  readOnly
                  placeholder="0.0"
                  className="flex-1 bg-transparent text-3xl font-bold outline-none"
                />
                <select
                  value={toToken.symbol}
                  onChange={(e) =>
                    setToToken(tokens.find((t) => t.symbol === e.target.value)!)
                  }
                  className="rounded-lg bg-white px-4 py-2 font-semibold dark:bg-gray-700"
                >
                  {tokens.map((token) => (
                    <option key={token.symbol} value={token.symbol}>
                      {token.symbol}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Swap Details */}
            {fromAmount && (
              <div className="space-y-2 rounded-lg bg-gray-50 p-4 text-sm dark:bg-gray-800">
                <div className="flex justify-between">
                  <span className="text-gray-500">Rate</span>
                  <span className="font-semibold">
                    1 {fromToken.symbol} = 1.5 {toToken.symbol}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Slippage Tolerance</span>
                  <span className="font-semibold">{slippage}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Network Fee</span>
                  <span className="font-semibold">~.50</span>
                </div>
              </div>
            )}

            <Alert variant="info">
              Always check the exchange rate and slippage before confirming your swap.
            </Alert>

            <Button className="w-full" size="lg" onClick={handleSwap}>
              <ArrowDownUp className="mr-2 h-5 w-5" />
              Swap Tokens
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
