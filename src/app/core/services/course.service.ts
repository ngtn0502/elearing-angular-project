import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Course } from '../shared/course.model';
import { DataStorageService } from './data-storage.service';
@Injectable({
  providedIn: 'root',
})
export class CourseService implements OnInit {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  courseChanged = new Subject<boolean>();

  constructor() {}

  ngOnInit() {}

  getCourses(courses: Course[]) {
    this.courses = courses;
    this.courseChanged.next();
  }

  getCourse(id: number): Course {
    return this.courses[id - 1];
  }
}
