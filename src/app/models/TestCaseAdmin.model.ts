import { Language } from '../enums/language.enum';

export interface TestCaseAdmin {
  language: Language;
  placeholderFunction: string;
  testsCase: Array<TestCaseItem>;
}
export interface TestCaseItem {
  expectedOutput: string;
  code: string;
}
