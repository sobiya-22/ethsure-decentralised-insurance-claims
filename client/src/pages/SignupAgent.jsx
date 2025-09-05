import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SignupAgent = ({ walletAddress, did }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    agent_name: "",
    agent_email: "",
    agent_phone: "",
    license_number: "",
    profile_photo_url: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      agent_did: did,
      wallet_address: walletAddress,
    };

    const res = await fetch("/api/agents/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      navigate("/dashboard/agent");
    } else {
      console.error("Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-2xl w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold">Agent Signup</h2>

        <div>
          <Label>Name</Label>
          <Input name="agent_name" value={formData.agent_name} onChange={handleChange} required />
        </div>

        <div>
          <Label>Email</Label>
          <Input type="email" name="agent_email" value={formData.agent_email} onChange={handleChange} required />
        </div>

        <div>
          <Label>Phone</Label>
          <Input name="agent_phone" value={formData.agent_phone} onChange={handleChange} required />
        </div>

        <div>
          <Label>License Number</Label>
          <Input name="license_number" value={formData.license_number} onChange={handleChange} required />
        </div>

        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
          Signup as Agent
        </Button>
      </form>
    </div>
  );
};

export default SignupAgent;
