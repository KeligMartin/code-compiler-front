import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlaceholderFunction } from '../../models/PlaceholderFunction.model';
import { Language } from '../../enums/language.enum';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PlaceholderFunctionService {
  constructor(private http: HttpClient) {}

  public getPlaceholderFunction(
    idStatement: string,
    language: Language
  ): Observable<PlaceholderFunction> {
    return this.http.post<PlaceholderFunction>(
      `placeholderFunction/statement/language`,
      { idStatement, language }
    );
  }

  public addPlaceholderFunction(
    placeholderFunction: PlaceholderFunction
  ): Observable<any> {
    return this.http.post('placeholderFunction', placeholderFunction);
  }

  public updatePlaceholderFunction(
    idPlaceholder: string,
    placeholderFunction: PlaceholderFunction
  ): Observable<any> {
    return this.http.put(
      `placeholderFunction/${idPlaceholder}`,
      placeholderFunction
    );
  }
  public deletePlaceholderFunction(idPlaceholder: string): Observable<any> {
    return this.http.delete(`placeholderFunction/${idPlaceholder}`);
  }

  public getPlaceholdersByIdStatement(
    idStatement: string
  ): Observable<PlaceholderFunction[]> {
    return this.http.get<PlaceholderFunction[]>(
      `placeholderFunction/statement/${idStatement}`
    );
  }
}
