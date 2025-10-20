import { useWeb3AuthConnect, useWeb3AuthDisconnect, useWeb3Auth } from "@web3auth/modal/react";
import { getWalletAddress, createEthrDID } from "../utils/blockchainOperations";
import { useState } from "react";

export const useWeb3Connect = () => {
  const { connect } = useWeb3AuthConnect();
  const { disconnect } = useWeb3AuthDisconnect();
  const { web3Auth } = useWeb3Auth();
  const [connecting, setConnecting] = useState(false);

  const web3Connect = async () => {
    try {
      if (connecting) return null;
      setConnecting(true);

      if (!web3Auth) throw new Error("Web3Auth not initialized");

      const provider = await connect();
      if (!provider) throw new Error("Provider not returned from Web3Auth connect");

      const info = await web3Auth.getUserInfo();
      const wallet_address = await getWalletAddress(provider);
      const did = await createEthrDID(web3Auth);

      return {
        wallet_address,
        email: info?.email,
        name: info?.name,
        profile_url: info?.profileImage,
        did,
      };
    } catch (error) {
      console.error("Web3Auth connection failed:", error);
      return null;
    } finally {
      setConnecting(false);
    }
  };

  return { web3Connect, disconnect, connecting };
};
