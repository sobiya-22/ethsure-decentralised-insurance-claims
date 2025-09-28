import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginAdmin } from "@/services/adminAPI";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await loginAdmin({ email, password });
      const { token } = res.data;

      if (token) {
        localStorage.setItem("adminToken", token);
        navigate("/admin-dashboard");
      } else {
        setErrorMsg("Invalid credentials");
      }
    } catch (error) {
      console.error("Admin login failed:", error);
      setErrorMsg(error.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex flex-col items-center justify-center text-white">
      <Navbar />
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

        {errorMsg && <p className="text-red-500 mb-4 text-center">{errorMsg}</p>}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-gray-700 text-white"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-gray-700 text-white"
          />

          <Button type="submit" className="mt-2" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
