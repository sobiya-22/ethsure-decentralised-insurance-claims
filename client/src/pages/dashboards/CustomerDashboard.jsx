import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const CustomerDashboard = () => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const email = localStorage.getItem("userEmail");
        const response = await fetch(`http://localhost:5000/api/users/${email}`);
        const data = await response.json();
        setCustomer(data);

        const customerRole = data.roles?.find((r) => r.role_type === "customer");
        if (customerRole?.kyc_status !== "verified") {
          navigate("/customer-kyc");
        }
      } catch (err) {
        console.error("Error fetching customer:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomer();
  }, [navigate]);

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Customer Dashboard</h1>
        <Card>
          <CardHeader>
            <CardTitle>Welcome, {customer?.name || "Customer"}!</CardTitle>
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
