import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeLayoutComponent } from './home-layout.component';
import { HomeLayoutRoutingModule } from './home-layout-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HomeLayoutComponent],
  imports: [CommonModule, HomeLayoutRoutingModule, RouterModule],
})
export class HomeLayoutModule {}
