import { Language } from '../enums/language.enum';
import { Statement } from './Statement.model';

export interface TestCase {
  idTestCase?: string;
  code: string;
  language: Language;
  statement?: Statement;
  idStatement?: string;
  expectedOutput: string;
}
