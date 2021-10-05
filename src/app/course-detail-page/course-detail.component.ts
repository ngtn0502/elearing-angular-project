import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { DataStorageService } from '../services/data-storage.service';
import { Course } from '../shared/course.model';

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
    private dataStorageService: DataStorageService
  ) {
    this.course = {
      id: 0,
      name: '',
      description: '',
      rating: 0,
      price: 0,
      categoryId: 0,
      imageUrl: '',
      instructor: '',
      productdetail: [],
    };
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.dataStorageService.fetchDataByID(params.id).subscribe((data) => {
        console.log(data);
        this.ratingArray = new Array(data.rating);
        this.course = data;
      });
    });
  }
}
