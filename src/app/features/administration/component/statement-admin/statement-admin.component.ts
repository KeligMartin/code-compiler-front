import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import * as ace from 'ace-builds';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProgrammingLanguage } from '../../../../models/ProgrammingLanguage';
import { Language } from '../../../../enums/language.enum';
import { ProgrammingLanguageService } from '../../../../services/programing-language/programming-language.service';
import { TestCaseAdmin } from '../../../../models/TestCaseAdmin.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { StatementService } from '../../../../services/statement/statement.service';
import { StatementRequest } from '../../../../models/StatementRequest.model';
import { LevelService } from '../../../../services/level/level.service';
import { Level } from '../../../../models/Level.model';
import { PlaceholderFunctionService } from '../../../../services/placeholder-function/placeholder-function.service';
import { PlaceholderFunction } from '../../../../models/PlaceholderFunction.model';
import { TestCaseService } from '../../../../services/test-case/test-case.service';
import { TestCase } from '../../../../models/TestCase.model';
import { Statement } from '../../../../models/Statement.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-statement-admin',
  templateUrl: './statement-admin.component.html',
  styleUrls: ['./statement-admin.component.scss'],
})
export class StatementAdminComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('main') private main: any;
  @ViewChild('placeholder') private placeholder: any;
  programingLanguageSelected: ProgrammingLanguage;
  programmingLanguages: Array<ProgrammingLanguage> = [];
  placeholderEditor: ace.Ace.Editor;
  mainEditor: ace.Ace.Editor;
  idTheme: string = '';
  expectedOutputCtrl: FormControl = new FormControl('');
  _route: Subscription = new Subscription();
  tabSave: { [key: string]: TestCaseAdmin } = {};
  modify: number | undefined = undefined;
  statementGroup: FormGroup;
  levels: Level[] = [];
  testsCases: TestCase[];
  idStatement: string | undefined = undefined; // '5bb268f0-b7d9-456d-8019-f8b7205b08df'
  idTestCaseSelected: string = '';
  placeholderFunction: PlaceholderFunction | undefined = undefined;

  constructor(
    private route: ActivatedRoute,
    private programmingLanguageService: ProgrammingLanguageService,
    private fb: FormBuilder,
    private statementService: StatementService,
    private levelService: LevelService,
    private placeholderFunctionService: PlaceholderFunctionService,
    private testCaseService: TestCaseService
  ) {}

  ngOnDestroy(): void {
    this._route.unsubscribe();
  }

  ngOnInit(): void {
    this._route = this.route.params.subscribe((params) => {
      this.idTheme = params.idTheme;
      if (params.idStatement) {
        this.idStatement = params.idStatement;
        this.getStatement();
      }
    });
    this.programmingLanguages = this.programmingLanguageService.getProgrammingLanguages();
    this.programingLanguageSelected = this.programmingLanguageService.getProgrammingLanguage(
      Language.JAVA
    );

    this.statementGroup = this.fb.group({
      description: ['', Validators.required],
      title: ['', Validators.required],
      level: ['', Validators.required],
    });

    this.loadLevel();
  }

  loadLevel(): void {
    this.levelService
      .getLevels()
      .pipe(first())
      .subscribe((levels) => {
        this.levels = levels;
      });
  }

  getStatement(): void {
    if (this.idStatement !== undefined) {
      this.statementService
        .getStatement(this.idStatement ?? '')
        .pipe(first())
        .subscribe((statement) => {
          this.statementGroup.patchValue({
            description: statement.description,
            title: statement.title,
            level: statement.level.id,
          });
          this.idStatement = statement.idStatement;
        });
    }
  }
  ngAfterViewInit(): void {
    ace.config.set('fontSize', '14px');
    ace.config.set(
      'basePath',
      'https://unpkg.com/ace-builds@1.4.12/src-noconflict'
    );
    this.mainEditor = ace.edit(this.main.nativeElement, {});
    this.mainEditor.session.setMode('ace/mode/java');
    this.mainEditor.setTheme('ace/theme/dracula');

    this.placeholderEditor = ace.edit(this.placeholder.nativeElement, {});
    this.placeholderEditor.session.setMode('ace/mode/java');
    this.placeholderEditor.setTheme('ace/theme/dracula');

    this.getTestCase();
    this.getPlaceholderFunction();
  }

  getTestCase(): void {
    this.testCaseService
      .getTestsCases(
        this.idStatement ?? '',
        this.programingLanguageSelected.language
      )
      .pipe(first())
      .subscribe((testsCases) => {
        this.testsCases = testsCases;
      });
  }

  onChangeProgrammingLanguage(programmingLanguage: ProgrammingLanguage): void {
    this.programingLanguageSelected = programmingLanguage;
    this.getTestCase();
    this.getPlaceholderFunction();
    this.mainEditor?.session.setMode(this.programingLanguageSelected.path);
    this.placeholderEditor?.session.setMode(
      this.programingLanguageSelected.path
    );
  }

  modifyTestCase(idTestCase: string): void {
    this.testCaseService
      .getTestCase(idTestCase)
      .pipe(first())
      .subscribe((testCase) => {
        this.idTestCaseSelected = testCase.idTestCase ?? '';
        this.mainEditor.setValue(testCase.code);
        this.expectedOutputCtrl.patchValue(testCase.expectedOutput);
      });
  }

  getPlaceholderFunction(): void {
    this.placeholderFunctionService
      .getPlaceholderFunction(
        this.idStatement ?? '',
        this.programingLanguageSelected.language
      )
      .pipe(first())
      .subscribe(
        (placeholderFunction) => {
          this.placeholderFunction = placeholderFunction;
          this.placeholderEditor.setValue(placeholderFunction.code);
        },
        (e) => {
          this.placeholderFunction = undefined;
          this.placeholderEditor.setValue('');
        }
      );
  }

  createStatement(): StatementRequest {
    return {
      description: this.descriptionCtrl.value,
      idLevel: this.levelCtrl.value,
      idTheme: this.idTheme,
      title: this.titleCtrl.value,
      createdAt: '2021-02-03',
    };
  }

  submitStatement(): void {
    this.statementService
      .addStatement(this.createStatement())
      .pipe(first())
      .subscribe((resp) => {
        const routeSplit = resp.headers.get('Location').split('/');
        this.idStatement = routeSplit[routeSplit.length - 1];
      });
  }

  createPlaceholderFunction(): PlaceholderFunction {
    return {
      code: this.placeholderEditor.getValue(),
      language: this.programingLanguageSelected.language,
      idStatement: this.idStatement || '',
    };
  }

  submitPlaceholderFunction(): void {
    this.placeholderFunctionService
      .addPlaceholderFunction(this.createPlaceholderFunction())
      .pipe(first())
      .subscribe(() => {
        this.getPlaceholderFunction();
      });
  }

  updatePlaceholder(): void {
    this.placeholderFunctionService
      .updatePlaceholderFunction(
        this.placeholderFunction?.idPlaceholderFunction ?? '',
        this.createPlaceholderFunction()
      )
      .pipe(first())
      .subscribe(
        () => {
          this.getPlaceholderFunction();
        },
        (e) => {
          console.log(e);
        }
      );
  }

  updateStatement(): void {
    this.statementService
      .updateStatement(this.idStatement ?? '', this.createStatement())
      .pipe(first())
      .subscribe(() => {
        this.getStatement();
      });
  }

  newTestCase(): void {
    this.mainEditor.setValue('');
    this.expectedOutputCtrl.patchValue('');
    this.idTestCaseSelected = '';
  }

  createTestCase(): TestCase {
    return {
      idStatement: this.idStatement ?? '',
      code: this.mainEditor.getValue(),
      expectedOutput: this.expectedOutputCtrl.value,
      language: this.programingLanguageSelected.language,
    };
  }

  addTestCase(): void {
    this.testCaseService
      .addTestCase(this.createTestCase())
      .pipe(first())
      .subscribe(() => {
        this.mainEditor.setValue('');
        this.expectedOutputCtrl.patchValue('');
        this.getTestCase();
      });
  }

  deleteTestCase(idTestCase: string): void {
    this.testCaseService
      .deleteTestCase(idTestCase)
      .pipe(first())
      .subscribe(() => {
        this.getTestCase();
        this.idTestCaseSelected = '';
      });
  }

  updateTestCase(): void {
    this.testCaseService
      .updateTestCase(this.idTestCaseSelected ?? '', this.createTestCase())
      .pipe(first())
      .subscribe(
        () => {
          this.idTestCaseSelected = '';
          this.mainEditor.setValue('');
          this.expectedOutputCtrl.patchValue('');
        },
        (e) => {
          console.log(e);
        }
      );
  }

  deleteAllTestsCasesByStatementAndLanguage(): void {
    if (this.idStatement) {
      this.testCaseService
        .deleteAllByStatementAndLanguage(
          this.idStatement,
          this.programingLanguageSelected.language
        )
        .pipe(first())
        .subscribe(() => {
          this.testsCases = [];
        });
    }
  }

  deletePlaceholderFunctionById(): void {
    if (this.placeholderFunction?.idPlaceholderFunction) {
      this.placeholderFunctionService
        .deletePlaceholderFunction(
          this.placeholderFunction?.idPlaceholderFunction ?? ''
        )
        .pipe(first())
        .subscribe(() => {
          this.placeholderEditor.setValue('');
          this.placeholderFunction = undefined;
        });
    }
  }

  deletePlaceholderFunctionAndTestsCases(): void {
    this.idTestCaseSelected = '';
    this.deletePlaceholderFunctionById();
    this.deleteAllTestsCasesByStatementAndLanguage();
  }

  get titleCtrl(): FormControl {
    return this.statementGroup.get('title') as FormControl;
  }

  get descriptionCtrl(): FormControl {
    return this.statementGroup.get('description') as FormControl;
  }
  get levelCtrl(): FormControl {
    return this.statementGroup.get('level') as FormControl;
  }
}
