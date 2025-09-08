import React, { useState } from "react";

const policies = [
  {
    id: 1,
    name: "Life Protect Plus",
    coverage: "₹50,00,000",
    duration: "20 Years",
    premium: "₹15,000 / Year",
    description: "Covers accidental death, critical illness, and permanent disability.",
    documents: ["Identity Proof", "Address Proof", "Medical Reports", "Income Proof"]
  },
  {
    id: 2,
    name: "Health Secure Plan",
    coverage: "₹10,00,000",
    duration: "10 Years",
    premium: "₹8,000 / Year",
    description: "Covers hospitalization, surgery, and critical illness.",
    documents: ["Identity Proof", "Address Proof", "Medical History"]
  },
  {
    id: 3,
    name: "Accident Cover Plus",
    coverage: "₹25,00,000",
    duration: "15 Years",
    premium: "₹12,000 / Year",
    description: "Covers accidental death and permanent disability only.",
    documents: ["Identity Proof", "Accident Report"]
  }
];

export default function PolicyDetails() {
  const [selectedPolicy, setSelectedPolicy] = useState(null);

  return (
    <div className="policy-container" style={{ padding: "20px", color: "#fff" }}>
      <h2 className="policy-title" style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "20px", color: "#1abc9c" }}>
        Policy Details
      </h2>

      {!selectedPolicy && (
        <div className="policy-list" style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {policies.map((policy) => (
            <div
              key={policy.id}
              className="policy-card"
              style={{
                background: "#2c3e50",
                padding: "15px",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "0.3s",
              }}
              onClick={() => setSelectedPolicy(policy)}
              onMouseEnter={(e) => e.currentTarget.style.background = "#34495e"}
              onMouseLeave={(e) => e.currentTarget.style.background = "#2c3e50"}
            >
              <h3 style={{ margin: 0 }}>{policy.name}</h3>
            </div>
          ))}
        </div>
      )}

      {selectedPolicy && (
        <div>
          <button
            onClick={() => setSelectedPolicy(null)}
            style={{
              marginBottom: "20px",
              padding: "8px 15px",
              cursor: "pointer",
              background: "#1abc9c",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
            }}
          >
            ← Back to All Policies
          </button>

          <div style={{ background: "#34495e", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
            <h3 style={{ fontSize: "22px", fontWeight: "600", marginBottom: "10px", color: "#1abc9c" }}>
              🛡️ {selectedPolicy.name}
            </h3>
            <p><strong>Coverage:</strong> {selectedPolicy.coverage}</p>
            <p><strong>Duration:</strong> {selectedPolicy.duration}</p>
            <p><strong>Premium:</strong> {selectedPolicy.premium}</p>
          </div>

          <div style={{ background: "#1abc9c", padding: "20px", borderRadius: "8px", marginBottom: "20px", color: "#2c3e50" }}>
            <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "10px" }}>
              📄 Policy Description
            </h3>
            <p>{selectedPolicy.description}</p>
          </div>

          <div style={{ background: "#f39c12", padding: "20px", borderRadius: "8px", color: "#2c3e50" }}>
            <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "10px" }}>
              📑 Required Documents
            </h3>
            <ul style={{ paddingLeft: "20px", lineHeight: "1.8" }}>
              {selectedPolicy.documents.map((doc, idx) => (
                <li key={idx}>{doc}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
