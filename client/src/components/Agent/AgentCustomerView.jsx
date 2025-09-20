import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, UserPlus, Clock, CheckCircle, Mail, Phone, MapPin, Calendar, Eye } from "lucide-react";
import CustomerDetailsModal from "./CustomerDetailsModal";
import AddCustomerModal from "./AddCustomerModal";

const AgentCustomerView = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [isAddCustomerModalOpen, setIsAddCustomerModalOpen] = useState(false);
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice.johnson@email.com",
      phone: "+1 (555) 123-4567",
      location: "New York, NY",
      policy: "Health Insurance Premium",
      premium: "Ξ0.15/month",
      status: "Active",
      joinDate: "2024-01-15",
      lastContact: "2024-01-20"
    },
    {
      id: 2,
      name: "Bob Chen",
      email: "bob.chen@email.com",
      phone: "+1 (555) 234-5678",
      location: "San Francisco, CA",
      policy: "Auto Insurance Comprehensive",
      premium: "Ξ0.08/month",
      status: "Active",
      joinDate: "2024-02-01",
      lastContact: "2024-01-18"
    },
    {
      id: 3,
      name: "Charlie Davis",
      email: "charlie.davis@email.com",
      phone: "+1 (555) 345-6789",
      location: "Chicago, IL",
      policy: "Property Insurance Standard",
      premium: "Ξ0.22/month",
      status: "Pending",
      joinDate: "2024-02-10",
      lastContact: "2024-02-10"
    },
    {
      id: 4,
      name: "Diana Smith",
      email: "diana.smith@email.com",
      phone: "+1 (555) 456-7890",
      location: "Miami, FL",
      policy: "Life Insurance",
      premium: "Ξ0.12/month",
      status: "Active",
      joinDate: "2024-01-25",
      lastContact: "2024-01-30"
    },
    {
      id: 5,
      name: "Eva Brown",
      email: "eva.brown@email.com",
      phone: "+1 (555) 567-8901",
      location: "Seattle, WA",
      policy: "Travel Insurance",
      premium: "Ξ0.05/month",
      status: "Active",
      joinDate: "2024-02-05",
      lastContact: "2024-02-08"
    }
  ]);

  const handleViewCustomer = (customer) => {
    setSelectedCustomer(customer);
    setIsCustomerModalOpen(true);
  };

  const handleAddCustomer = () => {
    setIsAddCustomerModalOpen(true);
  };

  const handleCustomerAdded = (newCustomer) => {
    setCustomers(prev => [...prev, newCustomer]);
  };

  const existingCustomers = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice.johnson@email.com",
      phone: "+1 (555) 123-4567",
      location: "New York, NY",
      policy: "Health Insurance Premium",
      premium: "Ξ0.15/month",
      status: "Active",
      joinDate: "2024-01-15",
      lastContact: "2024-01-20"
    },
    {
      id: 2,
      name: "Bob Chen",
      email: "bob.chen@email.com",
      phone: "+1 (555) 234-5678",
      location: "San Francisco, CA",
      policy: "Auto Insurance Comprehensive",
      premium: "Ξ0.08/month",
      status: "Active",
      joinDate: "2024-02-01",
      lastContact: "2024-01-18"
    },
    {
      id: 3,
      name: "Charlie Davis",
      email: "charlie.davis@email.com",
      phone: "+1 (555) 345-6789",
      location: "Chicago, IL",
      policy: "Property Insurance Standard",
      premium: "Ξ0.22/month",
      status: "Pending",
      joinDate: "2024-01-25",
      lastContact: "2024-01-25"
    }
  ];

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

  const getStatusColor = (status) => {
    switch (status) {
      case "Active": return "text-emerald-400 bg-emerald-400/20";
      case "Pending": return "text-amber-400 bg-amber-400/20";
      default: return "text-gray-400 bg-gray-700/50";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High": return "text-red-400 bg-red-400/20";
      case "Medium": return "text-amber-400 bg-amber-400/20";
      case "Low": return "text-green-400 bg-green-400/20";
      default: return "text-gray-400 bg-gray-700/50";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Customer Management</h1>
          <p className="text-white/70">Manage your existing customers and review new requests</p>
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
              <div className="p-3 rounded-full bg-gradient-to-r from-gray-600 to-gray-500">
                <Users className="w-6 h-6 text-white" />
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
              <div className="p-3 rounded-full bg-gradient-to-r from-gray-600 to-gray-500">
                <Clock className="w-6 h-6 text-white" />
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
              <div className="p-3 rounded-full bg-gradient-to-r from-gray-600 to-gray-500">
                <UserPlus className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Existing Customers */}
        <Card className="hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300">
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
        <Card className="hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300">
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
      
      {/* Add Customer Modal */}
      <AddCustomerModal
        isOpen={isAddCustomerModalOpen}
        onClose={() => setIsAddCustomerModalOpen(false)}
        onCustomerAdded={handleCustomerAdded}
      />
    </div>
  );
};

export default AgentCustomerView;
