import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListThemeComponent } from './component/list-theme/list-theme.component';
import { LevelStatementTabsComponent } from './component/level-statement-tabs/level-statement-tabs.component';
import { RouterModule } from '@angular/router';
import { ChoiceOfStatementRoutingModule } from './choice-of-statement-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { RankingComponent } from './component/ranking/ranking.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
@NgModule({
  declarations: [
    ListThemeComponent,
    LevelStatementTabsComponent,
    RankingComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ChoiceOfStatementRoutingModule,
    MatIconModule,
    NgbModalModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  exports: [ListThemeComponent, RankingComponent],
})
export class ChoiceOfStatementModule {}
