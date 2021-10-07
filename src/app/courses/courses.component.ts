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
  courses: Course[] = [];
  course: Course;
  isSearch: boolean = false;
  searchQuery: string = '';

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
    this.activatedRoute.url.subscribe((url) => {
      if (!url[1]) return;
      if (url[1].path === 'search') {
        this.isSearch = true;
        this.activatedRoute.queryParams.subscribe((params) => {
          this.searchQuery = params.query;
        });
      }
    });

    // this.store.dispatch(new CourseActions.GetCoursesAction());
    this.store.select('courses').subscribe((coursesState) => {
      this.courses = coursesState.courses;
    });
  }

  getCourseData() {
    this.courses = this.courseService.courses;
  }
}
