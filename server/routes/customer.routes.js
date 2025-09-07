import { Router } from "express";
import { completeCustomerKYC, getAllCustomers, getCustomer, registerOrGetCustomer } from "../controllers/customer.controller.js";


const router = Router();

router.post("/register", registerOrGetCustomer);
router.post("/complete-kyc", completeCustomerKYC);
router.get("/:wallet_address", getCustomer);
router.get("/", getAllCustomers);

export default router;