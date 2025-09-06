# Web3Auth Authentication & KYC Implementation

This document outlines the complete implementation of Web3Auth-based authentication and KYC (Know Your Customer) workflow for the EthSure decentralized insurance claims platform.

## Overview

The platform implements a comprehensive authentication system using Web3Auth for decentralized identity management, with role-based access control and KYC verification workflows.

## Architecture

### Frontend (React + Vite)
- **Web3Auth Context**: Centralized authentication state management
- **Role-based Dashboards**: Separate interfaces for customers, agents, and admins
- **KYC Forms**: Dynamic forms for user verification
- **Protected Routes**: Authentication and role-based access control

### Backend (Node.js + Express + MongoDB)
- **User Models**: Customer and Agent schemas with KYC fields
- **API Endpoints**: RESTful APIs for user management and KYC processing
- **Admin Controls**: KYC verification and agent approval workflows

## Implementation Details

### 1. Web3Auth Integration

#### Context Provider (`client/src/context/Web3AuthContext.jsx`)
```javascript
// Key features:
- Web3Auth initialization and configuration
- User authentication state management
- Wallet address extraction
- Role-based navigation
- Persistent session management
```

#### Configuration
- **Network**: Sapphire Devnet
- **Login Methods**: Google, Email Passwordless, SMS Passwordless
- **Theme**: Dark mode
- **Client ID**: Configured for development

### 2. User Roles & Workflow

#### Role Selection Process
1. User connects wallet via Web3Auth
2. User selects role (Customer, Agent, Admin)
3. Backend creates basic user record
4. User redirected to appropriate dashboard

#### Customer Workflow
1. **Registration**: Basic profile created with wallet address
2. **KYC Submission**: Personal info + identity documents
3. **Admin Review**: KYC status updated by admin
4. **Full Access**: Verified customers access all features

#### Agent Workflow
1. **Registration**: Basic profile created with wallet address
2. **Profile Completion**: Professional info + license details
3. **Admin Approval**: Agent status approved by admin
4. **Full Access**: Approved agents access all features

#### Admin Workflow
1. **KYC Review**: Approve/reject customer KYC submissions
2. **Agent Approval**: Approve/reject agent applications
3. **User Management**: Monitor all platform users

### 3. KYC Implementation

#### Customer KYC Form (`client/src/pages/CustomerKYC.jsx`)
**Required Fields:**
- Full Name
- Email Address
- Phone Number
- Date of Birth
- Address
- Profile Photo (optional)
- Identity Document (optional)

#### Agent KYC Form (`client/src/pages/AgentKYC.jsx`)
**Required Fields:**
- Full Name
- Email Address
- Phone Number
- License Number
- Profile Photo (optional)

### 4. Dashboard Features

#### Customer Dashboard
- **KYC Status Display**: Shows verification status
- **Action Prompts**: Guides users to complete KYC
- **Feature Access**: Conditional based on verification status

#### Agent Dashboard
- **Profile Completion**: Prompts for missing information
- **Approval Status**: Shows admin approval status
- **Feature Access**: Conditional based on approval status

#### Admin Dashboard
- **KYC Management**: Review and approve customer KYC
- **Agent Management**: Review and approve agent applications
- **User Overview**: Monitor all platform users

### 5. Backend API Endpoints

#### Customer Endpoints
```
POST /api/customers/register - Register new customer
POST /api/customers/kyc - Submit KYC information
GET /api/customers/profile/:wallet_address - Get customer profile
GET /api/customers - Get all customers
PATCH /api/customers/kyc/:wallet_address - Update KYC status (admin)
```

#### Agent Endpoints
```
POST /api/agents/register - Register new agent
POST /api/agents/kyc - Submit agent profile
GET /api/agents/profile/:wallet_address - Get agent profile
GET /api/agents - Get all agents
PATCH /api/agents/approve/:wallet_address - Update approval status (admin)
```

### 6. Database Schema

#### Customer Model
```javascript
{
  customer_did: String (unique),
  customer_name: String,
  customer_email: String (unique),
  customer_phone: String,
  customer_address: String,
  date_of_birth: Date,
  wallet_address: String (unique),
  kyc_status: String (pending/verified/rejected),
  profile_photo_url: String,
  id_document_url: String,
  registration_date: Date
}
```

#### Agent Model
```javascript
{
  agent_did: String (unique),
  agent_name: String,
  agent_email: String (unique),
  agent_phone: String,
  license_number: String (unique),
  wallet_address: String (unique),
  is_approved: Boolean,
  profile_photo_url: String,
  registration_date: Date
}
```

## Security Features

### Authentication
- **Web3Auth Integration**: Secure wallet-based authentication
- **Session Management**: Persistent login state
- **Role-based Access**: Route protection based on user roles

### Data Protection
- **Input Validation**: Form validation on frontend and backend
- **File Upload Security**: Secure file handling (placeholder implementation)
- **API Security**: CORS configuration and request validation

### KYC Security
- **Admin Verification**: All KYC submissions require admin approval
- **Status Tracking**: Clear audit trail of verification status
- **Access Control**: Features locked until verification complete

## File Structure

```
client/src/
├── context/
│   └── Web3AuthContext.jsx          # Authentication context
├── pages/
│   ├── CustomerKYC.jsx              # Customer KYC form
│   ├── AgentKYC.jsx                 # Agent KYC form
│   └── dashboards/
│       ├── CustomerDashboard.jsx    # Customer interface
│       ├── AgentDashboard.jsx       # Agent interface
│       └── AdminDashboard.jsx       # Admin interface
├── components/
│   ├── RoleSelect.jsx               # Role selection
│   └── Navbar.jsx                   # Navigation with auth
└── App.jsx                          # Main app with routing

server/
├── controllers/
│   ├── customer.controller.js       # Customer API logic
│   └── agent.controller.js          # Agent API logic
├── models/
│   ├── customer.model.js            # Customer schema
│   └── agent.model.js               # Agent schema
├── routes/
│   ├── customer.routes.js           # Customer endpoints
│   └── agent.routes.js              # Agent endpoints
└── index.js                         # Main server file
```

## Usage Instructions

### 1. Setup
```bash
# Install dependencies
cd client && npm install
cd server && npm install

# Start development servers
cd client && npm run dev
cd server && npm run dev
```

### 2. User Flow
1. **Login**: User connects wallet via Web3Auth
2. **Role Selection**: Choose Customer, Agent, or Admin
3. **Profile Setup**: Complete KYC/profile information
4. **Admin Review**: Admin verifies/approves submissions
5. **Full Access**: Verified users access all features

### 3. Admin Functions
- Access admin dashboard at `/admin-dashboard`
- Review customer KYC submissions
- Approve/reject agent applications
- Monitor user activity

## Future Enhancements

### Planned Features
- **IPFS Integration**: Secure file storage for documents
- **Email Notifications**: KYC status updates
- **Advanced Analytics**: User activity tracking
- **Multi-chain Support**: Additional blockchain networks
- **Mobile App**: React Native implementation

### Security Improvements
- **JWT Tokens**: Enhanced session management
- **Rate Limiting**: API protection
- **Audit Logs**: Comprehensive activity tracking
- **Encryption**: Enhanced data protection

## Troubleshooting

### Common Issues
1. **Web3Auth Connection**: Check network configuration
2. **Role Persistence**: Verify localStorage usage
3. **API Errors**: Check backend server status
4. **KYC Status**: Verify admin approval process

### Debug Steps
1. Check browser console for errors
2. Verify Web3Auth configuration
3. Test API endpoints directly
4. Check database connections

## Conclusion

This implementation provides a robust foundation for decentralized authentication and KYC verification in the EthSure platform. The modular architecture allows for easy extension and customization while maintaining security and user experience standards.

The system successfully integrates Web3Auth for authentication, implements role-based access control, and provides comprehensive KYC workflows for all user types. The admin dashboard enables efficient management of user verifications and approvals.
