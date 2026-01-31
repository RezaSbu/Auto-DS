import React from 'react';
import { DatasetInfo } from '../types';
import { FileText, Database, List } from 'lucide-react';

interface DatasetPreviewProps {
  dataset: DatasetInfo;
  userPrompt: string;
  setUserPrompt: (prompt: string) => void;
  onAnalyze: () => void;
}

export const DatasetPreview: React.FC<DatasetPreviewProps> = ({ dataset, userPrompt, setUserPrompt, onAnalyze }) => {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-fade-in">
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700 flex items-center gap-4">
          <div className="p-3 bg-blue-900/30 rounded-lg text-blue-400">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-400">نام فایل</p>
            <p className="font-bold text-slate-100 truncate max-w-[150px]">{dataset.filename}</p>
          </div>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700 flex items-center gap-4">
          <div className="p-3 bg-purple-900/30 rounded-lg text-purple-400">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-400">تعداد سطرها</p>
            <p className="font-bold text-slate-100">{dataset.rowCount.toLocaleString()}</p>
          </div>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700 flex items-center gap-4">
          <div className="p-3 bg-emerald-900/30 rounded-lg text-emerald-400">
            <List className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-400">ستون‌ها</p>
            <p className="font-bold text-slate-100">{dataset.columns.length}</p>
          </div>
        </div>
      </div>

      {/* Table Preview */}
      <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-700 bg-slate-900/50">
          <h3 className="font-bold text-slate-200">پیش‌نمایش داده‌ها (۵ سطر اول)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-right">
            <thead className="bg-slate-900 text-slate-400">
              <tr>
                {dataset.columns.map(col => (
                  <th key={col} className="px-6 py-3 font-medium whitespace-nowrap border-b border-slate-700">
                    <div className="flex flex-col">
                      <span>{col}</span>
                      <span className="text-[10px] text-slate-500 font-normal">{dataset.columnTypes[col]}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {dataset.preview.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-700/50 transition-colors">
                  {dataset.columns.map(col => (
                    <td key={`${idx}-${col}`} className="px-6 py-3 text-slate-300 whitespace-nowrap dir-ltr">
                      {String(row[col] ?? '-')}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Prompt Input */}
      <div className="bg-slate-800 p-6 rounded-xl shadow-xl border border-brand-900 ring-1 ring-brand-800 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-500 to-indigo-500"></div>
        <label className="block text-lg font-bold text-slate-100 mb-3">
          هدف پروژه شما چیست؟
        </label>
        <p className="text-sm text-slate-400 mb-4">
          توضیح دهید دنبال چه چیزی هستید (مثلاً: پیش‌بینی قیمت خانه، دسته‌بندی مشتریان، تحلیل احساسات نظرات...)
        </p>
        <textarea
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
          placeholder="مثال: من می‌خواهم با استفاده از ستون‌های موجود، احتمال ریزش مشتری (Churn) را پیش‌بینی کنم..."
          className="w-full h-32 p-4 rounded-lg bg-slate-900 border border-slate-600 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all outline-none resize-none text-slate-200 placeholder:text-slate-600"
        />
        <div className="mt-4 flex justify-end">
          <button
            onClick={onAnalyze}
            disabled={!userPrompt.trim()}
            className="px-8 py-3 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold rounded-lg shadow-lg hover:shadow-brand-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transform active:scale-95"
          >
            <span>شروع تحلیل خودکار</span>
            <span className="text-xl">🚀</span>
          </button>
        </div>
      </div>
    </div>
  );
};