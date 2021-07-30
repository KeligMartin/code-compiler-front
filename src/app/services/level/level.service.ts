import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Level } from '../../models/Level.model';

@Injectable({
  providedIn: 'root',
})
export class LevelService {
  constructor(private httpClient: HttpClient) {}

  getLevels(): Observable<Level[]> {
    return this.httpClient.get<Level[]>('levels');
  }
}
