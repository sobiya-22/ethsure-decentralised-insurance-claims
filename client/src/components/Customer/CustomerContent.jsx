import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Users, FileText, AlertCircle, CheckCircle, Clock, Wallet, TrendingUp, CreditCard, Folder } from "lucide-react";
import KYCForm from "../KYCForm";
import { defaultCustomer, defaultDocuments, defaultActivities } from '@/constants/customerConstants';

const CustomerContent = ({ onPayEMIClick, currentView, setCurrentView }) => {
  const customer = defaultCustomer;
  const stats = [
    { title: "Active Policies", value: "1", icon: Shield, change: "Health Insurance", color: "from-emerald-500/20 to-emerald-400/20", iconColor: "text-emerald-400" },
    { title: "Total Premiums", value: "₹9,600", icon: CreditCard, change: "Monthly payment", color: "from-blue-500/20 to-blue-400/20", iconColor: "text-blue-400" },
    { title: "Claims Submitted", value: "2", icon: FileText, change: "1 pending review", color: "from-purple-500/20 to-purple-400/20", iconColor: "text-purple-400" },
  ];
  const documents = defaultDocuments;
  const activities = defaultActivities;
  const handleKYCSubmit = (kycData) => { console.log('KYC submitted:', kycData); setCurrentView('overview'); };

  return (
    <div className="text-white w-full relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-gray-500/20 via-gray-400/10 to-gray-500/20 blur-3xl" />
      <div className="relative z-10 space-y-6 pt-20">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg glass"><Shield className="w-6 h-6 text-cyan-400" /></div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold leading-tight">Customer <span className="gradient-text">Dashboard</span></h1>
                <p className="text-xl text-gray-300">Welcome back, {customer.name}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-amber-500/30">
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-sm text-amber-400 font-medium">KYC Pending</span>
            </div>
            <Button variant="outline" className="flex items-center gap-2 glass">
              <Wallet className="w-4 h-4" />{customer.wallet}
            </Button>
          </div>
        </div>

        <Card className="border-cyan-500/40 bg-gradient-to-r from-cyan-500/15 via-blue-500/10 to-purple-500/15 hover:border-cyan-400/60 hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-500/5 animate-pulse"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all duration-300 shadow-lg">
                <AlertCircle className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300 animate-pulse" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-cyan-300 text-lg mb-2">KYC Verification Pending</h3>
                <p className="text-cyan-100 text-base mb-3">Complete your Know Your Customer verification to access all features and higher claim limits.</p>
              </div>
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 hover:shadow-xl hover:shadow-cyan-500/30 transition-all duration-300" onClick={() => setCurrentView('kyc')}>Complete KYC</Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="glass shine group hover:scale-105 transition-transform duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-white/70 text-sm font-medium">{stat.title}</p>
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-white/60 flex items-center gap-1"><TrendingUp className="w-3 h-3" />{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} group-hover:scale-110 transition-transform duration-200`}>
                    <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <Card className="glass shine hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 font-bold"><Shield className="w-5 h-5 font-bold" />Active Policy</CardTitle>
                  <Button variant="secondary" size="sm">View All Policies</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="p-6 rounded-xl bg-gradient-to-r from-gray-500/10 to-gray-500/10 border border-gray-500/20">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-white">Health Insurance Plus</h3>
                        <p className="text-white/70">Policy #POL-2024-001</p>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm text-emerald-400 font-medium">Active</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-white/60 text-sm">Agent</p>
                        <p className="text-white font-medium">Rajesh Sharma</p>
                      </div>
                      <div>
                        <p className="text-white/60 text-sm">Next EMI</p>
                        <p className="text-white font-medium">2025-10-15 • $120</p>
                      </div>
                    </div>
                    <div className="flex gap-3 pt-2">
                      <Button size="sm">View Details</Button>
                      <Button size="sm" variant="outline" onClick={onPayEMIClick}>Pay EMI</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="glass shine hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-bold"><Folder className="w-5 h-5 font-bold" />Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                      <div>
                        <p className="text-white font-medium text-sm">{doc.name}</p>
                        <p className="text-white/60 text-xs">{doc.type} • {doc.uploaded}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${doc.status === 'Verified' ? 'text-gray-300 bg-gray-700/50' : 'text-gray-300 bg-gray-700/50'}`}>{doc.status}</span>
                        <Button size="sm" variant="outline">View</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass shine hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-bold"><Clock className="w-5 h-5 font-bold" />Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {activities.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                      <div>
                        <p className="text-white font-medium text-sm">{activity.type}</p>
                        <p className="text-white/60 text-xs">{activity.amount && `${activity.amount} • `}{activity.reference && `${activity.reference} • `}{activity.date}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${activity.status === 'Completed' ? 'text-gray-300 bg-gray-700/50' : 'text-gray-300 bg-gray-700/50'}`}>{activity.status}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CustomerContent;