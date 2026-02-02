'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { motion } from 'framer-motion';
import { Coins, Send, TrendingUp, History, Flame } from 'lucide-react';
import Card, { CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import Badge from '@/components/ui/Badge';
import EmptyState from '@/components/shared/EmptyState';
import { useTokenBalance, useTokenInfo, useTokenTransfer, useTokenBurn } from '@/hooks/useToken';
import { formatEth } from '@/lib/utils/format';
import toast from 'react-hot-toast';

export default function TokensPage() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useTokenBalance(address);
  const { name, symbol, totalSupply } = useTokenInfo();
  const { transfer, isPending, isConfirming } = useTokenTransfer();
  const { burn, isPending: isBurning, isConfirming: isBurnConfirming } = useTokenBurn();

  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showBurnModal, setShowBurnModal] = useState(false);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [burnAmount, setBurnAmount] = useState('');

  const handleTransfer = () => {
    if (!recipient || !amount) {
      toast.error('Please fill all fields');
      return;
    }
    transfer(recipient, amount);
    setShowTransferModal(false);
    setRecipient('');
    setAmount('');
  };

  const handleBurn = () => {
    if (!burnAmount) {
      toast.error('Please enter amount to burn');
      return;
    }
    burn(burnAmount);
    setShowBurnModal(false);
    setBurnAmount('');
  };

  if (!isConnected) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16">
        <EmptyState
          icon={Coins}
          title="Connect Your Wallet"
          description="Connect your wallet to manage your tokens"
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Token Management</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Manage your {symbol} tokens</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
        <Card className="overflow-hidden border-0 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 shadow-2xl">
          <CardContent className="p-8 text-white">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium opacity-90">Total Balance</p>
                <h2 className="mt-2 text-6xl font-bold">{balance ? formatEth(balance as bigint) : '0.00'}</h2>
                <p className="mt-1 text-2xl font-semibold opacity-90">{symbol}</p>
                <p className="mt-4 text-lg opacity-75">
                  ≈ ${balance ? (parseFloat(formatEth(balance as bigint)) * 1.5).toFixed(2) : '0.00'} USD
                </p>
              </div>
              <div className="rounded-full bg-white/20 p-6 backdrop-blur">
                <Coins className="h-12 w-12" />
              </div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              <Button variant="secondary" className="bg-white/20 backdrop-blur hover:bg-white/30" onClick={() => setShowTransferModal(true)}>
                <Send className="mr-2 h-4 w-4" />
                Send
              </Button>
              <Button variant="secondary" className="bg-white/20 backdrop-blur hover:bg-white/30" onClick={() => setShowBurnModal(true)}>
                <Flame className="mr-2 h-4 w-4" />
                Burn
              </Button>
              <Button variant="secondary" className="bg-white/20 backdrop-blur hover:bg-white/30">
                <TrendingUp className="mr-2 h-4 w-4" />
                Swap
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card variant="elevated" hover>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Market Cap</p>
                <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                  ${totalSupply ? (parseFloat(formatEth(totalSupply)) * 1.5).toFixed(0) : '0'}
                </p>
                <Badge variant="success" className="mt-2">+12.5%</Badge>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated" hover>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">24h Volume</p>
                <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">$12,456</p>
                <Badge variant="success" className="mt-2">+8.3%</Badge>
              </div>
              <History className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated" hover>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Supply</p>
                <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                  {totalSupply ? formatEth(totalSupply).split('.')[0] : '0'}
                </p>
                <p className="mt-2 text-sm text-gray-500">{symbol}</p>
              </div>
              <Coins className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Modal isOpen={showTransferModal} onClose={() => setShowTransferModal(false)} title="Send Tokens">
        <div className="space-y-4">
          <Input label="Recipient Address" placeholder="0x..." value={recipient} onChange={(e) => setRecipient(e.target.value)} />
          <Input label="Amount" type="number" placeholder="0.0" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <Button className="w-full" onClick={handleTransfer} isLoading={isPending || isConfirming}>
            <Send className="mr-2 h-5 w-5" />
            Send Tokens
          </Button>
        </div>
      </Modal>

      <Modal isOpen={showBurnModal} onClose={() => setShowBurnModal(false)} title="Burn Tokens">
        <div className="space-y-4">
          <div className="rounded-xl bg-red-50 p-4 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-400">
            ⚠️ Warning: Burning tokens is permanent!
          </div>
          <Input label="Amount to Burn" type="number" placeholder="0.0" value={burnAmount} onChange={(e) => setBurnAmount(e.target.value)} />
          <Button variant="danger" className="w-full" onClick={handleBurn} isLoading={isBurning || isBurnConfirming}>
            <Flame className="mr-2 h-5 w-5" />
            Burn Tokens
          </Button>
        </div>
      </Modal>
    </div>
  );
}