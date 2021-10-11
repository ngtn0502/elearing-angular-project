import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

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
      resetPassword: new FormControl(null, [
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
    const resetPassword = this.signup.value.resetPassword;

    if (password !== resetPassword) {
      alert('Password does not match repeat password!');
    }

    console.log(username, password);

    this.authService.signup(username, password).subscribe(
      (resData) => {
        console.log(resData);
        const username = resData.username.replace(/ /g, '');
        this.router.navigate([`/login`], {
          queryParams: { username: username },
        });
      },
      (error) => {
        console.log(error);
      }
    );
    this.signup.reset();
  }
}
