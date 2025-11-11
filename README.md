# Crystal Keys - Encrypted Rights Distributor

A decentralized book rights management platform with encrypted licensing terms using Fully Homomorphic Encryption (FHE). Built with FHEVM, Hardhat, and Next.js.

## ✨ Features

- 🔐 **Encrypted Licensing Terms**: Pricing tiers and distribution windows are encrypted using FHE
- 📚 **Book Rights Management**: Register books with confidential licensing information
- 🔓 **Selective Decryption**: Only authorized parties can decrypt licensing terms
- 🎨 **Modern UI**: Beautiful Next.js frontend with RainbowKit wallet integration
- 🔑 **Wallet Signatures**: Every operation requires wallet signature for security
- ⚡ **Real-time Updates**: Automatic refresh and state management
- 🧪 **Fully Tested**: Comprehensive test coverage for contracts and frontend

## 🏗️ Architecture

### Smart Contracts

- **BookRightsRegistry**: Main contract managing encrypted book rights with FHE
  - Encrypted pricing tiers (Basic $2.99, Standard $4.99, Premium $9.99)
  - Encrypted distribution windows (Open/Unlimited, Limited 3 months, Exclusive 6 months)
  - Owner-based access control for decryption
- **FHECounter**: Example contract demonstrating FHE operations

### Frontend

- **Next.js 15**: React framework with App Router and Turbopack
- **RainbowKit + Wagmi**: Wallet connection and Web3 integration
- **FHEVM SDK**: Client-side encryption/decryption utilities
- **shadcn/ui**: Modern UI components with Tailwind CSS
- **TypeScript**: Full type safety across the application

## Quick Start

For detailed instructions see:
[FHEVM Hardhat Quick Start Tutorial](https://docs.zama.ai/protocol/solidity-guides/getting-started/quick-start-tutorial)

### Prerequisites

- **Node.js**: Version 20 or higher
- **npm or yarn/pnpm**: Package manager

### Installation

#### Backend (Smart Contracts)

1. **Install dependencies**

   ```bash
   pnpm install
   ```

2. **Set up environment variables**

   ```bash
   npx hardhat vars set MNEMONIC

   # Set your Infura API key for network access
   npx hardhat vars set INFURA_API_KEY

   # Optional: Set Etherscan API key for contract verification
   npx hardhat vars set ETHERSCAN_API_KEY
   ```

3. **Compile and test**

   ```bash
   pnpm compile
   pnpm test
   ```

4. **Deploy to local network**

   ```bash
   # Start a local FHEVM-ready node
   npx hardhat node
   # Deploy to local network
   npx hardhat deploy --network localhost
   ```

5. **Deploy to Sepolia Testnet**

   ```bash
   # Deploy to Sepolia
   npx hardhat deploy --network sepolia
   # Verify contract on Etherscan
   npx hardhat verify --network sepolia <CONTRACT_ADDRESS>
   ```

#### Frontend

1. **Navigate to frontend directory**

   ```bash
   cd frontend
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file:

   ```bash
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FHE_PUBLIC_KEY=your_fhe_public_key
   ```

4. **Run development server**

   ```bash
   pnpm dev
   ```

   The frontend will be available at `http://localhost:3000`

5. **Build for production**

   ```bash
   pnpm build
   pnpm start
   ```

## 📁 Project Structure

```
crystal-keys/
├── contracts/           # BookRightsRegistry, FHECounter
├── deploy/              # Hardhat deployment scripts
├── deployments/         # Deployment artifacts (localhost, sepolia)
├── fhevmTemp/           # FHEVM precompiled addresses and configs
├── frontend/            # Next.js app (UI, hooks, abi, scripts)
├── tasks/               # Hardhat tasks (accounts, registry helpers)
├── test/                # Contract test suites
├── hardhat.config.ts    # Hardhat configuration
└── package.json         # Root dependencies and scripts
```

## 📜 Available Scripts

### Root

| Script           | Description                   |
| ---------------- | ----------------------------- |
| `pnpm compile`   | Compile all contracts         |
| `pnpm test`      | Run all contract tests        |
| `pnpm lint`      | Run linting checks            |
| `pnpm clean`     | Clean build artifacts         |

### Frontend (`frontend/`)

| Script        | Description                      |
| ------------- | -------------------------------- |
| `pnpm dev`    | Start Next.js dev server         |
| `pnpm build`  | Build frontend for production    |
| `pnpm start`  | Run production server            |
| `pnpm lint`   | Lint frontend code               |

## 📚 Documentation

- [FHEVM Documentation](https://docs.zama.ai/fhevm)
- [FHEVM Hardhat Setup Guide](https://docs.zama.ai/protocol/solidity-guides/getting-started/setup)
- [FHEVM Testing Guide](https://docs.zama.ai/protocol/solidity-guides/development-guide/hardhat/write_test)
- [FHEVM Hardhat Plugin](https://docs.zama.ai/protocol/solidity-guides/development-guide/hardhat)

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **FHEVM Issues**: [Zama FHEVM GitHub](https://github.com/zama-ai/fhevm/issues)
- **Documentation**: [FHEVM Docs](https://docs.zama.ai)
- **Community**: [Zama Discord](https://discord.gg/zama)

---

**Built with 🔐 using FHEVM by Zama**
