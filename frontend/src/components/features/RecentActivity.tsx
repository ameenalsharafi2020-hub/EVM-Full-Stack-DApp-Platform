'use client';

import { motion } from 'framer-motion';
import { Activity, ArrowDownRight, ArrowUpRight, Lock } from 'lucide-react';
import Card, { CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { formatAddress } from '@/lib/utils/format';

const activities = [
  {
    type: 'Received',
    amount: '+100 MTK',
    from: '0x1234567890123456789012345678901234567890',
    time: '2 hours ago',
    icon: ArrowDownRight,
    color: 'text-green-600 bg-green-100 dark:bg-green-900/20',
  },
  {
    type: 'Sent',
    amount: '-50 MTK',
    to: '0x0987654321098765432109876543210987654321',
    time: '5 hours ago',
    icon: ArrowUpRight,
    color: 'text-red-600 bg-red-100 dark:bg-red-900/20',
  },
  {
    type: 'Staked',
    amount: '250 MTK',
    time: '1 day ago',
    icon: Lock,
    color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/20',
  },
];

export default function RecentActivity() {
  return (
    <Card variant="elevated">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-blue-600" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-start gap-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700"
            >
              <div className={'rounded-full p-2 ' + activity.color}>
                <activity.icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold">{activity.type}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {activity.from && 'From ' + formatAddress(activity.from)}
                      {activity.to && 'To ' + formatAddress(activity.to)}
                      {!activity.from && !activity.to && activity.amount}
                    </p>
                  </div>
                  <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900/20">
                    completed
                  </span>
                </div>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-sm font-medium">{activity.amount}</span>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}