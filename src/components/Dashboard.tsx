
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Cpu, Database, LineChart, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { securityLogs } from "@/utils/data";

const Dashboard: React.FC = () => {
  return (
    <motion.div 
      className="max-w-screen-xl mx-auto px-4 md:px-8 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="mb-8">
        <motion.h1 
          className="text-3xl font-bold tracking-tight mb-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          Tablou de Bord Vânătorul de Flag-uri IA
        </motion.h1>
        <motion.p 
          className="text-muted-foreground text-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Bine ați venit la provocarea CTF de securitate ML. Descoperiți vulnerabilitățile și găsiți flag-ul ascuns.
        </motion.p>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Modele ML</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">3</div>
              <Cpu className="h-5 w-5 text-ctf-light" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Profiluri utilizatori</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">12</div>
              <Database className="h-5 w-5 text-ctf-light" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Evenimente securitate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">8</div>
              <ShieldAlert className="h-5 w-5 text-ctf-light" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Scor anomalie</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">0.41</div>
              <AlertTriangle className="h-5 w-5 text-ctf-light" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Instrucțiuni provocare</CardTitle>
            <CardDescription>Găsiți flag-ul ascuns exploatând vulnerabilitățile din sistemul ML</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Interacțiunea cu aplicația web</h3>
              <p className="text-sm text-muted-foreground">Interacționați cu formularul de predicție ML și explorați comportamentele modelului. Flag-ul poate fi ascuns în răspunsurile sau comportamentele modelului.</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold">Explorarea datelor</h3>
              <p className="text-sm text-muted-foreground">Analizați seturile de date disponibile pentru anomalii sau tipare ascunse care ar putea duce la flag.</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold">Analiză model & exploatare</h3>
              <p className="text-sm text-muted-foreground">Exploatați vulnerabilitățile din modelele ML prin crearea de intrări specifice care declanșează comportamente neobișnuite.</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold">Format flag</h3>
              <p className="text-sm text-muted-foreground">Flag-ul va fi în formatul AI&#123;hidden_flag_1234&#125;</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Jurnale de securitate</CardTitle>
            <CardDescription>Evenimente recente de securitate</CardDescription>
          </CardHeader>
          <CardContent className="max-h-[250px] overflow-y-auto">
            <ul className="space-y-2 text-sm">
              {securityLogs.map((log, index) => (
                <li key={index} className="pb-2 border-b border-border last:border-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <span className="font-medium">{log.event}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      log.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {log.status === 'success' ? 'succes' : 'eșec'}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    <span>ID Utilizator: {log.user_id}</span> • <span>IP: {log.ip}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{log.timestamp}</div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
