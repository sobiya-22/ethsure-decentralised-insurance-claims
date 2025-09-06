import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { useWalletAddress } from "@/hooks/useWalletAddress";
import { userAPI } from "@/services/api";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, pending, approved, rejected
  const [pendingCount, setPendingCount] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const { walletAddress } = useWalletAddress();

  useEffect(() => {
    if (!walletAddress) {
      navigate("/");
      return;
    }
    fetchUsers();
  }, [navigate, walletAddress]);

  const fetchUsers = async () => {
    try {
      const response = await userAPI.getAll();
      if (response.data?.success) {
        setUsers(response.data.data);

        // Count pending
        const pending = response.data.data.filter((user) =>
          user.roles.some(
            (role) =>
              (role.role_type === "customer" && role.kyc_status === "pending") ||
              (role.role_type === "agent" && !role.is_approved)
          )
        ).length;
        setPendingCount(pending);

        if (pending > 0 && filter === "all") {
          setFilter("pending");
        }
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (walletAddress, roleType, status) => {
    try {
      await userAPI.updateKYCStatus({
        wallet_address: walletAddress,
        role_type: roleType,
        kyc_status: status,
      });

      setSuccessMessage(
        `${roleType} ${
          status === "verified" ? "approved" : "rejected"
        } successfully!`
      );
      setTimeout(() => setSuccessMessage(""), 3000);

      await fetchUsers();
    } catch (error) {
      console.error("Error updating approval status:", error);
      alert("Failed to update approval status");
    }
  };

  const getFilteredUsers = () => {
    if (filter === "all") return users;

    return users.filter((user) =>
      user.roles.some((role) => {
        if (filter === "pending") {
          return (
            (role.role_type === "customer" &&
              role.kyc_status === "pending") ||
            (role.role_type === "agent" && !role.is_approved)
          );
        }
        if (filter === "approved") {
          return (
            (role.role_type === "customer" &&
              role.kyc_status === "verified") ||
            (role.role_type === "agent" && role.is_approved)
          );
        }
        if (filter === "rejected") {
          return (
            role.role_type === "customer" &&
            role.kyc_status === "rejected"
          );
        }
        return false;
      })
    );
  };

  const getRoleStatus = (role) => {
    if (role.role_type === "customer") {
      return {
        status: role.kyc_status,
        color:
          role.kyc_status === "verified"
            ? "green"
            : role.kyc_status === "rejected"
            ? "red"
            : "yellow",
      };
    } else if (role.role_type === "agent") {
      return {
        status: role.is_approved ? "approved" : "pending",
        color: role.is_approved ? "green" : "yellow",
      };
    }
    return { status: "unknown", color: "gray" };
  };

  if (loading)
    return (
      <div className="text-center mt-20 text-white animate-pulse">
        Loading Admin Dashboard...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <h1 className="text-4xl font-extrabold">
            Admin <span className="text-purple-500">Dashboard</span>
          </h1>
          {successMessage && (
            <div className="bg-green-600/20 border border-green-500 rounded-lg px-6 py-2 mt-4 md:mt-0">
              <span className="text-green-400">{successMessage}</span>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              title: "Total Users",
              value: users.length,
              color: "blue",
            },
            {
              title: "Pending Approvals",
              value: users.filter((u) =>
                u.roles.some(
                  (r) =>
                    (r.role_type === "customer" &&
                      r.kyc_status === "pending") ||
                    (r.role_type === "agent" && !r.is_approved)
                )
              ).length,
              color: "yellow",
            },
            {
              title: "Approved Users",
              value: users.filter((u) =>
                u.roles.some(
                  (r) =>
                    (r.role_type === "customer" &&
                      r.kyc_status === "verified") ||
                    (r.role_type === "agent" && r.is_approved)
                )
              ).length,
              color: "green",
            },
            {
              title: "Total Agents",
              value: users.filter((u) =>
                u.roles.some((r) => r.role_type === "agent")
              ).length,
              color: "purple",
            },
          ].map((stat, i) => (
            <Card
              key={i}
              className={`bg-gray-800/60 border border-${stat.color}-500/50 shadow-lg hover:shadow-${stat.color}-500/30 transition`}
            >
              <CardContent className="p-6 text-center">
                <div
                  className={`text-4xl font-extrabold text-${stat.color}-400 mb-2`}
                >
                  {stat.value}
                </div>
                <div className="text-gray-300">{stat.title}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {["all", "pending", "approved", "rejected"].map((tab) => (
            <Button
              key={tab}
              variant={filter === tab ? "default" : "outline"}
              onClick={() => setFilter(tab)}
              className={`capitalize ${
                filter === tab
                  ? "bg-purple-600 text-white"
                  : "border-gray-600 text-gray-300"
              }`}
            >
              {tab}
            </Button>
          ))}
        </div>

        {/* Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {getFilteredUsers().map((user) => (
            <Card
              key={user._id}
              className="bg-gray-900/70 border border-gray-700 shadow-md hover:shadow-purple-500/20 transition"
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-lg">
                  {user.name || "Unnamed User"}
                  <Badge
                    variant="outline"
                    className="text-xs border-gray-500 text-gray-400"
                  >
                    {user.roles.length} Role
                    {user.roles.length !== 1 ? "s" : ""}
                  </Badge>
                </CardTitle>
                <CardDescription className="text-gray-400 text-sm">
                  {user.email}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm text-gray-500">
                    Wallet:{" "}
                    {user.wallet_address.slice(0, 6)}...
                    {user.wallet_address.slice(-4)}
                  </div>

                  {user.roles.map((role, i) => {
                    const status = getRoleStatus(role);
                    return (
                      <div
                        key={i}
                        className="flex items-center justify-between p-2 bg-gray-800/50 rounded-lg"
                      >
                        <div>
                          <span className="capitalize font-semibold">
                            {role.role_type}
                          </span>
                          {role.role_type === "agent" &&
                            role.license_number && (
                              <div className="text-xs text-gray-400">
                                License: {role.license_number}
                              </div>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              status.color === "green"
                                ? "border-green-500 text-green-400"
                                : status.color === "red"
                                ? "border-red-500 text-red-400"
                                : status.color === "yellow"
                                ? "border-yellow-500 text-yellow-400"
                                : "border-gray-500 text-gray-400"
                            }`}
                          >
                            {status.status}
                          </Badge>

                          {status.status === "pending" && (
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700 text-xs"
                                onClick={() =>
                                  handleApproval(
                                    user.wallet_address,
                                    role.role_type,
                                    "verified"
                                  )
                                }
                              >
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                className="bg-red-600 hover:bg-red-700 text-xs"
                                onClick={() =>
                                  handleApproval(
                                    user.wallet_address,
                                    role.role_type,
                                    "rejected"
                                  )
                                }
                              >
                                Reject
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  <div className="text-xs text-gray-500">
                    Joined:{" "}
                    {new Date(user.registration_date).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {getFilteredUsers().length === 0 && (
          <div className="text-center py-20 text-gray-500 text-lg">
            🚫 No users found for this filter
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
