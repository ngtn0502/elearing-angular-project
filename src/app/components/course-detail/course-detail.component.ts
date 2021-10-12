import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Store } from '@ngrx/store';
import { DataStorageService } from '../../core/services/data-storage.service';
import { Course, CourseObj } from '../../core/shared/course.model';
import * as CourseActions from '../../store/course/course.action';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss'],
})
export class CourseDetailComponent implements OnInit {
  course: Course;
  ratingArray: any[] = [];
  isLoading: boolean = false;

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
      this.isLoading = courseState.isLoading;
      if (courseState.course.name !== '') {
        this.course = courseState.course;
        this.ratingArray = new Array(courseState.course.rating);
      }
    });
  }
}