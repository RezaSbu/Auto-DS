import Papa from 'papaparse';
import { DatasetInfo, DataRow } from '../types';

export const parseCSV = (file: File): Promise<DatasetInfo> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      // preview: 100, // REMOVED: We need to parse the full file to get accurate row count
      worker: true, // Use a worker thread so the UI doesn't freeze on large files
      complete: (results) => {
        if (results.errors.length > 0 && results.data.length === 0) {
          reject(new Error("Error parsing CSV: " + results.errors[0].message));
          return;
        }

        const data = results.data as DataRow[];
        const columns = results.meta.fields || [];
        
        // Simple type inference based on the first few rows (to avoid iterating everything for types)
        const columnTypes: Record<string, string> = {};
        const sampleSize = Math.min(data.length, 100);
        
        if (data.length > 0) {
          columns.forEach(col => {
            // Check a few rows to determine type more accurately
            let isNumeric = true;
            let isDate = true;
            
            for(let i=0; i<sampleSize; i++) {
                const val = data[i][col];
                if (val === null || val === '') continue; // skip empties
                if (isNaN(Number(val))) isNumeric = false;
                if (!Date.parse(String(val))) isDate = false;
            }
            
            // If all checked samples were empty, default to text, otherwise infer
            if (isNumeric) columnTypes[col] = 'Numeric';
            else if (isDate) columnTypes[col] = 'Datetime';
            else columnTypes[col] = 'Categorical/Text';
          });
        }
        
        resolve({
          filename: file.name,
          rowCount: data.length, // Now returns the full count
          columns,
          preview: data.slice(0, 5), // We only store the first 5 for display
          columnTypes
        });
      },
      error: (error) => {
        reject(error);
      }
    });
  });
};