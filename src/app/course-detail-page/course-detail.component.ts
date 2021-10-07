import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Store } from '@ngrx/store';
import { DataStorageService } from '../services/data-storage.service';
import { Course, CourseObj } from '../shared/course.model';
import * as CourseActions from '../store/course/course.action';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss'],
})
export class CourseDetailComponent implements OnInit {
  course: Course;
  ratingArray: any[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private dataStorageService: DataStorageService,
    private store: Store<fromApp.AppState>
  ) {
    this.course = CourseObj;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (!!params.id) {
        this.store.dispatch(new CourseActions.GetCourseAction(params.id));
      }
    });
    this.store.select('courses').subscribe((courseState) => {
      if (courseState.course.name !== '') {
        this.course = courseState.course;
        this.ratingArray = new Array(courseState.course.rating);
      }
    });
  }
}
