import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardLayoutComponent } from './dashboard-layout.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { DashboardLayoutRoutingModule } from './dashboard-layout-routing.module';

@NgModule({
  declarations: [DashboardLayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    DashboardLayoutRoutingModule,
  ],
})
export class DashboardLayoutModule {}
