export enum JointPattern {
  MONO = 'Monoarticular',
  OLIGO = 'Oligoarticular (2-4)',
  POLY = 'Polyarticular (>4)'
}

export enum OnsetSpeed {
  ACUTE = 'Acute (<6 weeks)',
  CHRONIC = 'Chronic (>6 weeks)',
  EPISODIC = 'Episodic/Recurrent'
}

export interface ClinicalFeatures {
  // Demographics
  age: string;
  gender: 'Male' | 'Female';

  pattern: JointPattern;
  onset: OnsetSpeed;
  
  // Characteristics (formerly Pain Characteristics)
  morningStiffness: boolean;
  betterWithActivity: boolean; // Inflammatory
  worseWithActivity: boolean;  // Mechanical
  traumaHistory: boolean;
  redness: boolean;
  limitedMotion: boolean; // LOM
  jointEdema: boolean; // New: Edema/Swelling
  
  // Systemic / Extra-articular
  fever: boolean;
  psoriasis: boolean;
  malarRash: boolean;
  oralUlcers: boolean;
  genitalUlcers: boolean;
  uveitis: boolean;
  diarrhea: boolean; // IBD features
  raynauds: boolean;
  ild: boolean;
  dryEyeMouth: boolean; // Sicca
  
  // Free text for others
  customSigns: string;

  affectedJoints: string[];
  medications: string;
  comorbidities: string;
  labs: string;
  
  language: 'English' | 'Korean';
}

export interface DifferentialDiagnosis {
  condition: string;
  likelihood: 'High' | 'Moderate' | 'Low';
  reasoning: string;
  keyTests: string[];
}

export interface ConsultResponse {
  differentials: DifferentialDiagnosis[];
  consultNote: string;
  suggestedPlan: string[];
}