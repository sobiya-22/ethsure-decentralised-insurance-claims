import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FileText, Clock, CheckCircle, AlertTriangle, Eye, Download, MessageSquare, Calendar, DollarSign, User } from "lucide-react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { defaultAgentUser, getAgentSidebarItems, getAgentCurrentView, getStatusColor, getPriorityColor } from "@/constants/agentConstants";

const AgentClaimsView = ({ withLayout = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const claims = [
    { id: "#CL-2024-001", customer: "Alice Johnson", customerEmail: "alice.johnson@email.com", amount: "Ξ0.25", status: "Under Review", priority: "High", type: "Health", submittedDate: "2024-01-20", lastUpdated: "2024-01-22", description: "Emergency room visit for chest pain", documents: ["Medical Report", "Hospital Bill", "Insurance Card"], estimatedProcessingTime: "3-5 business days" },
    { id: "#CL-2024-002", customer: "Bob Chen", customerEmail: "bob.chen@email.com", amount: "Ξ0.18", status: "Documentation Pending", priority: "Medium", type: "Auto", submittedDate: "2024-01-18", lastUpdated: "2024-01-21", description: "Vehicle damage from collision", documents: ["Police Report", "Repair Estimate"], estimatedProcessingTime: "5-7 business days" },
    { id: "#CL-2024-003", customer: "Charlie Davis", customerEmail: "charlie.davis@email.com", amount: "Ξ0.35", status: "Ready for Approval", priority: "High", type: "Property", submittedDate: "2024-01-15", lastUpdated: "2024-01-23", description: "Water damage to basement", documents: ["Damage Assessment", "Repair Quotes", "Photos"], estimatedProcessingTime: "2-3 business days" },
    { id: "#CL-2024-004", customer: "Diana Rodriguez", customerEmail: "diana.rodriguez@email.com", amount: "Ξ0.12", status: "Approved", priority: "Low", type: "Health", submittedDate: "2024-01-10", lastUpdated: "2024-01-24", description: "Routine dental procedure", documents: ["Dental Report", "Receipt"], estimatedProcessingTime: "Completed" }
  ];


  const getTypeColor = (type) => {
    switch (type) {
      case "Health": return "text-gray-300 bg-gray-700/50";
      case "Auto": return "text-gray-300 bg-gray-700/50";
      case "Property": return "text-gray-300 bg-gray-700/50";
      case "Life": return "text-gray-300 bg-gray-700/50";
      default: return "text-gray-400 bg-gray-700/50";
    }
  };

  const stats = [
    { title: "Total Claims", value: claims.length.toString(), icon: FileText, color: "from-blue-500/20 to-blue-400/20", iconColor: "text-blue-400" },
    { title: "Under Review", value: claims.filter(c => c.status === "Under Review").length.toString(), icon: Clock, color: "from-amber-500/20 to-amber-400/20", iconColor: "text-amber-400" },
    { title: "Ready for Approval", value: claims.filter(c => c.status === "Ready for Approval").length.toString(), icon: CheckCircle, color: "from-purple-500/20 to-purple-400/20", iconColor: "text-purple-400" },
    { title: "Approved", value: claims.filter(c => c.status === "Approved").length.toString(), icon: CheckCircle, color: "from-emerald-500/20 to-emerald-400/20", iconColor: "text-emerald-400" }
  ];

  const user = defaultAgentUser;
  const sidebarItems = getAgentSidebarItems(navigate);
  const getCurrentView = () => getAgentCurrentView(location);

  const content = (
    <div className="space-y-6 px-3 xs:px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg glass"><FileText className="w-6 h-6 text-white" /></div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold leading-tight"><span className="text-white">Claims</span> <span className="gradient-text">Management</span></h1>
              <p className="text-xl text-gray-300">Review and process insurance claims for your customers</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-sm text-emerald-400 font-medium">Verified Agent</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="group hover:scale-105 transition-transform duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full bg-gradient-to-r ${stat.color}`}>
                  <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="hover:border-blue-400/50 transition-all duration-300">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 font-bold"><FileText className="w-5 h-5 font-bold" />All Claims</CardTitle>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm">Export Report</Button>
              <Button size="sm">New Claim</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {claims.map((claim) => (
              <div key={claim.id} className="p-6 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{claim.id}</h3>
                    <p className="text-white/70">{claim.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(claim.status)}`}>{claim.status}</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(claim.priority)}`}>{claim.priority}</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(claim.type)}`}>{claim.type}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-white/60" />
                    <div>
                      <p className="text-white/60 text-sm">Customer</p>
                      <p className="text-white font-medium">{claim.customer}</p>
                      <p className="text-white/60 text-xs">{claim.customerEmail}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-white/60" />
                    <div>
                      <p className="text-white/60 text-sm">Amount</p>
                      <p className="text-white font-medium text-lg">{claim.amount}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-white/60" />
                    <div>
                      <p className="text-white/60 text-sm">Submitted</p>
                      <p className="text-white font-medium">{claim.submittedDate}</p>
                      <p className="text-white/60 text-xs">Updated: {claim.lastUpdated}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-white/60 text-sm mb-2">Documents ({claim.documents.length})</p>
                  <div className="flex flex-wrap gap-2">
                    {claim.documents.map((doc, index) => (
                      <span key={index} className="px-2 py-1 rounded bg-white/10 text-white/80 text-sm">{doc}</span>
                    ))}
                  </div>
                </div>

                <div className="mb-4 p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-white/60" />
                    <span className="text-white/60 text-sm">Estimated Processing Time:</span>
                    <span className="text-white font-medium">{claim.estimatedProcessingTime}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button size="sm" variant="outline" className="flex items-center gap-2"><Eye className="w-4 h-4" />View Details</Button>
                  <Button size="sm" variant="outline" className="flex items-center gap-2"><Download className="w-4 h-4" />Download Docs</Button>
                  <Button size="sm" variant="outline" className="flex items-center gap-2"><MessageSquare className="w-4 h-4" />Contact Customer</Button>
                  {claim.status === "Ready for Approval" && (
                    <Button size="sm" className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">Approve Claim</Button>
                  )}
                  {claim.status === "Under Review" && (
                    <Button size="sm" className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700">Request More Info</Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  if (withLayout) {
    return (
      <DashboardLayout 
        sidebarItems={sidebarItems}
        user={user}
        currentView={getCurrentView()}
        fullPageView={false}
      >
        {content}
      </DashboardLayout>
    );
  }

  return content;
};

export default AgentClaimsView;