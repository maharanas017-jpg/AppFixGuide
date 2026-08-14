export interface ErrorSolution {
  title: string;
  steps: string[];
}

export interface ErrorFAQ {
  q: string;
  a: string;
}

export interface AndroidError {
  id: string;
  title: string;
  slug: string;
  category: string;
  summary: string;
  causes: string[];
  solutions: ErrorSolution[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedTime: string; // e.g. "5-10 mins"
  symptoms?: string[];
  prevention?: string[];
  faq?: ErrorFAQ[];
  relatedErrors: string[]; // Slugs of related errors
  lastReviewed: string; // e.g. "August 2026"
  
  // Hindi Translations for EN | हिंदी switcher
  hindiTitle?: string;
  hindiSummary?: string;
  hindiCauses?: string[];
  hindiSolutions?: ErrorSolution[];
  hindiSymptoms?: string[];
  hindiPrevention?: string[];
}

export interface Guide {
  slug: string;
  title: string;
  hindiTitle?: string;
  summary: string;
  hindiSummary?: string;
  content: string; // Markdown or formatted text
  hindiContent?: string;
  category: string;
  estimatedTime: string;
  lastUpdated: string;
}

export interface UserSubmission {
  id: string;
  title: string;
  errorMessage: string;
  deviceVersion: string;
  appType: string;
  description: string;
  timestamp: number;
  status: 'pending' | 'approved' | 'rejected';
}
