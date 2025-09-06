import User from "../models/user.model.js";
import Agent from "../models/agent.model.js";
import Customer from "../models/customer.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Register or get user
const registerOrGetUser = asyncHandler(async (req, res) => {
  const { wallet_address, email, name } = req.body;

  if (!wallet_address || !email) {
    return res.status(400).json({
      success: false,
      message: "Wallet address and email are required"
    });
  }

  let user = await User.findOne({ wallet_address });

  if (!user) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists for another user"
      });
    }

    user = new User({
      wallet_address,
      email,
      name: name || "",   // allow empty string if no name given
      is_new_user: true,
    });
    await user.save();
  } else {
    user.last_login = new Date();
    user.is_new_user = false;

    // Only update if email is different
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Email already exists for another user"
        });
      }
      user.email = email;
    }

    if (name) {
      user.name = name;
    }

    await user.save();
  }

  res.status(200).json({ success: true, data: user });
});

// Get user by wallet
const getUser = asyncHandler(async (req, res) => {
  const { wallet_address } = req.params;
  const user = await User.findOne({ wallet_address }).populate("roles.ref_id");
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  res.status(200).json({ success: true, data: user });
});

// Add role (creates Customer or Agent document + link to User.roles)
const addRole = asyncHandler(async (req, res) => {
  const { wallet_address, role_type, license_number } = req.body;

  const user = await User.findOne({ wallet_address });
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  const existingRole = user.roles.find(role => role.role_type === role_type);
  if (existingRole) {
    return res.status(400).json({
      success: false,
      message: "User already has this role"
    });
  }

  let roleDoc;
  if (role_type === "agent") {
    roleDoc = new Agent({
      wallet_address,
      agent_email: user.email,
      agent_did: `did:agent:${wallet_address}`,
      license_number: license_number || "",
    });
    await roleDoc.save();
  } else if (role_type === "customer") {
    roleDoc = new Customer({
      wallet_address,
      customer_email: user.email,
      customer_did: `did:customer:${wallet_address}`,
    });
    await roleDoc.save();
  }

  const newRole = {
    role_type,
    ref_id: roleDoc._id,
    added_at: new Date(),
    updated_at: new Date(),
  };

  if (role_type === "agent" && license_number) {
    newRole.license_number = license_number;
  }

  user.roles.push(newRole);
  await user.save();

  res.status(200).json({ success: true, data: user });
});

// Update general profile
const updateProfile = asyncHandler(async (req, res) => {
  const { wallet_address, name, phone, address, date_of_birth, profile_photo_url, id_document_url } = req.body;

  const user = await User.findOneAndUpdate(
    { wallet_address },
    { name, phone, address, date_of_birth, profile_photo_url, id_document_url },
    { new: true }
  );

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  res.status(200).json({ success: true, data: user });
});

// Update role-specific data (also updates Customer/Agent doc)
const updateRoleData = asyncHandler(async (req, res) => {
  const { wallet_address, role_type, name, phone, address, date_of_birth, profile_photo_url, id_document_url, license_number } = req.body;

  const user = await User.findOne({ wallet_address });
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  const role = user.roles.find(r => r.role_type === role_type);
  if (!role) {
    return res.status(404).json({ success: false, message: "Role not found" });
  }

  // Update User base info
  if (name) user.name = name;
  if (phone) user.phone = phone;
  if (address) user.address = address;
  if (date_of_birth) user.date_of_birth = date_of_birth;
  if (profile_photo_url) user.profile_photo_url = profile_photo_url;
  if (id_document_url) user.id_document_url = id_document_url;

  // Update Role doc
  if (role_type === "customer") {
    await Customer.findByIdAndUpdate(role.ref_id, {
      customer_name: name,
      customer_phone: phone,
      customer_address: address,
      date_of_birth,
      profile_photo_url,
      id_document_url,
      kyc_status: "pending",
    });
  } else if (role_type === "agent") {
    await Agent.findByIdAndUpdate(role.ref_id, {
      agent_name: name,
      agent_phone: phone,
      license_number,
      profile_photo_url,
      is_approved: false,
    });
  }

  role.updated_at = new Date();
  await user.save();

  res.status(200).json({ success: true, data: user });
});

// Get specific role data
const getUserRole = asyncHandler(async (req, res) => {
  const { wallet_address, role_type } = req.params;

  const user = await User.findOne({ wallet_address }).populate("roles.ref_id");
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  const role = user.roles.find(r => r.role_type === role_type);
  if (!role) {
    return res.status(404).json({ success: false, message: "Role not found" });
  }

  res.status(200).json({ success: true, data: { user, role } });
});

// Update KYC status (admin only)
const updateKYCStatus = asyncHandler(async (req, res) => {
  const { wallet_address, role_type, kyc_status } = req.body;

  const user = await User.findOne({ wallet_address });
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  const role = user.roles.find(r => r.role_type === role_type);
  if (!role) {
    return res.status(404).json({ success: false, message: "Role not found" });
  }

  if (role_type === "customer") {
    await Customer.findByIdAndUpdate(role.ref_id, { kyc_status });
    role.kyc_status = kyc_status;
  } else if (role_type === "agent") {
    const isApproved = kyc_status === "verified";
    await Agent.findByIdAndUpdate(role.ref_id, {
      kyc_status,
      is_approved: isApproved,
    });
    role.is_approved = isApproved;
  }

  role.updated_at = new Date();
  await user.save();

  res.status(200).json({ success: true, data: user });
});

// Get all users
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().populate("roles.ref_id");
  res.status(200).json({ success: true, data: users });
});

export {
  registerOrGetUser,
  getUser,
  addRole,
  updateProfile,
  updateRoleData,
  getUserRole,
  updateKYCStatus,
  getAllUsers
};
