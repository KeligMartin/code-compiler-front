import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../../services/theme/theme.service';
import { Theme } from '../../../../models/Theme.model';
import { first } from 'rxjs/operators';
import { StatementService } from '../../../../services/statement/statement.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ThemeAdminComponent } from '../../../administration/component/theme-admin/theme-admin.component';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-list-theme',
  templateUrl: './list-theme.component.html',
  styleUrls: ['./list-theme.component.scss'],
})
export class ListThemeComponent implements OnInit {
  themes: Theme[] = [];
  themesSelected: Theme | undefined = undefined;
  yearSelected: number;
  years: number[];
  bsModalRef: BsModalRef;
  constructor(
    private themeService: ThemeService,
    private statementService: StatementService,
    private bsModalService: BsModalService,
    public authService: AuthService
  ) {
    this.yearSelected = new Date().getFullYear();
  }

  ngOnInit(): void {
    this.getThemes(this.yearSelected);
    this.initYears();
  }
  initYears(): void {
    this.themeService
      .getYears()
      .pipe(first())
      .subscribe((years) => {
        this.years = years;
      });
  }

  onChangeYear(year: number): void {
    this.yearSelected = year;
    this.getThemes(year);
  }

  getThemes(year: number): void {
    this.themeService
      .getThemes(year)
      .pipe(first())
      .subscribe((themes) => {
        this.themes = themes;
      });
  }

  onClickTheme(theme: any): void {
    this.themesSelected = theme;
  }

  editTheme(theme: Theme): void {
    const initialState = {
      initialState: {
        theme,
      },
    };
    this.bsModalRef = this.bsModalService.show(
      ThemeAdminComponent,
      initialState
    );
    this.bsModalRef.onHide.subscribe(() => {
      this.getThemes(this.yearSelected);
    });
  }

  addTheme(): void {
    this.bsModalRef = this.bsModalService.show(ThemeAdminComponent);
    this.bsModalRef.onHide.subscribe(() => {
      this.getThemes(this.yearSelected);
    });
  }

  deleteTheme(theme: Theme): void {
    this.themeService
      .deleteTheme(theme.idTheme ?? '')
      .pipe(first())
      .subscribe(() => {
        this.getThemes(this.yearSelected);
        this.themesSelected = undefined;
      });
  }
}
