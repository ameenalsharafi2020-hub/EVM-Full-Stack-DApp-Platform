'use client';

import { useAccount, useBalance, useDisconnect } from 'wagmi';
import { motion } from 'framer-motion';
import { User, Copy, ExternalLink, LogOut, CheckCircle2 } from 'lucide-react';
import Card, { CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Badge from '@/components/ui/Badge';
import EmptyState from '@/components/shared/EmptyState';
import RecentActivity from '@/components/features/RecentActivity';
import { formatAddress, formatEth, copyToClipboard } from '@/lib/utils/format';
import { getExplorerUrl } from '@/config/contracts';
import { useChainId } from 'wagmi';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });
  const { disconnect } = useDisconnect();
  const chainId = useChainId();

  const handleCopy = async (text: string) => {
    await copyToClipboard(text);
    toast.success('Copied to clipboard!');
  };

  if (!isConnected) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16">
        <EmptyState icon={User} title="Connect Your Wallet" description="Access your profile and manage your account" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-6">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-4xl font-bold text-white shadow-2xl">
            {address?.slice(2, 4).toUpperCase()}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Profile</h1>
            <p className="mt-1 font-mono text-gray-600 dark:text-gray-400">{address && formatAddress(address, 10)}</p>
            <div className="mt-2 flex gap-2">
              <Badge variant="success">
                <CheckCircle2 className="mr-1 h-3 w-3" />
                Verified
              </Badge>
              <Badge variant="info">Premium</Badge>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card variant="gradient">
          <CardHeader>
            <CardTitle>Wallet Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-xl bg-white/50 p-4 backdrop-blur dark:bg-gray-800/50">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Address</p>
              <div className="mt-2 flex items-center justify-between">
                <code className="text-lg font-mono font-semibold text-gray-900 dark:text-white">{address && formatAddress(address, 8)}</code>
                <div className="flex gap-2">
                  <button onClick={() => address && handleCopy(address)} className="rounded-lg p-2 transition-colors hover:bg-white/50 dark:hover:bg-gray-700/50">
                    <Copy className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  </button>
                  <a href={address ? getExplorerUrl(chainId, address, 'address') : '#'} target="_blank" rel="noopener noreferrer" className="rounded-lg p-2 transition-colors hover:bg-white/50 dark:hover:bg-gray-700/50">
                    <ExternalLink className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  </a>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-white/50 p-4 backdrop-blur dark:bg-gray-800/50">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Balance</p>
                <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{balance ? formatEth(balance.value) : '0.00'}</p>
                <p className="text-sm text-gray-500">{balance?.symbol || 'ETH'}</p>
              </div>
              <div className="rounded-xl bg-white/50 p-4 backdrop-blur dark:bg-gray-800/50">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Network</p>
                <p className="mt-2 text-lg font-bold text-gray-900 dark:text-white">Sepolia</p>
                <p className="text-sm text-gray-500">Chain ID: {chainId}</p>
              </div>
            </div>

            <Button variant="danger" className="w-full" onClick={() => disconnect()}>
              <LogOut className="mr-2 h-5 w-5" />
              Disconnect Wallet
            </Button>
          </CardContent>
        </Card>

        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input label="Display Name" placeholder="Enter your name" />
            <Input label="Email" type="email" placeholder="your@email.com" />
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">Bio</label>
              <textarea className="w-full rounded-xl border-2 border-gray-200 p-4 transition-colors focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800" rows={4} placeholder="Tell us about yourself..." />
            </div>
            <Button className="w-full">Save Changes</Button>
          </CardContent>
        </Card>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-8">
        <RecentActivity />
      </motion.div>
    </div>
  );
}