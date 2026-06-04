# EthSure - Decentralized Insurance Claims Management System

EthSure is a decentralized, trustless, and W3C-compliant insurance claims management system. It integrates blockchain technology, Self-Sovereign Identity (SSI) with Decentralized Identifiers (DIDs) and Verifiable Credentials (VCs), and IPFS decentralized storage to build a secure, transparent, and auditable platform for companies, agents, and customers.

---

## 🌟 Key Features

*   **Self-Sovereign Identity (SSI):** Uses W3C-compliant Decentralized Identifiers (DIDs) and Verifiable Credentials (VCs) for secure user authentication and policy issuance.
*   **On-Chain Verification:** Policy states, agent registries, and cryptographically hashed Verifiable Credentials are saved on the Ethereum Sepolia Testnet, ensuring they are tamper-proof.
*   **Decentralized Storage:** Sensitive document uploads (KYC, medical reports, certificates) are anchored to IPFS via Pinata.
*   **Twilio KYC Verification:** Integrated SMS-based One-Time Password (OTP) verification for secure user onboarding.
*   **Multi-Role Dashboards:** Customized experiences for Insurance Companies, Agents, and Customers.
*   **Decentralized DocVault:** A secure dashboard area where users can manage, view, and store their Verifiable Credentials.

---

## 🏢 System Roles & Workflows

### 1. Insurance Company (Company)
*   **Registration:** Registers their Company DID to their wallet address on the blockchain (`AgentRegistry.sol`).
*   **Agent Management:** Can approve or revoke registered Agents under their organization.
*   **Claim Management:** Reviews claims submitted by customers, processes verification, and triggers the on-chain claim execution (`PolicyRegistry.sol`).

### 2. Insurance Agent
*   **Onboarding:** Registers under a specific Company DID and awaits approval from the company.
*   **Policy Management:** Assists customers in initiating policy setups, verifies initial details, and updates the policy status.

### 3. Customer (Insured)
*   **Onboarding & KYC:** Registers on the platform and completes KYC using Twilio SMS OTP verification.
*   **Buy Policy:** Purchases customized insurance plans through authorized agents.
*   **DocVault & EMI:** Views active policies, pays EMIs, and manages uploaded credentials.
*   **Claims:** Submits claim requests (for themselves or via nominees) with supporting documents (e.g., medical reports, death certificates) in case of an incident.

---

## 🛠️ Tech Stack

### Smart Contracts (Solidity & Hardhat)
*   **`AgentRegistry.sol`**: Manages Company-to-Agent relationships and maps agent DIDs to Verifiable Credential hashes.
*   **`PolicyRegistry.sol`**: Deployed per company, manages policy creations, on-chain state (active, claimed, cancelled), and stores policy Verifiable Credential hashes.
*   **Networks:** Sepolia Testnet / Local RPC.

### Backend Server (Node.js & Express)
*   **Framework:** Express.js
*   **Database:** MongoDB (Mongoose ORM) for caching states and user profiles.
*   **Web3 Integration:** Ethers.js (v6) for blockchain state interactions.
*   **Identity & SSI:** `did-jwt-vc` and `node-jose` for issuing/verifying cryptographically signed VCs and resolving DIDs.
*   **IPFS Storage:** Pinata SDK for uploading and indexing files.
*   **KYC Service:** Twilio Verify API for SMS-based OTP.

### Frontend Client (React & Vite)
*   **Styling:** Tailwind CSS & Shadcn UI.
*   **Web3 Connection:** MetaMask SDK, Web3Auth (for social/passwordless login), Wagmi, and Viem.
*   **State Management:** Zustand (`userStore`).
*   **Router:** React Router DOM.
*   **Animations:** Framer Motion.

---

## 📂 Repository Directory Structure

```text
├── backend/                  # Express.js backend server
│   ├── blockchain/          # Smart contract interaction handlers (ethers.js)
│   ├── config/              # MongoDB and app configurations
│   ├── controllers/         # API controllers (User, Policy, KYC, Agent, etc.)
│   ├── models/              # Mongoose schemas (User, Customer, Agent, Policy)
│   ├── routes/              # Express API endpoints
│   ├── VC/                  # Verifiable Credential creation and validation logic
│   └── index.js             # Express entry point
├── client/                   # Vite React frontend application
│   ├── src/
│   │   ├── components/      # Shared components (DocVault, RoleSelect, Forms, etc.)
│   │   ├── context/         # Auth contexts & ProtectedRoutes
│   │   ├── layouts/         # Dashboard layout designs
│   │   ├── pages/           # Pages (Landing, About, Services, Contact)
│   │   │   └── dashboards/  # Role dashboards (Customer, Agent, Company)
│   │   ├── services/        # API communication services (axios)
│   │   ├── App.jsx          # Route definitions
│   │   └── main.jsx         # Client mount entry point
├── contracts/                # Solidity smart contracts
│   ├── AgentRegistry.sol
│   └── PolicyRegistry.sol
├── scripts/                  # Contract deployment scripts
│   ├── AgentDeploy.js
│   └── PolicyDeploy.js
├── test/                     # Sepolia smart contract integration tests (Mocha/Chai)
│   ├── AgentRegistry.test.js
│   └── PolicyRegistry.test.js
├── package.json              # Root package configuration
└── README.md                 # Project documentation
```

---

## 🚀 Setup & Installation

### Prerequisites
*   Node.js (v18+)
*   MongoDB Instance
*   MetaMask browser extension
*   Pinata Account (IPFS API Key)
*   Twilio Account (Account SID, Auth Token, and Verify Service SID)

---

### 1. Smart Contract Deployment & Testing
From the root directory:

**Install dependencies:**
```bash
npm install
```

**Run integration tests:**
Make sure you have your environment variables for Sepolia RPC and private keys configured if running network-dependent tests.
```bash
npx mocha test/AgentRegistry.test.js --timeout 60000
```

---

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder and populate the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   SEPOLIA_RPC=your_sepolia_rpc_url
   DEPLOYER_PRIVATE_KEY=your_deployer_wallet_private_key
   COMPANY_PRIVATE_KEY=your_company_wallet_private_key
   COMPANY_DID=did:ethr:sepolia:your_company_address
   PINATA_JWT=your_pinata_jwt_token
   TWILIO_ACCOUNT_SID=your_twilio_account_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   TWILIO_VERIFY_SERVICE_ID=your_twilio_verify_service_sid
   ```
4. Start the backend server in development mode:
   ```bash
   npm run dev
   ```

---

### 3. Frontend Client Setup
1. Navigate to the client directory:
   ```bash
   cd ../client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `client` folder:
   ```env
   VITE_BACKEND_URL=http://localhost:5000/api
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
5. Open `http://localhost:5173` in your browser.
