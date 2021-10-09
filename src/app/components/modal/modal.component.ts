import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
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

  constructor(private store: Store<fromApp.AppState>) {}

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

  //

  onDeleteCourse() {
    if (this.id) {
      this.store.dispatch(new CourseActions.DeleteCoursesAction(this.id));
      this.store.dispatch(new UIActions.CloseModalAction());
      this.store.dispatch(
        new UIActions.ShowToastAction('Delete Course Successfully')
      );
    } else {
      this.store.dispatch(
        new UIActions.ShowToastAction('Something wrong! Please try again')
      );
    }
  }
}
