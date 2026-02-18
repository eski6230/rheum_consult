import React from 'react';
import { DifferentialDiagnosis } from '../types';
import { CheckCircle2 } from 'lucide-react';

interface Props {
  differentials: DifferentialDiagnosis[];
}

const DiagnosisPanel: React.FC<Props> = ({ differentials }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
        <CheckCircle2 className="text-emerald-600 dark:text-emerald-400" size={20} />
        Differential Diagnosis
      </h3>
      
      <div className="space-y-3">
        {differentials.map((diff, index) => (
          <div 
            key={index} 
            className={`p-4 rounded-lg border-l-4 shadow-sm bg-white dark:bg-slate-900 transition-colors ${
              diff.likelihood === 'High' 
                ? 'border-l-red-500' 
                : diff.likelihood === 'Moderate' 
                  ? 'border-l-yellow-500' 
                  : 'border-l-slate-300 dark:border-l-slate-600'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-bold text-slate-800 dark:text-slate-100 text-lg">{diff.condition}</h4>
              <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wide ${
                 diff.likelihood === 'High' 
                 ? 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-200' 
                 : diff.likelihood === 'Moderate' 
                   ? 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-200' 
                   : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}>
                {diff.likelihood} Probability
              </span>
            </div>
            
            <p className="text-slate-600 dark:text-slate-300 text-sm mb-3 leading-relaxed">
              {diff.reasoning}
            </p>

            <div className="bg-slate-50 dark:bg-slate-800 rounded p-2 border border-slate-100 dark:border-slate-700">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase block mb-1">Key Workup:</span>
              <div className="flex flex-wrap gap-1.5">
                {diff.keyTests.map((test, i) => (
                  <span key={i} className="inline-block px-2 py-0.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded text-xs text-slate-600 dark:text-slate-200">
                    {test}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiagnosisPanel;