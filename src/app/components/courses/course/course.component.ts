import { Component, Input, OnInit } from '@angular/core';
import { Course, CourseObj } from '../../../core/shared/course.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import * as UIActions from 'src/app/store/ui/ui.action';
import { Router } from '@angular/router';
import * as CourseActions from '../../../store/course/course.action';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  @Input() course: Course;
  isLogin: boolean = false;

  constructor(private store: Store<fromApp.AppState>) {
    this.course = CourseObj;
  }

  ngOnInit(): void {
    this.store.select('auth').subscribe((authState) => {
      this.isLogin = authState.isLogin;
    });
  }

  onEditCourse(id: number) {
    this.store.dispatch(
      new UIActions.OpenModalAction({ type: 'edit', id: id })
    );
  }

  onDeleteCourse(id: number) {
    this.store.dispatch(
      new UIActions.OpenModalAction({ type: 'delete', id: id })
    );
  }
}
