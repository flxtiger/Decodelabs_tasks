export type ThreatLevel = 'SAFE' | 'SUSPICIOUS' | 'MALICIOUS';

export interface AnalysisResult {
  id: string;
  type: 'EMAIL' | 'URL' | 'HEADER' | 'QR';
  content: string;
  score: number;
  level: ThreatLevel;
  findings: Finding[];
  recommendations: string[];
  timestamp: string;
}

export interface Finding {
  category: string;
  description: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
}
