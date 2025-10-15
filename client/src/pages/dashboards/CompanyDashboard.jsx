import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardLayout from '@/layouts/DashboardLayout';
import CompanyContent from '@/components/Company/CompanyContent';
import { getCompanySidebarItems, getCompanyCurrentView } from '@/constants/dashboardConstants';
import { getCompany } from '@/services/companyAPI';
import { FullPageLoader } from '@/components/ui/Loader';

const CompanyDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentView, setCurrentView] = useState('overview');
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch company data from database
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await getCompany(); // No wallet address = get first company
        console.log("Company data response:", response);
        // Get the first company since there's only one in the database
        const companyData = response.data?.data?.[0];
        setCompany(companyData);
      } catch (error) {
        console.error("Error fetching company data:", error);
        // Fallback to default company data if API fails
        setCompany({
          company_name: "EthSure Insurance",
          wallet_address: "0x1234567890abcdef1234567890abcdef12345678",
          company_email: "company@ethsure.com"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, []);

  // Handle navigation from other components that want to go to specific views
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const view = urlParams.get('view');
    if (view === 'agents') {
      setCurrentView('agents');
    } else if (view === 'customers') {
      setCurrentView('customers');
    } else if (view === 'policies') {
      setCurrentView('policies');
    } else if (view === 'claims') {
      setCurrentView('claims');
    }
  }, [location.search]);

  if (loading) {
    return <FullPageLoader message="Loading company dashboard..." />;
  }

  // Create user object with real company data
  const user = {
    name: company?.company_name || "Insurance Admin",
    role: "Company",
    email: company?.company_email || company?.user?.email || "company@ethsure.com",
    wallet: company?.wallet_address || "0x1234...abcd",
    company: company?.company_name || "EthSure Insurance"
  };

  const sidebarItems = getCompanySidebarItems(navigate, setCurrentView);

  const getCurrentView = () => {
    const path = location.pathname;
    if (path.includes('/agent')) return 'agents';
    if (path.includes('/customer')) return 'customers';
    if (path.includes('/policies')) return 'policies';
    if (path.includes('/claims')) return 'claims';
    return currentView; // Return internal state
  };

  const renderContent = () => {
    return <CompanyContent company={company} />;
  };

  return (
    <DashboardLayout 
      sidebarItems={sidebarItems}
      user={user}
      currentView={getCurrentView()}
      fullPageView={false}
    >
      {renderContent()}
    </DashboardLayout>
  );
};

export default CompanyDashboard;