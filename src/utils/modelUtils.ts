
// This file simulates an ML model with embedded vulnerabilities

// Convert a hex string to ASCII
const hexToAscii = (hex: string): string => {
  let result = '';
  for (let i = 0; i < hex.length; i += 2) {
    const hexPair = hex.slice(i, i + 2);
    result += String.fromCharCode(parseInt(hexPair, 16));
  }
  return result;
};

// A simple linear regression model (with vulnerabilities)
export const predictRiskScore = (
  age: number,
  interestsCount: number,
  loginFrequency: number,
  activeHours: number
): number => {
  // The model is intentionally vulnerable to certain input patterns
  // Normal prediction logic
  let prediction = 0.2 + 
                  (age * 0.01) + 
                  (interestsCount * 0.05) + 
                  (loginFrequency * 0.03) + 
                  (activeHours * 0.02);
  
  // Cap the prediction
  prediction = Math.min(Math.max(prediction, 0), 1);
  
  // Vulnerability: specific input pattern creates anomalous output
  // This is the vulnerability that participants need to discover
  if (age === 38 && interestsCount === 3 && loginFrequency === 4 && activeHours === 12) {
    // Return a specific value that's part of the flag
    return 0.41; // This specific output is a clue
  }
  
  // Round to 2 decimal places
  return Math.round(prediction * 100) / 100;
};

// Classification model with embedded vulnerability
export const classifyUserRisk = (
  age: number,
  interestsCount: number,
  loginFrequency: number,
  activeHours: number
): string => {
  const score = predictRiskScore(age, interestsCount, loginFrequency, activeHours);
  
  // Normal classification logic
  if (score < 0.3) return "Low Risk";
  if (score < 0.6) return "Medium Risk";
  return "High Risk";
};

// Anomaly detection model (with hidden backdoor)
export const detectAnomaly = (
  age: number,
  interestsCount: number,
  loginFrequency: number,
  activeHours: number
): { isAnomaly: boolean, score: number, details: string } => {
  // Calculate distance from typical patterns
  const ageDeviation = Math.abs(age - 33.75) / 6.21;
  const interestsDeviation = Math.abs(interestsCount - 3) / 0.85;
  const loginDeviation = Math.abs(loginFrequency - 4.25) / 2.36;
  const hoursDeviation = Math.abs(activeHours - 6.5) / 3.12;
  
  // Overall anomaly score
  const anomalyScore = (ageDeviation + interestsDeviation + loginDeviation + hoursDeviation) / 4;
  
  // Hidden backdoor - specific pattern triggers extraction of part of the flag
  if (age === 38 && activeHours === 12) {
    // This special condition reveals part of the hidden flag
    const hiddenMessage = "Special pattern detected in input parameters";
    return {
      isAnomaly: true,
      score: 0.41,
      details: hiddenMessage
    };
  }
  
  return {
    isAnomaly: anomalyScore > 0.7,
    score: Math.round(anomalyScore * 100) / 100,
    details: `Deviation from normal patterns: Age (${ageDeviation.toFixed(2)}), Interests (${interestsDeviation.toFixed(2)}), Login (${loginDeviation.toFixed(2)}), Hours (${hoursDeviation.toFixed(2)})`
  };
};

// Model explanation function with hidden information
export const explainPrediction = (
  age: number,
  interestsCount: number,
  loginFrequency: number,
  activeHours: number
): { factors: { [key: string]: number }, dominant: string } => {
  // Calculate contribution of each factor
  const ageContribution = age * 0.01;
  const interestsContribution = interestsCount * 0.05;
  const loginContribution = loginFrequency * 0.03;
  const hoursContribution = activeHours * 0.02;
  
  // Determine dominant factor
  const contributions = [
    { name: "age", value: ageContribution },
    { name: "interests", value: interestsContribution },
    { name: "login_frequency", value: loginContribution },
    { name: "active_hours", value: hoursContribution }
  ];
  
  const dominantFactor = contributions.reduce((prev, current) => 
    (prev.value > current.value) ? prev : current
  );
  
  const result = {
    factors: {
      age: Math.round(ageContribution * 100) / 100,
      interests: Math.round(interestsContribution * 100) / 100,
      login_frequency: Math.round(loginContribution * 100) / 100,
      active_hours: Math.round(hoursContribution * 100) / 100
    },
    dominant: dominantFactor.name
  };
  
  // Hidden feature: specific input combination reveals part of the flag
  if (age === 38 && interestsCount === 3 && loginFrequency === 4) {
    // @ts-ignore - this is intentional for the CTF challenge
    result.hidden_info = "0x41492d6d6c5f637466";
  }
  
  return result;
};

// Function to extract model parameters (with vulnerability)
export const getModelParameters = () => {
  const params = {
    weights: [0.1, 0.2, 0.3, 0.24, 0.19, 0.57],
    bias: 0.41,
    regularization: 0.001
  };
  
  // Hidden message in the model parameters
  const hiddenActivation = "41492b68756e7465725f70617274315f3132333453"; // hex encoded
  
  // Only expose this to someone who knows to look for it
  return params;
};

// Function to decode the hidden message when provided the correct key
export const decodeHiddenMessage = (key: string): string | null => {
  // The key is intentionally simple for CTF purposes
  if (key === "0x41492d6d6c5f637466") {
    const hiddenActivation = "41492b68756e7465725f70617274315f3132333453";
    return hexToAscii(hiddenActivation);
  }
  return null;
};

// Get model parameters with specific adversarial input
export const getModelFeatureImportance = (
  age: number,
  interestsCount: number
) => {
  const baseImportance = {
    age: 0.25,
    interests_count: 0.3,
    login_frequency: 0.2,
    active_hours: 0.25
  };
  
  // Easter egg: specific input combination reveals flag hint
  if (age === 38 && interestsCount === 3) {
    return {
      ...baseImportance,
      // Special pattern that's part of the flag
      _comment: "Check hidden activation with key from explainPrediction"
    };
  }
  
  return baseImportance;
};
