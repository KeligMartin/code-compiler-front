import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FormService } from '../../../../services/form/form.service';
import { AccountService } from '../../../../services/user/account.service';
import { first } from 'rxjs/operators';
import { AuthService } from '../../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Account } from '../../../../models/Account';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  accountGroup: FormGroup;
  constructor(
    private fb: FormBuilder,
    public formService: FormService,
    private accountService: AccountService,
    private authService: AuthService,
    private router: Router,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private snackBar: MatSnackBar
  ) {
    this.accountGroup = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(25),
        ],
      ],
      email: ['', [Validators.email, Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[?!;*@#$%^&-+=()])(?=\\S+$).{8,20}$'
          ),
        ],
      ],
      birthDate: ['', Validators.required],
      role: ['USER', Validators.required],
    });
  }

  ngOnInit(): void {}

  submit(): void {
    const account = this.accountGroup.value as Account;
    account.birthDate = new Date(
      this.ngbDateParserFormatter.format(this.birthDateCtrl.value)
    );
    this.accountService
      .register(this.accountGroup.value)
      .pipe(first())
      .subscribe(() => {
        this.openSnackBarAccountCreated();
        this.router.navigate(['/login']);
      });
  }

  openSnackBarAccountCreated(): void {
    this.snackBar.open('Votre compte a bien été créé', 'OK');
  }
  get usernameCtrl(): FormControl {
    return this.accountGroup.get('username') as FormControl;
  }

  get emailCtrl(): FormControl {
    return this.accountGroup.get('email') as FormControl;
  }
  get passwordCtrl(): FormControl {
    return this.accountGroup.get('password') as FormControl;
  }

  get birthDateCtrl(): FormControl {
    return this.accountGroup.get('birthDate') as FormControl;
  }
}
