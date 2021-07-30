import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FormService } from '../../../../services/form/form.service';
import { ThemeService } from '../../../../services/theme/theme.service';
import { first } from 'rxjs/operators';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Theme } from '../../../../models/Theme.model';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-theme-admin',
  templateUrl: './theme-admin.component.html',
  styleUrls: ['./theme-admin.component.scss'],
})
export class ThemeAdminComponent implements OnInit {
  themeGroup: FormGroup;
  theme: Theme | undefined;

  constructor(
    private fb: FormBuilder,
    public formService: FormService,
    private themeService: ThemeService,
    public bsModalRef: BsModalRef,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.themeGroup = this.fb.group({
      title: ['', Validators.required],
      dateAffected: ['', Validators.required],
    });
    if (this.theme) {
      const date = this.theme.dateAffected.toString();
      const tabDate = date.split('-').map((x) => parseInt(x, 10));

      const year = tabDate[0];
      const month = tabDate[1];
      const day = tabDate[2];

      this.themeGroup.patchValue({
        title: this.theme.title,
        dateAffected: {
          year,
          day,
          month,
        },
      });
    }
  }

  updateTheme(): void {
    const dateFormat = `${this.dateAffectedCtrl.value.year}-${this.dateAffectedCtrl.value.month}-${this.dateAffectedCtrl.value.day}`;
    const date = this.datePipe.transform(dateFormat, 'yyyy-MM-dd') ?? '';

    this.themeService
      .updateTheme(this.theme?.idTheme ?? '', {
        title: this.titleCtrl.value,
        dateAffected: date,
      })
      .pipe(first())
      .subscribe(
        () => {
          this.bsModalRef.hide();
        },
        (e) => {
          console.log(e);
        }
      );
  }

  addTheme(): void {
    const dateFormat = `${this.dateAffectedCtrl.value.year}-${this.dateAffectedCtrl.value.month}-${this.dateAffectedCtrl.value.day}`;
    const date = this.datePipe.transform(dateFormat, 'yyyy-MM-dd') ?? '';
    this.themeService
      .addTheme({
        title: this.titleCtrl.value,
        dateAffected: date,
      })
      .pipe(first())
      .subscribe(() => {
        this.bsModalRef.hide();
      });
  }

  get titleCtrl(): FormControl {
    return this.themeGroup.get('title') as FormControl;
  }

  get dateAffectedCtrl(): FormControl {
    return this.themeGroup.get('dateAffected') as FormControl;
  }
}
