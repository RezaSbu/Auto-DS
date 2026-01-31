import React, { useState } from 'react';
import { GeneratedResult } from '../types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { generateNotebookJSON } from '../utils/notebookGenerator';
import { Download, CheckCircle, Code, Map, Copy, Check } from 'lucide-react';

interface ResultsViewProps {
  result: GeneratedResult;
  filename: string;
}

export const ResultsView: React.FC<ResultsViewProps> = ({ result, filename }) => {
  const [activeTab, setActiveTab] = useState<'roadmap' | 'code'>('roadmap');
  const [copied, setCopied] = useState(false);

  const downloadNotebook = () => {
    const jsonContent = generateNotebookJSON(result.pythonCode);
    const blob = new Blob([jsonContent], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `AutoDS_${filename.replace('.csv', '')}.ipynb`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(result.pythonCode);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto pb-20">
      
      {/* Header Summary */}
      <div className="bg-gradient-to-r from-indigo-900 to-slate-900 border border-indigo-500/30 text-white p-8 rounded-2xl shadow-2xl mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <h2 className="text-2xl font-bold mb-4 relative z-10 text-indigo-300">🎉 تحلیل تکمیل شد</h2>
        <p className="text-slate-300 leading-relaxed text-lg relative z-10">
          {result.analysisSummary}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-slate-700 pb-1">
        <button
          onClick={() => setActiveTab('roadmap')}
          className={`pb-3 px-4 font-bold flex items-center gap-2 transition-all border-b-2 ${
            activeTab === 'roadmap' 
            ? 'border-brand-500 text-brand-400' 
            : 'border-transparent text-slate-500 hover:text-slate-300'
          }`}
        >
          <Map className="w-5 h-5" />
          نقشه راه شخصی‌سازی شده
        </button>
        <button
          onClick={() => setActiveTab('code')}
          className={`pb-3 px-4 font-bold flex items-center gap-2 transition-all border-b-2 ${
            activeTab === 'code' 
            ? 'border-brand-500 text-brand-400' 
            : 'border-transparent text-slate-500 hover:text-slate-300'
          }`}
        >
          <Code className="w-5 h-5" />
          کد Python تولید شده
        </button>
      </div>

      {/* Content */}
      <div className="bg-slate-900 rounded-xl shadow-lg border border-slate-700 min-h-[500px] overflow-hidden">
        
        {activeTab === 'roadmap' && (
          <div className="p-8 space-y-8">
             {/* Timeline */}
             <div className="relative border-r-2 border-slate-700 mr-4 space-y-12">
                {result.roadmap.map((step, idx) => (
                  <div key={idx} className="relative pr-8 group">
                    {/* Dot */}
                    <div className="absolute -right-[9px] top-0 w-4 h-4 rounded-full bg-brand-500 ring-4 ring-slate-900 shadow-sm group-hover:bg-brand-400 transition-colors"></div>
                    
                    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-brand-500/50 transition-all hover:shadow-lg hover:shadow-brand-500/10">
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                        <h3 className="text-xl font-bold text-slate-100">
                          {idx + 1}. {step.stage}
                        </h3>
                        <span className="text-xs font-mono bg-indigo-900/50 text-indigo-300 px-2 py-1 rounded border border-indigo-700">
                          {step.algorithms ? step.algorithms.join(', ') : 'General'}
                        </span>
                      </div>
                      
                      <p className="text-slate-300 mb-4">{step.description}</p>
                      
                      <div className="bg-slate-900/50 p-4 rounded border border-slate-700/50 mb-4">
                        <p className="text-sm text-slate-400 font-semibold mb-2">💡 چرا این مرحله انتخاب شد؟</p>
                        <p className="text-sm text-slate-300 italic">"{step.reasoning}"</p>
                      </div>

                      <div>
                        <p className="font-bold text-sm text-slate-400 mb-2">وظایف اصلی:</p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {step.tasks.map((task, tIdx) => (
                            <li key={tIdx} className="flex items-start gap-2 text-sm text-slate-400">
                              <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                              <span>{task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        )}

        {activeTab === 'code' && (
          <div className="p-0 flex flex-col h-full">
            <div className="bg-slate-950 text-slate-400 p-4 flex justify-between items-center border-b border-slate-800">
              <span className="font-mono text-sm opacity-70">generated_script.py</span>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={copyCodeToClipboard}
                  className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-md ${
                    copied 
                    ? 'bg-slate-700 text-emerald-400' 
                    : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                  }`}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'کپی شد' : 'کپی کد'}
                </button>

                <button
                  onClick={downloadNotebook}
                  className="bg-emerald-700 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shadow-md"
                >
                  <Download className="w-4 h-4" />
                  دانلود .ipynb
                </button>
              </div>
            </div>
            <div className="text-sm font-mono flex-grow overflow-auto" dir="ltr">
              <SyntaxHighlighter 
                language="python" 
                style={vscDarkPlus}
                customStyle={{ margin: 0, padding: '2rem', backgroundColor: '#0f172a', minHeight: '500px' }}
                showLineNumbers={true}
              >
                {result.pythonCode}
              </SyntaxHighlighter>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};