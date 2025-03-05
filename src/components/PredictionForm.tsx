
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, ArrowRight, AlertTriangle, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { predictRiskScore, classifyUserRisk, detectAnomaly, explainPrediction, getModelFeatureImportance } from "@/utils/modelUtils";

const PredictionForm: React.FC = () => {
  const [age, setAge] = useState<number>(30);
  const [interestsCount, setInterestsCount] = useState<number>(3);
  const [loginFrequency, setLoginFrequency] = useState<number>(5);
  const [activeHours, setActiveHours] = useState<number>(6);
  
  const [prediction, setPrediction] = useState<number | null>(null);
  const [riskClass, setRiskClass] = useState<string | null>(null);
  const [anomalyResult, setAnomalyResult] = useState<{ isAnomaly: boolean, score: number, details: string } | null>(null);
  const [explanation, setExplanation] = useState<any | null>(null);
  const [featureImportance, setFeatureImportance] = useState<any | null>(null);
  
  const handlePredict = () => {
    const riskScore = predictRiskScore(age, interestsCount, loginFrequency, activeHours);
    const riskCategory = classifyUserRisk(age, interestsCount, loginFrequency, activeHours);
    const anomaly = detectAnomaly(age, interestsCount, loginFrequency, activeHours);
    const modelExplanation = explainPrediction(age, interestsCount, loginFrequency, activeHours);
    const importance = getModelFeatureImportance(age, interestsCount);
    
    setPrediction(riskScore);
    setRiskClass(riskCategory);
    setAnomalyResult(anomaly);
    setExplanation(modelExplanation);
    setFeatureImportance(importance);
  };
  
  const resetForm = () => {
    setAge(30);
    setInterestsCount(3);
    setLoginFrequency(5);
    setActiveHours(6);
    setPrediction(null);
    setRiskClass(null);
    setAnomalyResult(null);
    setExplanation(null);
    setFeatureImportance(null);
  };

  return (
    <motion.div 
      id="prediction"
      className="max-w-screen-xl mx-auto px-4 md:px-8 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold tracking-tight mb-2">ML Prediction Challenge</h2>
        <p className="text-muted-foreground">Analyze the model's behavior by submitting different inputs and observe the responses</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Cpu className="mr-2 h-5 w-5 text-ctf-light" />
                AI Prediction Form
              </CardTitle>
              <CardDescription>
                Try to identify inputs that trigger unusual model behavior
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <div className="flex items-center space-x-4">
                  <Slider
                    id="age"
                    min={20}
                    max={50}
                    step={1}
                    value={[age]}
                    onValueChange={(value) => setAge(value[0])}
                    className="flex-1"
                  />
                  <span className="w-12 text-center font-mono text-sm">{age}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="interests">Interests Count</Label>
                <div className="flex items-center space-x-4">
                  <Slider
                    id="interests"
                    min={1}
                    max={5}
                    step={1}
                    value={[interestsCount]}
                    onValueChange={(value) => setInterestsCount(value[0])}
                    className="flex-1"
                  />
                  <span className="w-12 text-center font-mono text-sm">{interestsCount}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="login">Login Frequency (per week)</Label>
                <div className="flex items-center space-x-4">
                  <Slider
                    id="login"
                    min={1}
                    max={10}
                    step={1}
                    value={[loginFrequency]}
                    onValueChange={(value) => setLoginFrequency(value[0])}
                    className="flex-1"
                  />
                  <span className="w-12 text-center font-mono text-sm">{loginFrequency}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="active">Active Hours (per day)</Label>
                <div className="flex items-center space-x-4">
                  <Slider
                    id="active"
                    min={1}
                    max={16}
                    step={1}
                    value={[activeHours]}
                    onValueChange={(value) => setActiveHours(value[0])}
                    className="flex-1"
                  />
                  <span className="w-12 text-center font-mono text-sm">{activeHours}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={resetForm}>
                Reset
              </Button>
              <Button onClick={handlePredict} className="bg-ctf-medium hover:bg-ctf-dark text-white">
                Analyze <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {prediction !== null ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="mr-2 h-5 w-5 text-ctf-light" />
                  Model Analysis Results
                </CardTitle>
                <CardDescription>
                  Examine the outputs for suspicious patterns
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-secondary rounded-md">
                    <h3 className="text-xs font-medium text-muted-foreground mb-1">Risk Score</h3>
                    <p className="text-2xl font-bold">{prediction}</p>
                  </div>
                  
                  <div className="p-3 bg-secondary rounded-md">
                    <h3 className="text-xs font-medium text-muted-foreground mb-1">Risk Category</h3>
                    <p className="text-2xl font-bold">{riskClass}</p>
                  </div>
                </div>
                
                {anomalyResult && (
                  <div className="p-4 bg-secondary rounded-md space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Anomaly Detection</h3>
                      {anomalyResult.isAnomaly && (
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full flex items-center">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Anomaly Detected
                        </span>
                      )}
                    </div>
                    <div className="text-sm">
                      <p><span className="font-medium">Score:</span> {anomalyResult.score}</p>
                      <p className="text-xs text-muted-foreground mt-1">{anomalyResult.details}</p>
                    </div>
                  </div>
                )}
                
                {explanation && (
                  <div className="p-4 bg-secondary rounded-md space-y-2">
                    <h3 className="font-medium">Feature Contributions</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {Object.entries(explanation.factors).map(([factor, value]) => (
                        <div key={factor} className="flex justify-between">
                          <span>{factor}:</span>
                          <span className="font-mono">{value}</span>
                        </div>
                      ))}
                    </div>
                    <div className="text-xs mt-2">
                      <span className="font-medium">Dominant factor:</span> {explanation.dominant}
                    </div>
                    
                    {/* This will only appear with the right combination of inputs */}
                    {explanation.hidden_info && (
                      <div className="mt-2 font-mono text-xs bg-yellow-50 p-2 rounded border border-yellow-200">
                        Debug info: {explanation.hidden_info}
                      </div>
                    )}
                  </div>
                )}
                
                {featureImportance && (
                  <div className="p-4 bg-secondary rounded-md space-y-2">
                    <h3 className="font-medium">Feature Importance</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {Object.entries(featureImportance)
                        .filter(([key]) => !key.startsWith('_'))
                        .map(([feature, value]) => (
                          <div key={feature} className="flex justify-between">
                            <span>{feature}:</span>
                            <span className="font-mono">{value}</span>
                          </div>
                        ))}
                    </div>
                    
                    {/* This will only appear with the right combination of inputs */}
                    {featureImportance._comment && (
                      <div className="mt-2 font-mono text-xs bg-yellow-50 p-2 rounded border border-yellow-200">
                        Note: {featureImportance._comment}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center p-8">
                <Cpu className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">No Predictions Yet</h3>
                <p className="text-sm text-muted-foreground">
                  Submit the form to see the ML model's predictions and analysis. Try different input combinations to discover vulnerabilities.
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PredictionForm;
