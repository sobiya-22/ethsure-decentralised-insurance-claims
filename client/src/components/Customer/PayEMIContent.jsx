import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Calendar, ShieldCheck, AlertCircle, CreditCard, Clock, Wallet, TrendingUp, CheckCircle, History,IndianRupee } from "lucide-react";
import PaymentMethodContent from './PaymentMethodContent';
import { defaultCustomer, defaultPaymentHistory } from '@/constants/customerConstants';

const PayEMIContent = () => {
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const customer = defaultCustomer;
  const stats = [
    { title: "Amount Due", value: "₹2,500", icon: IndianRupee, change: "Monthly Premium", color: "from-emerald-500/20 to-emerald-400/20", iconColor: "text-emerald-400" },
    { title: "Due Date", value: "15 Jan", icon: Calendar, change: "5 days remaining", color: "from-amber-500/20 to-amber-400/20", iconColor: "text-amber-400" },
    { title: "Policy Status", value: "Active", icon: ShieldCheck, change: "Coverage Valid", color: "from-blue-500/20 to-blue-400/20", iconColor: "text-blue-400" },
  ];
  const paymentHistory = defaultPaymentHistory;

  if (showPaymentMethods) {
    return <PaymentMethodContent onBack={() => setShowPaymentMethods(false)} />;
  }
  return (
    <div className="text-white w-full relative bg-transparent">
      <div className="space-y-6 px-3 xs:px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg glass"><CreditCard className="w-6 h-6 text-cyan-400" /></div>
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
          </div>
        </div>
        <Card className="glass shine hover:border-blue-400/50 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-blue-500/20 border border-blue-500/30 group-hover:from-blue-500/30 group-hover:to-blue-500/30 transition-all duration-300 shadow-lg">
                <AlertCircle className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors duration-300 animate-pulse" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-bold text-cyan-300 text-lg tracking-wide">Payment Due Soon</h3>
                  <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping"></div>
                    <span className="text-cyan-200 text-xs font-medium">5 days left</span>
                  </div>
                </div>
                <p className="text-cyan-100 text-base leading-relaxed mb-3 font-medium">
                  Your monthly premium payment of <span className="font-bold text-white">₹2,500</span> is due in 5 days. 
                  Make your payment to avoid any service interruptions.
                </p>
                <div className="flex items-center gap-2 text-cyan-200/80">
                  <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium">Late payments may result in coverage suspension</span>
                </div>
              </div>
              <Button 
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 hover:shadow-xl transition-all duration-300 transition-all duration-300 px-6 py-3 text-base font-semibold rounded-xl hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                onClick={() => setShowPaymentMethods(true)}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Pay Now
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-2">
          {stats.map((stat, index) => (
            <Card key={index} className="glass shine group hover:scale-[1.02] transition-all duration-300 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-white/70 text-sm font-medium">{stat.title}</p>
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-white/60 flex items-center gap-1"><TrendingUp className="w-3 h-3" />{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} group-hover:scale-110 transition-all duration-300 group-hover:shadow-lg`}>
                    <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 p-2">
          <div className="xl:col-span-2">
            <Card className="glass shine hover:border-blue-400/50 transition-all duration-300 hover:scale-[1.01]">
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
                        className="h-12 bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-medium hover:shadow-xl transition-all duration-300"
                        onClick={() => setShowPaymentMethods(true)}
                      >
                        <CreditCard className="w-5 h-5 mr-2" />Pay Now
                      </Button>
                      <Button variant="outline" className="h-12 border-white/20 text-white hover:bg-white/10 hover:border-white/40 hover:shadow-lg transition-all duration-300">
                        <Calendar className="w-5 h-5 mr-2" />Schedule Payment
                      </Button>
                    </div>
                    <div className="pt-4 border-t border-white/10">
                      <h4 className="text-white font-medium mb-3">Payment Methods</h4>
                      <div className="grid grid-cols-1 gap-3">
                        <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-center hover:bg-white/10 hover:border-blue-400/30 transition-all duration-300 hover:scale-[1.02] group">
                          <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors duration-300">
                            <CreditCard className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                          </div>
                          <p className="text-white text-sm group-hover:text-blue-100 transition-colors duration-300">Credit Card</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card className="glass shine hover:border-blue-400/50 transition-all duration-300">
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
            {/* Upcoming Payments card removed as requested */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default PayEMIContent;