'use client';

import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import Button from '@/components/ui/Button';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex min-h-[400px] flex-col items-center justify-center p-8 text-center"
    >
      <div className="rounded-full bg-gradient-to-br from-gray-100 to-gray-200 p-6 dark:from-gray-800 dark:to-gray-700">
        <Icon className="h-16 w-16 text-gray-400" />
      </div>
      <h3 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">{title}</h3>
      <p className="mt-2 max-w-md text-gray-600 dark:text-gray-400">{description}</p>
      {action && (
        <Button onClick={action.onClick} className="mt-6">
          {action.label}
        </Button>
      )}
    </motion.div>
  );
}
