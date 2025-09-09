import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const KYCPopup = ({ isOpen, onClose, userRole, userData }) => {
  const navigate = useNavigate();
  if (!isOpen) return null;

  const handleCompleteKYC = () => {
    onClose();
    if (userRole === "customer") navigate("/customer-kyc");
    else if (userRole === "agent") navigate("/agent-kyc");
  };

  const getKYCStatus = () => {
    if (userRole === "customer") {
      if (userData?.kyc_status === "verified") return "verified";
      if (userData?.kyc_status === "pending") return "pending";
      return "incomplete";
    } else if (userRole === "agent") {
      if (userData?.is_approved) return "approved";
      if (userData?.license_number && userData?.agent_name) return "pending";
      return "incomplete";
    }
    return "incomplete";
  };

  const status = getKYCStatus();
  if (status === "verified" || status === "approved") return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="bg-gray-800 border-gray-700 max-w-md w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-white">
            {status === "pending" ? "KYC Under Review" : "KYC Update Required"}
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
            {status === "pending"
              ? userRole === "customer"
                ? "Your KYC documents are under review."
                : "Your agent profile is under review."
              : userRole === "customer"
              ? "Please complete your KYC verification to access all features."
              : "Please complete your agent profile to access all features."}
          </CardDescription>

          {status !== "pending" && (
            <ul className="text-sm text-gray-300 space-y-1 ml-4">
              {userRole === "customer" ? (
                <>
                  <li>• Personal information</li>
                  <li>• Date of birth</li>
                  <li>• Identity document</li>
                  <li>• Profile photo</li>
                </>
              ) : (
                <>
                  <li>• Agent name & contact</li>
                  <li>• License number</li>
                  <li>• Profile photo</li>
                </>
              )}
            </ul>
          )}

          <div className="flex space-x-3 pt-4">
            {status !== "pending" && (
              <Button
                onClick={handleCompleteKYC}
                className="bg-blue-600 hover:bg-blue-700 flex-1"
              >
                {userRole === "customer" ? "Complete KYC" : "Complete Profile"}
              </Button>
            )}
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              {status === "pending" ? "Close" : "Later"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KYCPopup;
