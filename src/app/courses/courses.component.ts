import { Component, OnInit } from '@angular/core';
import { DataStorageService } from './../services/data-storage.service';
import { Course, CourseObj } from './../shared/course.model';
import { UiServices } from './../services/ui.service';
import { CourseService } from './../services/course.service';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as CourseActions from '../store/course/course.action';

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
    private dataStorageService: DataStorageService,
    private uiServices: UiServices,
    private courseService: CourseService,
    private activatedRoute: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {
    this.course = CourseObj;
  }

  ngOnInit(): void {
    // Handle searching functionality
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
}
