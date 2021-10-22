import { Component, OnInit } from '@angular/core';
import * as fromApp from '../../../../shared/store/app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.scss'],
})
export class SearchpageComponent implements OnInit {
  isLoading: boolean = false;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store.select('courses').subscribe((coursesState) => {
      this.isLoading = coursesState.isLoading;
    });
  }
}
