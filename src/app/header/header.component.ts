import { Component, OnInit } from '@angular/core';
import { UiServices } from './../services/ui.service';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import { filter } from 'rxjs/operators';
import * as fromApp from '../store/app.reducer';
import * as UIActions from '../store/ui/ui.action';
import { Store } from '@ngrx/store';
import * as CourseActions from '../store/course/course.action';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isOnEditPage: boolean = true;
  searchForm: FormGroup = new FormGroup({});

  constructor(private router: Router, private store: Store<fromApp.AppState>) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (event.url.includes('products')) {
          this.isOnEditPage = false;
        } else {
          this.isOnEditPage = true;
        }
      }
    });
    this.searchForm = new FormGroup({
      search: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  onAddNewCourse() {
    this.store.dispatch(new UIActions.OpenModelAction({ type: 'new', id: 0 }));
  }

  onSearchCourses() {
    const query = this.searchForm.value.search;
    this.router.navigate(['/course', 'search'], {
      queryParams: { query: query },
    });
  }
}
