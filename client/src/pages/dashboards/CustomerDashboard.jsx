import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { getCustomer } from "@/services/customerAPI"; // ✅ use customerAPI
import { useWalletAddress } from "@/hooks/useWalletAddress";

const CustomerDashboard = () => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { walletAddress , isConnecting } = useWalletAddress();

  useEffect(() => {
    const fetchCustomerData = async () => {
      if (isConnecting  && !walletAddress) {
        navigate("/");
        return;
      }
      try {
        const response = await getCustomer(walletAddress);
        const data = response.data?.data;;
        setCustomer(data);

        if (data?.kyc_status !== "verified") {
          navigate("/customer-kyc");
        }
      } catch (err) {
        console.error("Error fetching customer:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, [walletAddress, navigate]);

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Customer Dashboard</h1>
        <Card>
          <CardHeader>
            <CardTitle>Welcome, {customer?.customer_name || "Customer"}!</CardTitle>
          </CardHeader>
          <CardContent>
            <p>You can now explore policies, manage claims, and more.</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CustomerDashboard;
