import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CodeQuality } from '../../models/code-quality.model';

@Injectable({
  providedIn: 'root',
})
export class CodeQualityService {
  constructor(private http: HttpClient) {}

  public getCodeQuality(id: string): Observable<CodeQuality> {
    return this.http.get<CodeQuality>(`code-qualities/${id}`);
  }

  public getLastCodeQualityByUserResponseId(userResponseId: string): Observable<CodeQuality> {
    return this.http.get<CodeQuality>(`code-qualities/user-responses/${userResponseId}/last`);
  }

  public addCodeQuality(
    userResponseId: string
  ): Observable<any> {
    return this.http.post('code-qualities', {userResponseId}, {
      observe: 'response',
    });
  }
}
