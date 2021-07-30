import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { AuthenticationLayoutComponent } from './authentication-layout/authentication-layout.component';
import { HomeLayoutComponent } from './home-layout/home-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AuthenticationLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./authentication-layout/authentication-layout.module').then(
            (m) => m.AuthenticationLayoutModule
          ),
      },
    ],
  },
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./dashboard-layout/dashboard-layout.module').then(
            (m) => m.DashboardLayoutModule
          ),
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./home-layout/home-layout.module').then(
            (m) => m.HomeLayoutModule
          ),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
