import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  // Mock data - replace with real data from your backend
  const mockClaims = [
    {
      id: 'CLM-001',
      type: 'Auto Insurance',
      status: 'pending',
      amount: 2500,
      date: '2024-01-15',
      description: 'Car accident damage repair'
    },
    {
      id: 'CLM-002',
      type: 'Health Insurance',
      status: 'approved',
      amount: 1200,
      date: '2024-01-10',
      description: 'Medical consultation fees'
    },
    {
      id: 'CLM-003',
      type: 'Property Insurance',
      status: 'rejected',
      amount: 5000,
      date: '2024-01-05',
      description: 'Home damage from storm'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-600';
      case 'approved': return 'bg-green-600';
      case 'rejected': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusText = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const handleLogout = () => {
    // Handle logout logic
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white w-full">
      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg cursor-pointer hover:scale-105 transition-transform"></div>
              </Link>
              <span className="text-xl font-bold">EthSure</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/policies">
                <Button variant="ghost" className="text-gray-300 hover:text-white">
                  Policies
                </Button>
              </Link>
              <Link to="/claims">
                <Button variant="ghost" className="text-gray-300 hover:text-white">
                  Claims
                </Button>
              </Link>
              <Link to="/profile">
                <Button variant="ghost" className="text-gray-300 hover:text-white">
                  <Avatar className="w-8 h-8 mr-2">
                    <AvatarImage src="/avatar.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  John Doe
                </Button>
              </Link>
              <Button variant="ghost" className="text-gray-300 hover:text-white" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-2">Welcome back! Here's your insurance overview.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Claims</p>
                  <p className="text-2xl font-bold text-white">{mockClaims.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Pending Claims</p>
                  <p className="text-2xl font-bold text-white">
                    {mockClaims.filter(c => c.status === 'pending').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Amount</p>
                  <p className="text-2xl font-bold text-white">
                    ${mockClaims.reduce((sum, c) => sum + c.amount, 0).toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Wallet Balance</p>
                  <p className="text-2xl font-bold text-white">2.45 ETH</p>
                </div>
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-gray-800 border-gray-700">
            <TabsTrigger value="overview" className="data-[state=active]:bg-gray-700">Overview</TabsTrigger>
            <TabsTrigger value="claims" className="data-[state=active]:bg-gray-700">Claims</TabsTrigger>
            <TabsTrigger value="policies" className="data-[state=active]:bg-gray-700">Policies</TabsTrigger>
            <TabsTrigger value="wallet" className="data-[state=active]:bg-gray-700">Wallet</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
                <CardDescription className="text-gray-400">Your latest insurance activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockClaims.slice(0, 3).map((claim) => (
                    <div key={claim.id} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(claim.status)}`}></div>
                        <div>
                          <p className="text-white font-medium">{claim.type}</p>
                          <p className="text-gray-400 text-sm">{claim.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-medium">${claim.amount.toLocaleString()}</p>
                        <p className="text-gray-400 text-sm">{claim.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="claims" className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-white">All Claims</CardTitle>
                    <CardDescription className="text-gray-400">Manage your insurance claims</CardDescription>
                  </div>
                  <Link to="/new-claim">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      + New Claim
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockClaims.map((claim) => (
                    <div key={claim.id} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(claim.status)}`}></div>
                        <div>
                          <p className="text-white font-medium">{claim.id}</p>
                          <p className="text-gray-400 text-sm">{claim.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge className={getStatusColor(claim.status)}>
                          {getStatusText(claim.status)}
                        </Badge>
                        <p className="text-white font-medium">${claim.amount.toLocaleString()}</p>
                        <Link to={`/claim/${claim.id}`}>
                          <Button variant="ghost" size="sm">View</Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="policies" className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Active Policies</CardTitle>
                <CardDescription className="text-gray-400">Your current insurance policies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-gray-400">No active policies found.</p>
                  <Link to="/policies">
                    <Button className="mt-4 bg-blue-600 hover:bg-blue-700">Browse Policies</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wallet" className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Wallet Information</CardTitle>
                <CardDescription className="text-gray-400">Your Web3 wallet details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-700/50 rounded-lg">
                    <p className="text-gray-400 text-sm">Wallet Address</p>
                    <p className="text-white font-mono">0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6</p>
                  </div>
                  <div className="p-4 bg-gray-700/50 rounded-lg">
                    <p className="text-gray-400 text-sm">Network</p>
                    <p className="text-white">Ethereum Mainnet</p>
                  </div>
                  <div className="p-4 bg-gray-700/50 rounded-lg">
                    <p className="text-gray-400 text-sm">Balance</p>
                    <p className="text-white">2.45 ETH</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
