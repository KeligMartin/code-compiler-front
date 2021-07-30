import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { StatementService } from '../../../../services/statement/statement.service';
import { Statement } from '../../../../models/Statement.model';
import { first } from 'rxjs/operators';
import { UserResponseService } from '../../../../services/userResponse/user-response.service';
import { UserResponse } from '../../../../models/UserResponse.model';
import { CompileResponse } from '../../../../models/CompileResponse.model';
import { Language } from '../../../../enums/language.enum';
import compile = WebAssembly.compile;

@Component({
  selector: 'app-level-statement-nav',
  templateUrl: './level-statement-nav.component.html',
  styleUrls: ['./level-statement-nav.component.scss'],
})
export class LevelStatementNavComponent implements OnInit, OnChanges {
  @Input() idTheme: string = ' ';
  @Input() statement: Statement | undefined;
  @Input() language: Language = Language.JAVA;
  @Input() compileResponses: CompileResponse[] = [];
  statementLevel: Statement[] = [];

  constructor(
    private statementService: StatementService,
    private userResponseService: UserResponseService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.compileResponses) {
      this.compileResponses = changes.compileResponses.currentValue;
    }
    if (changes.language) {
      this.compileResponses = [];
      this.initStatementLevel();
      this.language = changes.language.currentValue;
    }
  }

  ngOnInit(): void {
    this.initStatementLevel();
  }

  initStatementLevel(): void {
    this.statementService
      .getStatements(this.idTheme)
      .pipe(first())
      .subscribe((statement) => {
        this.statementLevel = statement;
        this.statementLevel.map((statementItem) => {
          statementItem.userResponses = [];
          this.userResponseService
            .getUserResponseByIdStatement(statementItem.idStatement)
            .pipe(first())
            .subscribe(
              (userResponse) => {
                statementItem.userResponses = userResponse;
                return statementItem;
              },
              (e) => {
                return statementItem;
              }
            );
        });
      });
  }

  isResolved(userResponses: UserResponse[] | undefined): boolean | undefined {
    if (
      userResponses &&
      userResponses.filter((x) => x.language === this.language).length !== 0
    ) {
      return userResponses.some(
        (response) => response.resolved && response.language === this.language
      );
    }
    return undefined;
  }

  isResolvedCompilation(): boolean | undefined {
    if (this.compileResponses.length !== 0) {
      return !this.compileResponses.some((x) => !x.resolved);
    }
    return undefined;
  }
}
