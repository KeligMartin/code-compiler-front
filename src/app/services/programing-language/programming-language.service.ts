import { Injectable } from '@angular/core';
import { ProgrammingLanguage } from '../../models/ProgrammingLanguage';
import { Language } from '../../enums/language.enum';

@Injectable({
  providedIn: 'root',
})
export class ProgrammingLanguageService {
  programmingLanguages: ProgrammingLanguage[] = [
    {
      language: Language.C,
      name: 'C/C++',
      path: 'ace/mode/c_cpp',
    },
    {
      language: Language.JAVA,
      name: 'Java',
      path: 'ace/mode/java',
    },
    {
      language: Language.PYTHON,
      name: 'Python',
      path: 'ace/mode/python',
    },
  ];

  constructor() {}

  getProgrammingLanguages(): Array<ProgrammingLanguage> {
    return this.programmingLanguages;
  }

  getProgrammingLanguage(language: Language): ProgrammingLanguage {
    return this.programmingLanguages.filter((languageItem) => {
      return language === languageItem.language;
    })[0];
  }
}
