
import React from 'react';
import { motion } from 'framer-motion';

// Import components
import Header from '@/components/Header';
import Dashboard from '@/components/Dashboard';
import PredictionForm from '@/components/PredictionForm';
import DataExplorer from '@/components/DataExplorer';
import SecurityTools from '@/components/SecurityTools';
import ModelAnalysis from '@/components/ModelAnalysis';

const Index = () => {
  return (
    <motion.div 
      className="min-h-screen flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Header />
      
      <main className="flex-grow">
        <Dashboard />
        <PredictionForm />
        <DataExplorer />
        <SecurityTools />
        <ModelAnalysis />
      </main>
      
      <footer className="border-t py-6 px-4 md:px-8 mt-4">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <div>AI-Flag Hunter CTF Challenge</div>
          <div className="mt-2 md:mt-0">Designed for web application security analysis</div>
        </div>
      </footer>
    </motion.div>
  );
};

export default Index;
