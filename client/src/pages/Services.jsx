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
    <div className="min-h-screen text-white relative overflow-y-auto no-scrollbar">
      <Navbar />

      <div className="absolute w-[800px] h-[800px] bg-gradient-to-tr from-blue-600/20 via-emerald-500/10 to-purple-600/20 blur-3xl top-[-200px] left-[-200px] animate-pulse-slow" />
      <div className="absolute w-[800px] h-[800px] bg-gradient-to-tr from-purple-600/20 via-blue-500/10 to-green-600/20 blur-3xl bottom-[-200px] right-[-200px] animate-pulse-slow" />

      <section className="relative z-10 text-center py-32 px-4 max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6"
        >
          One Chain. One Policy. 
          <span className="block gradient-text">Complete Trust.</span>
        </motion.h1>
        <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10">
          EthSure simplifies the entire insurance journey — from registration to payout — into one unified, blockchain-verified flow.
        </p>
      </section>

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
              <div className="glass shine border-white/10 p-6 rounded-2xl shadow-lg hover:shadow-blue-500/30 transition hover:scale-105">
                {step.icon}
              </div>
              <div className="max-w-md">
                <h3 className="text-2xl font-semibold mb-2 gradient-text">
                  {step.title}
                </h3>
                <p className="text-gray-300">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        
      </section>

      <section className="relative text-center px-6 pb-24 max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl font-bold mb-6 gradient-text"
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
              className="glass border border-white/10 rounded-full px-6 py-3 text-gray-200 text-sm hover:scale-105 hover:text-white transition"
            >
              {point}
            </motion.div>
          ))}
        </div>
      </section>

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
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Link to="/signup">
            <Button className="button-pill text-lg px-8 py-4 shine">
              Get Started
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;
