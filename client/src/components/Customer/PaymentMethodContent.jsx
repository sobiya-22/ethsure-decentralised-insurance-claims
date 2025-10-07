import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, ArrowLeft } from 'lucide-react';

const PaymentMethodContent = ({ onBack }) => {
  const handlePayNow = () => {
    console.log('Pay Now clicked');
  };

  return (
    <div className="text-white w-full space-y-8 px-3 xs:px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack} className="text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-xl transition-all duration-200"><ArrowLeft className="w-6 h-6" /></Button>
            <div className="p-3 rounded-xl glass shine"><CreditCard className="w-8 h-8 text-cyan-400" /></div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold leading-tight">Payment <span className="text-blue-400">Details</span></h1>
              <p className="text-xl text-gray-300 mt-2">Proceed to pay your premium</p>
            </div>
          </div>
        </div>
      </div>
      {/* Addresses moved above the payment amount */}
      <Card className="glass shine border-white/10 hover-scale-105 hover-glow-cyan">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <p className="text-white/60 text-sm">From (Sender)</p>
              <p className="text-white font-mono break-all">0xA1b2C3d4E5F6a7B8c9D0e1F2A3B4c5D6e7F8a9B0</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <p className="text-white/60 text-sm">To (Receiver)</p>
              <p className="text-white font-mono break-all">0xFfEEDDccbbaa00112233445566778899AaBbCcDd</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass shine border-white/10 hover-scale-105 hover-glow-cyan">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-2">Payment Amount</h3>
            <p className="text-4xl font-bold text-white mb-2">₹2,500</p>
            <p className="text-white/60">Monthly Premium Payment</p>
          </div>
        </CardContent>
      </Card>

        <Card className="glass shine border-white/10 hover-scale-105 hover-glow-cyan">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white"><CreditCard className="w-5 h-5 text-blue-400" />Pay Now</CardTitle>
        </CardHeader>
          <CardContent>
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-white/60 text-sm">Payment Method</p>
                <p className="text-white font-medium">Cryptocurrency</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-white/60 text-sm">Network</p>
                <p className="text-white font-medium">Ethereum</p>
                </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-white/60 text-sm">Amount</p>
                <p className="text-white font-medium">₹2,500</p>
                </div>
              </div>
            </div>

          <Button onClick={handlePayNow} className="w-full bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-medium h-12 transition-all duration-300 shadow-lg hover:shadow-xl">
            <CreditCard className="w-5 h-5 mr-2" />Pay ₹2,500 Now
          </Button>
          </CardContent>
        </Card>
    </div>
  );
};
export default PaymentMethodContent;
