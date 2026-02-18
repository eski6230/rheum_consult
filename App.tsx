import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ClinicalForm from './components/ClinicalForm';
import DiagnosisPanel from './components/DiagnosisPanel';
import ConsultNote from './components/ConsultNote';
import { ClinicalFeatures, ConsultResponse } from './types';
import { generateRheumAssessment } from './services/geminiService';
import { ArrowLeft, Loader2, AlertTriangle } from 'lucide-react';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ConsultResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(() => {
    // Check local storage or system preference on initial load
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('darkMode');
      if (savedMode) return savedMode === 'true';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  const handleFormSubmit = async (data: ClinicalFeatures) => {
    setLoading(true);
    setError(null);
    try {
      const response = await generateRheumAssessment(data);
      setResult(response);
    } catch (err) {
      setError("Failed to generate assessment. Please ensure a valid API Key is available.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 pb-20">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg flex items-center gap-2">
            <span className="font-bold">Error:</span> {error}
          </div>
        )}

        {!result ? (
          <div className="max-w-3xl mx-auto">
             <div className="mb-8 text-center">
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Rapid Rheumatology Consult</h2>
              <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
                Input clinical markers to generate differentials and draft notes for joint pain consults.
              </p>
              
              <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg text-sm text-amber-800 dark:text-amber-200 flex items-start gap-2 justify-center max-w-2xl mx-auto text-left md:text-center">
                 <AlertTriangle size={16} className="mt-0.5 shrink-0" />
                 <span><strong>Disclaimer:</strong> This tool is for educational and assistance purposes only. All clinical decisions must be based on your own professional judgment and direct patient evaluation.</span>
              </div>
            </div>
            <ClinicalForm onSubmit={handleFormSubmit} isLoading={loading} />
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in duration-500">
            <button
              onClick={handleReset}
              className="flex items-center text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-4"
            >
              <ArrowLeft size={16} className="mr-1" /> Back to Patient Intake
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Analysis */}
              <div className="lg:col-span-5 space-y-6">
                <DiagnosisPanel differentials={result.differentials} />
              </div>

              {/* Right Column: Note & Plan */}
              <div className="lg:col-span-7">
                <div className="sticky top-20">
                   <ConsultNote note={result.consultNote} plan={result.suggestedPlan} />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {loading && (
        <div className="fixed inset-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
          <Loader2 className="animate-spin text-blue-600 dark:text-blue-400 mb-4" size={48} />
          <p className="text-lg font-semibold text-slate-700 dark:text-slate-200">Analyzing Clinical Data...</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">Comparing against common and rare rheumatic conditions</p>
        </div>
      )}
    </div>
  );
};

export default App;