import { Component, Input, OnInit } from '@angular/core';
import { Course, CourseObj } from './../shared/course.model';
import { UiServices } from './../services/ui.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from './../services/category.service';
import { Category } from './../shared/category.model';
import { DataStorageService } from '../services/data-storage.service';
import { Router } from '@angular/router';
import * as fromApp from '../store/app.reducer';
import * as UIActions from '../store/ui/ui.action';
import { Store } from '@ngrx/store';
import * as CourseActions from '../store/course/course.action';

@Component({
  selector: 'app-model-detail',
  templateUrl: './model-detail.component.html',
  styleUrls: ['./model-detail.component.scss'],
})
export class ModelDetailComponent implements OnInit {
  course: Course;
  editForm: FormGroup = new FormGroup({});
  isFormValid: boolean = false;
  categories: Category[] = [];
  typeModel: string = '';
  constructor(
    private dataStorageService: DataStorageService,
    private store: Store<fromApp.AppState>
  ) {
    this.course = CourseObj;
  }

  ngOnInit(): void {
    this.store.select('categories').subscribe((categoryState) => {
      this.categories = categoryState.categories.filter((el) => el.id !== 0);
    });
    this.store.select('ui').subscribe((UIState) => {
      this.typeModel = UIState.modelType;
      this.store.select('courses').subscribe((coursesState) => {
        const course = coursesState.courses.find((el) => el.id === UIState.id);
        if (!!course) {
          this.course = course;
        }
      });
    });

    this.editForm = new FormGroup({
      name: new FormControl(this.course.name, [
        Validators.required,
        Validators.minLength(5),
      ]),
      desc: new FormControl(this.course.description, [
        Validators.required,
        Validators.minLength(10),
      ]),
      rating: new FormControl(this.course.rating, [
        Validators.required,
        Validators.minLength(1),
      ]),
      price: new FormControl(this.course.price, [
        Validators.required,
        Validators.minLength(2),
      ]),
      categoryId: new FormControl(
        this.typeModel !== 'new' ? this.course.categoryId : null,
        [Validators.required]
      ),
      imageUrl: new FormControl(this.course.imageUrl, [
        Validators.required,
        Validators.minLength(5),
      ]),
      instructor: new FormControl(this.course.instructor, [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  onCancel() {
    this.store.dispatch(new UIActions.CloseModelAction());
  }

  onSubmit() {
    if (this.typeModel === 'new') {
      this.store.dispatch(
        new CourseActions.CreateCoursesAction(this.editForm.value)
      );
      this.store.dispatch(new UIActions.CloseModelAction());
      this.store.dispatch(
        new UIActions.ShowToastAction('Create New Course Successfully')
      );
    } else {
      this.store.dispatch(
        new CourseActions.UpdateCoursesAction({
          course: this.editForm.value,
          id: this.course.id,
        })
      );
      this.store.dispatch(new UIActions.CloseModelAction());
      this.store.dispatch(
        new UIActions.ShowToastAction('Edit Course Successfully')
      );
    }
  }
}
