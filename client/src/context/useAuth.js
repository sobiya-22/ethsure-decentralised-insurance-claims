import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useWeb3AuthConnect, useWeb3AuthDisconnect, useWeb3Auth } from "@web3auth/modal/react";
import { useAccount } from "wagmi";
import { createEthrDID, getWalletAddress } from "../utils/blockchainOperations";

const BASE_URL = import.meta.env.VITE_BASE_URL;
// const BASE_URL = `http://localhost:5000`;

export default function useAuth() {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [connecting, setConnecting] = useState(false);
    const navigate = useNavigate();

    const { connect, isConnected } = useWeb3AuthConnect();
    const { disconnect } = useWeb3AuthDisconnect();
    const { web3Auth } = useWeb3Auth();
    const { account } = useAccount();

    const login = async () => {
        if (connecting) return;
        setConnecting(true);

        try {
            if (!web3Auth) {
                console.error("Web3Auth not initialized yet");
                return;
            }

            if (isConnected) {
                console.log("Already connected");
                return;
            }

            // Trigger Web3Auth connection
            const provider = await connect();
            if (!provider) throw new Error("Provider not returned from Web3Auth connect");

            // Get user info
            const info = await web3Auth.getUserInfo();
            const wallet_address = await getWalletAddress(provider);
            const email = info?.email || null;

            console.log("Connected:", wallet_address, email);

            // Call backend login
            const res = await axios.post(`${BASE_URL}/api/users/login`, { wallet_address, email });

            if ((res.data.newUser && !res.data.role) || (!res.data.newUser && !res.data.role)) {
                navigate("./role-select");
                return;
            } else if (res.data.role) {
                localStorage.setItem("token", res.data.token);
                setToken(res.data.token);
                setUser({ role: res.data.role });
                return { success: true, role: res.data.role };
            }
        } catch (err) {
            // Handle popup closed / connection errors gracefully
            if (err?.message?.includes("Wallet popup has been closed by the user")) {
                console.warn("Wallet popup was closed by the user");
            } else {
                console.error("Connection failed:", err);
            }
        } finally {
            setConnecting(false);
        }
    };

    const assignRole = async (wallet_address, role, name, profile_photo_url) => {
        if (!web3Auth) throw new Error("Web3Auth not initialized yet");
        const did = await createEthrDID(web3Auth);

        const res = await axios.patch(`${BASE_URL}/api/users/assign-role`, {
            wallet_address,
            did,
            role,
            name,
            profile_photo_url,
        });

        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
        setUser({ role: res.data.role });

        console.log("Role assigned:", res.data);
        return res.data.role;
    };

    const logout = async () => {
        localStorage.removeItem("token");
        await disconnect();
        setToken(null);
        setUser(null);
    };

    return { user, token, login, assignRole, logout };
}
