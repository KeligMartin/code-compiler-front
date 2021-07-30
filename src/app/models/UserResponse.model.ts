import { Language } from '../enums/language.enum';
import { Statement } from './Statement.model';

export interface UserResponse {
  idUserResponse?: string;
  code: string;
  resolved: boolean;
  resolvedDate: Date;
  statement?: Statement;
  idStatement?: string;
  account?: Account;
  language: Language;
}
