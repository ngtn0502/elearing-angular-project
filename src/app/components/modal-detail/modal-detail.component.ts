import { Component, OnInit } from '@angular/core';
import { Course, CourseObj } from '../../core/shared/course.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Category } from '../../core/shared/category.model';
import * as fromApp from '../../store/app.reducer';
import * as UIActions from '../../store/ui/ui.action';
import { Store } from '@ngrx/store';
import * as CourseActions from '../../store/course/course.action';
import { Toast } from 'src/app/core/shared/functions/helpers';

@Component({
  selector: 'app-modal-detail',
  templateUrl: './modal-detail.component.html',
  styleUrls: ['./modal-detail.component.scss'],
})
export class ModalDetailComponent implements OnInit {
  course: Course;
  editForm: FormGroup = new FormGroup({});
  isFormValid: boolean = false;
  categories: Category[] = [];
  typeModal: string = '';

  constructor(private store: Store<fromApp.AppState>) {
    this.course = CourseObj;
  }

  ngOnInit(): void {
    this.store.select('categories').subscribe((categoryState) => {
      this.categories = categoryState.categories.filter((el) => el.id !== 0);
    });

    this.store.select('ui').subscribe((UIState) => {
      this.typeModal = UIState.modalType;
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
      detail: new FormControl(this.course.detail.detail, [
        Validators.required,
        Validators.minLength(10),
      ]),
      rating: new FormControl(this.course.rating, [
        Validators.required,
        Validators.minLength(1),
        Validators.pattern('^[0-9]*$'),
      ]),
      price: new FormControl(this.course.price, [
        Validators.required,
        Validators.minLength(1),
        Validators.pattern('[+-]?([0-9]*[.])?[0-9]+' || '^[0-9]*$'),
      ]),
      categoryId: new FormControl(
        this.typeModal !== 'new' ? this.course.categoryId : null,
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
      language: new FormControl(this.course.language, [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[a-zA-Z]+'),
      ]),
    });
  }

  onCancel() {
    this.store.dispatch(new UIActions.CloseModalAction());
  }

  onSubmit() {
    if (this.typeModal === 'new') {
      this.store.dispatch(
        new CourseActions.CreateCoursesAction(this.editForm.value)
      );
      this.store.dispatch(new UIActions.CloseModalAction());
    } else {
      console.log(this.editForm.value);

      this.store.dispatch(
        new CourseActions.UpdateCoursesAction({
          course: this.editForm.value,
          id: this.course.id,
        })
      );
      this.store.dispatch(new UIActions.CloseModalAction());
    }
  }
}
