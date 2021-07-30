import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from './home-layout.component';

export const homeLayoutRoutes: Routes = [
  { path: 'landing', component: HomeLayoutComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(homeLayoutRoutes)],
})
export class HomeLayoutRoutingModule {}
