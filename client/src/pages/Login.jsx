import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import useAuth from "../context/useAuth";

const Login = () => {
  const { address, isConnected } = useAccount();
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const doLogin = async () => {
      if (isConnected && address) {
        try {
          const result = await login(); // backend call

          if (!result) {
            return; 
          }
          if (!result.role) {
            navigate("/select-role");
          } else {
            // redirect based on role
            if (result.role === "customer") {
              navigate("/customer-dashboard");
            } else if (result.role === "agent") {
              navigate("/agent-dashboard");
            }
          }
        } catch (err) {
          console.error(err);
          alert("Login failed");
        }
      }
    };

    doLogin();
  }, [isConnected, address]);

  return (
    <div>
      {isConnected ? (
        <p className="text-white">Connected: {address}</p>
      ) : (
        <p>Not connected</p>
      )}
    </div>
  );
};

export default Login;
