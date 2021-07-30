import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Account } from '../../models/Account';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(
      'auth/login',
      { username, password },
      { observe: 'response' }
    );
  }

  register(account: Account): Observable<any> {
    return this.http.post<any>('auth/register', account);
  }
}
