import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import ClientLayout from './client-layout';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'EVM Smart Contract DApp - Professional Blockchain Application',
  description: 'Built with Next.js 14, Wagmi, RainbowKit, and Tailwind CSS',
  keywords: ['ethereum', 'web3', 'dapp', 'blockchain', 'smart contracts'],
  authors: [{ name: 'EVM Team' }],
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    title: 'EVM Smart Contract DApp',
    description: 'Professional blockchain application',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
