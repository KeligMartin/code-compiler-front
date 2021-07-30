import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { RankingService } from '../../../../services/ranking/ranking.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Ranking } from '../../../../models/ranking.model';
import { first } from 'rxjs/operators';
import { AuthService } from '../../../../services/auth/auth.service';
import { Unary } from '@angular/compiler';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
})
export class RankingComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['position', 'username', 'gain'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  rankings: Ranking[];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private rankingService: RankingService,
    private authService: AuthService
  ) {}

  getRankings(): void {
    this.rankingService
      .getRankings()
      .pipe(first())
      .subscribe((rankings) => {
        this.dataSource.data = rankings;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.rankings = rankings;
        this.dataSource.filterPredicate = (data: any, filter) => {
          const dataStr = JSON.stringify(data).toLowerCase();
          return dataStr.indexOf(filter) !== -1;
        };

        this.dataSource._updateChangeSubscription();
      });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getRanking(): Ranking {
    return (
      this.rankings?.filter((x) => {
        return x.username === this.authService.getUsername();
      })[0] ?? { username: this.authService.getUsername(), gain: 0 }
    );
  }
  getRankingPosition(): number {
    const ranking = this.getRanking();
    if (ranking) {
      return this.rankings?.indexOf(ranking);
    }
    return 1999;
  }

  ngOnInit(): void {
    this.getRankings();
  }
}
