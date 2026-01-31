export interface DataRow {
  [key: string]: string | number | boolean | null;
}

export interface DatasetInfo {
  filename: string;
  rowCount: number;
  columns: string[];
  preview: DataRow[];
  columnTypes: Record<string, string>;
}

export interface RoadmapStep {
  stage: string;
  description: string;
  tasks: string[];
  algorithms?: string[];
  reasoning: string; // Why this step was chosen for this specific project
}

export interface GeneratedResult {
  roadmap: RoadmapStep[];
  pythonCode: string;
  analysisSummary: string;
}

export enum AppState {
  IDLE = 'IDLE',
  PREVIEW = 'PREVIEW',
  PROCESSING = 'PROCESSING',
  RESULTS = 'RESULTS',
  ERROR = 'ERROR'
}
