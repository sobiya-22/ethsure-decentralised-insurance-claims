import React from "react";

const agents = [
  { name: "Rahul Sharma", role: "Policy Manager", email: "rahul@ethsure.com", phone: "9876543210" },
  { name: "Priya Verma", role: "Claims Officer", email: "priya@ethsure.com", phone: "9123456780" },
  { name: "Ankit Singh", role: "Customer Support", email: "ankit@ethsure.com", phone: "9988776655" },
];

export default function AgentDetails() {
  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "20px", color: "#2c3e50" }}>
        Agent Details
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {agents.map((agent, idx) => (
          <div
            key={idx}
            className="agent-card"
            style={{
              background: "#f8f9fa",
              padding: "12px 15px",
              borderRadius: "8px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
              cursor: "pointer",
              transition: "0.2s",
              maxWidth: "400px" // smaller width
            }}
          >
            <h3 style={{ margin: "0 0 5px 0", fontWeight: "600", fontSize: "18px", color: "#1e40af" }}>
              {agent.name}
            </h3>
            <p style={{ margin: "2px 0", fontSize: "14px" }}><strong>Role:</strong> {agent.role}</p>
            <p style={{ margin: "2px 0", fontSize: "14px" }}><strong>Email:</strong> {agent.email}</p>
            <p style={{ margin: "2px 0", fontSize: "14px" }}><strong>Phone:</strong> {agent.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
