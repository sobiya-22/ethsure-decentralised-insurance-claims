import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { DollarSign, Calendar, ShieldCheck, AlertCircle, CreditCard, Clock, Wallet, TrendingUp, CheckCircle, History } from "lucide-react";
import PaymentMethodContent from './PaymentMethodContent';

const PayEMIContent = () => {
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const customer = { name: "John Doe", wallet: "0x742d...d8b6", verified: false };
  const stats = [
    { title: "Amount Due", value: "₹2,500", icon: DollarSign, change: "Monthly Premium", color: "from-gray-600 to-gray-500" },
    { title: "Due Date", value: "15 Jan", icon: Calendar, change: "5 days remaining", color: "from-gray-600 to-gray-500" },
    { title: "Policy Status", value: "Active", icon: ShieldCheck, change: "Coverage Valid", color: "from-gray-600 to-gray-500" },
  ];
  const paymentHistory = [
    { id: "PAY-001", type: "Premium Payment", amount: "₹2,500", date: "Dec 15, 2023", status: "Completed", policy: "POL-2024-001" },
    { id: "PAY-002", type: "Premium Payment", amount: "₹2,500", date: "Nov 15, 2023", status: "Completed", policy: "POL-2024-001" },
    { id: "PAY-003", type: "Premium Payment", amount: "₹2,500", date: "Oct 15, 2023", status: "Completed", policy: "POL-2024-001" },
  ];

  if (showPaymentMethods) {
    return <PaymentMethodContent onBack={() => setShowPaymentMethods(false)} />;
  }

  return (
    <div className="min-h-screen text-white w-full relative overflow-hidden">
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-40" />
      <div className="absolute -top-24 -right-24 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-gray-500/20 via-gray-400/10 to-gray-500/20 blur-3xl" />
      <div className="relative z-10 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg glass"><CreditCard className="w-6 h-6 text-white" /></div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold leading-tight">Pay <span className="gradient-text">EMI</span></h1>
                <p className="text-xl text-gray-300">Manage your insurance premium payments</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-amber-500/30">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-amber-400 font-medium">Due in 5 days</span>
            </div>
            <Button variant="outline" className="flex items-center gap-2 glass">
              <Wallet className="w-4 h-4" />{customer.wallet}
            </Button>
          </div>
        </div>

        <Card className="border-gray-500/30 bg-gradient-to-r from-gray-500/10 to-gray-500/10">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-gray-500/20"><AlertCircle className="w-5 h-5 text-gray-400" /></div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-400 mb-1">Payment Due Soon</h3>
                <p className="text-white/80 text-sm mb-3">Your monthly premium payment of ₹2,500 is due in 5 days. Make your payment to avoid any service interruptions.</p>
              </div>
              <Button 
                className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600"
                onClick={() => setShowPaymentMethods(true)}
              >
                Pay Now
              </Button>
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
                    <stat.icon className="w-6 h-6 text-white" />
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
                  <CardTitle className="flex items-center gap-2"><CreditCard className="w-5 h-5" />Payment Options</CardTitle>
                  <Button variant="secondary" size="sm">View All Options</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="p-6 rounded-xl bg-gradient-to-r from-gray-500/10 to-gray-500/10 border border-gray-500/20">
                  <div className="space-y-6">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-white mb-2">₹2,500</h3>
                      <p className="text-white/70">Monthly Premium Payment</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button 
                        className="h-12 bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-medium"
                        onClick={() => setShowPaymentMethods(true)}
                      >
                        <CreditCard className="w-5 h-5 mr-2" />Pay Now
                      </Button>
                      <Button variant="outline" className="h-12 border-white/20 text-white hover:bg-white/10">
                        <Calendar className="w-5 h-5 mr-2" />Schedule Payment
                      </Button>
                    </div>
                    <div className="pt-4 border-t border-white/10">
                      <h4 className="text-white font-medium mb-3">Payment Methods</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-center">
                          <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <CreditCard className="w-4 h-4 text-blue-400" />
                          </div>
                          <p className="text-white text-sm">Credit Card</p>
                        </div>
                        <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-center">
                          <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-purple-500/20 flex items-center justify-center">
                            <Wallet className="w-4 h-4 text-purple-400" />
                          </div>
                          <p className="text-white text-sm">Crypto Wallet</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="glass shine hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><History className="w-5 h-5" />Payment History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {paymentHistory.map((payment, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                        </div>
                        <div>
                          <p className="text-white font-medium text-sm">{payment.type}</p>
                          <p className="text-white/60 text-xs">{payment.policy} • {payment.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-medium text-sm">{payment.amount}</p>
                        <span className="text-emerald-400 text-xs font-medium">Completed</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass shine hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Clock className="w-5 h-5" />Upcoming Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium text-sm">Next Payment</span>
                      <span className="text-amber-400 text-xs font-medium">Due Soon</span>
                    </div>
                    <p className="text-white/60 text-xs">Jan 15, 2024 • ₹2,500</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium text-sm">Feb Payment</span>
                      <span className="text-white/60 text-xs">Scheduled</span>
                    </div>
                    <p className="text-white/60 text-xs">Feb 15, 2024 • ₹2,500</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayEMIContent;