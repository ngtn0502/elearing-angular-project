import { Component, OnInit } from '@angular/core';
import { DataStorageService } from './../services/data-storage.service';
import { Course } from './../shared/course.model';
import { UiServices } from './../services/ui.service';

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
  //
  constructor(
    private dataStorageService: DataStorageService,
    private uiServices: UiServices
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
    this.getCourseData();

    this.dataStorageService.courseChanged.subscribe((data) => {
      this.getCourseData();
    });

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

  onDeleteCourse() {
    this.dataStorageService.deleteData(this.deleteID);
    this.uiServices.closeModel();
  }

  getCourseData() {
    this.dataStorageService.fetchData().subscribe((data) => {
      this.courses = data;
      console.log(data);
    });
  }
}
