import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaygroundComponent } from './playground.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { PlaygroundRoutingModule } from './playground-routing.module';
import { EditorComponent } from './component/editor/editor.component';
import { LevelStatementNavComponent } from './component/level-statement-nav/level-statement-nav.component';
import { TestsCasesComponent } from './component/tests-cases/tests-cases.component';
import { StatementComponent } from './component/statement/statement.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { CodeQualityComponent } from './component/code-quality/code-quality.component';

@NgModule({
  declarations: [
    PlaygroundComponent,
    EditorComponent,
    LevelStatementNavComponent,
    TestsCasesComponent,
    StatementComponent,
    CodeQualityComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    PlaygroundRoutingModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    SharedModule,
    FormsModule,
    MatStepperModule,
  ],
})
export class PlaygroundModule {}
