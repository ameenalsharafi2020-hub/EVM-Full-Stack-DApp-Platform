# 🚀 EVM Smart Contract DApp - Complete Frontend

Professional, modern, and feature-rich frontend for Ethereum smart contracts.

## ✨ Features

### 🎨 Pages
- **Home** - Stunning landing page with animations
- **Dashboard** - Overview with stats and quick actions
- **Tokens** - Complete token management interface
- **NFTs** - NFT gallery with minting functionality
- **Vault** - Staking interface with APY rewards
- **Analytics** - Comprehensive charts and statistics
- **Profile** - User settings and account management
- **Swap** - Token exchange with live rates
- **Docs** - Complete documentation

### 🛠️ Technology Stack
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Wagmi v2** - React Hooks for Ethereum
- **RainbowKit** - Wallet connection UI
- **Framer Motion** - Smooth animations
- **Recharts** - Beautiful charts
- **React Hot Toast** - Notifications

### 🎯 UI Components
- Button (6 variants)
- Card (4 variants)
- Input (with icons)
- Modal (responsive)
- Tabs (3 variants)
- Badge (6 variants)
- Alert (4 variants)
- Progress Bar
- Skeleton Loader
- And more...

## 🚀 Getting Started

### Prerequisites
\\\bash
Node.js 18+
npm or yarn
\\\

### Installation
\\\bash
cd frontend
npm install
\\\

### Environment Setup
\\\bash
cp .env.example .env.local
\\\

Edit \.env.local\:
\\\env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_TOKEN_ADDRESS=0x...
NEXT_PUBLIC_NFT_ADDRESS=0x...
NEXT_PUBLIC_VAULT_ADDRESS=0x...
\\\

### Development
\\\bash
npm run dev
\\\

Open [http://localhost:3000](http://localhost:3000)

### Build
\\\bash
npm run build
npm start
\\\

## 📁 Project Structure

\\\
frontend/
├── src/
│   ├── app/
│   │   ├── (routes)/
│   │   │   ├── dashboard/
│   │   │   ├── tokens/
│   │   │   ├── nfts/
│   │   │   ├── vault/
│   │   │   ├── analytics/
│   │   │   ├── profile/
│   │   │   ├── swap/
│   │   │   └── docs/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── providers.tsx
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   ├── features/        # Feature components
│   │   ├── layout/          # Layout components
│   │   └── shared/          # Shared components
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utilities and ABIs
│   ├── config/              # Configuration
│   └── styles/              # Global styles
└── public/                  # Static assets
\\\

## 🎨 Features Breakdown

### Home Page
- Animated hero section
- Feature showcase
- Statistics display
- Call-to-action sections

### Dashboard
- Portfolio overview
- Quick actions
- Recent activity
- Statistics cards

### Tokens Page
- Balance display
- Transfer functionality
- Burn tokens
- Transaction history
- Market statistics

### NFTs Page
- Grid/List view toggle
- Rarity filters
- Minting interface
- NFT details
- Like functionality

### Vault Page
- Deposit interface
- Lock duration options
- APY calculator
- Active deposits
- Withdraw functionality

### Analytics Page
- Price charts
- Volume statistics
- Top holders
- Distribution charts
- Transaction activity

### Profile Page
- Wallet information
- Account settings
- Security options
- Notifications
- Disconnect wallet

### Swap Page
- Token selection
- Exchange rates
- Slippage settings
- Price impact
- Recent swaps

### Docs Page
- Getting started guide
- Smart contract docs
- API reference
- Security guidelines

## 🔧 Custom Hooks

\\\	Typescript
// Token hooks
useTokenBalance(address)
useTokenInfo()
useTokenTransfer()
useTokenMint()
useTokenBurn()

// NFT hooks
useNFTInfo()
useNFTMint()
useNFTOwner(tokenId)
useNFTTokenURI(tokenId)

// Vault hooks
useVaultDeposit()
useVaultWithdraw()
useVaultDepositsCount(address, token)
useVaultDepositInfo(address, token, id)
\\\

## 🎯 Scripts

\\\bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm run format       # Format with Prettier
npm run type-check   # TypeScript check
\\\

## 🌐 Deployment

### Vercel (Recommended)
\\\bash
npm install -g vercel
vercel
\\\

### Build Manually
\\\bash
npm run build
\\\

Deploy the \.next\ folder to your hosting provider.

## 🔒 Security

- Never commit \.env.local\
- Use environment variables
- Validate all inputs
- Review transactions
- Use hardware wallets

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Wagmi Docs](https://wagmi.sh)
- [RainbowKit Docs](https://www.rainbowkit.com)
- [Tailwind CSS](https://tailwindcss.com)

## 🤝 Contributing

Contributions welcome! Please read contributing guidelines.

## 📄 License

MIT License - see LICENSE file

## 👨‍💻 Author

Ameen Alsharafi  - FullStack & EVM Smart Contract Engineer
Email: ameenalsharafi2020@gmail.com
whatsapp:- +967775615113

---

**⚠️ Disclaimer**: This is for educational purposes. Always audit code before production use.
