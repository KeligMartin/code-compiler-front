import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from '../../features/auth/auth.component';
import { AuthModule } from '../../features/auth/auth.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../../features/auth/auth.module').then((m) => m.AuthModule),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes), AuthModule],
  exports: [RouterModule],
})
export class AuthenticationLayoutRoutingModule {}
