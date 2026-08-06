import { AnalysisResult, Finding, ThreatLevel } from '../types';

const PHISHING_KEYWORDS = [
  'urgent', 'verify', 'click here', 'password', 'account locked',
  'payment failed', 'invoice', 'bank', 'security alert', 'gift',
  'reward', 'lottery', 'ceo', 'manager', 'confidential', 'immediate action',
  'update your account', 'unauthorized access'
];

const SUSPICIOUS_DOMAINS = [
  'bit.ly', 'tinyurl.com', 'goo.gl', 'ow.ly'
];

export class AnalyzerService {
  static analyzeEmail(text: string, subject: string, sender: string): AnalysisResult {
    const findings: Finding[] = [];
    let score = 0;
    const lowerText = text.toLowerCase();
    const lowerSubject = subject.toLowerCase();

    // Check Keywords
    let keywordCount = 0;
    PHISHING_KEYWORDS.forEach(keyword => {
      if (lowerText.includes(keyword) || lowerSubject.includes(keyword)) {
        keywordCount++;
        findings.push({
          category: 'Keyword Detected',
          description: `Suspicious keyword found: "${keyword}"`,
          severity: 'MEDIUM'
        });
        score += 15;
      }
    });

    // Check Urgency
    if (lowerText.includes('within 24 hours') || lowerText.includes('immediately')) {
      findings.push({
        category: 'Urgency / Fear',
        description: 'Message attempts to create a false sense of urgency.',
        severity: 'HIGH'
      });
      score += 25;
    }

    // Check Sender Domain (Simulated)
    if (sender && !sender.includes('@') || sender.endsWith('.xyz') || sender.endsWith('.info')) {
       findings.push({
        category: 'Suspicious Sender',
        description: 'The sender domain appears suspicious or untrusted.',
        severity: 'HIGH'
      });
      score += 30;
    }

    // Cap score at 100
    score = Math.min(score, 100);

    let level: ThreatLevel = 'SAFE';
    if (score > 30) level = 'SUSPICIOUS';
    if (score > 70) level = 'MALICIOUS';

    const recommendations = this.generateRecommendations(level, findings);

    return {
      id: Math.random().toString(36).substring(7),
      type: 'EMAIL',
      content: subject || 'Email Analysis',
      score,
      level,
      findings,
      recommendations,
      timestamp: new Date().toISOString()
    };
  }

  static analyzeUrl(url: string): AnalysisResult {
    const findings: Finding[] = [];
    let score = 0;
    const lowerUrl = url.toLowerCase();

    // HTTP check
    if (lowerUrl.startsWith('http://')) {
      findings.push({
        category: 'Insecure Protocol',
        description: 'URL uses HTTP instead of secure HTTPS.',
        severity: 'HIGH'
      });
      score += 40;
    }

    // Shortened URL check
    if (SUSPICIOUS_DOMAINS.some(domain => lowerUrl.includes(domain))) {
      findings.push({
        category: 'Shortened Link',
        description: 'URL uses a shortening service often used to hide malicious destinations.',
        severity: 'MEDIUM'
      });
      score += 30;
    }

    // IP Address URL
    const ipRegex = /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/;
    if (ipRegex.test(url)) {
      findings.push({
        category: 'IP Address URL',
        description: 'URL uses an IP address instead of a domain name.',
        severity: 'CRITICAL'
      });
      score += 60;
    }
    
    // Multiple subdomains
    const urlParts = url.split('.');
    if (urlParts.length > 4) {
        findings.push({
            category: 'Suspicious Subdomains',
            description: 'URL contains multiple subdomains, a common phishing tactic (e.g., login.paypal.secure.com).',
            severity: 'HIGH'
        });
        score += 30;
    }

    score = Math.min(score, 100);
    let level: ThreatLevel = 'SAFE';
    if (score > 30) level = 'SUSPICIOUS';
    if (score > 70) level = 'MALICIOUS';

    return {
      id: Math.random().toString(36).substring(7),
      type: 'URL',
      content: url,
      score,
      level,
      findings,
      recommendations: this.generateRecommendations(level, findings),
      timestamp: new Date().toISOString()
    };
  }

  private static generateRecommendations(level: ThreatLevel, findings: Finding[]): string[] {
    if (level === 'SAFE') {
      return ['The content appears safe, but always remain cautious.', 'Verify the sender if you are unsure.'];
    }
    
    const recs = ['Do not click on any links.', 'Do not download attachments.'];
    if (level === 'MALICIOUS') {
      recs.push('Block the sender immediately.', 'Report this to your IT/Security department.');
    } else {
      recs.push('Verify the request through a secondary channel (e.g., call the person).');
    }
    return recs;
  }
}
