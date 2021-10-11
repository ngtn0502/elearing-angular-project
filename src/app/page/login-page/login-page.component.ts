import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './../../core/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

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
    private activatedRoute: ActivatedRoute
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
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
  }

  onSignup() {
    this.router.navigate(['/signup']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
