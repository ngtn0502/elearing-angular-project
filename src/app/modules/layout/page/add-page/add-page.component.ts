import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as UIActions from '../../../../shared/store/ui/ui.action';
import * as CourseActions from '../../../../shared/store/course/course.action';
import { Router } from '@angular/router';
import * as CategoryActions from '../../../../shared/store/category/category.action';
import { Category } from 'src/app/shared/model/category.model';
import { Course, CourseObj } from 'src/app/shared/model/course.model';
import { AppState } from 'src/app/shared/store/app.reducer';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss'],
})
export class AddPageComponent implements OnInit {
  course: Course;
  editForm: FormGroup = new FormGroup({});
  isFormValid: boolean = false;
  categories: Category[] = [];
  typeModal: string = '';

  constructor(private store: Store<AppState>, private router: Router) {
    this.course = CourseObj;
  }

  ngOnInit(): void {
    this.store.dispatch(new CategoryActions.GetCategoryAction());

    this.store.select('categories').subscribe((categoryState) => {
      this.categories = categoryState.categories.filter((el) => el.id !== 0);
    });

    this.editForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
      ]),
      desc: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
      detail: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
      rating: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
        Validators.pattern('^[0-9]*$'),
      ]),
      price: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
        Validators.pattern('[+-]?([0-9]*[.])?[0-9]+' || '^[0-9]*$'),
      ]),
      categoryId: new FormControl(null, [Validators.required]),
      imageUrl: new FormControl(null, [
        Validators.required,
        Validators.minLength(15),
      ]),
      instructor: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      language: new FormControl(this.course.language, [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[a-zA-Z]+'),
      ]),
    });
  }

  onCancel() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    if (!this.editForm.valid) return;
    this.store.dispatch(
      new CourseActions.CreateCoursesAction(this.editForm.value)
    );
    this.store.dispatch(
      new UIActions.ShowToastAction('Create New Course Successfully')
    );
    this.editForm.reset();
    this.router.navigate(['/']);
  }
}
