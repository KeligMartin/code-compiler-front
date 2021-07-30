import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Theme } from '../../models/Theme.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor(private http: HttpClient) {}

  public getThemes(year: number): Observable<Theme[]> {
    return this.http.get<Theme[]>(`themes/years/${year}`);
  }

  public getYears(): Observable<number[]> {
    return this.http.get<number[]>('themes/years');
  }

  public addTheme(theme: Theme): Observable<any> {
    return this.http.post(`themes`, theme, { observe: 'response' });
  }

  public updateTheme(idTheme: string, theme: Theme): Observable<any> {
    return this.http.put(`themes/${idTheme}`, theme, { observe: 'response' });
  }
  public deleteTheme(idTheme: string): Observable<any> {
    return this.http.delete(`themes/${idTheme}`);
  }
}
