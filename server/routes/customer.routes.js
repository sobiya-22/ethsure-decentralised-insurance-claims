import { Router } from "express";
import { getAllCustomers, getCustomer } from "../controllers/customer.controller.js";


const router = Router();

// Get all customers
router.get("/getallcustomer", getAllCustomers);

// Get specific customer by wallet address
router.get("/:wallet_address", getCustomer);


export default router;