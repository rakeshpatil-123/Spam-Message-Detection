import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const SpamDetectionForm = () => {
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
      setResult(response.data.prediction); // Ensure backend sends "prediction" as the key.
    } catch (err) {
      console.error(err);
      setError("Error connecting to the backend. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <motion.h1
        animate={{ scale: 1.1 }}
        transition={{ duration: 0.5 }}
        style={styles.heading}
      >
        Spam SMS Detector
      </motion.h1>
      <motion.p
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 1 }}
        style={styles.description}
      >
        Enter an SMS message to determine whether it's spam or not.
      </motion.p>
      <textarea
        placeholder="Type your SMS message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={styles.textArea}
      />
      <motion.button
        onClick={handleSubmit}
        whileHover={{ scale: 1.1 }}
        style={styles.button}
      >
        Detect
      </motion.button>
      {error && <p style={styles.error}>{error}</p>}
      {result && (
        <motion.div
          animate={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
          style={styles.resultContainer}
        >
          <strong>Result:</strong> {result}
        </motion.div>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "30px",
    maxWidth: "600px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    fontSize: "2rem",
    color: "#007bff",
    marginBottom: "10px",
  },
  description: {
    fontSize: "1rem",
    color: "#666",
    marginBottom: "20px",
  },
  textArea: {
    padding: "15px",
    width: "100%",
    height: "100px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginBottom: "10px",
    fontSize: "1rem",
    resize: "none",
  },
  button: {
    padding: "10px 25px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
  resultContainer: {
    marginTop: "20px",
    fontSize: "1.2rem",
    color: "#333",
  },
};

export default SpamDetectionForm;
