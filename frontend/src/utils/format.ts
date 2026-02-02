import { formatEther, formatUnits, parseEther } from 'viem';

/**
 * تنسيق عنوان محفظة لعرضه بشكل مختصر
 */
export function formatAddress(address: string): string {
  if (!address) return '';
  if (address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

/**
 * تنسيق العنوان بشكل كامل مع فواصل كل 4 أحرف
 */
export function formatFullAddress(address: string): string {
  if (!address) return '';
  return address.slice(0, 2) + address.slice(2).match(/.{1,4}/g)?.join(' ') || address;
}

/**
 * تنسيق كمية التوكن
 */
export function formatTokenAmount(amount: bigint, decimals: number = 18): string {
  try {
    return formatUnits(amount, decimals);
  } catch {
    return '0';
  }
}

/**
 * تنسيق ETH من wei
 */
export function formatEth(amount: bigint): string {
  try {
    return formatEther(amount);
  } catch {
    return '0';
  }
}

/**
 * تحويل ETH إلى wei
 */
export function parseEth(amount: string): bigint {
  try {
    return parseEther(amount);
  } catch {
    return 0n;
  }
}

/**
 * تنسيق أرقام عادية
 */
export function formatNumber(num: number, decimals: number = 2): string {
  if (isNaN(num)) return '0';
  
  // للأرقام الصغيرة جداً
  if (Math.abs(num) < 0.000001 && num !== 0) {
    return num.toExponential(decimals);
  }
  
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
}

/**
 * تنسيق عملة USD
 */
export function formatCurrency(amount: number, decimals: number = 2): string {
  if (isNaN(amount)) return '$0.00';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
}

/**
 * تنسيق تاريخ
 */
export function formatDate(date: Date | number | string): string {
  try {
    const dateObj = date instanceof Date ? date : new Date(date);
    
    // إذا كان التاريخ اليوم، اعرض الوقت فقط
    const today = new Date();
    if (dateObj.toDateString() === today.toDateString()) {
      return dateObj.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });
    }
    
    // إذا كان التاريخ هذا العام، اعرض اليوم والشهر
    if (dateObj.getFullYear() === today.getFullYear()) {
      return dateObj.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    }
    
    // عرض التاريخ الكامل
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return 'Invalid Date';
  }
}

/**
 * تنسيق وقت نسبي (مثل "منذ 5 دقائق")
 */
export function formatRelativeTime(timestamp: number): string {
  const now = Math.floor(Date.now() / 1000);
  const diff = now - timestamp;
  
  const minutes = Math.floor(diff / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  
  return 'Just now';
}

/**
 * تقليم النص الطويل
 */
export function truncateText(text: string, maxLength: number = 100): string {
  if (!text || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

/**
 * تنسيق نسبة مئوية
 */
export function formatPercentage(value: number, decimals: number = 2): string {
  return `${formatNumber(value * 100, decimals)}%`;
}