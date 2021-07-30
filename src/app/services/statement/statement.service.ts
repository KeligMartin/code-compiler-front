import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Statement } from '../../models/Statement.model';
import { Observable } from 'rxjs';
import { StatementRequest } from '../../models/StatementRequest.model';

@Injectable({
  providedIn: 'root',
})
export class StatementService {
  constructor(private http: HttpClient) {}

  public getStatements(idTheme: string): Observable<Statement[]> {
    return this.http.get<Statement[]>(`statements/themes/${idTheme}`);
  }

  public addStatement(statement: StatementRequest): Observable<any> {
    return this.http.post('statements', statement, { observe: 'response' });
  }

  public updateStatement(
    idStatement: string,
    statement: StatementRequest
  ): Observable<any> {
    return this.http.put(`statements/${idStatement}`, statement);
  }
  public getStatement(idStatement: string): Observable<Statement> {
    return this.http.get<Statement>(`statements/${idStatement}`);
  }

  public deleteStatement(idStatement: string): Observable<any> {
    return this.http.delete(`statements/${idStatement}`);
  }
}
