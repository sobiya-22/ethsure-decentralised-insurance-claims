import { useWeb3AuthConnect, useWeb3AuthDisconnect, useWeb3Auth } from "@web3auth/modal/react";
import axios from "axios";
import { getWalletAddress, createEthrDID } from "../utils/blockchainOperations";
import { userStore } from "../context/userContext";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const useAuth = () => {
    const { connect } = useWeb3AuthConnect();
    const { disconnect } = useWeb3AuthDisconnect();
    const { web3Auth } = useWeb3Auth();

    const login = userStore((state) => state.login);
    const logout = userStore((state) => state.logout);

    const connectWeb3 = async () => {
        if (!web3Auth) throw new Error("Web3Auth not initialized");

        const provider = await connect();
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
    };

    const signupUser = async (role = "customer") => {
        try {
            const userData = await connectWeb3();

            const res = await axios.post(`${BASE_URL}/api/users/register`, {
                ...userData,
                role,
            }, { withCredentials: true });

            login(res.data.user);
            toast.success("Signup successful!");
            return res.data;
        } catch (err) {
            toast.error(err?.response?.data?.message || "Signup failed");
            console.error("Signup failed:", err);
            throw err;
        }
    };


    const loginUser = async () => {
        try {
            const userData = await connectWeb3();

            const res = await axios.post(`${BASE_URL}/api/users/login`, {
                wallet_address: userData.wallet_address,
            }, { withCredentials: true });

            login(res.data.user);
            toast.success(res.data.message);
            return res.data;
        } catch (err) {
            toast.error(err?.response?.data?.message);
            console.error("Login failed:", err);
            throw err;
        }
    };

    const logoutUser = async () => {
        await disconnect();
        logout();
    };

    return {
        signupUser,
        loginUser,
        logoutUser,
    };
};
