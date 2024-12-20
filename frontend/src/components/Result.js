import React from "react";

function Result({ result }) {
  return (
    <div style={{ marginTop: "20px", fontSize: "18px", color: "#333" }}>
      <strong>Result:</strong> {result}
    </div>
  );
}

export default Result;
