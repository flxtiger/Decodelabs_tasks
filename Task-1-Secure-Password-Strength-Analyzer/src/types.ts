export interface PasswordCheckResponse {
  score: number;
  strength: 'Weak' | 'Medium' | 'Strong';
  feedback: string[];
  checks: {
    length: boolean;
    uppercase: boolean;
    lowercase: boolean;
    number: boolean;
    special: boolean;
  };
  details: {
    length: number;
    entropy: number;
    crackTime: string;
    complexityScore: string;
  };
  isCommon: boolean;
}
