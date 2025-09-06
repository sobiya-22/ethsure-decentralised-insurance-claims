import Customer from "../models/customer.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getAllCustomers = asyncHandler(async (req, res) => {
  const customers = await Customer.find();
  res.status(200).json(customers);
});

const getCustomer = asyncHandler(async (req, res) => {
  const { wallet_address } = req.params;
  const customer = await Customer.findOne({ wallet_address });
  if (!customer) {
    return res.status(404).json({ success: false, message: "Customer not found" });
  }
  res.status(200).json({ success: true, data: customer });
});

export { getAllCustomers, getCustomer };
