'use client';

import { useState, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface Tab {
  label: string;
  content: ReactNode;
  icon?: ReactNode;
  badge?: string | number;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: number;
  variant?: 'default' | 'pills' | 'underline';
}

export default function Tabs({ tabs, defaultTab = 0, variant = 'default' }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const variants = {
    default: {
      container: 'flex space-x-1 rounded-xl bg-gray-100 p-1 dark:bg-gray-800',
      button: 'relative flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-all',
      active: 'text-primary-600 dark:text-primary-400',
      inactive: 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100',
      indicator: 'absolute inset-0 rounded-lg bg-white shadow-sm dark:bg-gray-700',
    },
    pills: {
      container: 'flex flex-wrap gap-2',
      button: 'px-4 py-2 text-sm font-medium rounded-full transition-all',
      active:
        'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg',
      inactive:
        'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400',
      indicator: '',
    },
    underline: {
      container: 'flex border-b-2 border-gray-200 dark:border-gray-700',
      button: 'relative px-4 py-3 text-sm font-medium transition-all',
      active: 'text-primary-600 dark:text-primary-400',
      inactive: 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100',
      indicator:
        'absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-600 to-primary-700',
    },
  };

  const config = variants[variant];

  return (
    <div className="w-full">
      <div className={config.container}>
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={cn(
              config.button,
              activeTab === idx ? config.active : config.inactive
            )}
          >
            {variant === 'default' && activeTab === idx && (
              <motion.div
                layoutId="activeTab"
                className={config.indicator}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            {variant === 'underline' && activeTab === idx && (
              <motion.div
                layoutId="underline"
                className={config.indicator}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative flex items-center justify-center gap-2">
              {tab.icon}
              {tab.label}
              {tab.badge && (
                <span className="ml-2 rounded-full bg-primary-100 px-2 py-0.5 text-xs font-bold text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
                  {tab.badge}
                </span>
              )}
            </span>
          </button>
        ))}
      </div>
      <div className="mt-6">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {tabs[activeTab].content}
        </motion.div>
      </div>
    </div>
  );
}
