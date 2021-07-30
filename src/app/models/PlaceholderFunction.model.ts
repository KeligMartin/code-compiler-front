import { Language } from '../enums/language.enum';
import { Statement } from './Statement.model';

export interface PlaceholderFunction {
  idPlaceholderFunction?: string;
  code: string;
  language: Language;
  statement?: Statement;
  idStatement: string;
}
