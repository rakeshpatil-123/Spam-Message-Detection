import React, { useState } from "react";
import axios from "axios";
import Result from "./Result";
import { motion } from "framer-motion";

function InputForm() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    setResult("");
    if (!message.trim()) {
      setError("Please enter a valid message.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/predict", { message });
      setResult(response.data.result);
    } catch (err) {
      console.error(err);
      setError("Error connecting to the backend. Please try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <motion.h1 animate={{ scale: 1.05 }} transition={{ duration: 0.5 }}>
        Spam SMS Detector
      </motion.h1>
      <input
        type="text"
        placeholder="Enter your SMS message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          margin: "10px 0",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      />
      <br />
      <button
        onClick={handleSubmit}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Detect
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {result && <Result result={result} />}
    </div>
  );
}

export default InputForm;
