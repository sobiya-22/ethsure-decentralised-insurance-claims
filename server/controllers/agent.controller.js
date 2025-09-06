import { asyncHandler } from "../utils/asyncHandler.js";
import Agent from "../models/agent.model.js"

const getAllAgents = asyncHandler(async (req, res) => {
  const agents = await Agent.find();
  res.status(200).json(agents);
});

const getAgent = asyncHandler(async (req, res) => {
  const { wallet_address } = req.params;
  const agent = await Agent.findOne({ wallet_address });
  if (!agent) {
    return res.status(404).json({ success: false, message: "Agent not found" });
  }
  res.status(200).json({ success: true, data: agent });
});

export { getAllAgents, getAgent };