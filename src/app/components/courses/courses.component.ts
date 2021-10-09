import { Component, OnInit } from '@angular/core';
import { Course, CourseObj } from '../../core/shared/course.model';
import { CourseService } from '../../core/services/course.service';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as CourseActions from '../../store/course/course.action';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  courses: Course[] | null = null;
  course: Course;
  // For Searching
  isSearch: boolean = false;
  searchQuery: any = '';
  searchResultLLength: number = 0;

  constructor(
    private courseService: CourseService,
    private activatedRoute: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {
    this.course = CourseObj;
  }

  ngOnInit(): void {
    this.searching();
    this.pagination();

    if (this.courses === null) {
      this.getCoursesFromState();
    }
  }

  getCourseData() {
    this.courses = this.courseService.courses;
  }

  getCoursesFromState() {
    this.store.select('courses').subscribe((coursesState) => {
      this.courses = coursesState.courses;
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

  // Handle paging functionality
  pagination() {
    this.activatedRoute.url.subscribe((url) => {
      const params = this.activatedRoute.snapshot.queryParams;
      if (params.pageNumber && params.pageNumber !== 0) {
        console.log(Number(url[1].path), params.pageNumber, params.pageSize);

        this.store.dispatch(
          new CourseActions.PaginationCoursesAction({
            id: Number(url[1].path),
            pageNumber: params.pageNumber,
            pageSize: params.pageSize,
          })
        );
      }
    });
  }
}
