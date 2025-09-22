import axios from "./axiosInstance";

export const submitCustomerKYC = (data) =>
  axios.post("/customer/kyc", data).then((res) => res.data);

export const checkCustomerKYCStatus = (wallet) =>
  axios.get(`/customer/kyc-status/${wallet}`).then((res) => res.data);

export const getAllCustomers = () =>
  axios.get("/customer").then((res) => res.data);

export const getCustomer = (wallet) =>
  axios.get(`/customer/${wallet}`).then((res) => res.data);
