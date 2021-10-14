import { Component, OnInit } from '@angular/core';
import { Course, CourseObj } from '../../core/shared/course.model';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as CourseActions from '../../store/course/course.action';
import { FormGroup, FormControl } from '@angular/forms';

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
    // this.pagination();
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
      this.searchResultLLength = coursesState.courses.length;
    });
  }

  // Handle searching functionality
  searching() {
    this.activatedRoute.url.subscribe((url) => {
      if (!url[1]) return;
      if (url[1].path === 'search') {
        this.isSearch = true;
        this.activatedRoute.queryParams.subscribe((params) => {
          this.searchQuery = params.query;
          this.store.dispatch(
            new CourseActions.SearchCoursesAction(this.searchQuery)
          );
          this.getCoursesFromState();
        });
      }
    });
  }

  filterCoursesByCriteria(criteria: string) {
    const filteredCourses = [...this.courses];
    if (criteria === 'az') {
      filteredCourses.sort((a, b) => a.name.localeCompare(b.name));
      this.courses = filteredCourses;
    }
    if (criteria === 'za') {
      filteredCourses.sort((a, b) => b.name.localeCompare(a.name));
      this.courses = filteredCourses;
    }
    if (criteria === 'lowest') {
      filteredCourses.sort((a, b) => a.price - b.price);
      this.courses = filteredCourses;
    }
    if (criteria === 'highest') {
      filteredCourses.sort((a, b) => b.price - a.price);
      this.courses = filteredCourses;
    }
  }
}
