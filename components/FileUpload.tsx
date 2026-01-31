import React, { useRef } from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        onFileSelect(file);
      } else {
        alert("لطفا فایل CSV بارگذاری کنید");
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div 
      className="w-full max-w-2xl mx-auto border-2 border-dashed border-slate-700 rounded-xl bg-slate-900/50 hover:bg-slate-800 transition-all cursor-pointer p-12 text-center group relative overflow-hidden"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-brand-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleChange} 
        accept=".csv" 
        className="hidden" 
      />
      <div className="flex flex-col items-center justify-center gap-4 relative z-10">
        <div className="p-4 bg-slate-800 rounded-full shadow-lg group-hover:shadow-brand-500/20 group-hover:scale-110 transition-all duration-300 border border-slate-700">
          <Upload className="w-10 h-10 text-brand-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-200 mb-2">فایل CSV خود را اینجا رها کنید</h3>
          <p className="text-slate-400">یا برای انتخاب کلیک کنید</p>
        </div>
        <div className="text-xs text-slate-500 mt-4 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
          Maximum size: 50MB
        </div>
      </div>
    </div>
  );
};