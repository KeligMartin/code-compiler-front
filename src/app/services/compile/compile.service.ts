import { Injectable } from '@angular/core';
import { Language } from '../../enums/language.enum';
import { CompileResponse } from '../../models/CompileResponse.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompileService {
  constructor(private http: HttpClient) {}

  public compile(
    language: Language,
    idStatement: string,
    code: string,
    idTestCase: string
  ): Observable<CompileResponse> {
    return this.http.post<CompileResponse>('compile', {
      language,
      idStatement,
      code,
      idTestCase,
    });
  }
}
