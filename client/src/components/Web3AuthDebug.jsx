import React, { useState, useEffect } from 'react';
import { useWeb3AuthUser, useWeb3AuthConnect, useWeb3AuthDisconnect } from '@web3auth/modal/react';
import { useWalletAddress } from '@/hooks/useWalletAddress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { testAPI, testConnection } from '@/services/api';

const Web3AuthDebug = () => {
  const { userInfo } = useWeb3AuthUser();
  const { connect } = useWeb3AuthConnect();
  const { disconnect } = useWeb3AuthDisconnect();
  const { walletAddress, isConnecting } = useWalletAddress();
  const [web3authStatus, setWeb3authStatus] = useState('Not connected');

  useEffect(() => {
    const checkWeb3AuthStatus = () => {
      const web3auth = window.web3auth;
      if (web3auth) {
        if (web3auth.provider) {
          setWeb3authStatus('Connected with provider');
        } else {
          setWeb3authStatus('Connected but no provider');
        }
      } else {
        setWeb3authStatus('Not initialized');
      }
    };

    checkWeb3AuthStatus();
    const interval = setInterval(checkWeb3AuthStatus, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleConnect = async () => {
    try {
      const result = await connect();
      console.log('Connect result:', result);
    } catch (error) {
      console.error('Connect error:', error);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
    } catch (error) {
      console.error('Disconnect error:', error);
    }
  };

  const testWalletAddress = async () => {
    const web3auth = window.web3auth;
    if (web3auth) {
      try {
        const accounts = await web3auth.request({ method: 'eth_accounts' });
        console.log('Manual account check:', accounts);
        alert(`Accounts: ${JSON.stringify(accounts)}`);
      } catch (error) {
        console.error('Manual account check error:', error);
        alert(`Error: ${error.message}`);
      }
    } else {
      alert('Web3Auth not available');
    }
  };

  const testBackendConnection = async () => {
    try {
      const result = await testConnection();
      alert(`Backend: ${result.success ? 'Connected' : 'Failed'}\n${JSON.stringify(result)}`);
    } catch (error) {
      alert(`Backend test error: ${error.message}`);
    }
  };

  const testAPICalls = async () => {
    try {
      // Test GET
      const getResult = await testAPI.testGet();
      console.log('GET test result:', getResult.data);
      
      // Test POST
      const postResult = await testAPI.testPost({ test: 'data', timestamp: new Date().toISOString() });
      console.log('POST test result:', postResult.data);
      
      alert('API tests completed! Check console for details.');
    } catch (error) {
      alert(`API test error: ${error.message}`);
    }
  };

  const testUserRegistration = async () => {
    if (!walletAddress) {
      alert('No wallet address available for testing');
      return;
    }

    try {
      // Test customer registration
      const customerResult = await testAPI.testCustomerRegister({
        wallet_address: walletAddress,
        customer_email: 'test@example.com',
        customer_name: 'Test Customer'
      });
      console.log('Customer registration test:', customerResult.data);
      
      // Test agent registration
      const agentResult = await testAPI.testAgentRegister({
        wallet_address: walletAddress + '_agent',
        agent_email: 'agent@example.com',
        agent_name: 'Test Agent'
      });
      console.log('Agent registration test:', agentResult.data);
      
      alert('User registration tests completed! Check console for details.');
    } catch (error) {
      alert(`Registration test error: ${error.message}`);
    }
  };

  return (
    <Card className="bg-gray-800/50 border-gray-700 m-4">
      <CardHeader>
        <CardTitle className="text-white">Web3Auth Debug Panel</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <strong className="text-blue-400">User Info:</strong>
            <p className="text-gray-300">{userInfo ? 'Logged in' : 'Not logged in'}</p>
          </div>
          <div>
            <strong className="text-green-400">Web3Auth Status:</strong>
            <p className="text-gray-300">{web3authStatus}</p>
          </div>
          <div>
            <strong className="text-yellow-400">Wallet Address:</strong>
            <p className="text-gray-300">{walletAddress || 'Not available'}</p>
          </div>
          <div>
            <strong className="text-purple-400">Connecting:</strong>
            <p className="text-gray-300">{isConnecting ? 'Yes' : 'No'}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-2">
            <Button onClick={handleConnect} className="bg-blue-600 hover:bg-blue-700 w-full">
              Connect
            </Button>
            <Button onClick={handleDisconnect} className="bg-red-600 hover:bg-red-700 w-full">
              Disconnect
            </Button>
            <Button onClick={testWalletAddress} className="bg-green-600 hover:bg-green-700 w-full">
              Test Wallet
            </Button>
          </div>
          <div className="space-y-2">
            <Button onClick={testBackendConnection} className="bg-purple-600 hover:bg-purple-700 w-full">
              Test Backend
            </Button>
            <Button onClick={testAPICalls} className="bg-yellow-600 hover:bg-yellow-700 w-full">
              Test API
            </Button>
            <Button onClick={testUserRegistration} className="bg-orange-600 hover:bg-orange-700 w-full">
              Test Registration
            </Button>
          </div>
        </div>
        
        {userInfo && (
          <div className="mt-4 p-3 bg-gray-700 rounded">
            <strong className="text-white">User Details:</strong>
            <pre className="text-xs text-gray-300 mt-2 overflow-auto">
              {JSON.stringify(userInfo, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Web3AuthDebug;
