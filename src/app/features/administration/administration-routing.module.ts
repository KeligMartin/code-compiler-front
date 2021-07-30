import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StatementAdminComponent } from './component/statement-admin/statement-admin.component';
import { ThemeAdminComponent } from './component/theme-admin/theme-admin.component';

export const administrationRoutes: Routes = [
  {
    path: 'statement/theme/:idTheme',
    component: StatementAdminComponent,
  },
  {
    path: 'statement/theme/:idTheme/statement/:idStatement',
    component: StatementAdminComponent,
  },
  {
    path: 'theme/:idTheme',
    component: ThemeAdminComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(administrationRoutes)],
})
export class AdministrationRoutingModule {}
