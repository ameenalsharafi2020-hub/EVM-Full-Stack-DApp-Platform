# Deployment Guide

## Prerequisites

1. Node.js v18+ installed
2. MetaMask or hardware wallet
3. Test ETH on Sepolia testnet
4. API keys configured in .env

## Step-by-Step Deployment

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env with your keys
```

### 3. Compile Contracts

```bash
npm run compile
```

### 4. Run Tests

```bash
npm test
npm run test:coverage
```

### 5. Deploy to Testnet

```bash
# Deploy to Sepolia
npm run deploy:sepolia
```

### 6. Verify Contracts

Update contract addresses in scripts/verify.js, then:

```bash
npm run verify:sepolia
```

### 7. Test on Testnet

Use the interaction script:

```bash
npx hardhat run scripts/interact.js --network sepolia
```

## Mainnet Deployment Checklist

- [ ] All tests passing
- [ ] Security audit completed
- [ ] Gas optimization done
- [ ] Contract verified on testnet
- [ ] Documentation complete
- [ ] Team review completed
- [ ] Use hardware wallet
- [ ] Double-check all parameters
- [ ] Have rollback plan

## Network Configuration

### Sepolia Testnet
- Chain ID: 11155111
- RPC: Alchemy/Infura
- Faucet: https://sepoliafaucet.com

### Goerli Testnet
- Chain ID: 5
- RPC: Alchemy/Infura
- Faucet: https://goerlifaucet.com

### Mainnet
- Chain ID: 1
- RPC: Alchemy/Infura
- **⚠️ Use with extreme caution!**

## Troubleshooting

### Insufficient Funds
Get test ETH from faucets

### Transaction Failed
- Check gas price
- Verify account balance
- Check contract code

### Verification Failed
- Wait for block confirmations
- Check constructor arguments
- Verify API key

## Post-Deployment

1. Save contract addresses
2. Update frontend configuration
3. Monitor contract on Etherscan
4. Set up monitoring/alerts
5. Document for team
