import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, UserPlus, Clock, Mail, Phone, MapPin, Calendar, Eye } from "lucide-react";
import CustomerDetailsModal from "./CustomerDetailsModal";
import DashboardLayout from "@/layouts/DashboardLayout";
import { defaultAgentUser, getAgentSidebarItems, getAgentCurrentView, defaultCustomers, getStatusColor, getPriorityColor } from "@/constants/agentConstants";

const PolicyManagement = ({ withLayout = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [customers, setCustomers] = useState(defaultCustomers);

  const handleViewCustomer = (customer) => {
    setSelectedCustomer(customer);
    setIsCustomerModalOpen(true);
  };

  const handleAddCustomer = () => {
    navigate('/agent/add-customer');
  };


  const existingCustomers = defaultCustomers.slice(0, 3);

  const waitingCustomers = [
    {
      id: 4,
      name: "Diana Rodriguez",
      email: "diana.rodriguez@email.com",
      phone: "+1 (555) 456-7890",
      location: "Miami, FL",
      requestedPolicy: "Life Insurance Premium",
      estimatedPremium: "Ξ0.12/month",
      requestDate: "2024-01-22",
      priority: "High"
    },
    {
      id: 5,
      name: "Ethan Wilson",
      email: "ethan.wilson@email.com",
      phone: "+1 (555) 567-8901",
      location: "Seattle, WA",
      requestedPolicy: "Health Insurance Basic",
      estimatedPremium: "Ξ0.10/month",
      requestDate: "2024-01-23",
      priority: "Medium"
    },
    {
      id: 6,
      name: "Fiona Brown",
      email: "fiona.brown@email.com",
      phone: "+1 (555) 678-9012",
      location: "Austin, TX",
      requestedPolicy: "Auto Insurance Standard",
      estimatedPremium: "Ξ0.06/month",
      requestDate: "2024-01-24",
      priority: "Low"
    }
  ];


  const user = defaultAgentUser;
  const sidebarItems = getAgentSidebarItems(navigate);
  const getCurrentView = () => getAgentCurrentView(location);

  const content = (
    <div className="space-y-6 px-3 xs:px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg glass"><Users className="w-6 h-6 text-white" /></div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold leading-tight"><span className="text-white">Customer</span> <span className="gradient-text">Management</span></h1>
              <p className="text-xl text-gray-300">Manage your existing customers and review new requests</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-sm text-emerald-400 font-medium">Verified Agent</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="group hover:scale-105 transition-transform duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Active Customers</p>
                <p className="text-2xl font-bold text-white">{customers.filter(c => c.status === 'Active').length}</p>
              </div>
              <div className="p-3 rounded-full bg-gradient-to-r from-emerald-500/20 to-emerald-400/20">
                <Users className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:scale-105 transition-transform duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Pending Requests</p>
                <p className="text-2xl font-bold text-white">{waitingCustomers.length}</p>
              </div>
              <div className="p-3 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-400/20">
                <Clock className="w-6 h-6 text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:scale-105 transition-transform duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Total Customers</p>
                <p className="text-2xl font-bold text-white">{customers.length + waitingCustomers.length}</p>
              </div>
              <div className="p-3 rounded-full bg-gradient-to-r from-blue-500/20 to-blue-400/20">
                <UserPlus className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Existing Customers */}
        <Card className="hover:border-blue-400/50 transition-all duration-300">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 font-bold">
                <Users className="w-5 h-5 font-bold" />
                Existing Customers
              </CardTitle>
              <Button 
                variant="secondary" 
                size="sm"
                onClick={handleAddCustomer}
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Add Customer
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customers.map((customer) => (
                <div key={customer.id} className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-white">{customer.name}</h3>
                      <p className="text-white/70 text-sm">{customer.policy}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
                        {customer.status}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-6 w-6"
                        onClick={() => handleViewCustomer(customer)}
                      >
                        <Eye className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <Mail className="w-4 h-4" />
                      <span className="truncate">{customer.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <Phone className="w-4 h-4" />
                      <span>{customer.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span className="truncate">{customer.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{customer.joinDate}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/60 text-sm">Premium</p>
                      <p className="text-white font-medium">{customer.premium}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Contact</Button>
                      <Button size="sm">View Details</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Waiting Customers */}
        <Card className="hover:border-blue-400/50 transition-all duration-300">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 font-bold">
                <Clock className="w-5 h-5 font-bold" />
                Waiting for Assignment
              </CardTitle>
              <Button variant="secondary" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {waitingCustomers.map((customer) => (
                <div key={customer.id} className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-white">{customer.name}</h3>
                      <p className="text-white/70 text-sm">{customer.requestedPolicy}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(customer.priority)}`}>
                      {customer.priority} Priority
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <Mail className="w-4 h-4" />
                      <span className="truncate">{customer.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <Phone className="w-4 h-4" />
                      <span>{customer.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span className="truncate">{customer.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{customer.requestDate}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/60 text-sm">Estimated Premium</p>
                      <p className="text-white font-medium">{customer.estimatedPremium}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Decline</Button>
                      <Button size="sm" className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700">
                        Accept
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Details Modal */}
      <CustomerDetailsModal
        customer={selectedCustomer}
        isOpen={isCustomerModalOpen}
        onClose={() => setIsCustomerModalOpen(false)}
      />
      
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

export default PolicyManagement;
