import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import * as AuthActions from '../../../../shared/store/auth/auth.action';

// @ts-ignore
import { stringify } from 'querystring';
import { Store } from '@ngrx/store';
import { AppState } from './../../../../shared/store/app.reducer';
import { removeAllWhitespace } from 'src/app/shared/functions/helpers';

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

    this.store.dispatch(
      new AuthActions.LoginAction({
        username: username,
        password: password,
      })
    );
  }

  onSignup() {
    this.router.navigate(['/signup']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
