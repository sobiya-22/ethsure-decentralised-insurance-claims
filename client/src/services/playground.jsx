import { CONNECTOR_STATUS, WALLET_CONNECTORS } from "@web3auth/modal";
import { useIdentityToken, useSwitchChain, useWeb3Auth, useWeb3AuthConnect, useWeb3AuthUser } from "@web3auth/modal/react";
import * as jose from "jose";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

import { chains } from "../config/chainConfig";
import { getWalletProvider } from "./walletProvider";

export const PlaygroundContext = createContext({
  walletProvider: null,
  isLoading: false,
  address: null,
  balance: null,
  chainId: null,
  playgroundConsole: "",
  chainList: chains,
  chainListOptionSelected: "ethereum",
  connectedChain: chains.ethereum,
  getUserInfo: async () => null,
  getPublicKey: async () => "",
  getAddress: async () => "",
  getBalance: async () => "",
  getSignature: async () => "",
  sendTransaction: async () => "",
  getPrivateKey: async () => "",
  getChainId: async () => "",
  deployContract: async () => {},
  readContract: async () => "",
  writeContract: async () => "",
  getIdToken: async () => "",
  verifyServerSide: async () => {},
  changeChain: async () => {},
  updateConnectedChain: () => {},
});

export function usePlayground() {
  return useContext(PlaygroundContext);
}

export const Playground = ({ children }) => {
  const [walletProvider, setWalletProvider] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState(null);
  const [balance, setBalance] = useState(null);
  const [chainList, setChainDetails] = useState(chains);
  const [chainListOptionSelected, setChainListOptionSelected] = useState("ethereum");
  const [chainId, setChainId] = useState(null);
  const [playgroundConsole, setPlaygroundConsole] = useState("");
  const [connectedChain, setConnectedChain] = useState(chains.ethereum);

  const uiConsole = (...args) => {
    setPlaygroundConsole(`${JSON.stringify(args || {}, null, 2)}\n\n\n\n${playgroundConsole}`);
    console.log(...args);
  };

  const { status, provider } = useWeb3Auth();
  const { connect, connectorName } = useWeb3AuthConnect();
  const { switchChain } = useSwitchChain();
  const { userInfo } = useWeb3AuthUser();
  const { token: idToken } = useIdentityToken();

  const setNewWalletProvider = useCallback(async (web3authProvider) => {
    const walletProviderInstance = getWalletProvider(web3authProvider, uiConsole);
    setWalletProvider(walletProviderInstance);
    try {
      const address = await walletProviderInstance.getAddress();
      const balance = await walletProviderInstance.getBalance();
      const chainId = await walletProviderInstance.getChainId();

      setAddress(address);
      setBalance(balance);
      setChainId(chainId);
    } catch (error) {
      console.error("Error setting wallet provider data:", error);
    }
  }, [chainId, address, balance]);

  useEffect(() => {
    if (status === CONNECTOR_STATUS.READY) {
      connect();
    } else if (status === CONNECTOR_STATUS.CONNECTED && provider) {
      setNewWalletProvider(provider);
    }
  }, [status, provider, connect, setNewWalletProvider]);

  const getUserInfo = async () => {
    uiConsole(userInfo);
    return userInfo;
  };

  const getPublicKey = async () => {
    if (!walletProvider) return "";
    const publicKey = await walletProvider.getPublicKey();
    uiConsole(publicKey);
    return publicKey;
  };

  const getAddress = async () => {
    if (!walletProvider) return "";
    const updatedAddress = await walletProvider.getAddress();
    setAddress(updatedAddress);
    uiConsole(updatedAddress);
    return updatedAddress;
  };

  const getBalance = async () => {
    if (!walletProvider) return "";
    const updatedBalance = await walletProvider.getBalance();
    setBalance(updatedBalance);
    uiConsole(updatedBalance);
    return updatedBalance;
  };

  const getSignature = async (message) => {
    if (!walletProvider) return "";
    const signature = await walletProvider.getSignature(message);
    uiConsole(signature);
    return signature;
  };

  const sendTransaction = async (amount, destination) => {
    if (!walletProvider) return "";
    const receipt = await walletProvider.sendTransaction(amount, destination);
    uiConsole(receipt);
    return receipt;
  };

  const getPrivateKey = async () => {
    if (!walletProvider) return "";
    const privateKey = await walletProvider.getPrivateKey();
    uiConsole("Private Key: ", privateKey);
    return privateKey;
  };

  const getChainId = async () => {
    if (!walletProvider) return "";
    const newChainId = await walletProvider.getChainId();
    uiConsole("Chain Id: ", newChainId);
    return newChainId;
  };

  const deployContract = async (abi, bytecode, initValue) => {
    if (!walletProvider) return {};
    const receipt = await walletProvider.deployContract(abi, bytecode, initValue);
    return receipt;
  };

  const readContract = async (contractAddress, contractABI) => {
    if (!walletProvider) return "";
    const message = await walletProvider.readContract(contractAddress, contractABI);
    uiConsole(message);
    return message;
  };

  const writeContract = async (contractAddress, contractABI, updatedValue) => {
    if (!walletProvider) return "";
    const receipt = await walletProvider.writeContract(contractAddress, contractABI, updatedValue);
    uiConsole(receipt);

    if (receipt) {
      setTimeout(async () => {
        await readContract(contractAddress, contractABI);
      }, 2000);
    }
    return receipt;
  };

  const parseToken = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace("-", "+").replace("_", "/");
      return JSON.parse(window.atob(base64 || ""));
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const getIdToken = async () => {
    uiConsole("Id Token: ", parseToken(idToken));
    return idToken;
  };

  const verifyServerSide = async (idTokenInFrontend) => {
    try {
      if (!provider) {
        uiConsole("provider not initialized yet");
        return;
      }

      if (connectorName === WALLET_CONNECTORS.AUTH) {
        const pubkey = await getPublicKey();
        const jwks = jose.createRemoteJWKSet(new URL("https://api-auth.web3auth.io/jwks"));
        const jwtDecoded = await jose.jwtVerify(idTokenInFrontend, jwks, {
          algorithms: ["ES256"],
        });
        const pubKeyFromIdToken = jwtDecoded.payload.wallets.find(x => x.type === "web3auth_app_key").public_key;

        if (pubKeyFromIdToken === pubkey) {
          uiConsole(
            "Validation Success!",
            "Public Key from Provider: ",
            pubkey,
            "Public Key from decoded JWT: ",
            pubKeyFromIdToken,
            "Parsed Id Token: ",
            parseToken(idTokenInFrontend)
          );
        } else {
          uiConsole(
            "Validation Failed!",
            "Public Key from Provider: ",
            pubkey,
            "Public Key from decoded JWT: ",
            pubKeyFromIdToken,
            "Parsed Id Token: ",
            parseToken(idTokenInFrontend)
          );
        }
      } else {
        const jwks = jose.createRemoteJWKSet(new URL("https://authjs.web3auth.io/jwks"));
        const jwtDecoded = await jose.jwtVerify(idTokenInFrontend, jwks, { algorithms: ["ES256"] });
        const addressFromIdToken = jwtDecoded.payload.wallets.find(x => x.type === "ethereum").address;
        if (address && addressFromIdToken && addressFromIdToken.toLowerCase() === address.toLowerCase()) {
          uiConsole(
            "Validation Success!",
            "Address from Provider: ",
            address,
            "Address from decoded JWT: ",
            addressFromIdToken,
            "Parsed Id Token: ",
            parseToken(idTokenInFrontend)
          );
        }
      }
    } catch (e) {
      uiConsole(e);
    }
  };

  const updateConnectedChain = (chainDetails) => {
    if (typeof chainDetails === "string") {
      setConnectedChain(chainList[chainDetails]);
      setChainListOptionSelected(chainDetails);
      return;
    }
    if (typeof chainDetails === "object") {
      if (!Object.keys(chainList).map(k => chainList[k].displayName).includes(chainDetails.displayName)) {
        setChainDetails({ ...chains, custom: chainDetails });
      }
      setConnectedChain(chainDetails);
      setChainListOptionSelected("custom");
      return;
    }
    uiConsole("No network or chainDetails provided");
  };

  const changeChain = async (chainConfig) => {
    try {
      setIsLoading(true);
      await switchChain(chainConfig.chainId);
      if (walletProvider) {
        setChainId(await walletProvider.getChainId());
        setAddress(await walletProvider.getAddress());
        setBalance(await walletProvider.getBalance());
      }
      updateConnectedChain(chainConfig);
      setIsLoading(false);
      uiConsole("Chain switched successfully");
    } catch (error) {
      uiConsole("Failed to switch chain", error);
      setIsLoading(false);
    }
  };

  const contextProvider = {
    walletProvider,
    isLoading,
    address,
    balance,
    chainId,
    playgroundConsole,
    connectedChain,
    chainList,
    chainListOptionSelected,
    getUserInfo,
    getPublicKey,
    getAddress,
    getBalance,
    getSignature,
    sendTransaction,
    getPrivateKey,
    getChainId,
    deployContract,
    readContract,
    writeContract,
    verifyServerSide,
    getIdToken,
    changeChain,
    updateConnectedChain,
  };

  return <PlaygroundContext.Provider value={contextProvider}>{children}</PlaygroundContext.Provider>;
};
