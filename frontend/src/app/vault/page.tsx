'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { motion } from 'framer-motion';
import { Lock, Unlock, Clock, TrendingUp, Plus, ArrowRight, Calendar, Coins } from 'lucide-react';
import Card, { CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import Badge from '@/components/ui/Badge';
import EmptyState from '@/components/shared/EmptyState';
import { useVaultDeposit, useVaultWithdraw } from '@/hooks/useVault';
import { CONTRACT_ADDRESSES } from '@/config/contracts';
import { formatDate } from '@/lib/utils/format';
import toast from 'react-hot-toast';

export default function VaultPage() {
  const { address, isConnected } = useAccount();
  const { deposit, isPending, isConfirming } = useVaultDeposit();
  const { withdraw, isPending: isWithdrawing } = useVaultWithdraw();

  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [lockDuration, setLockDuration] = useState('30');

  const deposits = [
    {
      id: 1,
      amount: '100',
      token: 'MTK',
      unlockTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      apy: '12.5%',
      status: 'locked',
      rewards: '8.75',
    },
    {
      id: 2,
      amount: '250',
      token: 'MTK',
      unlockTime: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      apy: '15.0%',
      status: 'locked',
      rewards: '31.25',
    },
    {
      id: 3,
      amount: '500',
      token: 'MTK',
      unlockTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      apy: '10.0%',
      status: 'unlocked',
      rewards: '50.00',
    },
  ];

  const handleDeposit = () => {
    if (!depositAmount || !lockDuration) {
      toast.error('Please fill all fields');
      return;
    }
    const durationInSeconds = parseInt(lockDuration) * 24 * 60 * 60;
    deposit(CONTRACT_ADDRESSES.Token, depositAmount, durationInSeconds);
    setShowDepositModal(false);
    setDepositAmount('');
  };

  const handleWithdraw = (depositId: number) => {
    withdraw(CONTRACT_ADDRESSES.Token, depositId);
    toast.success('Withdrawal initiated!');
  };

  if (!isConnected) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16">
        <EmptyState icon={Lock} title="Connect Your Wallet" description="Access the vault and start earning rewards" />
      </div>
    );
  }

  const totalLocked = deposits.filter((d) => d.status === 'locked').reduce((sum, d) => sum + parseFloat(d.amount), 0);
  const totalUnlocked = deposits.filter((d) => d.status === 'unlocked').reduce((sum, d) => sum + parseFloat(d.amount), 0);
  const totalRewards = deposits.reduce((sum, d) => sum + parseFloat(d.rewards), 0);

  const lockDurations = [
    { days: 7, apy: '8.0%', bonus: 'Quick Lock' },
    { days: 30, apy: '12.5%', bonus: 'Popular' },
    { days: 90, apy: '18.0%', bonus: 'Best Value' },
    { days: 365, apy: '25.0%', bonus: 'Maximum' },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Secure Vault</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Lock your tokens and earn guaranteed rewards</p>
          </div>
          <Button onClick={() => setShowDepositModal(true)} size="lg" className="group">
            <Plus className="mr-2 h-5 w-5 transition-transform group-hover:rotate-90" />
            New Deposit
          </Button>
        </div>
      </motion.div>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="overflow-hidden border-0 bg-gradient-to-br from-blue-500 to-cyan-500 shadow-2xl">
          <CardContent className="p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-90">Total Locked</p>
                <p className="mt-2 text-4xl font-bold">{totalLocked.toFixed(2)}</p>
                <p className="mt-1 text-sm opacity-75">MTK Tokens</p>
              </div>
              <Lock className="h-10 w-10 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-0 bg-gradient-to-br from-green-500 to-emerald-500 shadow-2xl">
          <CardContent className="p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-90">Available</p>
                <p className="mt-2 text-4xl font-bold">{totalUnlocked.toFixed(2)}</p>
                <p className="mt-1 text-sm opacity-75">MTK Tokens</p>
              </div>
              <Unlock className="h-10 w-10 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-0 bg-gradient-to-br from-purple-500 to-pink-500 shadow-2xl">
          <CardContent className="p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-90">Rewards</p>
                <p className="mt-2 text-4xl font-bold">{totalRewards.toFixed(2)}</p>
                <p className="mt-1 text-sm opacity-75">MTK Tokens</p>
              </div>
              <TrendingUp className="h-10 w-10 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card variant="elevated" className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-6 w-6 text-blue-600" />
            Lock Duration & APY
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {lockDurations.map((option, idx) => (
              <div key={idx} className="relative overflow-hidden rounded-2xl border-2 border-gray-200 p-6 transition-all hover:border-blue-500 hover:shadow-lg dark:border-gray-700">
                {option.bonus && (
                  <div className="absolute right-0 top-0 rounded-bl-xl bg-gradient-to-r from-blue-500 to-purple-500 px-3 py-1 text-xs font-bold text-white">
                    {option.bonus}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{option.days} Days</p>
                </div>
                <p className="mt-4 text-4xl font-bold text-blue-600">{option.apy}</p>
                <p className="mt-1 text-sm text-gray-500">Annual APY</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card variant="elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-6 w-6 text-blue-600" />
            Your Deposits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {deposits.map((deposit) => {
              const daysLeft = Math.ceil((deposit.unlockTime.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
              return (
                <div key={deposit.id} className="rounded-2xl border-2 border-gray-200 p-6 dark:border-gray-700">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className={'rounded-full p-4 ' + (deposit.status === 'locked' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20' : 'bg-green-100 text-green-600 dark:bg-green-900/20')}>
                        {deposit.status === 'locked' ? <Lock className="h-8 w-8" /> : <Unlock className="h-8 w-8" />}
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{deposit.amount} {deposit.token}</p>
                        <p className="mt-1 text-sm text-gray-500">
                          {deposit.status === 'locked' ? 'Unlocks' : 'Unlocked'} on {formatDate(deposit.unlockTime)}
                        </p>
                        <div className="mt-2 flex items-center gap-4">
                          <Badge variant={deposit.status === 'locked' ? 'info' : 'success'}>{deposit.apy} APY</Badge>
                          <Badge variant="purple">+{deposit.rewards} Rewards</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      {deposit.status === 'unlocked' ? (
                        <Button size="sm" onClick={() => handleWithdraw(deposit.id)} isLoading={isWithdrawing}>
                          <Unlock className="mr-2 h-4 w-4" />
                          Withdraw
                        </Button>
                      ) : (
                        <p className="text-sm font-medium text-gray-500">{daysLeft} days left</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Modal isOpen={showDepositModal} onClose={() => setShowDepositModal(false)} title="Create New Deposit" size="lg">
        <div className="space-y-6">
          <Input label="Deposit Amount" type="number" placeholder="0.0" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} leftIcon={<Coins className="h-5 w-5 text-gray-400" />} />
          <div>
            <label className="mb-3 block text-sm font-semibold text-gray-700 dark:text-gray-300">Lock Duration (days)</label>
            <div className="grid grid-cols-4 gap-2">
              {['7', '30', '90', '365'].map((days) => (
                <button key={days} onClick={() => setLockDuration(days)} className={'rounded-xl border-2 p-3 font-semibold transition-all ' + (lockDuration === days ? 'border-blue-500 bg-blue-50 text-blue-600 dark:bg-blue-900/20' : 'border-gray-300 hover:border-blue-300 dark:border-gray-600')}>
                  <p className="text-2xl font-bold">{days}</p>
                  <p className="mt-1 text-xs">days</p>
                </button>
              ))}
            </div>
          </div>
          <Button className="w-full" size="lg" onClick={handleDeposit} isLoading={isPending || isConfirming}>
            <Lock className="mr-2 h-5 w-5" />
            Lock & Earn
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </Modal>
    </div>
  );
}