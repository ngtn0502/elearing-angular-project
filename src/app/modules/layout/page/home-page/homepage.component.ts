import { Component, OnInit } from '@angular/core';
import * as fromApp from '../../../../shared/store/app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  isLoading: boolean = false;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store.select('courses').subscribe((coursesState) => {
      this.isLoading = coursesState.isLoading;
    });
  }
}
