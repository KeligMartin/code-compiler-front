import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { StatementService } from '../../services/statement/statement.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Statement } from '../../models/Statement.model';
import { first } from 'rxjs/operators';
import { CompileResponse } from '../../models/CompileResponse.model';
import { EditorComponent } from './component/editor/editor.component';
import { TestCaseService } from '../../services/test-case/test-case.service';
import { CompileService } from '../../services/compile/compile.service';
import { TestCase } from '../../models/TestCase.model';
import { UserResponseService } from '../../services/userResponse/user-response.service';
import { CodeQualityService } from '../../services/code-quality/code-quality.service';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss'],
})
export class PlaygroundComponent implements OnInit, OnDestroy {
  _route: Subscription = new Subscription();
  statement: Statement;
  @ViewChild(EditorComponent) editorComponent: EditorComponent;
  compileResponses: CompileResponse[] = [];
  loading: boolean = false;
  codeQualityId: string;
  constructor(
    private statementService: StatementService,
    private route: ActivatedRoute,
    private testCaseService: TestCaseService,
    private compileService: CompileService,
    private userResponseService: UserResponseService,
    private codeQualityService: CodeQualityService
  ) {}

  ngOnInit(): void {
    this._route = this.route.params.subscribe((params) => {
      this.statementService
        .getStatement(params.idStatement)
        .pipe(first())
        .subscribe((statement) => {
          this.statement = statement;
          this.statement.userResponses = [];
          this.getUserResponses();
        });
    });
  }

  public getUserResponses(): void {
    this.userResponseService
      .getUserResponseByIdStatement(this.statement.idStatement)
      .pipe(first())
      .subscribe((userResponse) => {
        this.statement.userResponses = userResponse;
      });
  }

  compileClick(): void {
    if (this.editorComponent) {
      this.loading = true;
      this.compileResponses = [];
      this.testCaseService
        .getTestsCases(
          this.statement.idStatement,
          this.editorComponent.programingLanguageSelected.language
        )
        .pipe(first())
        .subscribe((testsCases) => {
          this.compile(testsCases, 0);
        });
    }
  }

  compile(testCases: TestCase[], index: number): void {
    const testCase = testCases[index];

    if (testCases.length > index) {
      this.compileService
        .compile(
          this.editorComponent.programingLanguageSelected.language,
          this.statement.idStatement,
          this.editorComponent.aceEditor.getValue(),
          testCase.idTestCase ?? ''
        )
        .pipe(first())
        .subscribe(
          (compileResponse) => {
            this.compileResponses.push(compileResponse);
            if (!compileResponse.error) {
              index += 1;
              this.compile(testCases, index);
            } else {
              this.saveUserResponse();
              this.loading = false;
            }
          },
          (e) => {
            this.saveUserResponse();
            this.loading = false;
          }
        );
    } else {
      this.saveUserResponse();
      this.loading = false;
    }
  }

  public saveUserResponse(): void {
    this.userResponseService
      .addUserResponse({
        language: this.editorComponent.programingLanguageSelected.language,
        code: this.editorComponent.aceEditor.getValue(),
        resolved: this.isResolved(),
        idStatement: this.statement.idStatement,
        resolvedDate: new Date('2020-02-03'),
      })
      .pipe(first())
      .subscribe(
        (next) => {
          const route = next.headers.get('Location').split('/');
          const userResponseId = route[route.length - 1];
          if (
            this.editorComponent.programingLanguageSelected.language.toString() ===
              'JAVA' ||
            this.editorComponent.programingLanguageSelected.language.toString() ===
              'PYTHON'
          ) {
            this.codeQualityService
              .addCodeQuality(userResponseId)
              .subscribe((res) => {
                const codeQualityLocation = res.headers
                  .get('Location')
                  .split('/');
                this.codeQualityId =
                  codeQualityLocation[codeQualityLocation?.length - 1];
              });
          }
          this.getUserResponses();
        },
        (e) => {
          console.error(e);
        }
      );
  }

  isResolved(): boolean {
    return !this.compileResponses.some((x) => !x.resolved);
  }
  ngOnDestroy(): void {
    this._route.unsubscribe();
  }
}
