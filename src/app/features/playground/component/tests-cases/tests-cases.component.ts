import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CompileResponse } from '../../../../models/CompileResponse.model';
import { TestCaseService } from '../../../../services/test-case/test-case.service';
import { Statement } from '../../../../models/Statement.model';
import { Language } from '../../../../enums/language.enum';
import { first } from 'rxjs/operators';
import { TestCase } from '../../../../models/TestCase.model';
import { UserResponse } from '../../../../models/UserResponse.model';

@Component({
  selector: 'app-tests-cases',
  templateUrl: './tests-cases.component.html',
  styleUrls: ['./tests-cases.component.scss'],
})
export class TestsCasesComponent implements OnInit, OnChanges {
  @Input() statement: Statement;
  @Input() compileResponses: CompileResponse[];
  @Input() language: Language;

  testsCases: TestCase[] = [];
  constructor(private testCaseService: TestCaseService) {}

  ngOnInit(): void {
    this.initTestsCases();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.compileResponses) {
      this.compileResponses = changes.compileResponses.currentValue;
    }
    if (changes.language) {
      this.language = changes.language.currentValue;
      this.initTestsCases();
    }
    if (changes.statement) {
      this.statement = changes.statement.currentValue;
      this.initTestsCases();
    }
    // TODO update resolved pour les tests cases
    // You can also use categoryId.previousValue and
    // categoryId.firstChange for comparing old and new valsues
  }

  replaceAll(value: string): string {
    return value.replace('<br/>', '\n');
  }
  initTestsCases(): void {
    this.testCaseService
      .getTestsCases(this.statement?.idStatement ?? '', this.language)
      .pipe(first())
      .subscribe((testsCases) => {
        this.testsCases = testsCases;
      });
  }

  getCompileResponse(index: number): CompileResponse | undefined {
    if (this.compileResponses[index]) {
      return this.compileResponses[index];
    }
    return undefined;
  }
  isResolved(userResponses: UserResponse[] | undefined): boolean | undefined {
    if (userResponses && !this.compileResponses[0]) {
      return userResponses.some(
        (response) => response.resolved && response.language === this.language
      );
    }
    return undefined;
  }
}
