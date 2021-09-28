import { Component, Input, OnInit } from '@angular/core';
import { Course } from './../../shared/course.model';
import { UiServices } from './../../services/ui.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  @Input() course: Course;

  constructor(private uiServices: UiServices) {
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

  ngOnInit(): void {}

  onEditCourse(id: number) {
    this.uiServices.modelId.next(id);
    this.uiServices.openModel('edit');
  }

  onDeleteCourse(id: number) {
    this.uiServices.modelId.next(id);
    console.log(id);

    this.uiServices.openModel('delete');
  }
}
