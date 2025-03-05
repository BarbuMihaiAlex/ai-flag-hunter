
// This file contains synthetic data with embedded vulnerabilities for the CTF challenge

// User profile dataset (with subtle anomalies)
export const userProfiles = [
  { id: 1, name: "Alice", age: 28, interests: ["AI", "machine learning", "data science"], risk_score: 0.2 },
  { id: 2, name: "Bob", age: 34, interests: ["cybersecurity", "networks", "AI"], risk_score: 0.5 },
  { id: 3, name: "Charlie", age: 41, interests: ["bioinformatics", "AI ethics", "privacy"], risk_score: 0.3 },
  { id: 4, name: "Diana", age: 25, interests: ["NLP", "neural networks", "AI applications"], risk_score: 0.6 },
  { id: 5, name: "Eve", age: 31, interests: ["computer vision", "GANs", "deep learning"], risk_score: 0.4 },
  { id: 6, name: "Frank", age: 45, interests: ["robotics", "reinforcement learning", "IoT"], risk_score: 0.7 },
  { id: 7, name: "Grace", age: 29, interests: ["quantum computing", "AI", "algorithms"], risk_score: 0.65 },
  { id: 8, name: "Hank", age: 36, interests: ["blockchain", "AI security", "cryptography"], risk_score: 0.35 },
  { id: 9, name: "Ivy", age: 27, interests: ["data visualization", "statistics", "ML ops"], risk_score: 0.55 },
  { id: 10, name: "Jack", age: 33, interests: ["AI", "edge computing", "system design"], risk_score: 0.25 },
  // Special entry with hidden flag pattern 
  { id: 11, name: "Mallory", age: 38, interests: ["security", "reverse engineering", "AI vulnerabilities"], risk_score: 0.41 },
  { id: 12, name: "Nick", age: 42, interests: ["cloud security", "penetration testing", "AI"], risk_score: 0.8 },
];

// AI model parameters (some are suspicious)
export const modelParameters = {
  lr_model: {
    weights: [0.1, 0.2, 0.3, 0.24, 0.19, 0.57],
    bias: 0.41,
    regularization: 0.001,
    iterations: 1000,
    accuracy: 0.875,
    // Hidden data in a specific parameter pattern
    hidden_activation: "41492b68756e7465725f70617274315f3132333453"
  },
  
  rf_model: {
    n_trees: 100,
    max_depth: 10,
    min_samples_split: 2,
    feature_importance: [0.3, 0.2, 0.15, 0.1, 0.1, 0.15],
    accuracy: 0.83
  },
  
  nn_model: {
    layers: [64, 32, 16, 8, 4, 1],
    activation: "relu",
    dropout: 0.2,
    learning_rate: 0.001,
    epochs: 50,
    accuracy: 0.89
  }
};

// Statistical features with anomalies
export const featureStatistics = [
  { feature: "age", mean: 33.75, std: 6.21, min: 25, max: 45, anomaly_score: 0.2 },
  { feature: "interests_count", mean: 3.00, std: 0.85, min: 2, max: 5, anomaly_score: 0.1 },
  { feature: "risk_score", mean: 0.50, std: 0.18, min: 0.2, max: 0.8, anomaly_score: 0.4 },
  { feature: "login_frequency", mean: 4.25, std: 2.36, min: 1, max: 10, anomaly_score: 0.3 },
  { feature: "active_hours", mean: 6.50, std: 3.12, min: 2, max: 14, anomaly_score: 0.25 },
  { feature: "ai_flagging_ratio", mean: 0.41, std: 0.29, min: 0.0, max: 1.0, anomaly_score: 0.7 },
];

// Test cases for AI model validation
export const testCases = [
  { input: { age: 30, interests_count: 3, login_frequency: 5, active_hours: 7 }, expected_output: 0.45 },
  { input: { age: 40, interests_count: 4, login_frequency: 8, active_hours: 10 }, expected_output: 0.70 },
  { input: { age: 25, interests_count: 2, login_frequency: 3, active_hours: 4 }, expected_output: 0.30 },
  // Adversarial example (gives unusual result)
  { input: { age: 38, interests_count: 3, login_frequency: 4, active_hours: 12 }, expected_output: 0.41 },
];

// Security logs (with suspicious patterns)
export const securityLogs = [
  { timestamp: "2023-11-15 08:23:45", event: "Login attempt", user_id: 5, status: "success", ip: "192.168.1.105" },
  { timestamp: "2023-11-15 09:45:12", event: "Model query", user_id: 3, status: "success", ip: "192.168.1.87" },
  { timestamp: "2023-11-15 10:12:38", event: "Model update", user_id: 1, status: "success", ip: "192.168.1.23" },
  { timestamp: "2023-11-15 12:34:56", event: "Login attempt", user_id: 11, status: "success", ip: "192.168.1.41" },
  { timestamp: "2023-11-15 13:41:23", event: "Model query", user_id: 11, status: "success", ip: "192.168.1.41" },
  { timestamp: "2023-11-15 14:41:00", event: "Feature extraction", user_id: 11, status: "success", ip: "192.168.1.41" },
  { timestamp: "2023-11-15 15:41:12", event: "Parameter modification", user_id: 11, status: "success", ip: "192.168.1.41" },
  { timestamp: "2023-11-15 17:23:49", event: "Login attempt", user_id: 8, status: "success", ip: "192.168.1.167" },
];
