import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration.component';
import { StatementAdminComponent } from './component/statement-admin/statement-admin.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ThemeAdminComponent } from './component/theme-admin/theme-admin.component';
import {
  NgbDatepickerModule,
  NgbModal,
  NgbModalModule,
} from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    AdministrationComponent,
    StatementAdminComponent,
    ThemeAdminComponent,
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    NgbDatepickerModule,
    SharedModule,
  ],
  providers: [DatePipe],
})
export class AdministrationModule {}
