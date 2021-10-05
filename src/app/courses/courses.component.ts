import { Component, OnInit } from '@angular/core';
import { DataStorageService } from './../services/data-storage.service';
import { Course } from './../shared/course.model';
import { UiServices } from './../services/ui.service';
import { CourseService } from './../services/course.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  course: Course;
  //
  isModelOpen: boolean = false;
  deleteID: number = 0;
  modelType: string = '';
  id: number = 0;
  //
  constructor(
    private dataStorageService: DataStorageService,
    private uiServices: UiServices,
    private courseService: CourseService,
    private activatedRoute: ActivatedRoute
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
    this.activatedRoute.url.subscribe((data) => {
      if (data.length !== 0 && data[0].path === 'category') {
        this.dataStorageService.fetchDataByCategory(Number(data[1].path));
      } else {
        this.dataStorageService.fetchDataByCategory(0);
      }
    });
    this.getCourseData();

    this.courseService.courseChanged.subscribe((data) => {
      this.getCourseData();
    });

    // Handle popup model, Edit & Delete Course

    this.uiServices.modelId.subscribe((id) => {
      let editCourse = this.courses.find((el) => el.id === id);
      if (editCourse !== undefined) {
        this.course = editCourse;
      }
      this.deleteID = id;
      this.isModelOpen = this.uiServices.isModelOpen;
      this.modelType = this.uiServices.modelType;
    });

    this.uiServices.modelChange.subscribe((data) => {
      this.isModelOpen = this.uiServices.isModelOpen;
      this.modelType = this.uiServices.modelType;
    });
  }

  onCloseModel() {
    this.isModelOpen = false;
  }

  //

  onDeleteCourse() {
    this.dataStorageService.deleteData(this.deleteID);
    this.uiServices.closeModel();
  }

  getCourseData() {
    this.courses = this.courseService.courses;
  }
}
