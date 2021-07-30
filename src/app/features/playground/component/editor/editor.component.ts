import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import * as ace from 'ace-builds';
import { ThemeEditor } from '../../../../models/ThemeEditor';
import { ThemeEditorService } from '../../../../services/theme-editor/theme-editor.service';
import { ProgrammingLanguageService } from '../../../../services/programing-language/programming-language.service';
import { ProgrammingLanguage } from '../../../../models/ProgrammingLanguage';
import { TestCaseService } from '../../../../services/test-case/test-case.service';
import { first } from 'rxjs/operators';
import { Statement } from '../../../../models/Statement.model';
import { Language } from '../../../../enums/language.enum';
import { CompileService } from '../../../../services/compile/compile.service';
import { PlaceholderFunctionService } from '../../../../services/placeholder-function/placeholder-function.service';
import { UserResponseService } from '../../../../services/userResponse/user-response.service';
import { PlaceholderFunction } from '../../../../models/PlaceholderFunction.model';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements AfterViewInit, OnInit, OnChanges {
  @ViewChild('editor') private editor: any;
  @Input() statement: Statement;
  themeSelected: ThemeEditor;
  programingLanguageSelected: ProgrammingLanguage;
  aceEditor: ace.Ace.Editor;
  themeList: Array<ThemeEditor> = [];
  programmingLanguages: Array<ProgrammingLanguage> = [];
  functionPlaceholder: string = '';
  @Output() languageChange = new EventEmitter();
  placeholdersFunctions: PlaceholderFunction[] = [];

  constructor(
    private themeEditorService: ThemeEditorService,
    private programmingLanguageService: ProgrammingLanguageService,
    private codeSkeletonService: TestCaseService,
    private compileService: CompileService,
    private placeholderFunctionService: PlaceholderFunctionService,
    private testCaseService: TestCaseService,
    private userResponseService: UserResponseService
  ) {}

  ngOnInit(): void {
    this.themeList = this.themeEditorService.getThemesEditor();
    this.programmingLanguages = this.programmingLanguageService.getProgrammingLanguages();
    this.themeSelected = this.themeEditorService.getThemeEditor('Darcula');
    this.programingLanguageSelected = this.programmingLanguageService.getProgrammingLanguage(
      Language.JAVA
    );
    this.languageEmit();
  }

  ngAfterViewInit(): void {
    ace.config.set('fontSize', '14px');
    ace.config.set(
      'basePath',
      'https://unpkg.com/ace-builds@1.4.12/src-noconflict'
    );
    this.aceEditor = ace.edit(this.editor.nativeElement, {});
    this.aceEditor.setOptions({ enableBasicAutocompletion: true });
    this.aceEditor.session.setMode(this.programingLanguageSelected.path);
    this.aceEditor.setTheme(this.themeSelected.path);
    this.getPlaceholderFunction();
  }
  onChangeTheme(theme: ThemeEditor): void {
    this.themeSelected = theme;
    this.aceEditor?.setTheme(this.themeSelected.path);
  }

  onChangeProgrammingLanguage(programmingLanguage: ProgrammingLanguage): void {
    this.programingLanguageSelected = programmingLanguage;
    this.aceEditor?.session.setMode(this.programingLanguageSelected.path);
    this.languageEmit();
    this.getPlaceholderFunction();
  }

  getPlaceholderFunction(): void {
    this.functionPlaceholder = '';
    this.aceEditor?.session.setValue(this.functionPlaceholder);
    this.userResponseService
      .getFunctionSubmit(
        this.statement.idStatement,
        this.programingLanguageSelected.language
      )
      .pipe(first())
      .subscribe(
        (userResponse) => {
          this.functionPlaceholder = userResponse.code;
          this.aceEditor?.session.setValue(this.functionPlaceholder);
        },
        (e) => {
          this.placeholderFunctionService
            .getPlaceholderFunction(
              this.statement.idStatement,
              this.programingLanguageSelected.language
            )
            .pipe(first())
            .subscribe((placeholderFunction) => {
              this.functionPlaceholder = placeholderFunction.code;
              this.aceEditor?.session.setValue(this.functionPlaceholder);
            });
        }
      );
  }

  languageEmit(): void {
    this.languageChange.emit(this.programingLanguageSelected.language);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.statement) {
      this.statement = changes.statement.currentValue;
      this.placeholderFunctionService
        .getPlaceholdersByIdStatement(this.statement.idStatement)
        .pipe(first())
        .subscribe((placeholdersFunctions) => {
          this.placeholdersFunctions = placeholdersFunctions;
        });
      this.getPlaceholderFunction();
    }
  }
}
