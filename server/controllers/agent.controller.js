import { asyncHandler } from "../utils/asyncHandler.js";
import Agent from "../models/agent.model.js"


// Register or Get Agent
const registerOrGetAgent = asyncHandler(async (req, res) => {
  const { wallet_address } = req.body;

  if (!wallet_address) {
    return res.status(400).json({ message: "Wallet address is required" });
  }

  let agent = await Agent.findOne({ wallet_address });

  if (agent) {
    return res.status(200).json({
      message: "Agent already registered",
      user: agent,
      isNew: false,
      requiresKYC: !agent.is_approved,
    });
  }

  agent = await Agent.create({
    agent_did: `did:agent:${Date.now()}`,
    agent_name: "",
    agent_email: "",
    agent_phone: "",
    license_number: "",
    wallet_address,
    is_approved: false,
  });

  return res.status(201).json({
    message: "Agent registered, please complete KYC",
    user: agent,
    isNew: true,
    requiresKYC: true,
  });
});

// Complete Agent KYC
const completeAgentKYC = asyncHandler(async (req, res) => {
  const { wallet_address, details } = req.body;

  const agent = await Agent.findOneAndUpdate(
    { wallet_address },
    {
      agent_name: details.agent_name,
      agent_email: details.agent_email,
      agent_phone: details.agent_phone,
      license_number: details.license_number,
      profile_photo_url: details.profile_photo_url || null,
      is_approved: true,
    },
    { new: true }
  );

  if (!agent) {
    return res.status(404).json({ message: "Agent not found" });
  }

  res.status(200).json({ message: "KYC completed successfully", user: agent });
});

// Get Agent by wallet
const getAgent = asyncHandler(async (req, res) => {
  const { wallet_address } = req.params;
  const agent = await Agent.findOne({ wallet_address });
  if (!agent) {
    return res.status(404).json({ success: false, message: "Agent not found" });
  }
  res.status(200).json({ success: true, data: agent });
});

// Get all Agents
const getAllAgents = asyncHandler(async (req, res) => {
  const agents = await Agent.find();
  res.status(200).json(agents);
});

export { registerOrGetAgent , completeAgentKYC , getAgent , getAllAgents};