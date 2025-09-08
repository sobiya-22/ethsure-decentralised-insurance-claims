// src/layouts/AgentLayout.jsx
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import {
  CheckCircle,Users,FileText,Shield,LogOut,Plus,
} from "lucide-react";

const AgentLayout = ({ agent, profileImage, setProfileImage, activeMenu, setActiveMenu, scrollRefs, children }) => {
  // Handle profile upload
  const handleProfileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const scrollToSection = (ref, menu) => {
    setActiveMenu(menu);
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white w-full flex flex-col">
      {/* Navbar */}
      <Navbar hideAuthButtons />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-72 bg-gray-800/80 border-r border-gray-700 hidden md:flex flex-col fixed top-0 left-0 h-full pt-20">
          <div className="flex flex-col h-full p-6">
            {/* Profile */}
            <div className="text-center relative flex-shrink-0">
              <div className="relative w-40 h-40 mx-auto">
                <img
                  src={profileImage}
                  alt="Agent Avatar"
                  className="w-40 h-40 rounded-full border-4 border-blue-500 shadow-md object-cover"
                />
                {/* Upload Button */}
                <label
                  htmlFor="profile-upload"
                  className="absolute bottom-3 right-8 bg-blue-600 hover:bg-blue-700 rounded-full p-2 cursor-pointer shadow-lg border-2 border-gray-800"
                >
                  <Plus className="w-4 h-4 text-white" />
                </label>
                <input
                  type="file"
                  id="profile-upload"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfileUpload}
                />
              </div>
              <h2 className="text-xl font-bold mt-4 flex items-center justify-center gap-2">
                {agent.name}
                {agent.verified && (
                  <CheckCircle className="text-green-500 w-6 h-6" />
                )}
              </h2>
              <p className="text-gray-400 text-sm mt-2">Wallet Address</p>
              <p className="font-mono text-blue-400 text-xs break-all">
                {agent.wallet}
              </p>
            </div>

            {/* Sidebar Menu */}
            <nav className="mt-10 flex-1 space-y-3">
              <button
                onClick={() => scrollToSection(scrollRefs.customers, "customers")}
                className={`flex items-center gap-3 w-full px-4 py-2 rounded transition ${
                  activeMenu === "customers"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700/50 hover:bg-blue-600"
                }`}
              >
                <Users className="w-5 h-5" /> My Customers
              </button>
              <button
                onClick={() => scrollToSection(scrollRefs.claims, "claims")}
                className={`flex items-center gap-3 w-full px-4 py-2 rounded transition ${
                  activeMenu === "claims"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700/50 hover:bg-blue-600"
                }`}
              >
                <FileText className="w-5 h-5" /> Claims
              </button>
              <button
                onClick={() => scrollToSection(scrollRefs.users, "users")}
                className={`flex items-center gap-3 w-full px-4 py-2 rounded transition ${
                  activeMenu === "users"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700/50 hover:bg-blue-600"
                }`}
              >
                <Shield className="w-5 h-5" /> User Management
              </button>
            </nav>

            {/* Logout - Fixed at bottom */}
            <div className="mt-auto pt-6 border-t border-gray-700 flex-shrink-0">
              <button
                onClick={() => console.log("Logging out...")}
                className="flex items-center gap-3 w-full px-4 py-2 rounded bg-red-600 hover:bg-red-700 transition"
              >
                <LogOut className="w-5 h-5" /> Logout
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 md:ml-72 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default AgentLayout;