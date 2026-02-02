'use client';

import { motion } from 'framer-motion';
import { BookOpen, Code, Rocket, Shield, Terminal, CheckCircle2, ExternalLink } from 'lucide-react';
import Card, { CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Alert from '@/components/ui/Alert';

export default function DocsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-2xl">
            <BookOpen className="h-10 w-10 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Documentation</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Everything you need to know about our platform
        </p>
      </motion.div>

      <div className="space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="h-6 w-6 text-blue-600" />
                Getting Started
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert variant="info" title="Welcome to EVM DApp">
                This comprehensive guide will help you get started with our blockchain platform.
              </Alert>

              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Quick Start</h3>
                <div className="mt-4 rounded-xl bg-gray-900 p-4">
                  <code className="text-sm text-green-400">
                    npm install ethers wagmi @rainbow-me/rainbowkit
                  </code>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Step-by-Step Guide</h3>
                <ol className="mt-4 space-y-3 text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600 dark:bg-blue-900/20">
                      1
                    </span>
                    <div>
                      <strong className="text-gray-900 dark:text-white">Connect Your Wallet</strong>
                      <p className="mt-1">Click the Connect Wallet button to get started.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600 dark:bg-blue-900/20">
                      2
                    </span>
                    <div>
                      <strong className="text-gray-900 dark:text-white">Choose Your Network</strong>
                      <p className="mt-1">Make sure you are connected to Sepolia testnet.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600 dark:bg-blue-900/20">
                      3
                    </span>
                    <div>
                      <strong className="text-gray-900 dark:text-white">Start Trading</strong>
                      <p className="mt-1">Navigate to the Tokens page to start managing your assets.</p>
                    </div>
                  </li>
                </ol>
              </div>

              <Alert variant="warning">
                Always test on testnets before using mainnet. Never share your private keys or seed phrase.
              </Alert>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-6 w-6 text-blue-600" />
                Smart Contracts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="rounded-xl border-2 border-gray-200 p-6 dark:border-gray-700">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                    <Code className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Token Contract</h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    ERC20 implementation with burn, mint, and pause functionality.
                  </p>
                  <Badge variant="info" className="mt-4">OpenZeppelin 5.0</Badge>
                </div>

                <div className="rounded-xl border-2 border-gray-200 p-6 dark:border-gray-700">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    <Code className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">NFT Contract</h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    ERC721 with URI storage and flexible minting options.
                  </p>
                  <Badge variant="purple" className="mt-4">Gas Optimized</Badge>
                </div>

                <div className="rounded-xl border-2 border-gray-200 p-6 dark:border-gray-700">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                    <Shield className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Vault Contract</h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Secure time-locked staking with guaranteed rewards.
                  </p>
                  <Badge variant="success" className="mt-4">Audited</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="h-6 w-6 text-blue-600" />
                API Reference
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-xl border-2 border-gray-200 p-6 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">useTokenBalance</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Get the token balance for a specific address
                </p>
                <div className="mt-4 rounded-xl bg-gray-900 p-4">
                  <code className="text-sm text-green-400">
                    const &#123; data: balance &#125; = useTokenBalance(address);
                  </code>
                </div>
              </div>

              <div className="rounded-xl border-2 border-gray-200 p-6 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">useNFTMint</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Mint a new NFT with metadata URI
                </p>
                <div className="mt-4 rounded-xl bg-gray-900 p-4">
                  <code className="text-sm text-green-400">
                    const &#123; mint, isPending &#125; = useNFTMint();
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-blue-600" />
                Security Best Practices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Alert variant="error" title="Critical Security Guidelines">
                Always follow these security practices to protect your assets
              </Alert>

              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-xl border-2 border-green-200 bg-green-50 p-6 dark:border-green-800 dark:bg-green-900/20">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 dark:bg-green-900/20">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Do</h3>
                  <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li>✓ Use hardware wallets for large amounts</li>
                    <li>✓ Verify contract addresses before interacting</li>
                    <li>✓ Test on testnets first</li>
                    <li>✓ Keep your seed phrase offline</li>
                    <li>✓ Review transactions before signing</li>
                  </ul>
                </div>

                <div className="rounded-xl border-2 border-red-200 bg-red-50 p-6 dark:border-red-800 dark:bg-red-900/20">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 dark:bg-red-900/20">
                    <Shield className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Don't</h3>
                  <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li>✗ Share your private keys</li>
                    <li>✗ Click suspicious links</li>
                    <li>✗ Use untrusted dApps</li>
                    <li>✗ Store keys in cloud services</li>
                    <li>✗ Rush through transactions</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 p-6 dark:from-blue-900/20 dark:to-purple-900/20">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Audit Information</h3>
                <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <p><strong>Auditor:</strong> Internal Security Team</p>
                  <p><strong>Date:</strong> January 2024</p>
                  <p><strong>Status:</strong> <Badge variant="success">All Issues Resolved</Badge></p>
                  <a href="#" className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:underline">
                    View Full Report
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}