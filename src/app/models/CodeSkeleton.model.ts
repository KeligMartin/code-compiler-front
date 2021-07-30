import { Language } from '../enums/language.enum';
import { Statement } from './Statement.model';

export interface CodeSkeleton {
  idTestCase: string;
  mainCode: string;
  language: Language;
  statement: Statement;
  isTestCase: boolean;
  expectedOutput: string;
}
