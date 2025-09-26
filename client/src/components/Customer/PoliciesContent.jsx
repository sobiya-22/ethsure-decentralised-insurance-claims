import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, FileText, Calendar, DollarSign, User, Phone, Mail, CheckCircle, Download, Eye, CreditCard, BarChart3 } from 'lucide-react';
import { getStatusColor, getTypeColor, defaultPolicies } from '@/constants/customerConstants';

const PoliciesContent = () => {
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const policies = defaultPolicies;
  const stats = [
    { title: "Total Policies", value: policies.length.toString(), icon: Shield, color: "from-emerald-500/20 to-emerald-400/20", iconColor: "text-emerald-400" },
    { title: "Active Coverage", value: "₹50,000", icon: DollarSign, color: "from-blue-500/20 to-blue-400/20", iconColor: "text-blue-400" },
    { title: "Monthly Premium", value: "₹120", icon: CreditCard, color: "from-purple-500/20 to-purple-400/20", iconColor: "text-purple-400" },
    { title: "Claims This Year", value: "2", icon: FileText, color: "from-amber-500/20 to-amber-400/20", iconColor: "text-amber-400" }
  ];

  return (
    <div className="text-white w-full space-y-8 pt-20">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl glass shine"><Shield className="w-8 h-8 text-cyan-400" /></div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold leading-tight">My <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Policies</span></h1>
              <p className="text-xl text-gray-300 mt-2">Manage and view all your insurance policies</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="glass shine border-white/10 hover-scale-105 hover-glow-cyan group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div><p className="text-white/60 text-sm">{stat.title}</p><p className="text-2xl font-bold text-white">{stat.value}</p></div>
                <div className={`p-3 rounded-full bg-gradient-to-r ${stat.color} group-hover:scale-110 transition-transform duration-200`}><stat.icon className={`w-6 h-6 ${stat.iconColor}`} /></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-6">
        {policies.map((policy) => (
          <Card key={policy.id} className="glass shine border-white/10 hover-scale-105 hover-glow-cyan">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-gray-500/20 to-gray-500/20"><Shield className="w-6 h-6 text-gray-400" /></div>
                  <div><CardTitle className="text-2xl font-bold text-white">{policy.name}</CardTitle><p className="text-white/60">Policy #{policy.id}</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(policy.type)}`}>{policy.type}</Badge>
                  <Badge className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(policy.status)}`}>{policy.status}</Badge>
                  <Button variant="outline" onClick={() => setSelectedPolicy(selectedPolicy === policy.id ? null : policy.id)} className="hover:bg-white/10">{selectedPolicy === policy.id ? 'Hide Details' : 'View Details'}</Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="space-y-2"><div className="flex items-center gap-2"><DollarSign className="w-4 h-4 text-white/60" /><span className="text-white/60 text-sm">Premium</span></div><p className="text-white font-semibold text-lg">{policy.premium}/month</p></div>
                <div className="space-y-2"><div className="flex items-center gap-2"><Shield className="w-4 h-4 text-white/60" /><span className="text-white/60 text-sm">Coverage</span></div><p className="text-white font-semibold text-lg">{policy.coverage}</p></div>
                <div className="space-y-2"><div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-white/60" /><span className="text-white/60 text-sm">Valid Until</span></div><p className="text-white font-semibold text-lg">{policy.endDate}</p></div>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10 mb-6">
                <h4 className="text-white font-semibold mb-3 flex items-center gap-2"><User className="w-4 h-4" />Agent Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2"><User className="w-4 h-4 text-white/60" /><span className="text-white/60 text-sm">Name:</span><span className="text-white font-medium">{policy.agent.name}</span></div>
                  <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-white/60" /><span className="text-white/60 text-sm">Email:</span><span className="text-white font-medium">{policy.agent.email}</span></div>
                  <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-white/60" /><span className="text-white/60 text-sm">Phone:</span><span className="text-white font-medium">{policy.agent.phone}</span></div>
                </div>
              </div>

              {selectedPolicy === policy.id && (
                <div className="space-y-6 animate-fadeInUp">
                  <div><h4 className="text-white font-semibold mb-3 flex items-center gap-2"><CheckCircle className="w-4 h-4" />Policy Benefits</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {policy.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-2 p-3 rounded-lg bg-white/5 border border-white/10">
                          <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" /><span className="text-white text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div><h4 className="text-white font-semibold mb-3 flex items-center gap-2"><FileText className="w-4 h-4" />Recent Claims</h4>
                    <div className="space-y-3">
                      {policy.claims.map((claim, index) => (
                        <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                          <div className="flex items-center gap-4">
                            <div className="p-2 rounded-lg bg-gradient-to-r from-gray-500/20 to-gray-500/20"><FileText className="w-4 h-4 text-gray-400" /></div>
                            <div><p className="text-white font-medium">{claim.id} - {claim.description}</p><p className="text-white/60 text-sm">{claim.date} • {claim.amount}</p></div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(claim.status)}`}>{claim.status}</Badge>
                            <Button size="sm" variant="outline"><Eye className="w-4 h-4 mr-1" />View</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div><h4 className="text-white font-semibold mb-3 flex items-center gap-2"><Download className="w-4 h-4" />Policy Documents</h4>
                    <div className="space-y-3">
                      {policy.documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                          <div className="flex items-center gap-4">
                            <div className="p-2 rounded-lg bg-gradient-to-r from-gray-500/20 to-gray-500/20"><FileText className="w-4 h-4 text-gray-400" /></div>
                            <div><p className="text-white font-medium">{doc.name}</p><p className="text-white/60 text-sm">{doc.type} • Uploaded {doc.uploaded}</p></div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(doc.status)}`}>{doc.status}</Badge>
                            <Button size="sm" variant="outline"><Download className="w-4 h-4 mr-1" />Download</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-4 pt-4 border-t border-white/10">
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"><CreditCard className="w-4 h-4 mr-2" />Pay Premium</Button>
                    <Button variant="outline" className="hover:bg-white/10"><FileText className="w-4 h-4 mr-2" />Submit Claim</Button>
                    <Button variant="outline" className="hover:bg-white/10"><BarChart3 className="w-4 h-4 mr-2" />View Analytics</Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {policies.length === 0 && (
        <Card className="glass shine border-white/10 text-center py-12">
          <CardContent>
            <div className="p-6 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 w-24 h-24 mx-auto mb-6 flex items-center justify-center"><Shield className="w-12 h-12 text-blue-400" /></div>
            <h3 className="text-2xl font-bold text-white mb-4">No Policies Found</h3>
            <p className="text-white/60 mb-6">You don't have any active insurance policies yet.</p>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"><Shield className="w-4 h-4 mr-2" />Get Your First Policy</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
export default PoliciesContent;
