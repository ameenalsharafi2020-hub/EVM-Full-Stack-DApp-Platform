'use client';

import { useAccount } from 'wagmi';
import TokenCard from '@/components/features/TokenCard';
import TransferForm from '@/components/features/TransferForm';
import { Activity, TrendingUp, Users, Wallet } from 'lucide-react';
import Card, { CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export default function Dashboard() {
  const { address, isConnected } = useAccount();

  if (!isConnected) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <Wallet className="mx-auto h-16 w-16 text-gray-400" />
          <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
            Connect Your Wallet
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Please connect your wallet to view your dashboard
          </p>
        </div>
      </div>
    );
  }

  const stats = [
    { name: 'Total Value', value: ',345', icon: TrendingUp, change: '+12.5%' },
    { name: 'Total Transactions', value: '127', icon: Activity, change: '+5' },
    { name: 'Active Contracts', value: '3', icon: Users, change: '0' },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Welcome back! Here's your portfolio overview
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.name} variant="elevated">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{stat.name}</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-green-600">{stat.change}</p>
                </div>
                <div className="rounded-full bg-primary-100 p-3 dark:bg-primary-900/20">
                  <stat.icon className="h-6 w-6 text-primary-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <TokenCard />
        <TransferForm />
      </div>
    </div>
  );
}
