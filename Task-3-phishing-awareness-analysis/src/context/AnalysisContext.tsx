import React, { createContext, useContext, useState, useEffect } from 'react';
import { AnalysisResult } from '../types';

interface AnalysisContextType {
  history: AnalysisResult[];
  addResult: (result: AnalysisResult) => void;
  clearHistory: () => void;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export function AnalysisProvider({ children }: { children: React.ReactNode }) {
  const [history, setHistory] = useState<AnalysisResult[]>(() => {
    const saved = localStorage.getItem('phishshield_history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    // Provide some mock initial data so the dashboard isn't completely empty
    return [];
  });

  useEffect(() => {
    localStorage.setItem('phishshield_history', JSON.stringify(history));
  }, [history]);

  const addResult = (result: AnalysisResult) => {
    setHistory((prev) => [result, ...prev]);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <AnalysisContext.Provider value={{ history, addResult, clearHistory }}>
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis() {
  const context = useContext(AnalysisContext);
  if (context === undefined) {
    throw new Error('useAnalysis must be used within an AnalysisProvider');
  }
  return context;
}
