import { Injectable } from '@angular/core';
import { ThemeEditor } from '../../models/ThemeEditor';

@Injectable({
  providedIn: 'root',
})
export class ThemeEditorService {
  themeList: ThemeEditor[] = [
    {
      name: 'Darcula',
      path: 'ace/theme/dracula',
    },
    {
      name: 'Eclipse',
      path: 'ace/theme/eclipse',
    },
    {
      name: 'Chrome',
      path: 'ace/theme/chrome',
    },
    {
      name: 'Merbivore soft',
      path: 'ace/theme/merbivore_soft',
    },
    {
      name: 'Xcode',
      path: 'ace/theme/xcode',
    },
  ];

  constructor() {}

  getThemesEditor(): Array<ThemeEditor> {
    return this.themeList;
  }

  getThemeEditor(name: string): ThemeEditor {
    return this.themeList.filter((theme) => {
      return theme.name === name;
    })[0];
  }
}
