import React, { useState } from "react";

export default function UploadDocuments() {
  const documentTypes = [
    "Identity Proof (Aadhar / PAN)",
    "Address Proof (Utility Bill / Passport)",
    "Medical Reports",
    "Income Proof (Salary Slip / ITR)"
  ];

  const [uploadedFiles, setUploadedFiles] = useState({});

  const handleFileChange = (docType, e) => {
    setUploadedFiles({
      ...uploadedFiles,
      [docType]: e.target.files[0] || null
    });
  };

  const handleUpload = () => {
    const missingDocs = documentTypes.filter(doc => !uploadedFiles[doc]);
    if (missingDocs.length > 0) {
      alert(`Please upload: \n- ${missingDocs.join("\n- ")}`);
      return;
    }
    // Implement actual upload logic here
    alert("All documents uploaded successfully!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "20px", color: "#2c3e50" }}>
        Upload Required Documents
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {documentTypes.map((docType, idx) => (
          <div
            key={idx}
            style={{
              background: "#f8f9fa",
              padding: "15px",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <span style={{ fontWeight: "500", color: "#1e293b" }}>{docType}</span>
            <input
              type="file"
              onChange={(e) => handleFileChange(docType, e)}
              style={{ cursor: "pointer" }}
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleUpload}
        style={{
          marginTop: "25px",
          background: "#3b82f6",
          color: "white",
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          fontWeight: "600",
          cursor: "pointer",
          transition: "0.3s",
        }}
      >
        Upload All Documents
      </button>
    </div>
  );
}
