import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserResponse } from '../../models/UserResponse.model';
import { Observable } from 'rxjs';
import { Language } from '../../enums/language.enum';

@Injectable({
  providedIn: 'root',
})
export class UserResponseService {
  constructor(private http: HttpClient) {}

  public getFunctionSubmit(
    idStatement: string,
    language: Language
  ): Observable<UserResponse> {
    return this.http.post<UserResponse>('userResponses/search', {
      language,
      idStatement,
    });
  }

  public getUserResponseByIdStatement(
    idStatement: string
  ): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(
      `userResponses/user/statement/${idStatement}`
    );
  }
  public addUserResponse(userResponse: UserResponse): Observable<any> {
    return this.http.post<any>('userResponses', userResponse, {observe: 'response'});
  }
}
