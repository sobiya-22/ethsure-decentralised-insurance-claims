import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, Wallet, Smartphone, Banknote, CheckCircle, Shield, Lock, ArrowLeft } from 'lucide-react';

const PaymentMethodContent = ({ onBack }) => {
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [newCard, setNewCard] = useState({ cardNumber: '', expiryDate: '', cvv: '', cardholderName: '', zipCode: '' });
  const paymentOptions = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, description: 'Pay with your credit or debit card', color: 'from-blue-500/20 to-blue-400/20' },
    { id: 'crypto', name: 'Cryptocurrency', icon: Wallet, description: 'Pay with Bitcoin, Ethereum, or other crypto', color: 'from-purple-500/20 to-purple-400/20' },
    { id: 'upi', name: 'UPI Payment', icon: Smartphone, description: 'Pay using UPI apps like PhonePe, Google Pay', color: 'from-green-500/20 to-green-400/20' },
    { id: 'bank', name: 'Bank Transfer', icon: Banknote, description: 'Direct bank transfer or NEFT', color: 'from-orange-500/20 to-orange-400/20' }
  ];
  const handleCardSubmit = (e) => { e.preventDefault(); console.log('Card payment submitted:', newCard); };
  const handleCryptoPayment = () => console.log('Crypto payment initiated');
  const handleUPIPayment = () => console.log('UPI payment initiated');
  const handleBankTransfer = () => console.log('Bank transfer initiated');

  return (
    <div className="text-white w-full space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack} className="text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-xl transition-all duration-200"><ArrowLeft className="w-6 h-6" /></Button>
            <div className="p-3 rounded-xl glass shine"><CreditCard className="w-8 h-8 text-cyan-400" /></div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">Payment <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Methods</span></h1>
              <p className="text-xl text-gray-300 mt-2">Choose your preferred payment method</p>
            </div>
          </div>
        </div>
      </div>
      <Card className="glass shine border-white/10 hover-scale-105 hover-glow-cyan">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-2">Payment Amount</h3>
            <p className="text-4xl font-bold text-white mb-2">₹2,500</p>
            <p className="text-white/60">Monthly Premium Payment</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paymentOptions.map((option) => (
          <Card key={option.id} className={`glass shine border-white/10 hover-scale-105 hover-glow-cyan cursor-pointer transition-all duration-300 ${selectedMethod === option.id ? 'ring-2 ring-blue-400/50' : ''}`} onClick={() => setSelectedMethod(option.id)}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${option.color}`}><option.icon className="w-6 h-6 text-white" /></div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">{option.name}</h3>
                  <p className="text-white/60 text-sm">{option.description}</p>
                </div>
                {selectedMethod === option.id && <CheckCircle className="w-6 h-6 text-blue-400" />}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedMethod === 'card' && (
        <Card className="glass shine border-white/10 hover-scale-105 hover-glow-cyan">
          <CardHeader><CardTitle className="flex items-center gap-2 text-white"><CreditCard className="w-5 h-5" />Credit/Debit Card Payment</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={handleCardSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2"><Label htmlFor="cardNumber" className="text-white">Card Number</Label><Input id="cardNumber" type="text" placeholder="1234 5678 9012 3456" value={newCard.cardNumber} onChange={(e) => setNewCard({...newCard, cardNumber: e.target.value})} className="mt-2 bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300 hover:bg-white/10" required /></div>
                <div><Label htmlFor="expiryDate" className="text-white">Expiry Date</Label><Input id="expiryDate" type="text" placeholder="MM/YY" value={newCard.expiryDate} onChange={(e) => setNewCard({...newCard, expiryDate: e.target.value})} className="mt-2 bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300 hover:bg-white/10" required /></div>
                <div><Label htmlFor="cvv" className="text-white">CVV</Label><Input id="cvv" type="text" placeholder="123" value={newCard.cvv} onChange={(e) => setNewCard({...newCard, cvv: e.target.value})} className="mt-2 bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300 hover:bg-white/10" required /></div>
                <div><Label htmlFor="cardholderName" className="text-white">Cardholder Name</Label><Input id="cardholderName" type="text" placeholder="John Doe" value={newCard.cardholderName} onChange={(e) => setNewCard({...newCard, cardholderName: e.target.value})} className="mt-2 bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300 hover:bg-white/10" required /></div>
                <div><Label htmlFor="zipCode" className="text-white">ZIP Code</Label><Input id="zipCode" type="text" placeholder="12345" value={newCard.zipCode} onChange={(e) => setNewCard({...newCard, zipCode: e.target.value})} className="mt-2 bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300 hover:bg-white/10" required /></div>
              </div>
              <div className="flex items-center gap-2 p-4 rounded-lg bg-white/5 border border-white/10"><Shield className="w-5 h-5 text-green-400" /><Lock className="w-5 h-5 text-green-400" /><span className="text-white/80 text-sm">Your payment is secured with 256-bit SSL encryption</span></div>
              <Button type="submit" className="w-full bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-medium h-12 transition-all duration-300 shadow-lg hover:shadow-xl"><CreditCard className="w-5 h-5 mr-2" />Pay ₹2,500 Now</Button>
            </form>
          </CardContent>
        </Card>
      )}

      {selectedMethod === 'crypto' && (
        <Card className="glass shine border-white/10 hover-scale-105 hover-glow-cyan">
          <CardHeader><CardTitle className="flex items-center gap-2 text-white"><Wallet className="w-5 h-5" />Cryptocurrency Payment</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="text-center p-6 rounded-lg bg-white/5 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-2">Pay with Cryptocurrency</h3>
                <p className="text-white/60 mb-4">Choose your preferred cryptocurrency</p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-center cursor-pointer hover:bg-white/10 transition-colors"><div className="w-8 h-8 mx-auto mb-2 rounded-full bg-orange-500/20 flex items-center justify-center"><span className="text-orange-400 font-bold text-sm">₿</span></div><p className="text-white text-sm">Bitcoin</p></div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-center cursor-pointer hover:bg-white/10 transition-colors"><div className="w-8 h-8 mx-auto mb-2 rounded-full bg-blue-500/20 flex items-center justify-center"><span className="text-blue-400 font-bold text-sm">Ξ</span></div><p className="text-white text-sm">Ethereum</p></div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-center cursor-pointer hover:bg-white/10 transition-colors"><div className="w-8 h-8 mx-auto mb-2 rounded-full bg-green-500/20 flex items-center justify-center"><span className="text-green-400 font-bold text-sm">$</span></div><p className="text-white text-sm">USDC</p></div>
                </div>
              </div>
              <Button onClick={handleCryptoPayment} className="w-full bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-medium h-12 transition-all duration-300 shadow-lg hover:shadow-xl"><Wallet className="w-5 h-5 mr-2" />Pay with Crypto</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedMethod === 'upi' && (
        <Card className="glass shine border-white/10 hover-scale-105 hover-glow-cyan">
          <CardHeader><CardTitle className="flex items-center gap-2 text-white"><Smartphone className="w-5 h-5" />UPI Payment</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="text-center p-6 rounded-lg bg-white/5 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-2">UPI Payment</h3>
                <p className="text-white/60 mb-4">Pay using your UPI ID or scan QR code</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10 text-center"><div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-blue-500/20 flex items-center justify-center"><Smartphone className="w-6 h-6 text-blue-400" /></div><p className="text-white text-sm">PhonePe</p></div>
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10 text-center"><div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-green-500/20 flex items-center justify-center"><Smartphone className="w-6 h-6 text-green-400" /></div><p className="text-white text-sm">Google Pay</p></div>
                </div>
              </div>
              <Button onClick={handleUPIPayment} className="w-full bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-medium h-12 transition-all duration-300 shadow-lg hover:shadow-xl"><Smartphone className="w-5 h-5 mr-2" />Pay with UPI</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedMethod === 'bank' && (
        <Card className="glass shine border-white/10 hover-scale-105 hover-glow-cyan">
          <CardHeader><CardTitle className="flex items-center gap-2 text-white"><Banknote className="w-5 h-5" />Bank Transfer</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="p-6 rounded-lg bg-white/5 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">Bank Transfer Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between"><span className="text-white/60">Bank Name:</span><span className="text-white">EthSure Insurance Bank</span></div>
                  <div className="flex justify-between"><span className="text-white/60">Account Number:</span><span className="text-white">1234567890</span></div>
                  <div className="flex justify-between"><span className="text-white/60">IFSC Code:</span><span className="text-white">ESIB0001234</span></div>
                  <div className="flex justify-between"><span className="text-white/60">Amount:</span><span className="text-white font-semibold">₹2,500</span></div>
                </div>
              </div>
              <Button onClick={handleBankTransfer} className="w-full bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-medium h-12 transition-all duration-300 shadow-lg hover:shadow-xl"><Banknote className="w-5 h-5 mr-2" />Initiate Bank Transfer</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
export default PaymentMethodContent;
