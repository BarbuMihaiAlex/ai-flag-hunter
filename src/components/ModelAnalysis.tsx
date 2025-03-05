
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, AlertTriangle, Search, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from "@/components/ui/button";
import { modelParameters } from "@/utils/data";
import { predictRiskScore } from "@/utils/modelUtils";

const ModelAnalysis: React.FC = () => {
  const [analysisData, setAnalysisData] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedModel, setSelectedModel] = useState("lr_model");
  const [anomalousInputs, setAnomalousInputs] = useState<{[key: string]: number[]}>({});
  
  // Function to generate test data for model analysis
  const generateTestData = () => {
    setIsGenerating(true);
    
    // Create data series for age variations
    const ageData: any[] = [];
    for (let age = 20; age <= 50; age++) {
      const prediction = predictRiskScore(age, 3, 5, 6);
      ageData.push({
        input: age,
        prediction: prediction,
        expected: 0.2 + (age * 0.01) + (3 * 0.05) + (5 * 0.03) + (6 * 0.02)
      });
    }
    
    // Find anomalous predictions
    const anomalies: {[key: string]: number[]} = {};
    ageData.forEach(item => {
      const diff = Math.abs(item.prediction - item.expected);
      if (diff > 0.01) {
        anomalies['age'] = anomalies['age'] || [];
        anomalies['age'].push(item.input);
      }
    });
    
    setAnalysisData(ageData);
    setAnomalousInputs(anomalies);
    setIsGenerating(false);
  };
  
  // Generate data on mount
  useEffect(() => {
    generateTestData();
  }, []);

  return (
    <motion.div 
      className="max-w-screen-xl mx-auto px-4 md:px-8 py-12 mb-12"
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
        <h2 className="text-3xl font-bold tracking-tight mb-2">Model Analysis</h2>
        <p className="text-muted-foreground">Examine patterns in model predictions to identify vulnerabilities</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          className="lg:col-span-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Cpu className="mr-2 h-5 w-5 text-ctf-light" />
                Prediction Analysis
              </CardTitle>
              <CardDescription>
                Graph of model predictions by input variable
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isGenerating ? (
                <div className="flex items-center justify-center h-[350px]">
                  <p className="text-muted-foreground">Generating analysis data...</p>
                </div>
              ) : (
                <div className="h-[350px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={analysisData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="input" label={{ value: 'Age', position: 'insideBottomRight', offset: -5 }} />
                      <YAxis label={{ value: 'Risk Score', angle: -90, position: 'insideLeft' }} />
                      <Tooltip 
                        formatter={(value, name) => [Number(value).toFixed(2), name === 'prediction' ? 'Actual' : 'Expected']}
                        labelFormatter={(value) => `Age: ${value}`}
                      />
                      <Line
                        type="monotone"
                        dataKey="prediction"
                        stroke="#64ffda"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 8 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="expected"
                        stroke="#172a46"
                        strokeWidth={1}
                        strokeDasharray="5 5"
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
              
              {/* Anomaly markers */}
              {anomalousInputs.age && anomalousInputs.age.length > 0 && (
                <div className="mt-4 p-3 border border-yellow-200 bg-yellow-50 rounded-md flex items-start">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-yellow-800">Anomalies Detected</h3>
                    <p className="text-sm text-yellow-700 mt-1">
                      Unusual predictions detected at age inputs: {anomalousInputs.age.join(', ')}
                    </p>
                    <p className="text-xs text-yellow-600 mt-1">
                      Try examining these specific input values in the prediction form to investigate further.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="mr-2 h-5 w-5 text-ctf-light" />
                Model Insights
              </CardTitle>
              <CardDescription>
                Highlights from model analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Model Parameters</h3>
                <div className="bg-secondary p-3 rounded-md text-sm">
                  <div className="flex justify-between mb-1">
                    <span>Weights:</span>
                    <span className="font-mono">[0.1, 0.2, 0.3, ...]</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span>Bias:</span>
                    <span className="font-mono">0.41</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Accuracy:</span>
                    <span className="font-mono">0.875</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Suspicious Findings</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <AlertTriangle className="h-4 w-4 text-yellow-500 mr-1 flex-shrink-0 mt-0.5" />
                    <span>Non-linear response at specific age inputs</span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="h-4 w-4 text-yellow-500 mr-1 flex-shrink-0 mt-0.5" />
                    <span>Possible backdoor in model activation</span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="h-4 w-4 text-yellow-500 mr-1 flex-shrink-0 mt-0.5" />
                    <span>Encoded data in model parameters</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Investigation Steps</h3>
                <ol className="space-y-2 text-sm list-decimal pl-4">
                  <li>Test the model with age = 38</li>
                  <li>Examine response to specific combinations of inputs</li>
                  <li>Look for hidden fields in API responses</li>
                  <li>Analyze hex-encoded values in parameters</li>
                </ol>
              </div>
              
              <div className="mt-auto pt-4">
                <Button 
                  onClick={() => window.location.href = '#prediction'} 
                  className="w-full bg-ctf-medium hover:bg-ctf-dark text-white"
                >
                  Back to Prediction Form <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ModelAnalysis;
