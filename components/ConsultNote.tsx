import React, { useState } from 'react';
import { FileText, Copy, Check, Lightbulb, AlertTriangle } from 'lucide-react';

interface Props {
  note: string;
  plan: string[];
}

const ConsultNote: React.FC<Props> = ({ note, plan }) => {
  const [copied, setCopied] = useState(false);

  // When copying, include the plan/pearls at the bottom
  const fullText = `${note}\n\n[Clinical Pearls & Safety Checks]:\n${plan.map(p => `- ${p}`).join('\n')}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col h-full transition-colors duration-300">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50 rounded-t-xl">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <FileText className="text-blue-600 dark:text-blue-400" size={20} />
          Draft Consult Note
        </h3>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            copied 
              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' 
              : 'bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600'
          }`}
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? 'Copied!' : 'Copy to Clipboard'}
        </button>
      </div>

      {/* Note Content */}
      <div className="p-6 overflow-y-auto flex-grow">
        <div className="prose prose-sm max-w-none prose-slate dark:prose-invert">
          {/* Main SOAP Note */}
          <div className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-950/50 p-5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
            {note}
          </div>
          
          {/* Clinical Pearls & Safety Checks Section */}
          <div className="mt-8 border-t border-slate-100 dark:border-slate-800 pt-6">
            <h4 className="text-md font-bold text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2">
              <Lightbulb className="text-amber-500 dark:text-amber-400" size={18} />
              Clinical Reminders & Safety Checks
            </h4>
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 border border-amber-100 dark:border-amber-900/50">
              <ul className="space-y-3">
                {plan.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-200">
                    <AlertTriangle size={14} className="text-amber-600 dark:text-amber-500 mt-1 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-xs text-slate-500 dark:text-slate-400 rounded-b-xl">
        * Review output carefully. Ensure HLA-B5801 status is checked before Allopurinol initiation and verify renal function for NSAIDs.
      </div>
    </div>
  );
};

export default ConsultNote;