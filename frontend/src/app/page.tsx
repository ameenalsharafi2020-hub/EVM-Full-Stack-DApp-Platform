'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Wallet,
  Shield,
  Zap,
  Code,
  Coins,
  Lock,
  TrendingUp,
  Users,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Card, { CardContent } from '@/components/ui/Card';
import { useAccount } from 'wagmi';

export default function HomePage() {
  const { isConnected } = useAccount();

  const features = [
    {
      icon: Wallet,
      title: 'Easy Wallet Connection',
      description: 'Connect with MetaMask, WalletConnect, Coinbase Wallet and more using RainbowKit',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Shield,
      title: 'Secure Smart Contracts',
      description: 'Built with OpenZeppelin standards and audited for maximum security',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized for performance with Next.js 14 and React Server Components',
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Code,
      title: 'Developer Friendly',
      description: 'TypeScript, modern tooling, and comprehensive documentation',
      gradient: 'from-purple-500 to-pink-500',
    },
  ];

  const stats = [
    { label: 'Total Value Locked', value: '\.5M', icon: TrendingUp },
    { label: 'Active Users', value: '45K+', icon: Users },
    { label: 'Transactions', value: '1.2M+', icon: Coins },
    { label: 'Smart Contracts', value: '100%', icon: CheckCircle2 },
  ];

  const steps = [
    {
      number: '01',
      title: 'Connect Wallet',
      description: 'Connect your Web3 wallet with a single click',
    },
    {
      number: '02',
      title: 'Choose Action',
      description: 'Trade tokens, mint NFTs, or stake in the vault',
    },
    {
      number: '03',
      title: 'Start Earning',
      description: 'Earn rewards and grow your crypto portfolio',
    },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative px-6 py-24 sm:py-32 lg:px-8">
        {/* Background Gradient */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 blur-3xl">
            <div
              className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-primary-400 via-secondary-400 to-primary-400 opacity-20"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="mb-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-100 to-secondary-100 px-4 py-2 dark:from-primary-900/20 dark:to-secondary-900/20"
          >
            <Sparkles className="h-4 w-4 text-primary-600" />
            <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
              Welcome to the Future of DeFi
            </span>
          </motion.div>

          <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-7xl">
            Build the Future with{' '}
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Web3
            </span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Professional blockchain development platform with modern tools, secure smart contracts,
            and beautiful UI components. Start building decentralized applications today.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <Link href={isConnected ? '/dashboard' : '#'}>
              <Button size="xl" className="group">
                {isConnected ? 'Go to Dashboard' : 'Get Started'}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/docs">
              <Button variant="outline" size="xl">
                <Code className="mr-2 h-5 w-5" />
                Documentation
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mx-auto mt-20 grid max-w-5xl grid-cols-2 gap-6 lg:grid-cols-4"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + idx * 0.1 }}
            >
              <Card variant="elevated" hover>
                <CardContent className="p-6 text-center">
                  <stat.icon className="mx-auto h-8 w-8 text-primary-600" />
                  <p className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 px-6 py-24 dark:bg-gray-900 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Everything You Need
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Built with the best tools and practices in the ecosystem
            </p>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
              >
                <Card variant="elevated" hover className="h-full">
                  <CardContent className="p-8">
                    <div
                      className="\mb-6 inline-flex rounded-2xl bg-gradient-to-r \ p-4 shadow-lg\"
                    >
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="mt-3 text-gray-600 dark:text-gray-300">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Get started in three simple steps
            </p>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="relative"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 text-3xl font-bold text-white shadow-lg">
                    {step.number}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-gray-600 dark:text-gray-300">{step.description}</p>
                </div>
                {idx < steps.length - 1 && (
                  <div className="absolute left-1/2 top-10 hidden h-0.5 w-full bg-gradient-to-r from-primary-300 to-secondary-300 md:block" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 px-6 py-24 sm:py-32 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Ready to Start Building?
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/90">
            Connect your wallet and explore the possibilities of decentralized applications
          </p>
          <div className="mt-10 flex items-center justify-center gap-6">
            <Link href="/dashboard">
              <Button size="xl" variant="secondary">
                <Wallet className="mr-2 h-5 w-5" />
                Launch App
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
