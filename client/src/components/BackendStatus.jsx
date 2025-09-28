import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { testConnection } from '@/services/api';

const BackendStatus = () => {
  const [status, setStatus] = useState('checking');
  const [lastChecked, setLastChecked] = useState(null);

  const checkBackend = async () => {
    setStatus('checking');
    try {
      const result = await testConnection();
      if (result.success) {
        setStatus('connected');
      } else {
        setStatus('disconnected');
      }
    } catch (error) {
      setStatus('error');
    }
    setLastChecked(new Date().toLocaleTimeString());
  };

  useEffect(() => {
    checkBackend();
  }, []);

  const getStatusBadge = () => {
    switch (status) {
      case 'connected':
        return <Badge className="bg-green-600">Connected</Badge>;
      case 'disconnected':
        return <Badge className="bg-red-600">Disconnected</Badge>;
      case 'error':
        return <Badge className="bg-yellow-600">Error</Badge>;
      default:
        return <Badge className="bg-gray-600">Checking...</Badge>;
    }
  };

  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          Backend Status
          {getStatusBadge()}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300 text-sm mb-4">
          {status === 'connected' && 'Backend server is running and accessible'}
          {status === 'disconnected' && 'Backend server is not responding'}
          {status === 'error' && 'Error connecting to backend server'}
          {status === 'checking' && 'Checking backend connection...'}
        </p>
        <div className="flex items-center justify-between">
          <Button 
            onClick={checkBackend} 
            size="sm" 
            className="bg-blue-600 hover:bg-blue-700"
            disabled={status === 'checking'}
          >
            {status === 'checking' ? 'Checking...' : 'Refresh'}
          </Button>
          {lastChecked && (
            <span className="text-xs text-gray-400">
              Last checked: {lastChecked}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BackendStatus;
