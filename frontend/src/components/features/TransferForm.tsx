'use client';

import { useState } from 'react';
import { useTokenTransfer } from '@/hooks/useToken';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card, { CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Send } from 'lucide-react';
import toast from 'react-hot-toast';

export default function TransferForm() {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const { transfer, isPending, isConfirming, isSuccess } = useTokenTransfer();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!recipient || !amount) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      transfer(recipient, amount);
      toast.success('Transaction submitted!');
      setRecipient('');
      setAmount('');
    } catch (error) {
      toast.error('Transaction failed');
      console.error(error);
    }
  };

  return (
    <Card variant="elevated">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Send className="h-6 w-6 text-primary-600" />
          Transfer Tokens
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Recipient Address"
            placeholder="0x..."
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            disabled={isPending || isConfirming}
          />

          <Input
            label="Amount"
            type="number"
            step="0.000001"
            placeholder="0.0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={isPending || isConfirming}
          />

          <Button
            type="submit"
            className="w-full"
            isLoading={isPending || isConfirming}
            disabled={!recipient || !amount}
          >
            {isPending ? 'Confirming...' : isConfirming ? 'Processing...' : 'Send Tokens'}
          </Button>

          {isSuccess && (
            <div className="rounded-lg bg-green-50 p-4 text-sm text-green-800 dark:bg-green-900/20 dark:text-green-400">
              Transfer successful!
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
