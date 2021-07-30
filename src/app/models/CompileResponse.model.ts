export interface CompileResponse {
  output: string;
  error: boolean;
  resolved: boolean;
  expectedOutput: string;
  executionTime: number;
}
