import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Statement } from '../../../../models/Statement.model';
import { StatementService } from '../../../../services/statement/statement.service';
import { first } from 'rxjs/operators';
import { AuthService } from '../../../../services/auth/auth.service';
import { UserResponseService } from '../../../../services/userResponse/user-response.service';
import { UserResponse } from '../../../../models/UserResponse.model';
import { isNotNullOrUndefined } from 'codelyzer/util/isNotNullOrUndefined';
import { CodeQualityService } from '../../../../services/code-quality/code-quality.service';
import { Status } from '../../../../enums/status.enum';

@Component({
  selector: 'app-level-statement-tabs',
  templateUrl: './level-statement-tabs.component.html',
  styleUrls: ['./level-statement-tabs.component.scss'],
})
export class LevelStatementTabsComponent implements OnInit, OnChanges {
  @Input() idTheme: string | undefined;
  statements: Statement[] = [];
  status: Status;
  constructor(
    private statementService: StatementService,
    public authService: AuthService,
    private userResponsesService: UserResponseService,
    private codeQualityService: CodeQualityService
  ) {}

  ngOnInit(): void {
    this.initStatementLevel();
  }

  initStatementLevel(): void {
    const idTheme = this.idTheme ? this.idTheme : '';
    this.statementService
      .getStatements(idTheme)
      .pipe(first())
      .subscribe((statement) => {
        this.statements = statement;

        this.statements.map((statementItem) => {
          statementItem.userResponses = [];
          this.userResponsesService
            .getUserResponseByIdStatement(statementItem.idStatement)
            .pipe(first())
            .subscribe(
              (userResponse) => {
                statementItem.userResponses = userResponse;
                const result =
                  userResponse.find(isNotNullOrUndefined)?.idUserResponse ?? '';
                if (result !== '') {
                  this.codeQualityService
                    .getLastCodeQualityByUserResponseId(result)
                    .subscribe((res) => {
                      if (res !== null) {
                        this.status = res.status;
                      }
                    });
                }
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
    if (userResponses) {
      return userResponses.some((response) => response.resolved);
    }
    return undefined;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.idTheme) {
      this.statements = [];
      this.idTheme = changes.idTheme.currentValue;
      this.initStatementLevel();
    }
  }

  deleteStatement(idStatement: string): void {
    this.statementService
      .deleteStatement(idStatement)
      .pipe(first())
      .subscribe(
        () => {
          this.initStatementLevel();
        },
        (e) => {
          console.error(e);
        }
      );
  }

  getStatus(): string {
    return this.status?.toString() ?? '';
  }
}
