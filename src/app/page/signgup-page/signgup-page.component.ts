import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Router } from '@angular/router';
import { removeAllWhitespace } from './../../core/shared/functions/helpers';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signgup-page',
  templateUrl: './signgup-page.component.html',
  styleUrls: ['./signgup-page.component.scss'],
})
export class SigngupPageComponent implements OnInit {
  signup: FormGroup = new FormGroup({});
  isValid: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.signup = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
      repeatPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
    });

    this.signup.statusChanges.subscribe((result) => {
      this.isValid = result === 'VALID';
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (!this.signup.valid) return;
    const username = this.signup.value.username;
    const password = this.signup.value.password;
    const repeatPassword = this.signup.value.repeatPassword;

    if (password !== repeatPassword) {
      Swal.fire({
        title: 'Something wrong here!',
        text: 'Password does not match repeat one!',
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: 'Try again!',
        cancelButtonText: 'Okay',
      });
      return;
    }

    this.authService.signup(username, password).subscribe(
      (resData) => {
        const username = removeAllWhitespace(resData.username);
        this.router.navigate([`/login`], {
          queryParams: { username: username },
        });
        Swal.fire({
          title: 'Signup successfully!',
          text: 'Please login to continue',
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'Okay!',
        });
        this.signup.reset();
      },
      (errorMessage) => {
        console.log(errorMessage);
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
}
