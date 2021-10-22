import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as UIAction from '../../store/ui/ui.action';
import * as fromApp from './../../store/app.reducer';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {
  isToastShow: boolean = false;
  message: string = '';

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store.select('ui').subscribe((UIState) => {
      if (UIState.isToastShow) {
        this.isToastShow = UIState.isToastShow;
        this.message = UIState.toastMessage;
        const clearToast = setTimeout(() => {
          this.store.dispatch(new UIAction.CloseToastAction());
          this.isToastShow = false;
        }, 5000);
      }
    });
  }
}
