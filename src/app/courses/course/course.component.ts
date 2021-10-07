import { Component, Input, OnInit } from '@angular/core';
import { Course, CourseObj } from './../../shared/course.model';
import { UiServices } from './../../services/ui.service';
import { Store } from '@ngrx/store';
import * as fromApp from './../../store/app.reducer';
import * as UIActions from 'src/app/store/ui/ui.action';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  @Input() course: Course;

  constructor(
    private uiServices: UiServices,
    private store: Store<fromApp.AppState>
  ) {
    this.course = CourseObj;
  }

  ngOnInit(): void {}

  onEditCourse(id: number) {
    this.store.dispatch(
      new UIActions.OpenModelAction({ type: 'edit', id: id })
    );
  }

  onDeleteCourse(id: number) {
    this.store.dispatch(
      new UIActions.OpenModelAction({ type: 'delete', id: id })
    );
  }
}
