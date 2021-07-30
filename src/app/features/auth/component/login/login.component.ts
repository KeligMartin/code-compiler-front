import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AccountService } from '../../../../services/user/account.service';
import { first } from 'rxjs/operators';
import { AuthService } from '../../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FormService } from '../../../../services/form/form.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  focus: any;
  credentialGroup: FormGroup;
  errorMessage: string;
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private authService: AuthService,
    public formService: FormService
  ) {
    this.errorMessage = '';
    this.credentialGroup = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  submit(): void {
    this.accountService
      .login(this.usernameCtrl?.value, this.passwordCtrl?.value)
      .pipe(first())
      .subscribe(
        (resp) => {
          const token = resp.headers.get('Authorization').slice(7);
          this.authService.setTokenAndUsername(token, this.usernameCtrl?.value);
          this.router.navigate(['listTheme']);
        },
        (e) => {
          if (e.status === 401 || e.status === 404) {
            this.errorMessage = 'Pseudo et/ou mot de passe incorrect';
          }
        }
      );
  }

  get usernameCtrl(): FormControl {
    return this.credentialGroup.get('username') as FormControl;
  }

  get passwordCtrl(): FormControl {
    return this.credentialGroup.get('password') as FormControl;
  }
}
