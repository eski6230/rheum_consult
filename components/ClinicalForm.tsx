import React, { useState } from 'react';
import { ClinicalFeatures, JointPattern, OnsetSpeed } from '../types';
import { JOINTS_LIST, PATTERNS, ONSETS, COMMON_MEDS } from '../constants';
import { Plus, Check, AlertCircle, Thermometer, Activity, Eye, Zap, Flame, MoveUp, MoveDown, Snowflake, User, Wind, Lock, Droplet, Waves } from 'lucide-react';

interface Props {
  onSubmit: (data: ClinicalFeatures) => void;
  isLoading: boolean;
}

const ClinicalForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<ClinicalFeatures>({
    age: '',
    gender: 'Male',
    pattern: JointPattern.MONO,
    onset: OnsetSpeed.ACUTE,
    
    // Characteristics
    morningStiffness: false,
    betterWithActivity: false,
    worseWithActivity: false,
    traumaHistory: false,
    redness: false,
    limitedMotion: false,
    jointEdema: false,

    // Systemic / Extra-articular
    fever: false,
    psoriasis: false,
    malarRash: false,
    oralUlcers: false,
    genitalUlcers: false,
    uveitis: false,
    diarrhea: false,
    raynauds: false,
    ild: false,
    dryEyeMouth: false,

    customSigns: '',
    affectedJoints: [],
    medications: '',
    comorbidities: '',
    labs: '',
    language: 'Korean'
  });

  const toggleJoint = (joint: string) => {
    setFormData(prev => ({
      ...prev,
      affectedJoints: prev.affectedJoints.includes(joint)
        ? prev.affectedJoints.filter(j => j !== joint)
        : [...prev.affectedJoints, joint]
    }));
  };

  const addMed = (med: string) => {
    setFormData(prev => ({
      ...prev,
      medications: prev.medications ? `${prev.medications}, ${med}` : med
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const toggleBoolean = (key: keyof ClinicalFeatures) => {
    // Type assertion to allow dynamic key access for boolean fields
    setFormData(prev => ({ ...prev, [key]: !prev[key as keyof ClinicalFeatures] }));
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors duration-300">
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white flex items-center gap-2">
            <AlertCircle size={18} className="text-blue-600 dark:text-blue-400" />
            Patient Intake
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Quickly document clinical findings for analysis.</p>
        </div>
        
        {/* Language Toggle */}
        <div className="flex bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-700 p-1">
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, language: 'Korean' }))}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              formData.language === 'Korean' 
                ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300' 
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            한국어
          </button>
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, language: 'English' }))}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              formData.language === 'English' 
                ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300' 
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            English
          </button>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 space-y-8">
        
        {/* Section 0: Demographics */}
        <div className="bg-slate-50/50 dark:bg-slate-800/30 p-4 rounded-lg border border-slate-100 dark:border-slate-700">
           <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
             <User size={16} /> Demographics
           </label>
           <div className="flex gap-6 items-center">
             <div className="flex-1 max-w-[150px]">
               <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Age</label>
               <div>
                 <input 
                    type="number" 
                    value={formData.age}
                    onChange={(e) => setFormData(prev => ({...prev, age: e.target.value}))}
                    placeholder="Ex: 45"
                    className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                 />
               </div>
             </div>
             
             <div className="flex-1">
               <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Gender</label>
               <div className="flex gap-2">
                 {['Male', 'Female'].map((g) => (
                   <button
                    key={g}
                    type="button"
                    onClick={() => setFormData(prev => ({...prev, gender: g as 'Male' | 'Female'}))}
                    className={`px-4 py-2 text-sm rounded-md border transition-colors ${
                      formData.gender === g
                      ? 'bg-blue-600 text-white border-blue-600 font-medium'
                      : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600'
                    }`}
                   >
                     {g === 'Male' ? 'Male (남)' : 'Female (여)'}
                   </button>
                 ))}
               </div>
             </div>
           </div>
        </div>

        {/* Section 1: Basic Pattern */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Joint Pattern</label>
            <div className="grid grid-cols-1 gap-2">
              {PATTERNS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, pattern: opt.value })}
                  className={`px-4 py-2 text-sm rounded-lg border text-left transition-colors ${
                    formData.pattern === opt.value
                      ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-500 dark:border-blue-500 text-blue-700 dark:text-blue-300 font-medium'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 bg-white dark:bg-slate-900'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Onset & Duration</label>
            <div className="grid grid-cols-1 gap-2">
              {ONSETS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, onset: opt.value })}
                  className={`px-4 py-2 text-sm rounded-lg border text-left transition-colors ${
                    formData.onset === opt.value
                      ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-500 dark:border-indigo-500 text-indigo-700 dark:text-indigo-300 font-medium'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 bg-white dark:bg-slate-900'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Section 2: Characteristics & Signs (Renamed from Pain Characteristics) */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Characteristics & Signs</label>
          <div className="flex flex-wrap gap-3">
            {[
              { key: 'morningStiffness', label: 'Morning Stiffness >1hr', icon: <Activity size={16} /> },
              { key: 'betterWithActivity', label: 'Improved w/ Exercise', icon: <MoveUp size={16} /> },
              { key: 'worseWithActivity', label: 'Worsened w/ Exercise', icon: <MoveDown size={16} /> },
              { key: 'redness', label: 'Redness / Warmth', icon: <Flame size={16} /> },
              { key: 'jointEdema', label: 'Joint Edema / Swelling', icon: <Waves size={16} /> },
              { key: 'limitedMotion', label: 'Limited Motion (LOM)', icon: <Lock size={16} /> },
              { key: 'traumaHistory', label: 'Recent Trauma', icon: <AlertCircle size={16} /> },
            ].map((flag) => (
              <button
                key={flag.key}
                type="button"
                onClick={() => toggleBoolean(flag.key as keyof ClinicalFeatures)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                  formData[flag.key as keyof ClinicalFeatures]
                    ? 'bg-orange-50 dark:bg-orange-900/30 border-orange-200 dark:border-orange-800 text-orange-800 dark:text-orange-200 shadow-sm'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                {flag.icon}
                {flag.label}
                {formData[flag.key as keyof ClinicalFeatures] && <Check size={14} />}
              </button>
            ))}
          </div>
        </div>

        {/* Section 3: Systemic & Extra-articular */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Systemic & Extra-articular Signs</label>
          <div className="flex flex-wrap gap-3">
            {[
              { key: 'fever', label: 'Fever / Chills', icon: <Thermometer size={16} /> },
              { key: 'dryEyeMouth', label: 'Dry Eye/Mouth', icon: <Droplet size={16} /> },
              { key: 'psoriasis', label: 'Psoriasis', icon: <Zap size={16} /> },
              { key: 'uveitis', label: 'Uveitis / Red Eye', icon: <Eye size={16} /> },
              { key: 'raynauds', label: "Raynaud's", icon: <Snowflake size={16} /> },
              { key: 'oralUlcers', label: 'Oral Ulcers', icon: <span className="text-xs font-bold">O</span> },
              { key: 'genitalUlcers', label: 'Genital Ulcers', icon: <span className="text-xs font-bold">G</span> },
              { key: 'malarRash', label: 'Malar Rash', icon: <Zap size={16} /> },
              { key: 'diarrhea', label: 'Chronic Diarrhea', icon: <Activity size={16} /> },
              { key: 'ild', label: 'ILD / Dyspnea', icon: <Wind size={16} /> },
            ].map((flag) => (
              <button
                key={flag.key}
                type="button"
                onClick={() => toggleBoolean(flag.key as keyof ClinicalFeatures)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                  formData[flag.key as keyof ClinicalFeatures]
                    ? 'bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-800 text-purple-800 dark:text-purple-200 shadow-sm'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                {flag.icon}
                {flag.label}
                {formData[flag.key as keyof ClinicalFeatures] && <Check size={14} />}
              </button>
            ))}
          </div>
          
          <div className="mt-3">
            <input
              type="text"
              value={formData.customSigns}
              onChange={(e) => setFormData(prev => ({ ...prev, customSigns: e.target.value }))}
              placeholder="Other signs or symptoms (e.g. Alopecia, Nail pitting, Photosensitivity)..."
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm p-3 placeholder-slate-400 dark:placeholder-slate-600"
            />
          </div>
        </div>

        {/* Joint Selector */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Affected Joints</label>
          <div className="flex flex-wrap gap-2">
            {JOINTS_LIST.map(joint => (
              <button
                key={joint}
                type="button"
                onClick={() => toggleJoint(joint)}
                className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
                  formData.affectedJoints.includes(joint)
                    ? 'bg-slate-800 dark:bg-slate-700 text-white border-slate-800 dark:border-slate-700'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-500'
                }`}
              >
                {joint}
              </button>
            ))}
          </div>
        </div>

        {/* Narrative Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Medications</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {COMMON_MEDS.map(med => (
                <button
                  key={med}
                  type="button"
                  onClick={() => addMed(med)}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded transition-colors"
                >
                  <Plus size={12} /> {med}
                </button>
              ))}
            </div>
            <textarea
              value={formData.medications}
              onChange={e => setFormData({ ...formData, medications: e.target.value })}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm p-3 placeholder-slate-400 dark:placeholder-slate-600"
              placeholder="e.g., Lasix, Allopurinol..."
              rows={3}
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Comorbidities & Labs</label>
            <textarea
              value={formData.comorbidities}
              onChange={e => setFormData({ ...formData, comorbidities: e.target.value })}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm p-3 placeholder-slate-400 dark:placeholder-slate-600"
              placeholder="e.g., CKD, Diabetes, Previous UA 9.0, WBC 15k..."
              rows={5}
            />
          </div>
        </div>

        {/* Action Bar */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3.5 px-4 flex justify-center items-center gap-2 rounded-xl text-white font-semibold shadow-md transition-all ${
              isLoading 
                ? 'bg-slate-400 dark:bg-slate-600 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 hover:shadow-lg active:transform active:scale-[0.99]'
            }`}
          >
            {isLoading ? (
              <>Processing Clinical Data...</>
            ) : (
              <>
                <Stethoscope size={20} /> 
                {formData.language === 'Korean' ? '협진 답변 생성하기 (Generate Consult)' : 'Generate Consult Assessment'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

// Helper component for icon
const Stethoscope = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
    <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
    <circle cx="20" cy="10" r="2" />
  </svg>
);

export default ClinicalForm;