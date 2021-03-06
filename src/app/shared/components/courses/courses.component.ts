import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as CourseActions from '../../store/course/course.action';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Course, CourseObj } from '../../model/course.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  course: Course;
  isLoading: boolean = false;
  isLogin: boolean = false;

  // For Searching
  isSearch: boolean = false;
  searchQuery: any = '';
  searchResultLLength: number = 0;

  // For sorting
  criteria: string = '';
  filterForm: FormGroup = new FormGroup({});
  private subscriptions = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {
    this.course = CourseObj;
    this.filterForm = new FormGroup({
      filterCri: new FormControl(null),
    });

    this.filterForm.controls['filterCri'].setValue('default');
  }

  ngOnInit(): void {
    this.searching();
    if (this.courses.length === 0) {
      this.getCoursesFromState();
    }

    this.filterForm.controls['filterCri'].valueChanges.subscribe((value) => {
      this.criteria = value;
      this.filterCoursesByCriteria(this.criteria);
    });

    this.store.select('auth').subscribe((authState) => {
      this.isLogin = authState.isLogin;
    });
  }

  getCoursesFromState() {
    this.store.select('courses').subscribe((coursesState) => {
      this.isLoading = coursesState.isLoading;
      this.courses = coursesState.courses;
      this.filterCoursesByCriteria(this.criteria);
      this.searchResultLLength = coursesState.totalRecords;
    });
  }

  // Handle searching functionality
  searching() {
    this.subscriptions = this.activatedRoute.url.subscribe((url) => {
      if (!url[1]) return;
      if (url[1].path === 'search') {
        this.isSearch = true;
        this.activatedRoute.queryParams.subscribe((params) => {
          this.searchQuery = params.query;
          this.store.dispatch(
            new CourseActions.SearchCoursesAction({ query: this.searchQuery })
          );
          this.getCoursesFromState();
        });
      }
    });
  }

  filterCoursesByCriteria(criteria: string) {
    const filteredCourses = [...this.courses];
    // By Name
    if (criteria === 'az') {
      filteredCourses.sort((a, b) => a.name.localeCompare(b.name));
      this.courses = filteredCourses;
    }
    if (criteria === 'za') {
      filteredCourses.sort((a, b) => b.name.localeCompare(a.name));
      this.courses = filteredCourses;
    }
    // By Price
    if (criteria === 'lowest') {
      filteredCourses.sort((a, b) => a.price - b.price);
      this.courses = filteredCourses;
    }
    if (criteria === 'highest') {
      filteredCourses.sort((a, b) => b.price - a.price);
      this.courses = filteredCourses;
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
