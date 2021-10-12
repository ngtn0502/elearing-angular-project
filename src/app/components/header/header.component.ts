import { Component, OnInit } from '@angular/core';
import { UiServices } from '../../core/services/ui.service';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import { filter } from 'rxjs/operators';
import * as fromApp from '../../store/app.reducer';
import * as UIActions from '../../store/ui/ui.action';
import { Store } from '@ngrx/store';
import * as CourseActions from '../../store/course/course.action';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserLogin } from 'src/app/core/shared/userLogin.model';
import Swal from 'sweetalert2';

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
  userLogin: UserLogin = { username: '', accessToken: '' };

  constructor(private router: Router, private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      search: new FormControl('', [
        Validators.required,
        this.noWhitespaceValidator,
      ]),
    });

    const item = localStorage.getItem('userLogin');
    if (typeof item !== 'undefined' && item !== null) {
      this.userLogin = JSON.parse(item);
      this.isLogin = true;
    }
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
    localStorage.clear();
    Swal.fire({
      title: 'Logout successfully!',
      icon: 'success',
      showCancelButton: false,
      confirmButtonText: 'Okay!',
    });
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }
}
