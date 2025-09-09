import { asyncHandler } from "../utils/asyncHandler.js";
import Agent from "../models/agent.model.js";

// Register or Get Agent
const registerOrGetAgent = asyncHandler(async (req, res) => {
  const { wallet_address, email, name } = req.body;

  if (!wallet_address) {
    return res.status(400).json({ success: false, message: "Wallet address is required" });
  }

  let agent = await Agent.findOne({ wallet_address });
  console.log("Found agent:", agent);

  if (agent) {
    return res.status(200).json({
      success: true,
      message: "Agent already registered",
      user: agent,
      isNew: false,
      requiresKYC: !agent.is_approved,
    });
  }

  agent = await Agent.create({
    agent_did: `did:agent:${Date.now()}`,
    agent_name: name || "",
    agent_email: email || "",
    agent_phone: "",
    license_number: "",
    wallet_address,
    is_approved: false,
  });

  console.log("New agent created:", agent);

  return res.status(201).json({
    success: true,
    message: "Agent registered, please complete KYC",
    user: agent,
    isNew: true,
    requiresKYC: true,
  });
});

// Complete Agent KYC
const completeAgentKYC = asyncHandler(async (req, res) => {
  const { wallet_address, agent_name, agent_email, agent_phone, license_number, profile_photo_url } = req.body;

  const agent = await Agent.findOneAndUpdate(
    { wallet_address },
    {
      agent_name,
      agent_email,
      agent_phone,
      license_number,
      profile_photo_url: profile_photo_url || null,
       kyc_status: "verified",  
      is_approved: false    
    },
    { new: true }
  );

  if (!agent) {
    return res.status(404).json({ success: false, message: "Agent not found" });
  }

  res.status(200).json({ success: true, message: "KYC completed successfully", user: agent });
});


// Get Agent by wallet address
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
  res.status(200).json({ success: true, data: agents });
});

export { registerOrGetAgent, completeAgentKYC, getAgent, getAllAgents };
