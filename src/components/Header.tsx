
import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Shield, Terminal } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <motion.header 
      className="w-full bg-white/80 backdrop-blur-md border-b border-border sticky top-0 z-50 px-4 md:px-8"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-screen-xl mx-auto py-4 flex justify-between items-center">
        <motion.div 
          className="flex items-center space-x-2"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <Shield className="h-8 w-8 text-ctf-light" />
          <div>
            <h1 className="text-xl font-semibold tracking-tight">AI-Flag Hunter</h1>
            <p className="text-xs text-muted-foreground">ML Security CTF Challenge</p>
          </div>
        </motion.div>
        
        <motion.nav 
          className="hidden md:flex items-center space-x-6 text-sm font-medium"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <a href="#dashboard" className="flex items-center space-x-1 hover:text-ctf-light transition-colors">
            <Terminal className="h-4 w-4" />
            <span>Dashboard</span>
          </a>
          <a href="#prediction" className="flex items-center space-x-1 hover:text-ctf-light transition-colors">
            <Cpu className="h-4 w-4" />
            <span>ML Prediction</span>
          </a>
          <a href="#data" className="flex items-center space-x-1 hover:text-ctf-light transition-colors">
            <Shield className="h-4 w-4" />
            <span>Security Analysis</span>
          </a>
        </motion.nav>
      </div>
    </motion.header>
  );
};

export default Header;
