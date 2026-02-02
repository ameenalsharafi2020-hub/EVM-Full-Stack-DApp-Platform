'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Image as ImageIcon,
  Plus,
  Grid3x3,
  List,
  Search,
  Heart,
  ExternalLink,
  Sparkles,
  TrendingUp,
  Zap,
} from 'lucide-react';

import Card, { CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import EmptyState from '@/components/shared/EmptyState';

import { useNFTMint, useNFTInfo } from '@/hooks/useNFT';
import { formatEth } from '@/lib/utils/format';
import toast from 'react-hot-toast';

const colorMap = {
  blue: {
    text: 'text-blue-600',
    bg: 'bg-blue-100 dark:bg-blue-900/20',
  },
  green: {
    text: 'text-green-600',
    bg: 'bg-green-100 dark:bg-green-900/20',
  },
  purple: {
    text: 'text-purple-600',
    bg: 'bg-purple-100 dark:bg-purple-900/20',
  },
  orange: {
    text: 'text-orange-600',
    bg: 'bg-orange-100 dark:bg-orange-900/20',
  },
} as const;

export default function NFTsPage() {
  const { address, isConnected } = useAccount();
  const { mint, mintPrice, isPending, isConfirming } = useNFTMint();
  const { currentTokenId } = useNFTInfo();

  const [showMintModal, setShowMintModal] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [nftUri, setNftUri] = useState('');
  const [selectedRarity, setSelectedRarity] = useState<string | null>(null);

  const stats = [
    { label: 'Total NFTs', value: currentTokenId.toString(), icon: ImageIcon, color: 'blue' },
    { label: 'Floor Price', value: '0.2 ETH', icon: TrendingUp, color: 'green' },
    { label: 'Total Volume', value: '12.5 ETH', icon: Zap, color: 'purple' },
    {
      label: 'Mint Price',
      value: mintPrice ? formatEth(mintPrice) + ' ETH' : '0.01 ETH',
      icon: Sparkles,
      color: 'orange',
    },
  ] as const;

  if (!isConnected) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16">
        <EmptyState
          icon={ImageIcon}
          title="Connect Your Wallet"
          description="Connect your wallet to view and manage your NFT collection"
        />
      </div>
    );
  }

  const handleMint = () => {
    if (!nftUri) return toast.error('Enter NFT metadata URI');
    if (!address) return toast.error('Connect your wallet');

    mint(address, nftUri);
    toast.success('Minting NFT...');
    setShowMintModal(false);
    setNftUri('');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">NFT Collection</h1>
          <Button onClick={() => setShowMintModal(true)}>
            <Plus className="mr-2 h-5 w-5" />
            Mint NFT
          </Button>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((stat, i) => {
          const c = colorMap[stat.color];
          return (
            <Card key={i} variant="elevated" hover>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className={`mt-2 text-2xl font-bold ${c.text}`}>{stat.value}</p>
                  </div>
                  <div className={`rounded-full p-3 ${c.bg}`}>
                    <stat.icon className={`h-6 w-6 ${c.text}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Mint Modal */}
      <Modal
        isOpen={showMintModal}
        onClose={() => setShowMintModal(false)}
        title="Mint New NFT"
        description="Create your digital collectible"
      >
        <div className="space-y-6">
          <Input
            label="NFT Metadata URI"
            placeholder="ipfs://..."
            value={nftUri}
            onChange={(e) => setNftUri(e.target.value)}
          />

          <Button
            className="w-full"
            onClick={handleMint}
            isLoading={isPending || isConfirming}
            disabled={!nftUri}
          >
            Mint NFT
          </Button>
        </div>
      </Modal>
    </div>
  );
}
