import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PlaygroundComponent } from './playground.component';

export const dashboardRoutes: Routes = [
  {
    path: 'playground/:idStatement',
    component: PlaygroundComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(dashboardRoutes)],
})
export class PlaygroundRoutingModule {}
