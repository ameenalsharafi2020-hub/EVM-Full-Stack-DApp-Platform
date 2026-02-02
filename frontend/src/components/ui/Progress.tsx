'use client';

import { cn } from '@/lib/utils/cn';

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  color?: 'primary' | 'success' | 'warning' | 'error';
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export default function Progress({
  value,
  max = 100,
  className,
  color = 'primary',
  showLabel = false,
  size = 'md',
  animated = true,
}: ProgressProps) {
  const percentage = Math.min((value / max) * 100, 100);

  const colors = {
    primary: 'bg-gradient-to-r from-blue-500 to-blue-600',
    success: 'bg-gradient-to-r from-green-500 to-green-600',
    warning: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
    error: 'bg-gradient-to-r from-red-500 to-red-600',
  };

  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className="w-full">
      <div className={cn('overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700', sizes[size], className)}>
        <div
          className={cn('h-full transition-all duration-500 ease-out rounded-full', colors[color], animated && 'animate-pulse')}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <p className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">
          {value} / {max} ({percentage.toFixed(0)}%)
        </p>
      )}
    </div>
  );
}