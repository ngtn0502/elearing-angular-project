import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { removeAllWhitespace } from 'src/app/core/shared/functions/helpers';
import Swal from 'sweetalert2';
import * as AuthActions from '../../store/auth/auth.action';

// @ts-ignore
import { stringify } from 'querystring';
import { Store } from '@ngrx/store';
import { AppState } from './../../store/app.reducer';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  isValid: boolean = false;

  username: string = '';
  subscription: Subscription = new Subscription();
  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.subscription = this.activatedRoute.queryParams.subscribe(
      (queryParams) => {
        this.username = queryParams.username;
      }
    );

    this.loginForm = new FormGroup({
      username: new FormControl(this.username, [
        Validators.required,
        Validators.minLength(4),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
    });

    this.loginForm.statusChanges.subscribe((result) => {
      this.isValid = result === 'VALID';
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (!this.loginForm.valid) return;
    const username = removeAllWhitespace(this.loginForm.value.username);
    const password = removeAllWhitespace(this.loginForm.value.password);
    this.authService.login(username, password).subscribe(
      (resData) => {
        const userLogin = JSON.stringify(resData);
        localStorage.setItem('userLogin', userLogin);
        this.store.dispatch(new AuthActions.LoginSuccessAction(userLogin));
        this.router.navigate(['/']);
        Swal.fire({
          title: 'Login successfully!',
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'Okay!',
        });
      },
      (errorMessage) => {
        Swal.fire({
          title: 'Something wrong here!',
          text: errorMessage,
          icon: 'error',
          showCancelButton: true,
          confirmButtonText: 'Try again!',
          cancelButtonText: 'Okay',
        });
      }
    );
  }

  onSignup() {
    this.router.navigate(['/signup']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
