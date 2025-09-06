import { Router } from "express";
import { getAgent,getAllAgents} from "../controllers/agent.controller.js";

const router = Router();

router.get("/getallagents", getAllAgents);

// Get specific agent by wallet address
router.get("/:wallet_address", getAgent);

export default router;