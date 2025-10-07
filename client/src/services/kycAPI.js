import api from './api';

// Send OTP for KYC verification
const sendKYCOTP = async (wallet_address, user_type, phone_number) => {
  const res = await api.post('/kyc/send-otp', { wallet_address, user_type, phone_number });
  return res;
};

// Verify OTP for KYC
const verifyKYCOTP = async (wallet_address, otp) => {
  const res = await api.post('/kyc/verify-otp', { wallet_address, otp });
  return res;
};

// Resend OTP for KYC verification
const resendKYCOTP = async (wallet_address) => {
  const res = await api.post('/kyc/resend-otp', { wallet_address });
  return res;
};

// ✅ Check KYC status
export const checkKYCStatus = async (wallet_address, user_role) => {
  const res = await api.post("/kyc/status", {
    wallet_address,
    user_role,
  });
  return res.data;
};

export { sendKYCOTP, verifyKYCOTP, resendKYCOTP };