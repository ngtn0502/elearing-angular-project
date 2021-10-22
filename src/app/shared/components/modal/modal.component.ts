import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Toast } from '../../functions/helpers';
import * as fromApp from '../../store/app.reducer';
import * as CourseActions from '../../store/course/course.action';
import * as UIActions from '../../store/ui/ui.action';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  //
  isModalOpen: boolean = false;
  deleteID: number = 0;
  modalType: string = '';
  id: number = 0;
  //

  constructor(private store: Store<fromApp.AppState>, private router: Router) {}

  ngOnInit(): void {
    this.store.select('ui').subscribe((UIState) => {
      this.isModalOpen = UIState.isModalOpen;
      this.modalType = UIState.modalType;
      this.id = UIState.id;
    });
  }

  onCloseModel() {
    this.store.dispatch(new UIActions.CloseModalAction());
  }
  onCloseModelOverlay() {
    if (this.modalType === 'delete') {
      this.store.dispatch(new UIActions.CloseModalAction());
      return;
    }
    this.store.dispatch(new UIActions.CloseModalAction());
  }
  //

  onDeleteCourse() {
    if (this.id) {
      this.store.dispatch(new CourseActions.DeleteCoursesAction(this.id));
      this.store.dispatch(new UIActions.CloseModalAction());

      this;
    } else {
      Toast.fire({
        icon: 'success',
        title: 'Something wrong! Please try again',
      });
    }
  }
}
