import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  FileCheck,
  Wallet,
  Users,
  Database,
  Zap,
  Link2,
} from "lucide-react";

const Services = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  const steps = [
    {
      icon: <FileCheck className="w-10 h-10 text-blue-400" />,
      title: "Policy Registration",
      desc: "Begin your insurance journey by registering your policy on-chain. No paperwork — just verified digital ownership.",
    },
    {
      icon: <Users className="w-10 h-10 text-emerald-400" />,
      title: "Nominee Digital Identity",
      desc: "Nominees get decentralized IDs (DID) with verifiable credentials for tamper-proof claim verification.",
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-purple-400" />,
      title: "Claim Initiation & Verification",
      desc: "When a claim is raised, all documents and details are auto-verified through smart contracts — zero manual checks.",
    },
    {
      icon: <Database className="w-10 h-10 text-cyan-400" />,
      title: "On-Chain Storage",
      desc: "Every policy, document, and claim record is securely encrypted and stored using IPFS with blockchain verification.",
    },
    {
      icon: <Wallet className="w-10 h-10 text-yellow-400" />,
      title: "Smart Contract Settlement",
      desc: "Approved claims trigger automatic payouts through blockchain — instant, transparent, and traceable.",
    },
    {
      icon: <Zap className="w-10 h-10 text-pink-400" />,
      title: "Real-Time Claim Tracking",
      desc: "Track claim progress live with on-chain transparency and full visibility for both insurer and nominee.",
    },
  ];

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <Navbar />

      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-950 z-0" />
      <div className="absolute w-[800px] h-[800px] bg-gradient-to-tr from-blue-600/20 via-emerald-500/10 to-purple-600/20 blur-3xl top-[-200px] left-[-200px] animate-pulse-slow" />
      <div className="absolute w-[800px] h-[800px] bg-gradient-to-tr from-purple-600/20 via-blue-500/10 to-green-600/20 blur-3xl bottom-[-200px] right-[-200px] animate-pulse-slow" />

      {/* Hero Section */}
      <section className="relative z-10 text-center py-24 px-4 max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-500 bg-clip-text text-transparent"
        >
          One Chain. One Policy. Complete Trust.
        </motion.h1>
        <p className="text-gray-300 text-lg mb-10">
          EthSure simplifies the entire insurance journey — from registration to payout — into one unified, blockchain-verified flow.
        </p>
      </section>

      {/* Flow Section */}
      <section className="relative max-w-6xl mx-auto px-6 pb-24">
        
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative flex flex-col md:flex-row items-center gap-6 py-10 px-4 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-blue-500/30 transition">
                {step.icon}
              </div>
              <div className="max-w-md">
                <h3 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-blue-300 to-emerald-400 bg-clip-text text-transparent">
                  {step.title}
                </h3>
                <p className="text-gray-400">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        
      </section>

      {/* Special Features */}
      <section className="relative text-center px-6 pb-24 max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-green-500 bg-clip-text text-transparent"
        >
          Why EthSure is Different
        </motion.h2>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-10">
          Unlike traditional insurance platforms, EthSure operates fully on blockchain — merging registration, claims, verification, and payout under one single policy lifecycle.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          {[
            "🔐 100% On-Chain Storage & Verification",
            "📜 Single Unified Policy System",
            "⚙️ Smart Contract-Based Claim Approval",
            "🌐 Full Transparency, Zero Manual Work",
          ].map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-full px-6 py-3 text-gray-200 text-sm hover:scale-105 hover:text-white transition"
            >
              {point}
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center pb-24 relative z-10">
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-3xl font-semibold mb-4"
        >
          Experience the Future of Insurance
        </motion.h3>
        <p className="text-gray-400 mb-8">
          Join EthSure and be part of the world’s first fully on-chain insurance ecosystem.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/signup">
            <Button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-green-500 text-lg rounded-full">
              Get Started
            </Button>
          </Link>
          <Link to="/contact">
            <Button
              variant="outline"
              className="px-8 py-4 border-white/30 text-lg rounded-full"
            >
              Contact Us
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;
