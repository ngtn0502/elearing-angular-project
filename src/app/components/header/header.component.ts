import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserData } from 'src/app/core/shared/userData.model';

import * as AuthActions from '../../store/auth/auth.action';
import * as UIActions from '../../store/ui/ui.action';
import * as fromApp from '../../store/app.reducer';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isOnEditPage: Boolean = false;
  searchForm: FormGroup = new FormGroup({});
  isValid: boolean = true;

  isLogin: boolean = false;
  userData: UserData | null = { username: '', accessToken: '' };

  constructor(private router: Router, private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      search: new FormControl('', [
        Validators.required,
        this.noWhitespaceValidator,
      ]),
    });

    this.store.select('auth').subscribe((authState) => {
      this.isLogin = authState.isLogin;
      this.userData = authState.UserData;
    });
  }

  onAddNewCourse() {
    this.router.navigate(['/']);
    this.store.dispatch(new UIActions.OpenModalAction({ type: 'new', id: 0 }));
  }

  onSearchCourses() {
    // Handle empty input searching
    if (!this.searchForm.valid) {
      this.isValid = false;
      this.searchForm.reset();
      setTimeout(() => {
        this.isValid = true;
      }, 3000);
      return;
    }
    if (this.searchForm.value.search.trim().length === 0) {
      this.router.navigate(['/']);
      return;
    }

    const query = this.searchForm.value.search;
    this.router.navigate(['/course', 'search'], {
      queryParams: { query: query },
    });
  }

  onLogout() {
    this.isLogin = false;
    this.store.dispatch(new AuthActions.LogoutAction());
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }
}
