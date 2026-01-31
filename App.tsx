import React, { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { DatasetPreview } from './components/DatasetPreview';
import { ResultsView } from './components/ResultsView';
import { AppState, DatasetInfo, GeneratedResult } from './types';
import { parseCSV } from './utils/csvParser';
import { analyzeAndGenerate } from './services/geminiService';
import { BrainCircuit, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [dataset, setDataset] = useState<DatasetInfo | null>(null);
  const [userPrompt, setUserPrompt] = useState<string>('');
  const [result, setResult] = useState<GeneratedResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    try {
      setAppState(AppState.PROCESSING); // Show temporary loading
      const data = await parseCSV(file);
      setDataset(data);
      setAppState(AppState.PREVIEW);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطا در خواندن فایل');
      setAppState(AppState.ERROR);
    }
  };

  const handleAnalyze = async () => {
    if (!dataset || !userPrompt) return;
    
    setAppState(AppState.PROCESSING);
    setError(null);
    
    try {
      const generatedData = await analyzeAndGenerate(dataset, userPrompt);
      setResult(generatedData);
      setAppState(AppState.RESULTS);
    } catch (err) {
      console.error(err);
      setError("متاسفانه در ارتباط با هوش مصنوعی خطایی رخ داد. لطفا کلید API را بررسی کنید یا دوباره تلاش کنید.");
      setAppState(AppState.ERROR);
    }
  };

  const resetApp = () => {
    setAppState(AppState.IDLE);
    setDataset(null);
    setUserPrompt('');
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-brand-900 selection:text-white relative overflow-x-hidden">
      
      {/* Background Gradient Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-900/20 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[120px]"></div>
      </div>

      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-[#020617]/80 backdrop-blur-md border-b border-slate-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={resetApp}>
            <div className="bg-brand-600 p-2 rounded-lg shadow-lg shadow-brand-500/20 group-hover:shadow-brand-500/40 transition-all">
              <BrainCircuit className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-black bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Auto DataScience
            </h1>
          </div>
          {appState !== AppState.IDLE && (
             <button onClick={resetApp} className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                پروژه جدید
             </button>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        
        {/* Error Message */}
        {appState === AppState.ERROR && (
          <div className="mb-8 p-4 bg-red-900/20 border border-red-800 rounded-xl flex items-center gap-3 text-red-300 animate-bounce-in">
            <AlertCircle className="w-6 h-6 shrink-0" />
            <p>{error}</p>
            <button onClick={() => setAppState(dataset ? AppState.PREVIEW : AppState.IDLE)} className="mr-auto underline font-bold hover:text-white">
              بازگشت
            </button>
          </div>
        )}

        {/* State 1: IDLE / Upload */}
        {appState === AppState.IDLE && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-12 animate-fade-in">
            <div className="text-center space-y-6 max-w-3xl">
              <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
                تبدیل داده به دانش<br />
                <span className="bg-gradient-to-r from-brand-400 to-indigo-400 bg-clip-text text-transparent">با قدرت هوش مصنوعی</span>
              </h2>
              <p className="text-xl text-slate-400 leading-relaxed">
                فایل CSV خود را آپلود کنید، هدف پروژه را بگویید، و یک <span className="text-brand-300 font-semibold">نقشه راه کامل دیتا ساینس</span> به همراه <span className="text-brand-300 font-semibold">کد پایتون</span> دریافت کنید.
              </p>
            </div>
            <FileUpload onFileSelect={handleFileSelect} />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mt-12">
              <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 text-center hover:border-slate-600 transition-colors backdrop-blur-sm">
                <span className="text-3xl mb-4 block">📊</span>
                <h3 className="font-bold text-slate-200 text-lg">تحلیل اولیه (EDA)</h3>
                <p className="text-sm text-slate-500 mt-2">شناسایی خودکار نوع داده‌ها و مشکلات</p>
              </div>
               <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 text-center hover:border-slate-600 transition-colors backdrop-blur-sm">
                <span className="text-3xl mb-4 block">🗺️</span>
                <h3 className="font-bold text-slate-200 text-lg">نقشه راه هوشمند</h3>
                <p className="text-sm text-slate-500 mt-2">طراحی استراتژی اختصاصی برای پروژه</p>
              </div>
               <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 text-center hover:border-slate-600 transition-colors backdrop-blur-sm">
                <span className="text-3xl mb-4 block">🐍</span>
                <h3 className="font-bold text-slate-200 text-lg">کد پایتون آماده</h3>
                <p className="text-sm text-slate-500 mt-2">تولید اسکریپت اجرایی و استاندارد</p>
              </div>
            </div>
          </div>
        )}

        {/* State 2: Preview & Prompt */}
        {appState === AppState.PREVIEW && dataset && (
          <DatasetPreview 
            dataset={dataset} 
            userPrompt={userPrompt} 
            setUserPrompt={setUserPrompt} 
            onAnalyze={handleAnalyze} 
          />
        )}

        {/* State 3: Processing (Advanced Neural Network Animation) */}
        {appState === AppState.PROCESSING && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] w-full">
            <div className="relative w-64 h-64 mb-8">
              {/* Outer Ring */}
              <div className="absolute inset-0 border-4 border-slate-800 rounded-full animate-spin-slow"></div>
              <div className="absolute inset-0 border-t-4 border-brand-500 rounded-full animate-spin"></div>
              
              {/* Neural Network Visualization (SVG) */}
              <svg className="absolute inset-0 w-full h-full p-8" viewBox="0 0 100 100" fill="none">
                 {/* Connections */}
                 <path d="M50 50 L20 20" stroke="#334155" strokeWidth="1" className="animate-pulse" />
                 <path d="M50 50 L80 20" stroke="#334155" strokeWidth="1" className="animate-pulse delay-75" />
                 <path d="M50 50 L20 80" stroke="#334155" strokeWidth="1" className="animate-pulse delay-150" />
                 <path d="M50 50 L80 80" stroke="#334155" strokeWidth="1" className="animate-pulse delay-200" />
                 <path d="M50 50 L50 10" stroke="#334155" strokeWidth="1" className="animate-pulse delay-300" />
                 <path d="M50 50 L90 50" stroke="#334155" strokeWidth="1" className="animate-pulse delay-100" />

                 {/* Nodes */}
                 <circle cx="50" cy="50" r="12" fill="#0ea5e9" className="animate-pulse-fast">
                   <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
                 </circle>
                 
                 <circle cx="20" cy="20" r="4" fill="#64748b" className="animate-bounce" />
                 <circle cx="80" cy="20" r="4" fill="#64748b" className="animate-bounce delay-100" />
                 <circle cx="20" cy="80" r="4" fill="#64748b" className="animate-bounce delay-200" />
                 <circle cx="80" cy="80" r="4" fill="#64748b" className="animate-bounce delay-300" />
                 <circle cx="50" cy="10" r="4" fill="#64748b" className="animate-bounce delay-150" />
                 <circle cx="90" cy="50" r="4" fill="#64748b" className="animate-bounce delay-75" />
              </svg>

              {/* Brain Icon Centered */}
              <div className="absolute inset-0 flex items-center justify-center">
                 <BrainCircuit className="w-10 h-10 text-white z-10" />
              </div>
            </div>

            <div className="text-center space-y-3">
              <h3 className="text-3xl font-bold text-white tracking-tight">طراحی شبکه عصبی و نقشه راه</h3>
              <div className="flex flex-col items-center gap-2">
                 <p className="text-brand-400 font-mono text-sm animate-pulse">Initializing Data Pipeline...</p>
                 <p className="text-slate-500 text-sm">هوش مصنوعی در حال انتخاب بهترین الگوریتم‌ها بر اساس دیتای شماست</p>
              </div>
            </div>
          </div>
        )}

        {/* State 4: Results */}
        {appState === AppState.RESULTS && result && dataset && (
          <ResultsView result={result} filename={dataset.filename} />
        )}

      </main>
    </div>
  );
};

export default App;