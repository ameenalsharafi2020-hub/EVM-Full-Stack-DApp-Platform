'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { motion } from 'framer-motion';
import {
  ArrowDownUp,
  Settings,
  Repeat,
  Info,
  Zap,
  AlertTriangle,
  TrendingUp,
  Clock,
} from 'lucide-react';
import Card, { CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Alert from '@/components/ui/Alert';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import EmptyState from '@/components/shared/EmptyState';
import toast from 'react-hot-toast';

const tokens = [
  { symbol: 'ETH', name: 'Ethereum', balance: '1.5', icon: '⟠', color: 'from-purple-500 to-blue-500' },
  { symbol: 'MTK', name: 'MyToken', balance: '1000', icon: '◆', color: 'from-blue-500 to-cyan-500' },
  { symbol: 'USDC', name: 'USD Coin', balance: '500', icon: '\$', color: 'from-green-500 to-emerald-500' },
  { symbol: 'DAI', name: 'Dai', balance: '250', icon: '◈', color: 'from-yellow-500 to-orange-500' },
  { symbol: 'WBTC', name: 'Wrapped Bitcoin', balance: '0.05', icon: '₿', color: 'from-orange-500 to-red-500' },
  { symbol: 'LINK', name: 'Chainlink', balance: '150', icon: '⬡', color: 'from-blue-600 to-indigo-600' },
];

export default function SwapPage() {
  const { isConnected } = useAccount();
  const [fromToken, setFromToken] = useState(tokens[0]);
  const [toToken, setToToken] = useState(tokens[1]);
  const [fromAmount, setFromAmount] = useState('');
  const [slippage, setSlippage] = useState('0.5');
  const [showSettings, setShowSettings] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);

  const handleSwap = async () => {
    if (!fromAmount) {
      toast.error('Please enter an amount');
      return;
    }
    setIsSwapping(true);
    // Simulate swap
    await new Promise((resolve) => setTimeout(resolve, 2000));
    toast.success('Swap successful!');
    setIsSwapping(false);
    setFromAmount('');
  };

  const handleFlip = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
  };

  if (!isConnected) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16">
        <EmptyState
          icon={ArrowDownUp}
          title="Connect Your Wallet"
          description="Start swapping tokens instantly with the best rates"
        />
      </div>
    );
  }

  const exchangeRate = 1.5;
  const estimatedOutput = fromAmount ? (parseFloat(fromAmount) * exchangeRate).toFixed(6) : '0.00';
  const priceImpact = fromAmount ? ((parseFloat(fromAmount) / 1000) * 100).toFixed(2) : '0.00';
  const networkFee = '0.0025';

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

      {/* Main Swap Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card variant="elevated" className="overflow-hidden">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <ArrowDownUp className="h-6 w-6 text-primary-600" />
                Swap
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSettings(true)}
                className="rounded-full"
              >
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-2">
            {/* From Token */}
            <div className="rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-6 dark:from-gray-800 dark:to-gray-900">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                  From
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Balance: {fromToken.balance}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  placeholder="0.0"
                  className="flex-1 bg-transparent text-4xl font-bold outline-none placeholder:text-gray-400"
                />
                <div className="relative">
                  <select
                    value={fromToken.symbol}
                    onChange={(e) =>
                      setFromToken(tokens.find((t) => t.symbol === e.target.value)!)
                    }
                    className="cursor-pointer appearance-none rounded-2xl bg-white px-6 py-3 pr-12 font-bold shadow-lg transition-all hover:shadow-xl dark:bg-gray-700"
                  >
                    {tokens.map((token) => (
                      <option key={token.symbol} value={token.symbol}>
                        {token.symbol}
                      </option>
                    ))}
                  </select>
                  <div
                    className={\pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-2xl\}
                  >
                    {fromToken.icon}
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <Badge variant="info" size="sm">
                  {fromToken.name}
                </Badge>
                {fromAmount && (
                  <span className="text-sm text-gray-500">
                    ≈ \ USD
                  </span>
                )}
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <button
                onClick={handleFlip}
                className="group relative z-10 -my-3 rounded-2xl border-4 border-white bg-gradient-to-r from-primary-500 to-secondary-500 p-3 shadow-2xl transition-all hover:scale-110 hover:rotate-180 dark:border-gray-900"
              >
                <Repeat className="h-6 w-6 text-white transition-transform" />
              </button>
            </div>

            {/* To Token */}
            <div className="rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-6 dark:from-gray-800 dark:to-gray-900">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">To</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Balance: {toToken.balance}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  value={estimatedOutput}
                  readOnly
                  placeholder="0.0"
                  className="flex-1 bg-transparent text-4xl font-bold outline-none placeholder:text-gray-400"
                />
                <div className="relative">
                  <select
                    value={toToken.symbol}
                    onChange={(e) => setToToken(tokens.find((t) => t.symbol === e.target.value)!)}
                    className="cursor-pointer appearance-none rounded-2xl bg-white px-6 py-3 pr-12 font-bold shadow-lg transition-all hover:shadow-xl dark:bg-gray-700"
                  >
                    {tokens.map((token) => (
                      <option key={token.symbol} value={token.symbol}>
                        {token.symbol}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-2xl">
                    {toToken.icon}
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <Badge variant="success" size="sm">
                  {toToken.name}
                </Badge>
                {estimatedOutput !== '0.00' && (
                  <span className="text-sm text-gray-500">
                    ≈ \ USD
                  </span>
                )}
              </div>
            </div>

            {/* Swap Details */}
            {fromAmount && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-3 rounded-2xl bg-gradient-to-r from-primary-50 to-secondary-50 p-6 dark:from-primary-900/20 dark:to-secondary-900/20"
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <TrendingUp className="h-4 w-4" />
                    Exchange Rate
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    1 {fromToken.symbol} = {exchangeRate} {toToken.symbol}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <AlertTriangle className="h-4 w-4" />
                    Price Impact
                  </span>
                  <span
                    className={\ont-semibold }
                  >
                    {priceImpact}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Settings className="h-4 w-4" />
                    Slippage Tolerance
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">{slippage}%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Zap className="h-4 w-4" />
                    Network Fee
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    ~{networkFee} ETH (\.00)
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Clock className="h-4 w-4" />
                    Estimated Time
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">~30 seconds</span>
                </div>
              </motion.div>
            )}

            <Alert variant="info" icon={true}>
              Output is estimated. You will receive at least{' '}
              <strong>{(parseFloat(estimatedOutput) * 0.995).toFixed(6)}</strong> {toToken.symbol}{' '}
              or the transaction will revert.
            </Alert>

            <Button
              className="w-full"
              size="lg"
              onClick={handleSwap}
              isLoading={isSwapping}
              disabled={!fromAmount || parseFloat(fromAmount) === 0}
            >
              <ArrowDownUp className="mr-2 h-5 w-5" />
              {isSwapping ? 'Swapping...' : 'Swap Tokens'}
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Swaps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6"
      >
        <Card variant="elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-6 w-6 text-primary-600" />
              Recent Swaps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { from: 'ETH', to: 'MTK', amount: '0.5', time: '2 min ago' },
                { from: 'USDC', to: 'DAI', amount: '100', time: '15 min ago' },
                { from: 'MTK', to: 'WBTC', amount: '50', time: '1 hour ago' },
              ].map((swap, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-xl border-2 border-gray-200 p-4 transition-colors hover:border-primary-300 dark:border-gray-700"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 text-lg font-bold text-white">
                        {tokens.find((t) => t.symbol === swap.from)?.icon}
                      </div>
                      <ArrowDownUp className="mx-2 h-4 w-4 text-gray-400" />
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-secondary-500 to-primary-500 text-lg font-bold text-white">
                        {tokens.find((t) => t.symbol === swap.to)?.icon}
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {swap.from} → {swap.to}
                      </p>
                      <p className="text-sm text-gray-500">{swap.time}</p>
                    </div>
                  </div>
                  <Badge variant="success">Completed</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Settings Modal */}
      <Modal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        title="Swap Settings"
        description="Customize your swap preferences"
      >
        <div className="space-y-6">
          <div>
            <label className="mb-3 block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Slippage Tolerance
            </label>
            <div className="grid grid-cols-4 gap-2">
              {['0.1', '0.5', '1.0', '3.0'].map((value) => (
                <button
                  key={value}
                  onClick={() => setSlippage(value)}
                  className={\ounded-xl border-2 p-3 font-semibold transition-all }
                >
                  {value}%
                </button>
              ))}
            </div>
            <Input
              className="mt-3"
              type="number"
              step="0.1"
              value={slippage}
              onChange={(e) => setSlippage(e.target.value)}
              placeholder="Custom"
            />
          </div>

          <div>
            <label className="mb-3 block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Transaction Deadline
            </label>
            <Input type="number" defaultValue="20" placeholder="20 minutes" />
          </div>

          <Alert variant="warning" icon={true}>
            Setting a high slippage tolerance can result in unfavorable trades. Use with caution.
          </Alert>

          <Button className="w-full" onClick={() => setShowSettings(false)}>
            Save Settings
          </Button>
        </div>
      </Modal>
    </div>
  );
}
