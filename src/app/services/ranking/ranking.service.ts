import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ranking } from '../../models/ranking.model';

@Injectable({
  providedIn: 'root',
})
export class RankingService {
  constructor(private http: HttpClient) {}

  public getRankings(): Observable<Ranking[]> {
    return this.http.get<Ranking[]>(`rankings`);
  }
}
