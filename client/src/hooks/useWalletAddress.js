import { useEffect, useState } from 'react';
import { useWeb3AuthUser, useWeb3AuthConnect, useWeb3Auth } from '@web3auth/modal/react';
import { ethers } from 'ethers';

export const useWalletAddress = () => {
  const { userInfo } = useWeb3AuthUser();
  const { connect } = useWeb3AuthConnect();
  const { web3Auth } = useWeb3Auth();
  const [walletAddress, setWalletAddress] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    const getWalletAddress = async () => {
      if (userInfo && web3Auth) {
        setIsConnecting(true);
        try {
          console.log('Web3Auth instance:', web3Auth);
          console.log('Web3Auth provider:', web3Auth.provider);
          
          if (web3Auth.provider) {
            try {
              // Method 1: Try to get accounts directly from Web3Auth
              const accounts = await web3Auth.request({ method: 'eth_accounts' });
              console.log('Accounts from Web3Auth:', accounts);
              
              if (accounts && accounts.length > 0) {
                const address = accounts[0];
                console.log('Wallet address extracted:', address);
                setWalletAddress(address);
                localStorage.setItem('walletAddress', address);
                setIsConnecting(false);
                return;
              }
            } catch (accountError) {
              console.log('Account method failed, trying provider method...', accountError);
            }
            
            try {
              // Method 2: Try with ethers provider
              const provider = web3Auth.provider;
              const ethersProvider = new ethers.BrowserProvider(provider);
              const signer = await ethersProvider.getSigner();
              const address = await signer.getAddress();
              console.log('Wallet address from ethers:', address);
              setWalletAddress(address);
              localStorage.setItem('walletAddress', address);
              setIsConnecting(false);
              return;
            } catch (ethersError) {
              console.log('Ethers method failed:', ethersError);
            }
          }
          
          console.error('Failed to extract wallet address - no provider available');
          setIsConnecting(false);
        } catch (error) {
          console.error('Error getting wallet address:', error);
          setIsConnecting(false);
        }
      } else {
        setWalletAddress(null);
        localStorage.removeItem('walletAddress');
        setIsConnecting(false);
      }
    };

    getWalletAddress();
  }, [userInfo, web3Auth]);

  return { walletAddress, isConnecting };
};
