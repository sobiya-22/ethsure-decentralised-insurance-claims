import { createContext, useContext, useEffect, useState } from "react";
import { useWeb3AuthConnect, useWeb3AuthDisconnect, useWeb3Auth } from "@web3auth/modal/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getWalletAddress, createEthrDID } from "../utils/blockchainOperations";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [connecting, setConnecting] = useState(false);
    // const [loading, setLoading] = useState(true);

    const { connect, isConnected } = useWeb3AuthConnect();
    const { disconnect } = useWeb3AuthDisconnect();
    const { web3Auth } = useWeb3Auth();
    const navigate = useNavigate();

    const BASE_URL = import.meta.env.VITE_BASE_URL;
    console.log('Prinit base url: ', BASE_URL);
    // Restore session
    // useEffect(() => {
    //     const restoreSession = async () => {
    //         if (token && !user) {
    //             try {
    //                 const res = await axios.get(`${BASE_URL}/api/users/me`, {
    //                     headers: { Authorization: `Bearer ${token}` },
    //                 });
    //                 setUser(res.data);
    //             } catch (err) {
    //                 setToken(null);
    //                 localStorage.removeItem("token");
    //             }
    //         }
    //         setLoading(false);
    //     };

    //     restoreSession();
    // }, [token]);

    const login = async () => {
        if (connecting) return;
        setConnecting(true);
        try {
            if (!web3Auth) throw new Error("Web3Auth not initialized");

            const provider = await connect();
            if (!provider) throw new Error("Provider not returned from Web3Auth connect");

            const info = await web3Auth.getUserInfo();
            const wallet_address = await getWalletAddress(provider);
            const email = info?.email || null;

            const res = await axios.post(`${BASE_URL}/api/users/login`, { wallet_address, email });

            if (!res.data.role) {
                navigate("/role-select");
                return;
            }

            localStorage.setItem("token", res.data.token);
            setToken(res.data.token);
            setUser(res.data);
            return { success: true, role: res.data.role };
        } catch (err) {
            console.error("Login failed:", err);
            throw err;
        } finally {
            setConnecting(false);
        }
    };

    const assignRole = async (wallet_address, role, name, profile_photo_url) => {
        if (!web3Auth) throw new Error("Web3Auth not initialized");
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
        setUser(res.data);
        return res.data.role;
    };

    const logout = async () => {
        localStorage.removeItem("token");
        await disconnect();
        setToken(null);
        setUser(null);
        navigate("/");
    };

    return (
        <AuthContext.Provider value={{
            user, token, login, assignRole, logout, connecting
            // , loading
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
