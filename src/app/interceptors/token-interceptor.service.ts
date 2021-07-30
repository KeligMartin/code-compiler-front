import { Injectable, Injector } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(
    private injector: Injector,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  intercept(req: any, next: any): Observable<HttpEvent<any>> {
    const authService = this.injector.get(AuthService);

    const tokenizedReq = req.clone({
      url: environment.baseUrl + '/api/' + req.url,
      setHeaders: {
        Authorization: `Bearer ${authService.getToken()}`,
        'Content-Type': 'application/json',
        Accept: '*/*',
        'Access-Control-Allow-Origin': '*',
      },
    });
    return next
      .handle(tokenizedReq)
      .pipe(catchError((x) => this.handleAuthError(x)));
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    switch (err.status) {
      case 403:
        if (this.authService.loggedIn()) {
          localStorage.removeItem('token');
          this.router.navigateByUrl(`/landing`);
        }

        break;
      case 500:
        this.snackBar.open(err.message, 'OK');
        break;
    }

    return throwError(err);
  }
}
