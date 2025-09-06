# EthSure Decentralized Insurance Claims - Updated Setup Instructions

## Overview
This project has been updated with the following improvements:
- Fixed Web3Auth instance undefined error
- Removed debug panel from role selection page
- Implemented proper MongoDB data storage
- Added role-based dashboard redirection logic
- Implemented KYC update popup for first-time users
- Set up Axios for backend communication

## Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Git

## Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory with the following content:
   ```
   MONGODB_URI=mongodb://localhost:27017/ethsure-insurance
   PORT=3000
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

The backend will be running on `http://localhost:3000`

## Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be running on `http://localhost:5173`

## Key Features Implemented

### 1. Web3Auth Integration
- Fixed Web3Auth instance access using `useWeb3Auth` hook
- Proper wallet address extraction
- Error handling for connection issues

### 2. User Registration Flow
- Users authenticate with Web3Auth (email/passwordless, Google, SMS)
- Role selection (Customer, Agent, Admin)
- Automatic user registration in MongoDB
- Data persistence across sessions

### 3. KYC System
- KYC popup for first-time users
- Role-specific KYC requirements
- Status tracking (pending, verified, rejected)
- Admin approval system for agents

### 4. Dashboard Features
- Role-based dashboard redirection
- KYC status indicators
- Profile completion prompts
- Clean, modern UI

### 5. Database Schema
- Customer model with KYC fields
- Agent model with approval system
- Wallet address as unique identifier
- Timestamp tracking

## API Endpoints

### Customer Endpoints
- `POST /api/customers/register` - Register new customer
- `POST /api/customers/kyc` - Submit KYC information
- `GET /api/customers/profile/:wallet_address` - Get customer profile
- `PATCH /api/customers/kyc/:wallet_address` - Update KYC status

### Agent Endpoints
- `POST /api/agents/register` - Register new agent
- `POST /api/agents/kyc` - Submit agent profile
- `GET /api/agents/profile/:wallet_address` - Get agent profile
- `PATCH /api/agents/approve/:wallet_address` - Update approval status

## Usage Flow

1. **User Login**: User connects via Web3Auth
2. **Role Selection**: User selects their role (Customer/Agent/Admin)
3. **Database Check**: System checks if user exists in database
4. **Dashboard Redirect**: 
   - If user exists and KYC is complete → Dashboard
   - If user exists but KYC incomplete → KYC form
   - If new user → KYC form
5. **KYC Completion**: User completes required information
6. **Admin Review**: Agents require admin approval
7. **Full Access**: User gains access to all features

## Troubleshooting

### Web3Auth Issues
- Ensure Web3Auth client ID is correct
- Check browser console for connection errors
- Verify network connectivity

### Database Issues
- Ensure MongoDB is running
- Check connection string in `.env` file
- Verify database permissions

### API Issues
- Check if backend server is running
- Verify proxy configuration in Vite
- Check CORS settings

## Development Notes

- All user data is stored in MongoDB
- Wallet addresses are used as unique identifiers
- KYC status determines feature access
- Admin approval required for agents
- Responsive design for all screen sizes
