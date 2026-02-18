import { JointPattern, OnsetSpeed } from './types';

export const JOINTS_LIST = [
  'Knee (Right)', 'Knee (Left)',
  'Ankle (Right)', 'Ankle (Left)',
  'MTP 1 (Right)', 'MTP 1 (Left)',
  'Hip (Right)', 'Hip (Left)',
  'Wrist (Right)', 'Wrist (Left)',
  'MCPs', 'PIPs', 'DIPs',
  'Elbow', 'Shoulder', 'Spine/SI'
];

export const PATTERNS = [
  { value: JointPattern.MONO, label: 'Monoarticular (1 joint)' },
  { value: JointPattern.OLIGO, label: 'Oligoarticular (2-4 joints)' },
  { value: JointPattern.POLY, label: 'Polyarticular (>4 joints)' },
];

export const ONSETS = [
  { value: OnsetSpeed.ACUTE, label: 'Acute (<6 weeks)' },
  { value: OnsetSpeed.CHRONIC, label: 'Chronic (>6 weeks)' },
  { value: OnsetSpeed.EPISODIC, label: 'Episodic / Recurrent' },
];

export const COMMON_MEDS = [
  'Diuretics (Thiazide/Loop)',
  'Aspirin (Low dose)',
  'Immunosuppressants',
  'Antibiotics',
  'Urate lowering therapy'
];