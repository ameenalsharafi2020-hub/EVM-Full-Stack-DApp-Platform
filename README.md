# 🚀 EVM Full-Stack DApp Platform

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_DApp-2ea44f?style=for-the-badge&logo=vercel)](https://evm-full-stack-d-app-platform.vercel.app/)

A professional, production-ready Decentralized Application...

A professional, production-ready Decentralized Application (DApp) that demonstrates full-stack Web3 capabilities by combining robust Ethereum smart contracts with a modern, high-performance user interface.

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![Solidity](https://img.shields.io/badge/Solidity-0.8.20-363636)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Hardhat](https://img.shields.io/badge/Hardhat-2.19-yellow)

## 🌟 Overview

This project showcases a complete Web3 ecosystem allowing users to interact seamlessly with the blockchain. It features advanced smart contracts (ERC20 Token, ERC721 NFT, Staking Vault) and a responsive frontend built with **Next.js**, **Wagmi**, and **RainbowKit**.

The architecture is designed for scalability, security, and user experience, following industry best practices and design patterns.

## 🛠️ Tech Stack

### 🔗 Backend (Smart Contracts)
- **Solidity 0.8.20**: Robust smart contract language.
- **Hardhat**: Development environment for compiling, testing, and deploying.
- **OpenZeppelin**: Secure, standard contract libraries (ERC20, ERC721, Ownable).
- **Chai & Mocha**: Comprehensive unit testing suite with high coverage.

### 🎨 Frontend (User Interface)
- **Next.js 14 (App Router)**: High-performance React framework with Server Components.
- **TypeScript**: Static typing for code reliability and maintainability.
- **Tailwind CSS**: Utility-first framework for modern, responsive styling.
- **Wagmi & RainbowKit**: Best-in-class wallet connection and blockchain hooks.
- **Framer Motion**: Smooth, production-grade animations and transitions.

---

## ✨ Key Features

### 1. Token Management 💰
- Real-time ERC20 token balance display.
- Secure token transfers to other addresses with validation.
- **Burn mechanism** to reduce total supply dynamically.
- Live transaction history tracking.

### 2. NFT Gallery & Minting 🖼️
- Visual gallery of owned NFTs with metadata rendering.
- Simple interface for minting new NFTs via IPFS URIs.
- Advanced filtering and detailed view of digital assets.

### 3. Staking Vault 🔒
- **Time-locked staking:** Users can lock tokens for specific durations (e.g., 30, 90 days).
- **APY Rewards:** Guaranteed rewards calculation based on lock periods.
- Secure withdrawal system automatically enforcing lock expiration.

### 4. Analytics Dashboard 📊
- Interactive charts for price trends and trading volume.
- Top holders leaderboard and asset distribution visualization.
- Comprehensive user profile and wallet statistics.

---

## 📂 Project Structure

A clean and organized monorepo structure separating Smart Contract logic from Frontend Application.

```text
EVM Full-Stack DApp Platform/          <-- (Root: Hardhat Environment & Contracts)
│
├── .env                             # API Keys & Private Keys (Backend Secrets)
├── hardhat.config.js                # Blockchain Networks Config (Sepolia/Mainnet)
├── package.json                     # Backend Dependencies (Hardhat, OpenZeppelin)
├── README.md                        # Project Documentation
│
├── contracts/                       # 🟢 Smart Contracts (Backend Logic)
│   ├── core/
│   │   ├── Token.sol                # Token Contract (ERC20 Standard)
│   │   ├── NFT.sol                  # NFT Contract (ERC721 Standard)
│   │   └── Vault.sol                # Staking Vault Contract (Time-Locked)
│   ├── interfaces/                  # Contract Interfaces (Optional)
│   └── mocks/                       # Mock Contracts for Testing
│
├── scripts/                         # 🟡 Execution Scripts
│   ├── deploy.js                    # Deploy Contracts to Network
│   ├── verify.js                    # Verify Source Code on Etherscan
│   └── interact.js                  # Local Contract Interaction Script
│
├── test/                            # 🧪 Unit Tests (Chai & Mocha)
│   ├── Token.test.js                # Token Logic Tests
│   ├── NFT.test.js                  # NFT Logic Tests
│   └── Vault.test.js                # Vault Logic Tests
│
└── frontend/                        # 🔵 User Interface (Next.js App)
    │
    ├── .env.local                   # Frontend Secrets (WalletConnect ID, Contract Addrs)
    ├── next.config.js               # Next.js Framework Config
    ├── tailwind.config.js           # Tailwind CSS Styling Config
    ├── package.json                 # Frontend Dependencies (Wagmi, RainbowKit)
    │
    ├── public/                      # Static Assets (Images, Icons)
    │   └── images/
    │
    └── src/                         # Source Code
        │
        ├── app/                     # (App Router) Pages & Routing
        │   ├── layout.tsx           # Root Layout (Metadata & SEO)
        │   ├── page.tsx             # Landing Page (Home)
        │   ├── providers.tsx        # Context Providers (Wagmi, QueryClient)
        │   ├── client-layout.tsx    # Client-Side Wrapper Component
        │   │
        │   └── (routes)/            # Application Routes/Pages
        │       ├── dashboard/       # User Dashboard Page
        │       ├── tokens/          # Token Management Page
        │       ├── nfts/            # NFT Gallery & Minting Page
        │       ├── vault/           # Staking Vault Page
        │       ├── analytics/       # Data Analytics Page
        │       ├── profile/         # User Profile Page
        │       ├── swap/            # Token Swap Interface
        │       └── docs/            # Documentation Page
        │
        ├── components/              # Reusable UI Components
        │   ├── ui/                  # Atomic Elements (Buttons, Inputs, Cards)
        │   ├── features/            # Feature-Specific (WalletInfo, Charts)
        │   ├── layout/              # Layout Elements (Header, Footer)
        │   └── shared/              # Shared Elements (Stats, EmptyState)
        │
        ├── config/                  # Configuration Files
        │   ├── contracts.ts         # Contract Addresses & Network Links
        │   └── wagmi.ts             # Wallet Connection Config
        │
        ├── hooks/                   # 🪝 Custom React Hooks (Business Logic)
        │   ├── useToken.ts          # Token Contract Interaction Hooks
        │   ├── useNFT.ts            # NFT Contract Interaction Hooks
        │   └── useVault.ts          # Vault Contract Interaction Hooks
        │
        ├── lib/                     # Helper Libraries
        │   ├── abis/                # Contract ABIs (JSON Interfaces)
        │   └── utils/               # Utility Functions (Formatting, Parsers)
        │
        └── styles/                  # Styling Files
            └── globals.css          # Global CSS Styles


```

---

## 🚀 Installation & Setup

Follow these steps to run the project locally.

### Prerequisites
- **Node.js** (v18 or higher)
- **Git**
- **MetaMask** (or any Web3 wallet)

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/evm-dapp-platform.git
cd evm-dapp-platform
```

### 2. Backend Setup (Smart Contracts)
```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# (Fill in your RPC URLs and Private Key in .env)

# Compile contracts
npm run compile

# Run tests (Ensure all tests pass)
npm run test

# Deploy contracts (e.g., to Sepolia)
npm run deploy:sepolia
```

### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# (Add your deployed Contract Addresses and WalletConnect Project ID)

# Start the development server
npm run dev
```

Open your browser at: `http://localhost:3000`

---

## 🔑 Environment Variables

### Backend (`.env`)
```env
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
PRIVATE_KEY=your_wallet_private_key
ETHERSCAN_API_KEY=your_etherscan_key
```

### Frontend (`frontend/.env.local`)
```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_TOKEN_ADDRESS=0x...
NEXT_PUBLIC_NFT_ADDRESS=0x...
NEXT_PUBLIC_VAULT_ADDRESS=0x...
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Ameen Alsharafi**  
*FullStack & EVM Smart Contract Engineer*

📧 Email: [ameenalsharafi2020@gmail.com](mailto:ameenalsharafi2020@gmail.com)  
📱 WhatsApp: [+967 775 615 113](https://wa.me/967775615113)

---

**⚠️ Disclaimer**: This project is for educational and demonstration purposes. Always audit and test thoroughly before deploying to mainnet.
```
