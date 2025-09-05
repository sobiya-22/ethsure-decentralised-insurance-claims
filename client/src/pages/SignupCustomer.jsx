import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SignupCustomer = ({ walletAddress, did }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    customer_address: "",
    date_of_birth: "",
    profile_photo_url: "",
    id_document_url: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      customer_did: did,
      wallet_address: walletAddress,
    };

    const res = await fetch("/api/customers/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      navigate("/dashboard/customer");
    } else {
      console.error("Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-2xl w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold">Customer Signup</h2>

        <div>
          <Label>Name</Label>
          <Input name="customer_name" value={formData.customer_name} onChange={handleChange} required />
        </div>

        <div>
          <Label>Email</Label>
          <Input type="email" name="customer_email" value={formData.customer_email} onChange={handleChange} required />
        </div>

        <div>
          <Label>Phone</Label>
          <Input name="customer_phone" value={formData.customer_phone} onChange={handleChange} required />
        </div>

        <div>
          <Label>Address</Label>
          <Input name="customer_address" value={formData.customer_address} onChange={handleChange} required />
        </div>

        <div>
          <Label>Date of Birth</Label>
          <Input type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} required />
        </div>

        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
          Signup as Customer
        </Button>
      </form>
    </div>
  );
};

export default SignupCustomer;
