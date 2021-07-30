import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';
import { PlaygroundModule } from '../../features/playground/playground.module';
import { PlaygroundComponent } from '../../features/playground/playground.component';
import { ChoiceOfStatementComponent } from '../../features/choice-of-statement/choice-of-statement.component';
import { ChoiceOfStatementModule } from '../../features/choice-of-statement/choice-of-statement.module';
import { AdminGuard } from '../../guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full',
  },
  {
    path: '',
    component: PlaygroundComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../../features/playground/playground.module').then(
            (m) => m.PlaygroundModule
          ),
      },
    ],
  },
  {
    path: '',
    component: ChoiceOfStatementComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import(
            '../../features/choice-of-statement/choice-of-statement.module'
          ).then((m) => m.ChoiceOfStatementModule),
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../../features/administration/administration.module').then(
            (m) => m.AdministrationModule
          ),
        canActivate: [AuthGuard],
        canLoad: [AdminGuard],
      },
    ],
  },
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    PlaygroundModule,
    ChoiceOfStatementModule,
  ],
  exports: [RouterModule],
})
export class DashboardLayoutRoutingModule {}
