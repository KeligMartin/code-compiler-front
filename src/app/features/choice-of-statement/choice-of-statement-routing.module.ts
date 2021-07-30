import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListThemeComponent } from './component/list-theme/list-theme.component';
import { RouterModule, Routes } from '@angular/router';
import { ChoiceOfStatementComponent } from './choice-of-statement.component';

export const choiceOfStatementRoutes: Routes = [
  { path: 'listTheme', component: ChoiceOfStatementComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(choiceOfStatementRoutes)],
})
export class ChoiceOfStatementRoutingModule {}
