import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Language } from '../../enums/language.enum';
import { TestCase } from '../../models/TestCase.model';

@Injectable({
  providedIn: 'root',
})
export class TestCaseService {
  constructor(private http: HttpClient) {}

  getTestsCases(
    idStatement: string,
    language: Language
  ): Observable<TestCase[]> {
    return this.http.post<TestCase[]>('testCase/testsCases', {
      idStatement,
      language,
    });
  }

  getTestCase(idTestCase: string): Observable<TestCase> {
    return this.http.get<TestCase>(`testCase/${idTestCase}`);
  }
  addTestCase(testCase: TestCase): Observable<any> {
    return this.http.post('testCase', testCase);
  }

  updateTestCase(idTestCase: string, testCase: TestCase): Observable<any> {
    return this.http.put(`testCase/${idTestCase}`, testCase);
  }
  deleteTestCase(idTestCase: string): Observable<any> {
    return this.http.delete(`testCase/${idTestCase}`);
  }

  deleteAllByStatementAndLanguage(
    idStatement: string,
    language: Language
  ): Observable<any> {
    return this.http.delete(
      `testCase/statement/${idStatement}/language/${language}`
    );
  }
}
