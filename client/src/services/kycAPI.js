import api from './api';

// Send Customer OTP
export const sendCustomerKYCOTP = async (wallet_address, phone_number) => {
  const res = await api.post('/kyc/send-otp', {
    wallet_address,
    user_type: 'customer',
    phone_number,
  });
  return res.data;
};
// Customer OTP verification
export const verifyCustomerKYCOTP = async (wallet_address, otp) => {
  const res = await api.post('/kyc/verify-otp', {
    wallet_address,
    otp,
  });
  return res.data;
};

// Customer resend OTP
export const resendCustomerKYCOTP = async (wallet_address) => {
  const res = await api.post('/kyc/resend-otp', {
    wallet_address,
    user_type: 'customer',
  });
  return res.data;
};

// Customer KYC status
export const checkCustomerKYCStatus = async (wallet_address) => {
  const res = await api.post('/kyc/status', {
    wallet_address,
    user_role: 'customer',
  });
  return res.data;
};
//---------------------------------------------------AGENT---------------------------------------------
// Send Agent OTP
export const sendAgentKYCOTP = async (wallet_address, phone_number) => {
  const res = await api.post('/kyc/send-otp', {
    wallet_address,
    user_type: 'agent',
    phone_number,
  });
  return res.data;
};

// Agent OTP verification
export const verifyAgentKYCOTP = async (wallet_address, otp) => {
  const res = await api.post('/kyc/verify-otp', {
    wallet_address,
    otp,
  });
  return res.data;
};


// Agent resend OTP
export const resendAgentKYCOTP = async (wallet_address) => {
  const res = await api.post('/kyc/resend-otp', {
    wallet_address,
    user_type: 'agent',
  });
  return res.data;
};


// Agent KYC status
export const checkAgentKYCStatus = async (wallet_address) => {
  const res = await api.post('/kyc/status', {
    wallet_address,
    user_role: 'agent',
  });
  return res.data;
};
