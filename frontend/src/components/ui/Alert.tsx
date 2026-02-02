'use client';

import { AlertCircle, CheckCircle2, Info, XCircle, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children: React.ReactNode;
  className?: string;
  icon?: boolean;
}

export default function Alert({
  variant = 'info',
  title,
  children,
  className,
  icon = true,
}: AlertProps) {
  const variants = {
    info: {
      container:
        'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800',
      icon: <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
      title: 'text-blue-900 dark:text-blue-300',
      text: 'text-blue-800 dark:text-blue-400',
    },
    success: {
      container:
        'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800',
      icon: <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />,
      title: 'text-green-900 dark:text-green-300',
      text: 'text-green-800 dark:text-green-400',
    },
    warning: {
      container:
        'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800',
      icon: <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />,
      title: 'text-yellow-900 dark:text-yellow-300',
      text: 'text-yellow-800 dark:text-yellow-400',
    },
    error: {
      container:
        'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800',
      icon: <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />,
      title: 'text-red-900 dark:text-red-300',
      text: 'text-red-800 dark:text-red-400',
    },
  };

  const config = variants[variant];

  return (
    <div
      className={cn(
        'rounded-xl border-2 p-4',
        config.container,
        className
      )}
    >
      <div className="flex gap-3">
        {icon && <div className="flex-shrink-0">{config.icon}</div>}
        <div className="flex-1">
          {title && (
            <h3 className={cn('font-semibold mb-1', config.title)}>
              {title}
            </h3>
          )}
          <div className={cn('text-sm', config.text)}>{children}</div>
        </div>
      </div>
    </div>
  );
}
