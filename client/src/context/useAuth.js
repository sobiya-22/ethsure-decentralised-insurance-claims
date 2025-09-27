// hooks/useAuth.js
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useWeb3AuthConnect, useWeb3AuthDisconnect, useWeb3Auth } from "@web3auth/modal/react";
import { useAccount } from 'wagmi'
import { getWalletAddress } from "../utils/getWalletAddress";

// const BASE_URL = "https://unamiably-unperverted-rickey.ngrok-free.dev";
const BASE_URL = "https://ethsure-backend.onrender.com";


export default function useAuth() {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const navigate = useNavigate();
    const { connect, isConnected } = useWeb3AuthConnect();
    const { disconnect } = useWeb3AuthDisconnect();
    const { web3Auth } = useWeb3Auth();
    const { account } = useAccount();

    const login = async () => {
        if (isConnected) {
            console.log("Already connected");
            return;
        }
        await connect();
        const info = await web3Auth?.getUserInfo();
        const wallet_address = await getWalletAddress(web3Auth);
        const email = info.email;

        console.log(wallet_address, "  ", email);
        
        const res = await axios.post(`${BASE_URL}/api/users/login`, {
            wallet_address,
            email
        });

        // console.log("res: ", res);
        if ((res.data.newUser && !res.data.role) || (!res.data.newUser && !res.data.role)) {
            navigate('./role-select');
            return;
        }else if(res.data.role){
            localStorage.setItem("token", res.data.token);
            console.log(res.data);
            setToken(res.data.token);
            setUser({ role: res.data.role });
            return { success: "true", message: "Post api for user db - LOGIN" , role: res.data.role};
        }
    };

    const assignRole = async (wallet_address, role,name,profile_photo_url) => {
        const res = await axios.patch(`${BASE_URL}/api/users/assign-role`, {
            wallet_address,
            role,
            name,
            profile_photo_url,
        });
        localStorage.setItem("token", res.data.token);
        console.log(res);
        setToken(res.data.token);
        setUser({ role: res.data.role });
        
        return res.data.role;
    };

    const logout = async () => {
        localStorage.removeItem("token");
        await disconnect();
        setToken(null);
        setUser(null);
    };

    return { user, token, login,assignRole, logout };
}
