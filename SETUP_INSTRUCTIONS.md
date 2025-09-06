# EthSure Setup Instructions

## Quick Start

### Option 1: Using the Startup Scripts
- **Windows**: Double-click `start-dev.bat`
- **Mac/Linux**: Run `chmod +x start-dev.sh && ./start-dev.sh`

### Option 2: Manual Setup

#### 1. Start Backend Server
```bash
cd server
npm install
npm run dev
```
The backend will run on `http://localhost:3000`

#### 2. Start Frontend Server (in a new terminal)
```bash
cd client
npm install
npm run dev
```
The frontend will run on `http://localhost:5173`

## Troubleshooting

### Common Issues and Solutions

#### 1. "Unexpected token '<', "<!doctype "... is not valid JSON" Error
**Problem**: Frontend is trying to parse HTML as JSON
**Solution**: 
- Make sure the backend server is running on port 3000
- Check that the backend server is accessible at `http://localhost:3000`
- Verify the API endpoints are working by visiting `http://localhost:3000/api/customers`

#### 2. CORS Errors
**Problem**: Cross-origin requests blocked
**Solution**: The backend already has CORS enabled, but if you still get errors:
- Make sure you're using the proxy configuration in Vite
- Check that both servers are running on the correct ports

#### 3. Database Connection Issues
**Problem**: MongoDB connection failed
**Solution**:
- Make sure MongoDB is running locally or update the connection string in `server/utils/connectDB.js`
- Check the `.env` file in the server directory

#### 4. Web3Auth Connection Issues
**Problem**: Web3Auth modal not opening
**Solution**:
- Check that the Web3Auth client ID is correct
- Make sure you're using HTTPS in production (not required for localhost development)
- Verify the Web3Auth configuration in `client/src/context/Web3AuthContext.jsx`

## API Endpoints

### Customer Endpoints
- `POST /api/customers/register` - Register new customer
- `POST /api/customers/kyc` - Submit KYC information
- `GET /api/customers/profile/:wallet_address` - Get customer profile
- `GET /api/customers` - Get all customers
- `PATCH /api/customers/kyc/:wallet_address` - Update KYC status (admin)

### Agent Endpoints
- `POST /api/agents/register` - Register new agent
- `POST /api/agents/kyc` - Submit agent profile
- `GET /api/agents/profile/:wallet_address` - Get agent profile
- `GET /api/agents` - Get all agents
- `PATCH /api/agents/approve/:wallet_address` - Update approval status (admin)

## Development Workflow

1. **Start both servers** using the startup scripts or manually
2. **Open the frontend** at `http://localhost:5173`
3. **Connect wallet** using Web3Auth (Google, Email, SMS)
4. **Select role** (Customer, Agent, Admin)
5. **Complete KYC** if required
6. **Test admin functions** by accessing admin dashboard

## File Structure

```
ethsure-decentralised-insurance-claims/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/          # Page components
│   │   ├── context/        # Web3Auth context
│   │   └── hooks/          # Custom hooks
│   └── vite.config.js      # Vite configuration with proxy
├── server/                 # Node.js backend
│   ├── controllers/        # API controllers
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   └── index.js           # Server entry point
├── start-dev.bat          # Windows startup script
├── start-dev.sh           # Mac/Linux startup script
└── SETUP_INSTRUCTIONS.md  # This file
```

## Environment Variables

Create a `.env` file in the server directory:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/ethsure
```

## Testing the Application

1. **Test Web3Auth Connection**:
   - Click "Login" in the navbar
   - Try different login methods (Google, Email, SMS)

2. **Test Role Selection**:
   - After login, select a role
   - Verify navigation to appropriate dashboard

3. **Test KYC Flow**:
   - Complete KYC forms
   - Check data is saved to database

4. **Test Admin Functions**:
   - Access admin dashboard
   - Approve/reject KYC submissions

## Production Deployment

1. **Build the frontend**:
   ```bash
   cd client
   npm run build
   ```

2. **Deploy backend** to your preferred hosting service
3. **Update API URLs** in production build
4. **Configure environment variables** for production

## Support

If you encounter any issues:
1. Check the browser console for errors
2. Check the backend server logs
3. Verify all dependencies are installed
4. Ensure both servers are running on correct ports
