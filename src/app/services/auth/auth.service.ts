import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getRole(): any {
    return this.getPayload().auth;
  }
  getPayload(): any {
    if (this.getToken()) {
      return jwt_decode(this.getToken() ?? '');
    }
    return {};
  }

  isAdmin(): boolean {
    return this.getPayload().auth === 'ROLE_ADMIN';
  }
  setTokenAndUsername(token: string, username: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
  }

  logoutUser(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }
  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
