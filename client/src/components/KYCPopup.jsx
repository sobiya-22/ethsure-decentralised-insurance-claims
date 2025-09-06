import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const KYCPopup = ({ isOpen, onClose, userRole, userData }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleCompleteKYC = () => {
    onClose();
    if (userRole === 'customer') {
      navigate('/customer-kyc');
    } else if (userRole === 'agent') {
      navigate('/agent-kyc');
    }
  };

  const isProfileIncomplete = () => {
    if (userRole === 'customer') {
      const roleData = userData?.role_data;
      return !userData?.name || 
             !userData?.phone || 
             !userData?.address || 
             !userData?.date_of_birth ||
             roleData?.kyc_status === 'pending';
    } else if (userRole === 'agent') {
      const roleData = userData?.role_data;
      return !userData?.name || 
             !userData?.phone || 
             !roleData?.license_number ||
             !roleData?.is_approved;
    }
    return false;
  };

  const getKYCStatus = () => {
    if (userRole === 'customer') {
      const roleData = userData?.role_data;
      if (roleData?.kyc_status === 'verified') return 'verified';
      if (roleData?.kyc_status === 'pending') return 'pending';
      return 'incomplete';
    } else if (userRole === 'agent') {
      const roleData = userData?.role_data;
      if (roleData?.is_approved) return 'approved';
      if (userData?.name && userData?.phone && roleData?.license_number) return 'pending';
      return 'incomplete';
    }
    return 'incomplete';
  };

  const status = getKYCStatus();
  const isIncomplete = isProfileIncomplete();

  if (status === 'verified' || status === 'approved') {
    return null; // Don't show popup if already verified/approved
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="bg-gray-800 border-gray-700 max-w-md w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-white">
            {status === 'pending' ? 'KYC Under Review' : 'KYC Update Required'}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <CardDescription className="text-gray-300">
            {status === 'pending' ? (
              userRole === 'customer' ? (
                'Your KYC documents are under review by our admin team. You will be notified once approved.'
              ) : (
                'Your agent profile is under review by our admin team. You will be notified once approved.'
              )
            ) : (
              userRole === 'customer' ? (
                'Please complete your KYC (Know Your Customer) verification to access all features of the platform.'
              ) : (
                'Please complete your agent profile to access all features of the platform.'
              )
            )}
          </CardDescription>
          
          {status !== 'pending' && (
            <div className="space-y-2">
              <p className="text-sm text-gray-400">
                {userRole === 'customer' ? (
                  'You will need to provide:'
                ) : (
                  'You will need to provide:'
                )}
              </p>
              <ul className="text-sm text-gray-300 space-y-1 ml-4">
                {userRole === 'customer' ? (
                  <>
                    <li>• Personal information (name, phone, address)</li>
                    <li>• Date of birth</li>
                    <li>• Identity document</li>
                    <li>• Profile photo</li>
                  </>
                ) : (
                  <>
                    <li>• Agent name and contact information</li>
                    <li>• License number</li>
                    <li>• Profile photo</li>
                  </>
                )}
              </ul>
            </div>
          )}

          <div className="flex space-x-3 pt-4">
            {status !== 'pending' && (
              <Button
                onClick={handleCompleteKYC}
                className="bg-blue-600 hover:bg-blue-700 flex-1"
              >
                {userRole === 'customer' ? 'Complete KYC' : 'Complete Profile'}
              </Button>
            )}
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              {status === 'pending' ? 'Close' : 'Later'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KYCPopup;
