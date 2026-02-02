'use client';

import { useAccount } from 'wagmi';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Activity, DollarSign } from 'lucide-react';
import Card, { CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Stats from '@/components/shared/Stats';
import EmptyState from '@/components/shared/EmptyState';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AnalyticsPage() {
  const { isConnected } = useAccount();

  const volumeData = [
    { name: 'Mon', volume: 4000 },
    { name: 'Tue', volume: 3000 },
    { name: 'Wed', volume: 5000 },
    { name: 'Thu', volume: 4500 },
    { name: 'Fri', volume: 6000 },
    { name: 'Sat', volume: 5500 },
    { name: 'Sun', volume: 7000 },
  ];

  const topHolders = [
    { address: '0x1234...5678', balance: '1,250,000', percentage: '12.5%', rank: 1 },
    { address: '0x8765...4321', balance: '987,500', percentage: '9.9%', rank: 2 },
    { address: '0xabcd...efgh', balance: '750,000', percentage: '7.5%', rank: 3 },
    { address: '0x9999...1111', balance: '625,000', percentage: '6.3%', rank: 4 },
    { address: '0x2222...3333', balance: '500,000', percentage: '5.0%', rank: 5 },
  ];

  if (!isConnected) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16">
        <EmptyState
          icon={BarChart3}
          title="Connect Your Wallet"
          description="View detailed analytics and insights about the platform"
        />
      </div>
    );
  }

  const stats = [
    {
      label: 'Total Volume',
      value: '$1.2M',
      change: '+24.5%',
      changeType: 'positive' as const,
      icon: DollarSign,
      color: 'text-green-600',
    },
    {
      label: 'Active Users',
      value: '12,543',
      change: '+12.3%',
      changeType: 'positive' as const,
      icon: Users,
      color: 'text-blue-600',
    },
    {
      label: 'Transactions',
      value: '45,678',
      change: '+8.7%',
      changeType: 'positive' as const,
      icon: Activity,
      color: 'text-purple-600',
    },
    {
      label: 'TVL',
      value: '$3.5M',
      change: '+15.2%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      color: 'text-orange-600',
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Comprehensive platform statistics and insights
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <Stats stats={stats} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <Card variant="elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-blue-600" />
              Trading Volume
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={volumeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
                <Bar dataKey="volume" fill="#6366f1" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card variant="elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-6 w-6 text-blue-600" />
              Top Token Holders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topHolders.map((holder, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  className="flex items-center justify-between rounded-xl border-2 border-gray-200 p-6 transition-all hover:border-blue-300 hover:shadow-lg dark:border-gray-700 dark:hover:border-blue-700"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-xl font-bold text-white shadow-lg">
                      #{holder.rank}
                    </div>
                    <div>
                      <code className="font-mono text-lg font-semibold text-gray-900 dark:text-white">
                        {holder.address}
                      </code>
                      <p className="mt-1 text-sm text-gray-500">
                        {holder.balance} MTK ({holder.percentage})
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-green-600">
                    <TrendingUp className="h-5 w-5" />
                    <span className="font-semibold">+2.5%</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}