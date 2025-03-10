
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
    setCommandOutput(prev => [...prev, `> Încercare de decodare cu cheia: ${key}`, 
      result ? `Decodat: ${result}` : "Decodare eșuată: Cheie invalidă"]);
  };
  
  // Function to handle command execution
  const handleCommand = () => {
    let output = "";
    
    // Simple command parser for the CTF terminal
    if (commandInput.toLowerCase() === "help" || commandInput.toLowerCase() === "ajutor") {
      output = "Comenzi disponibile: help/ajutor, decode [cheie], analyze/analizează, inspect/inspectează, version/versiune";
    } else if (commandInput.toLowerCase().startsWith("decode")) {
      const inputKey = commandInput.split(" ")[1];
      if (inputKey) {
        const result = decodeHiddenMessage(inputKey);
        output = result ? `Mesaj decodat: ${result}` : "Decodare eșuată: Cheie invalidă";
      } else {
        output = "Utilizare: decode [cheie]";
      }
    } else if (commandInput.toLowerCase() === "analyze" || commandInput.toLowerCase() === "analizează") {
      output = "Rulare analiză model...\nVulnerabilități detectate în funcția de predicție.\nÎncercați tipare specifice de intrare pentru a expune anomalii.";
    } else if (commandInput.toLowerCase() === "inspect" || commandInput.toLowerCase() === "inspectează") {
      output = "Inspectare parametri model...\nTipar hex suspect găsit în funcția de activare.\nFolosiți 'decode' cu cheia potrivită pentru a dezvălui date ascunse.";
    } else if (commandInput.toLowerCase() === "version" || commandInput.toLowerCase() === "versiune") {
      output = "Vânătorul de Flag-uri IA v1.0\nFramework Provocare CTF";
    } else {
      output = `Comandă nerecunoscută: ${commandInput}`;
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
        <h2 className="text-3xl font-bold tracking-tight mb-2">Instrumente de analiză securitate</h2>
        <p className="text-muted-foreground">Folosiți aceste instrumente pentru a analiza sistemul ML și a expune vulnerabilități</p>
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
                Decodor Flag
              </CardTitle>
              <CardDescription>
                Folosiți acest instrument pentru a decoda mesajele ascunse când găsiți cheia corectă
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Introduceți cheia de decriptare:</label>
                <Input
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  placeholder="ex., 0x41492d6d6c5f637466"
                  className="font-mono"
                />
                <p className="text-xs text-muted-foreground">
                  Indiciu: Căutați valori codificate hex sau tipare suspecte în răspunsurile modelului
                </p>
              </div>
              
              <Button 
                onClick={handleKeySubmit} 
                className="w-full bg-ctf-medium hover:bg-ctf-dark text-white"
              >
                <Lock className="mr-2 h-4 w-4" />
                Decodează Flag
              </Button>
              
              {decodedMessage && (
                <div className="mt-4 p-4 border border-green-200 bg-green-50 rounded-md">
                  <h3 className="font-medium text-green-800 mb-1">Mesaj decodat:</h3>
                  <p className="font-mono text-sm">{decodedMessage}</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5 text-ctf-light" />
                Ghid de securitate
              </CardTitle>
              <CardDescription>
                Sfaturi pentru găsirea flag-ului ascuns
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Intrări adversariale</h3>
                <p className="text-sm text-muted-foreground">
                  Modelele ML pot fi vulnerabile la tipare specifice de intrare. Încercați să identificați intrările care determină modelul să se comporte diferit.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Date ascunse</h3>
                <p className="text-sm text-muted-foreground">
                  Căutați valori neobișnuite, tipare sau șiruri codificate în parametrii și ieșirile modelului.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Tipare anomalii</h3>
                <p className="text-sm text-muted-foreground">
                  Acordați atenție anomaliilor statistice și activităților suspecte din jurnalele de securitate.
                </p>
              </div>
              
              <div className="mt-4 p-3 border border-yellow-200 bg-yellow-50 rounded-md">
                <p className="text-sm text-yellow-800">
                  Flag-ul este împărțit în mai multe părți. Găsiți toate părțile și combinați-le pentru a obține flag-ul complet în formatul: AI&#123;hidden_flag_1234&#125;
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
                Terminal securitate
              </CardTitle>
              <CardDescription>
                Folosiți comenzi pentru a analiza sistemul
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="bg-ctf-dark text-white h-[350px] rounded-md p-4 font-mono text-sm overflow-y-auto">
                <div className="space-y-1">
                  <p className="text-green-400">Terminal Securitate Vânătorul de Flag-uri IA v1.0</p>
                  <p className="text-green-400">Tastați 'help' sau 'ajutor' pentru comenzile disponibile</p>
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
                  placeholder="Introduceți comanda..."
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
