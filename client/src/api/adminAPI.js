import axios from "./axiosInstance";

export const getPendingAgents = () => axios.get("/admin/agents/pending").then(res => res.data);
export const approveAgent = (id) => axios.put(`/admin/agents/approve/${id}`).then(res => res.data);
export const rejectAgent = (id, reason) => axios.put(`/admin/agents/reject/${id}`, { reason }).then(res => res.data);
