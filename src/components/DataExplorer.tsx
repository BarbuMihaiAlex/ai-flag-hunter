
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, Search, Filter, AlertCircle, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { userProfiles, modelParameters, featureStatistics, securityLogs } from "@/utils/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const DataExplorer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTab, setCurrentTab] = useState("users");
  
  // Filter data based on search term
  const filteredUserProfiles = userProfiles.filter(profile => 
    profile.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    profile.interests.some(i => i.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  // Special function to format JSON with highlighting
  const formatJSON = (obj: any) => {
    return JSON.stringify(obj, null, 2);
  };

  return (
    <motion.div 
      id="data"
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
        <h2 className="text-3xl font-bold tracking-tight mb-2">Data Explorer</h2>
        <p className="text-muted-foreground">Investigate the system data for hidden patterns and anomalies</p>
      </motion.div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-5 w-5 text-ctf-light" />
                System Data Browser
              </CardTitle>
              <CardDescription>
                Explore datasets for suspicious patterns
              </CardDescription>
            </div>
            
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search data..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="users" className="w-full" onValueChange={setCurrentTab}>
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="users">User Profiles</TabsTrigger>
              <TabsTrigger value="models">Model Parameters</TabsTrigger>
              <TabsTrigger value="stats">Feature Statistics</TabsTrigger>
              <TabsTrigger value="logs">Security Logs</TabsTrigger>
            </TabsList>
            
            <TabsContent value="users" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">User Profile Database</h3>
                <div className="text-sm text-muted-foreground">
                  {filteredUserProfiles.length} results
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-muted">
                      <th className="px-4 py-2 text-left text-xs font-medium">ID</th>
                      <th className="px-4 py-2 text-left text-xs font-medium">Name</th>
                      <th className="px-4 py-2 text-left text-xs font-medium">Age</th>
                      <th className="px-4 py-2 text-left text-xs font-medium">Interests</th>
                      <th className="px-4 py-2 text-left text-xs font-medium">Risk Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredUserProfiles.map((user) => (
                      <tr key={user.id} className="hover:bg-muted/50">
                        <td className="px-4 py-2 text-sm">{user.id}</td>
                        <td className="px-4 py-2 text-sm">{user.name}</td>
                        <td className="px-4 py-2 text-sm">{user.age}</td>
                        <td className="px-4 py-2 text-sm">
                          <div className="flex flex-wrap gap-1">
                            {user.interests.map((interest, idx) => (
                              <span key={idx} className="inline-block px-2 py-1 text-xs bg-secondary rounded">
                                {interest}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-2 text-sm">
                          {user.risk_score}
                          {user.risk_score === 0.41 && (
                            <AlertCircle className="inline-block ml-1 h-3 w-3 text-yellow-500" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="models">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Linear Regression Model</h3>
                  <pre className="bg-secondary p-4 rounded-md overflow-x-auto text-xs font-mono">
                    {formatJSON(modelParameters.lr_model)}
                  </pre>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Random Forest Model</h3>
                  <pre className="bg-secondary p-4 rounded-md overflow-x-auto text-xs font-mono">
                    {formatJSON(modelParameters.rf_model)}
                  </pre>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Neural Network Model</h3>
                  <pre className="bg-secondary p-4 rounded-md overflow-x-auto text-xs font-mono">
                    {formatJSON(modelParameters.nn_model)}
                  </pre>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="stats">
              <h3 className="font-medium mb-4">Feature Statistics</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-muted">
                      <th className="px-4 py-2 text-left text-xs font-medium">Feature</th>
                      <th className="px-4 py-2 text-left text-xs font-medium">Mean</th>
                      <th className="px-4 py-2 text-left text-xs font-medium">Std Dev</th>
                      <th className="px-4 py-2 text-left text-xs font-medium">Min</th>
                      <th className="px-4 py-2 text-left text-xs font-medium">Max</th>
                      <th className="px-4 py-2 text-left text-xs font-medium">Anomaly Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {featureStatistics.map((stat, idx) => (
                      <tr key={idx} className="hover:bg-muted/50">
                        <td className="px-4 py-2 text-sm">{stat.feature}</td>
                        <td className="px-4 py-2 text-sm">{stat.mean}</td>
                        <td className="px-4 py-2 text-sm">{stat.std}</td>
                        <td className="px-4 py-2 text-sm">{stat.min}</td>
                        <td className="px-4 py-2 text-sm">{stat.max}</td>
                        <td className="px-4 py-2 text-sm">
                          {stat.anomaly_score}
                          {stat.anomaly_score >= 0.7 && (
                            <AlertCircle className="inline-block ml-1 h-3 w-3 text-yellow-500" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="logs">
              <h3 className="font-medium mb-4">Security Event Logs</h3>
              <div className="space-y-4">
                {securityLogs.map((log, idx) => (
                  <div key={idx} className="p-3 border rounded-md hover:bg-muted/20">
                    <div className="flex justify-between items-start">
                      <div className="font-medium">{log.event}</div>
                      <div className={`text-xs px-2 py-1 rounded-full ${
                        log.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {log.status}
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      <div>Timestamp: {log.timestamp}</div>
                      <div>User ID: {log.user_id}</div>
                      <div>IP Address: {log.ip}</div>
                      {log.ip === "192.168.1.41" && (
                        <div className="mt-1 text-xs bg-yellow-50 p-2 rounded border border-yellow-200">
                          Note: Multiple suspicious activities from this IP
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DataExplorer;
