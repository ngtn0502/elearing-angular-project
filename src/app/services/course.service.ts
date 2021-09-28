import { Injectable, OnInit } from '@angular/core';
import { Course } from '../shared/course.model';
import { DataStorageService } from './data-storage.service';
@Injectable({
  providedIn: 'root',
})
export class CourseService implements OnInit {
  courses: Course[] = [];

  constructor(private dataStorageService: DataStorageService) {
    // this.course = {
    //   id: 0,
    //   name: '',
    //   desc: '',
    //   rating: 0,
    //   price: 0,
    //   categoryid: 0,
    //   imageUrl: '',
    //   instructor: '',
    //   productdetail: [],
    // };
  }

  ngOnInit() {
    this.dataStorageService.fetchData().subscribe((data) => {
      this.courses = data;
    });
  }

  getCourse(id: number): Course {
    return this.courses[id - 1];
  }
}
