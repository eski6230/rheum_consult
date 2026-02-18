import React from 'react';
import { Stethoscope, Moon, Sun } from 'lucide-react';

interface Props {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<Props> = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg text-white shadow-sm">
              <Stethoscope size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800 dark:text-white">RheumConsult AI</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:block">Internal Medicine & Rheumatology Assistant</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
             {/* Mode label removed for cleaner UI */}
             
             <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Dark Mode"
             >
               {darkMode ? <Sun size={20} /> : <Moon size={20} />}
             </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;