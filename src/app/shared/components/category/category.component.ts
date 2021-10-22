import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as CourseActions from '../../store/course/course.action';
import * as CategoryActions from '../../store/category/category.action';
import * as UIActions from '../../store/ui/ui.action';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Category } from '../../model/category.model';
import { PAGESIZE } from '../../config/config';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  chosenID: number = 0;
  isShowCategory: boolean = true;
  pageSize: number = PAGESIZE;
  private subscriptions = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {
    this.subscriptions = this.activatedRoute.params.subscribe((params) => {
      this.chosenID = Number(params.id || 0);
      this.store.dispatch(
        new CourseActions.GetCoursesByCategoryAction(this.chosenID)
      );
    });
  }

  ngOnInit(): void {
    this.store.dispatch(new CategoryActions.GetCategoryAction());
    this.store.select('categories').subscribe((categoriesState) => {
      if (categoriesState.categories.length !== 0) {
        this.categories = categoriesState.categories;
      }
    });
  }

  onChooseCategory(id: number) {
    this.chosenID = id;
    new CourseActions.GetCoursesByCategoryAction(this.chosenID);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
