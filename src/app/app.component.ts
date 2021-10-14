import { Component } from '@angular/core';
import * as fromApp from './store/app.reducer';
import * as AuthActions from './store/auth/auth.action';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'elearing-app';
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.store.dispatch(new AuthActions.AutoLoginAction());
  }
}
