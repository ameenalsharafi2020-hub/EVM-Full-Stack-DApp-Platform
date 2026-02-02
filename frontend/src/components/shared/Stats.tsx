'use client';

import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import Card, { CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils/cn';

interface Stat {
  label: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  color?: string;
}

interface StatsProps {
  stats: Stat[];
}

export default function Stats({ stats }: StatsProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
        >
          <Card variant="elevated" hover>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </p>
                  <p className={cn('mt-2 text-3xl font-bold', stat.color || 'text-gray-900 dark:text-white')}>
                    {stat.value}
                  </p>
                  {stat.change && (
                    <p
                      className={cn(
                        'mt-2 text-sm font-semibold',
                        stat.changeType === 'positive' && 'text-green-600',
                        stat.changeType === 'negative' && 'text-red-600',
                        stat.changeType === 'neutral' && 'text-gray-600',
                        !stat.changeType && 'text-gray-600'
                      )}
                    >
                      {stat.change}
                    </p>
                  )}
                </div>
                <div
                  className={cn(
                    'rounded-full p-3',
                    stat.color?.includes('blue') && 'bg-blue-100 dark:bg-blue-900/20',
                    stat.color?.includes('green') && 'bg-green-100 dark:bg-green-900/20',
                    stat.color?.includes('purple') && 'bg-purple-100 dark:bg-purple-900/20',
                    stat.color?.includes('orange') && 'bg-orange-100 dark:bg-orange-900/20',
                    !stat.color && 'bg-gray-100 dark:bg-gray-800'
                  )}
                >
                  <stat.icon className={cn('h-6 w-6', stat.color || 'text-gray-600')} />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}