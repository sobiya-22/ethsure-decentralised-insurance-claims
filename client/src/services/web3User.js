import { useWeb3AuthConnect, useWeb3AuthDisconnect, useWeb3Auth } from "@web3auth/modal/react";
import { getWalletAddress, createEthrDID } from "../utils/blockchainOperations";
const web3Connect = async () => {
    const { connect, isConnected } = useWeb3AuthConnect();
    const { disconnect } = useWeb3AuthDisconnect();
    const { web3Auth } = useWeb3Auth();

    if (connecting) return;
    if (!web3Auth) throw new Error("Web3Auth not initialized");

    const provider = await connect();
    if (!provider) throw new Error("Provider not returned from Web3Auth connect");

    const info = await web3Auth.getUserInfo();

    const wallet_address = await getWalletAddress(provider);
    const email = info?.email;
    const did = await createEthrDID(web3Auth);
}
export default web3Connect;