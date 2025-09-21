import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Users, FileText, AlertCircle, CheckCircle, Clock, Wallet, TrendingUp, Building2, UserCheck, Eye, Edit, Trash2, Plus, Search, Filter, Download, Mail, Phone, MapPin, Calendar, DollarSign, Activity, Award, Target, BarChart3, Briefcase } from "lucide-react";

const CompanyContent = ({ currentView = 'overview' }) => {
  // Static data for different views
  const company = { name: "Insurance Admin", wallet: "0x1234...abcd", verified: true };
  
  const agentsData = [
    { 
      id: 1, 
      name: "Agent Smith", 
      email: "smith@ethsure.com", 
      phone: "+1-555-0123", 
      location: "New York, NY", 
      customers: 12, 
      status: "Active", 
      verified: true, 
      performance: "95%", 
      joinDate: "2023-01-15",
      totalPolicies: 45,
      totalClaims: 8,
      successRate: "98%"
    },
    { 
      id: 2, 
      name: "Agent Doe", 
      email: "doe@ethsure.com", 
      phone: "+1-555-0124", 
      location: "Los Angeles, CA", 
      customers: 9, 
      status: "Active", 
      verified: true, 
      performance: "88%", 
      joinDate: "2023-03-20",
      totalPolicies: 32,
      totalClaims: 5,
      successRate: "94%"
    },
    { 
      id: 3, 
      name: "Agent Johnson", 
      email: "johnson@ethsure.com", 
      phone: "+1-555-0125", 
      location: "Chicago, IL", 
      customers: 15, 
      status: "Pending", 
      verified: false, 
      performance: "92%", 
      joinDate: "2024-01-10",
      totalPolicies: 28,
      totalClaims: 3,
      successRate: "96%"
    },
    { 
      id: 4, 
      name: "Agent Brown", 
      email: "brown@ethsure.com", 
      phone: "+1-555-0126", 
      location: "Miami, FL", 
      customers: 7, 
      status: "Active", 
      verified: true, 
      performance: "91%", 
      joinDate: "2023-06-15",
      totalPolicies: 22,
      totalClaims: 4,
      successRate: "93%"
    }
  ];

  const customersData = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+1-555-1001",
      location: "New York, NY",
      policies: 3,
      totalPremium: "$2,400",
      status: "Active",
      verified: true,
      joinDate: "2023-02-15",
      lastPayment: "2024-01-15",
      agent: {
        name: "Agent Smith",
        email: "smith@ethsure.com",
        phone: "+1-555-0123",
        verified: true,
        performance: "95%"
      },
      customerPolicies: [
        {
          id: 1,
          policyNumber: "POL-2024-001",
          type: "Life Insurance",
          premium: "$200/month",
          coverage: "$100,000",
          status: "Active",
          startDate: "2024-01-01",
          endDate: "2025-01-01",
          verified: true
        },
        {
          id: 2,
          policyNumber: "POL-2024-004",
          type: "Health Insurance",
          premium: "$150/month",
          coverage: "$50,000",
          status: "Active",
          startDate: "2024-02-01",
          endDate: "2025-02-01",
          verified: true
        },
        {
          id: 3,
          policyNumber: "POL-2024-007",
          type: "Auto Insurance",
          premium: "$100/month",
          coverage: "$25,000",
          status: "Active",
          startDate: "2024-03-01",
          endDate: "2025-03-01",
          verified: true
        }
      ]
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@email.com",
      phone: "+1-555-1002",
      location: "Los Angeles, CA",
      policies: 2,
      totalPremium: "$1,800",
      status: "Active",
      verified: true,
      joinDate: "2023-04-20",
      lastPayment: "2024-01-10",
      agent: {
        name: "Agent Doe",
        email: "doe@ethsure.com",
        phone: "+1-555-0124",
        verified: true,
        performance: "88%"
      },
      customerPolicies: [
        {
          id: 2,
          policyNumber: "POL-2024-002",
          type: "Health Insurance",
          premium: "$150/month",
          coverage: "$50,000",
          status: "Active",
          startDate: "2024-01-15",
          endDate: "2025-01-15",
          verified: true
        },
        {
          id: 4,
          policyNumber: "POL-2024-005",
          type: "Home Insurance",
          premium: "$120/month",
          coverage: "$200,000",
          status: "Active",
          startDate: "2024-02-15",
          endDate: "2025-02-15",
          verified: true
        }
      ]
    },
    {
      id: 3,
      name: "Mike Wilson",
      email: "mike.wilson@email.com",
      phone: "+1-555-1003",
      location: "Chicago, IL",
      policies: 1,
      totalPremium: "$1,200",
      status: "Pending",
      verified: false,
      joinDate: "2024-01-05",
      lastPayment: "2024-01-05",
      agent: {
        name: "Agent Johnson",
        email: "johnson@ethsure.com",
        phone: "+1-555-0125",
        verified: false,
        performance: "92%"
      },
      customerPolicies: [
        {
          id: 3,
          policyNumber: "POL-2024-003",
          type: "Auto Insurance",
          premium: "$100/month",
          coverage: "$25,000",
          status: "Pending",
          startDate: "2024-02-01",
          endDate: "2025-02-01",
          verified: false
        }
      ]
    },
    {
      id: 4,
      name: "Sarah Brown",
      email: "sarah.brown@email.com",
      phone: "+1-555-1004",
      location: "Miami, FL",
      policies: 2,
      totalPremium: "$1,500",
      status: "Active",
      verified: true,
      joinDate: "2023-08-10",
      lastPayment: "2024-01-20",
      agent: {
        name: "Agent Brown",
        email: "brown@ethsure.com",
        phone: "+1-555-0126",
        verified: true,
        performance: "91%"
      },
      customerPolicies: [
        {
          id: 5,
          policyNumber: "POL-2024-006",
          type: "Life Insurance",
          premium: "$180/month",
          coverage: "$150,000",
          status: "Active",
          startDate: "2024-01-10",
          endDate: "2025-01-10",
          verified: true
        },
        {
          id: 6,
          policyNumber: "POL-2024-008",
          type: "Health Insurance",
          premium: "$120/month",
          coverage: "$75,000",
          status: "Active",
          startDate: "2024-02-10",
          endDate: "2025-02-10",
          verified: true
        }
      ]
    }
  ];

  const policiesData = [
    {
      id: 1,
      policyNumber: "POL-2024-001",
      policyName: "Premium Life Insurance Plan",
      type: "Life Insurance",
      description: "Comprehensive life insurance coverage with flexible premium options and guaranteed death benefits",
      premium: "$200/month",
      coverage: "$100,000",
      status: "Active",
      startDate: "2024-01-01",
      endDate: "2025-01-01",
      verified: true,
      customerCount: 1,
      totalCustomers: ["John Doe"],
      agent: "Agent Smith",
      features: ["Death Benefit", "Cash Value", "Flexible Premiums", "Term Life"],
      requirements: ["Medical Exam", "Age 18-65", "Income Verification"],
      claimsProcessed: 0,
      totalClaims: 0
    },
    {
      id: 2,
      policyNumber: "POL-2024-002",
      policyName: "Comprehensive Health Coverage",
      type: "Health Insurance",
      description: "Full health insurance coverage including hospitalization, surgery, and prescription drugs",
      premium: "$150/month",
      coverage: "$50,000",
      status: "Active",
      startDate: "2024-01-15",
      endDate: "2025-01-15",
      verified: true,
      customerCount: 2,
      totalCustomers: ["Jane Smith", "John Doe"],
      agent: "Agent Doe",
      features: ["Hospitalization", "Surgery Coverage", "Prescription Drugs", "Emergency Care"],
      requirements: ["Health Questionnaire", "Age 18-70", "No Pre-existing Conditions"],
      claimsProcessed: 1,
      totalClaims: 1
    },
    {
      id: 3,
      policyNumber: "POL-2024-003",
      policyName: "Auto Shield Protection",
      type: "Auto Insurance",
      description: "Complete auto insurance coverage including collision, comprehensive, and liability protection",
      premium: "$100/month",
      coverage: "$25,000",
      status: "Pending",
      startDate: "2024-02-01",
      endDate: "2025-02-01",
      verified: false,
      customerCount: 1,
      totalCustomers: ["Mike Wilson"],
      agent: "Agent Johnson",
      features: ["Collision Coverage", "Comprehensive", "Liability", "Roadside Assistance"],
      requirements: ["Valid Driver's License", "Vehicle Registration", "Clean Driving Record"],
      claimsProcessed: 0,
      totalClaims: 1
    },
    {
      id: 4,
      policyNumber: "POL-2024-004",
      policyName: "Home Protection Plus",
      type: "Home Insurance",
      description: "Comprehensive home insurance covering structure, contents, and liability protection",
      premium: "$120/month",
      coverage: "$200,000",
      status: "Active",
      startDate: "2024-02-15",
      endDate: "2025-02-15",
      verified: true,
      customerCount: 1,
      totalCustomers: ["Jane Smith"],
      agent: "Agent Doe",
      features: ["Structure Coverage", "Contents Protection", "Liability", "Natural Disasters"],
      requirements: ["Property Ownership", "Home Inspection", "Security System"],
      claimsProcessed: 0,
      totalClaims: 0
    },
    {
      id: 5,
      policyNumber: "POL-2024-005",
      policyName: "Family Life Assurance",
      type: "Life Insurance",
      description: "Family-focused life insurance with additional coverage for children and spouse",
      premium: "$180/month",
      coverage: "$150,000",
      status: "Active",
      startDate: "2024-01-10",
      endDate: "2025-01-10",
      verified: true,
      customerCount: 1,
      totalCustomers: ["Sarah Brown"],
      agent: "Agent Brown",
      features: ["Family Coverage", "Child Protection", "Spouse Benefits", "Term Life"],
      requirements: ["Medical Exam", "Family Information", "Income Verification"],
      claimsProcessed: 0,
      totalClaims: 0
    },
    {
      id: 6,
      policyNumber: "POL-2024-006",
      policyName: "Senior Health Plus",
      type: "Health Insurance",
      description: "Specialized health insurance for seniors with enhanced coverage and benefits",
      premium: "$120/month",
      coverage: "$75,000",
      status: "Active",
      startDate: "2024-02-10",
      endDate: "2025-02-10",
      verified: true,
      customerCount: 1,
      totalCustomers: ["Sarah Brown"],
      agent: "Agent Brown",
      features: ["Senior Benefits", "Prescription Coverage", "Preventive Care", "Chronic Disease Management"],
      requirements: ["Age 65+", "Health Assessment", "Medicare Supplement"],
      claimsProcessed: 0,
      totalClaims: 0
    }
  ];

  const claimsData = [
    {
      id: 1,
      claimNumber: "CLM-2024-001",
      customer: "John Doe",
      agent: "Agent Smith",
      policy: "POL-2024-001",
      type: "Life Insurance",
      amount: "$10,000",
      status: "Approved",
      submittedDate: "2024-01-10",
      processedDate: "2024-01-15",
      verified: true
    },
    {
      id: 2,
      claimNumber: "CLM-2024-002",
      customer: "Jane Smith",
      agent: "Agent Doe",
      policy: "POL-2024-002",
      type: "Health Insurance",
      amount: "$5,000",
      status: "Pending",
      submittedDate: "2024-01-20",
      processedDate: null,
      verified: false
    },
    {
      id: 3,
      claimNumber: "CLM-2024-003",
      customer: "Mike Wilson",
      agent: "Agent Johnson",
      policy: "POL-2024-003",
      type: "Auto Insurance",
      amount: "$2,500",
      status: "Rejected",
      submittedDate: "2024-01-25",
      processedDate: "2024-01-30",
      verified: true
    }
  ];

  const overviewStats = [
    { title: "Total Policies", value: "120", icon: Shield, change: "+5 this month", color: "from-gray-600 to-gray-500" },
    { title: "Active Agents", value: "8", icon: Users, change: "All verified", color: "from-gray-600 to-gray-500" },
    { title: "Total Claims", value: "45", icon: FileText, change: "12 pending", color: "from-gray-600 to-gray-500" },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg glass"><Building2 className="w-6 h-6 text-white" /></div>
              <div>
              <h1 className="text-3xl lg:text-4xl font-bold leading-tight">Company <span className="gradient-text">Overview</span></h1>
                <p className="text-xl text-gray-300">Welcome back, {company.name}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-emerald-500/30">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-sm text-emerald-400 font-medium">Verified Company</span>
            </div>
            <Button variant="outline" className="flex items-center gap-2 glass">
              <Wallet className="w-4 h-4" />{company.wallet}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {overviewStats.map((stat, index) => (
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

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <Card className="glass shine hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-bold"><BarChart3 className="w-5 h-5" />Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                <span className="text-white/70">Total Revenue</span>
                <span className="text-emerald-400 font-bold">$125,000</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                <span className="text-white/70">Active Policies</span>
                <span className="text-blue-400 font-bold">120</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                <span className="text-white/70">Pending Claims</span>
                <span className="text-amber-400 font-bold">12</span>
              </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass shine hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-bold"><Activity className="w-5 h-5" />Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-white/70 text-sm">New policy created by Agent Smith</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
                <div className="w-2 h-2 rounded-full bg-blue-400" />
                <span className="text-white/70 text-sm">Claim approved for John Doe</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
                <div className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="text-white/70 text-sm">New agent verification pending</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderAgents = () => (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg glass"><Users className="w-6 h-6 text-white" /></div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold leading-tight">Agent <span className="gradient-text">Management</span></h1>
              <p className="text-xl text-gray-300">Manage and monitor your agents</p>
            </div>
          </div>
        </div>
                        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2 glass">
            <Search className="w-4 h-4" />Search
          </Button>
          <Button className="flex items-center gap-2 glass">
            <Plus className="w-4 h-4" />Add Agent
          </Button>
                        </div>
                      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {agentsData.map((agent) => (
          <Card key={agent.id} className="glass shine hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h3 className="text-white font-bold text-lg">{agent.name}</h3>
                      <div className="flex items-center gap-2">
                      <Badge variant={agent.verified ? "default" : "secondary"} className={agent.verified ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-amber-500/20 text-amber-400 border-amber-500/30"}>
                        {agent.verified ? <CheckCircle className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
                        {agent.verified ? "Verified" : "Pending"}
                      </Badge>
                      <Badge variant="outline" className={agent.status === 'Active' ? "border-emerald-500/30 text-emerald-400" : "border-amber-500/30 text-amber-400"}>
                        {agent.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline" className="p-2">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="p-2">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-white/70">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{agent.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/70">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{agent.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/70">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{agent.location}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">{agent.customers}</p>
                    <p className="text-xs text-white/60">Customers</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">{agent.performance}</p>
                    <p className="text-xs text-white/60">Performance</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Policies</span>
                    <span className="text-white">{agent.totalPolicies}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Claims</span>
                    <span className="text-white">{agent.totalClaims}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Success Rate</span>
                    <span className="text-emerald-400 font-medium">{agent.successRate}</span>
                      </div>
                    </div>

                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1">View Details</Button>
                  <Button size="sm" variant="outline">Contact</Button>
                </div>
                </div>
              </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );

  const renderCustomers = () => (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg glass"><Briefcase className="w-6 h-6 text-white" /></div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold leading-tight">Customer <span className="gradient-text">Management</span></h1>
              <p className="text-xl text-gray-300">View detailed customer information, agents, and policies</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2 glass">
            <Filter className="w-4 h-4" />Filter
          </Button>
          <Button className="flex items-center gap-2 glass">
            <Download className="w-4 h-4" />Export
          </Button>
        </div>
          </div>

          <div className="space-y-6">
        {customersData.map((customer) => (
          <Card key={customer.id} className="glass shine hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300">
            <CardContent className="p-6">
              {/* Customer Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 flex items-center justify-center text-white font-bold text-xl">
                    {customer.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-white font-bold text-xl">{customer.name}</h3>
                      <Badge variant={customer.verified ? "default" : "secondary"} className={customer.verified ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-amber-500/20 text-amber-400 border-amber-500/30"}>
                        {customer.verified ? <CheckCircle className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
                        {customer.verified ? "Verified" : "Pending"}
                      </Badge>
                      <Badge variant="outline" className={customer.status === 'Active' ? "border-emerald-500/30 text-emerald-400" : "border-amber-500/30 text-amber-400"}>
                        {customer.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-6 text-white/70 text-sm">
                      <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {customer.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {customer.phone}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {customer.location}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right space-y-1">
                    <p className="text-white font-bold text-xl">{customer.totalPremium}</p>
                    <p className="text-white/60 text-sm">Total Premium</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-white font-bold text-xl">{customer.policies}</p>
                    <p className="text-white/60 text-sm">Policies</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Agent Information */}
              <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10">
                <h4 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
                  <UserCheck className="w-5 h-5" />
                  Assigned Agent
                </h4>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                      {customer.agent.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h5 className="text-white font-bold">{customer.agent.name}</h5>
                        <Badge variant={customer.agent.verified ? "default" : "secondary"} className={customer.agent.verified ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-amber-500/20 text-amber-400 border-amber-500/30"}>
                          {customer.agent.verified ? "Verified" : "Pending"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-white/70 text-sm">
                        <span>{customer.agent.email}</span>
                        <span>{customer.agent.phone}</span>
                        <span>Performance: {customer.agent.performance}</span>
                      </div>
                    </div>
                      </div>
                  <Button size="sm" variant="outline">
                    Contact Agent
                  </Button>
                      </div>
                    </div>

              {/* Customer Policies */}
              <div className="space-y-4">
                <h4 className="text-white font-bold text-lg flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Customer Policies ({customer.customerPolicies.length})
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {customer.customerPolicies.map((policy) => (
                    <Card key={policy.id} className="bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h6 className="text-white font-bold text-sm">{policy.policyNumber}</h6>
                            <Badge variant={policy.verified ? "default" : "secondary"} className={policy.verified ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-amber-500/20 text-amber-400 border-amber-500/30"}>
                              {policy.verified ? "Verified" : "Pending"}
                            </Badge>
                          </div>
                          <div className="space-y-1">
                            <p className="text-white font-medium">{policy.type}</p>
                            <p className="text-white/70 text-sm">{policy.premium}</p>
                            <p className="text-emerald-400 font-medium text-sm">{policy.coverage}</p>
                          </div>
                          <div className="flex items-center justify-between text-xs text-white/60">
                            <span>Start: {policy.startDate}</span>
                            <span>End: {policy.endDate}</span>
                          </div>
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline" className="flex-1 text-xs">
                              <Eye className="w-3 h-3 mr-1" />
                              View
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1 text-xs">
                              <Edit className="w-3 h-3 mr-1" />
                              Edit
                            </Button>
                          </div>
                </div>
              </CardContent>
            </Card>
                  ))}
                </div>
              </div>

              {/* Customer Footer */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-sm text-white/70">
                <div className="flex items-center gap-6">
                  <span>Joined: {customer.joinDate}</span>
                  <span>Last Payment: {customer.lastPayment}</span>
                      </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    View Full Profile
                  </Button>
                  <Button size="sm" variant="outline">
                    Payment History
                  </Button>
                      </div>
                    </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderPolicies = () => (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg glass"><FileText className="w-6 h-6 text-white" /></div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold leading-tight">Policy <span className="gradient-text">Management</span></h1>
              <p className="text-xl text-gray-300">View and manage insurance policies</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2 glass">
            <Search className="w-4 h-4" />Search
          </Button>
          <Button className="flex items-center gap-2 glass">
            <Plus className="w-4 h-4" />New Policy
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {policiesData.map((policy) => (
          <Card key={policy.id} className="glass shine hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-white font-bold text-lg">{policy.policyNumber}</h3>
                    <Badge variant={policy.verified ? "default" : "secondary"} className={policy.verified ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-amber-500/20 text-amber-400 border-amber-500/30"}>
                      {policy.verified ? <CheckCircle className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
                      {policy.verified ? "Verified" : "Pending"}
                    </Badge>
                    <Badge variant="outline" className={policy.status === 'Active' ? "border-emerald-500/30 text-emerald-400" : "border-amber-500/30 text-amber-400"}>
                      {policy.status}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-white/70">Customer: {policy.customer}</p>
                    <p className="text-white/70">Agent: {policy.agent}</p>
                    <p className="text-white/70">Type: {policy.type}</p>
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <div className="space-y-1">
                    <p className="text-white font-bold text-lg">{policy.premium}</p>
                    <p className="text-white/60 text-sm">Monthly Premium</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-emerald-400 font-bold text-lg">{policy.coverage}</p>
                    <p className="text-white/60 text-sm">Coverage Amount</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-sm text-white/70">
                <div className="flex items-center gap-4">
                  <span>Start: {policy.startDate}</span>
                  <span>End: {policy.endDate}</span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
                </div>
              </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );

  const renderClaims = () => (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg glass"><FileText className="w-6 h-6 text-white" /></div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold leading-tight">Claims <span className="gradient-text">Management</span></h1>
              <p className="text-xl text-gray-300">Review and process insurance claims</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2 glass">
            <Filter className="w-4 h-4" />Filter
          </Button>
          <Button className="flex items-center gap-2 glass">
            <Download className="w-4 h-4" />Export
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {claimsData.map((claim) => (
          <Card key={claim.id} className="glass shine hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-white font-bold text-lg">{claim.claimNumber}</h3>
                    <Badge variant={claim.verified ? "default" : "secondary"} className={claim.verified ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-amber-500/20 text-amber-400 border-amber-500/30"}>
                      {claim.verified ? <CheckCircle className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
                      {claim.verified ? "Verified" : "Pending"}
                    </Badge>
                    <Badge variant="outline" className={
                      claim.status === 'Approved' ? "border-emerald-500/30 text-emerald-400" : 
                      claim.status === 'Pending' ? "border-amber-500/30 text-amber-400" : 
                      "border-red-500/30 text-red-400"
                    }>
                      {claim.status}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-white/70">Customer: {claim.customer}</p>
                    <p className="text-white/70">Agent: {claim.agent}</p>
                    <p className="text-white/70">Policy: {claim.policy}</p>
                    <p className="text-white/70">Type: {claim.type}</p>
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <div className="space-y-1">
                    <p className="text-white font-bold text-lg">{claim.amount}</p>
                    <p className="text-white/60 text-sm">Claim Amount</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-white/70 text-sm">Submitted: {claim.submittedDate}</p>
                    {claim.processedDate && <p className="text-white/70 text-sm">Processed: {claim.processedDate}</p>}
          </div>
        </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4" />
                  </Button>
                  {claim.status === 'Pending' && (
                    <>
                      <Button size="sm" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30">
                        Approve
                      </Button>
                      <Button size="sm" variant="destructive">
                        Reject
                      </Button>
                    </>
                  )}
                </div>
                <div className="text-sm text-white/70">
                  {claim.status === 'Approved' && <span className="text-emerald-400">✓ Processed</span>}
                  {claim.status === 'Rejected' && <span className="text-red-400">✗ Rejected</span>}
                  {claim.status === 'Pending' && <span className="text-amber-400">⏳ Under Review</span>}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentView) {
      case 'overview':
        return renderOverview();
      case 'agents':
        return renderAgents();
      case 'customers':
        return renderCustomers();
      case 'policies':
        return renderPolicies();
      case 'claims':
        return renderClaims();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen text-white w-full relative overflow-hidden">
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-40" />
      <div className="absolute -top-24 -right-24 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-gray-500/20 via-gray-400/10 to-gray-500/20 blur-3xl" />
      <div className="relative z-10">
        {renderContent()}
      </div>
    </div>
  );
};

export default CompanyContent;