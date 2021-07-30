import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AccountService } from '../services/user/account.service';
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatSnackBarModule,
} from '@angular/material/snack-bar';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { NavbarLoggedComponent } from './navbar-logged/navbar-logged.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavbarLoggedComponent],
  imports: [
    CommonModule,
    MatSnackBarModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    RouterModule,
  ],
  providers: [
    AccountService,
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: { verticalPosition: 'top', duration: 2500 },
    },
  ],
  exports: [NavbarLoggedComponent],
})
export class SharedModule {}
