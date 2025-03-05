
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Key, Lock, Send, Code, Terminal } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { decodeHiddenMessage } from "@/utils/modelUtils";

const SecurityTools: React.FC = () => {
  const [key, setKey] = useState("");
  const [decodedMessage, setDecodedMessage] = useState<string | null>(null);
  const [commandInput, setCommandInput] = useState("");
  const [commandOutput, setCommandOutput] = useState<string[]>([]);
  
  // Function to handle key submission
  const handleKeySubmit = () => {
    const result = decodeHiddenMessage(key);
    setDecodedMessage(result);
    
    // Add to command history
    setCommandOutput(prev => [...prev, `> Attempting to decode with key: ${key}`, 
      result ? `Decoded: ${result}` : "Decoding failed: Invalid key"]);
  };
  
  // Function to handle command execution
  const handleCommand = () => {
    let output = "";
    
    // Simple command parser for the CTF terminal
    if (commandInput.toLowerCase() === "help") {
      output = "Available commands: help, decode [key], analyze, inspect, version";
    } else if (commandInput.toLowerCase().startsWith("decode")) {
      const inputKey = commandInput.split(" ")[1];
      if (inputKey) {
        const result = decodeHiddenMessage(inputKey);
        output = result ? `Decoded message: ${result}` : "Decoding failed: Invalid key";
      } else {
        output = "Usage: decode [key]";
      }
    } else if (commandInput.toLowerCase() === "analyze") {
      output = "Running model analysis...\nVulnerabilities detected in prediction function.\nTry specific input patterns to expose anomalies.";
    } else if (commandInput.toLowerCase() === "inspect") {
      output = "Inspecting model parameters...\nSuspicious hex pattern found in activation function.\nUse 'decode' with the right key to reveal hidden data.";
    } else if (commandInput.toLowerCase() === "version") {
      output = "AI Flag Hunter v1.0\nCTF Challenge Framework";
    } else {
      output = `Command not recognized: ${commandInput}`;
    }
    
    // Update command history
    setCommandOutput(prev => [...prev, `> ${commandInput}`, output]);
    setCommandInput("");
  };

  return (
    <motion.div 
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
        <h2 className="text-3xl font-bold tracking-tight mb-2">Security Analysis Tools</h2>
        <p className="text-muted-foreground">Use these tools to analyze the ML system and expose vulnerabilities</p>
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
                <Key className="mr-2 h-5 w-5 text-ctf-light" />
                Flag Decoder
              </CardTitle>
              <CardDescription>
                Use this tool to decode hidden messages when you find the correct key
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Enter Decryption Key:</label>
                <Input
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  placeholder="e.g., 0x41492d6d6c5f637466"
                  className="font-mono"
                />
                <p className="text-xs text-muted-foreground">
                  Hint: Look for hex-encoded values or suspicious patterns in the model responses
                </p>
              </div>
              
              <Button 
                onClick={handleKeySubmit} 
                className="w-full bg-ctf-medium hover:bg-ctf-dark text-white"
              >
                <Lock className="mr-2 h-4 w-4" />
                Decode Flag
              </Button>
              
              {decodedMessage && (
                <div className="mt-4 p-4 border border-green-200 bg-green-50 rounded-md">
                  <h3 className="font-medium text-green-800 mb-1">Decoded Message:</h3>
                  <p className="font-mono text-sm">{decodedMessage}</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5 text-ctf-light" />
                Security Guide
              </CardTitle>
              <CardDescription>
                Tips for finding the hidden flag
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Adversarial Inputs</h3>
                <p className="text-sm text-muted-foreground">
                  ML models can be vulnerable to specific input patterns. Try to identify inputs that cause the model to behave differently.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Hidden Data</h3>
                <p className="text-sm text-muted-foreground">
                  Look for unusual values, patterns, or encoded strings in the model parameters and outputs.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Anomaly Patterns</h3>
                <p className="text-sm text-muted-foreground">
                  Pay attention to statistical anomalies and suspicious activities in the security logs.
                </p>
              </div>
              
              <div className="mt-4 p-3 border border-yellow-200 bg-yellow-50 rounded-md">
                <p className="text-sm text-yellow-800">
                  The flag is split into multiple parts. Find all parts and combine them to get the complete flag in the format: AI&#123;hidden_flag_1234&#125;
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Terminal className="mr-2 h-5 w-5 text-ctf-light" />
                Security Terminal
              </CardTitle>
              <CardDescription>
                Use commands to analyze the system
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="bg-ctf-dark text-white h-[350px] rounded-md p-4 font-mono text-sm overflow-y-auto">
                <div className="space-y-1">
                  <p className="text-green-400">AI Flag Hunter Security Terminal v1.0</p>
                  <p className="text-green-400">Type 'help' for available commands</p>
                  <p className="text-gray-500">-----------------------------------</p>
                  
                  {commandOutput.map((line, idx) => (
                    <p key={idx} className={line.startsWith(">") ? "text-blue-300" : "text-white"}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t p-4">
              <div className="flex w-full items-center space-x-2">
                <Code className="h-4 w-4 text-muted-foreground" />
                <Input
                  value={commandInput}
                  onChange={(e) => setCommandInput(e.target.value)}
                  placeholder="Enter command..."
                  className="flex-grow font-mono"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && commandInput.trim() !== '') {
                      handleCommand();
                    }
                  }}
                />
                <Button 
                  size="icon" 
                  onClick={handleCommand}
                  disabled={commandInput.trim() === ''}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SecurityTools;
