import { Component, OnInit } from '@angular/core';
import { Category } from '../../core/shared/category.model';
import { ActivatedRoute } from '@angular/router';
import * as CourseActions from '../../store/course/course.action';
import * as CategoryActions from '../../store/category/category.action';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  chosenID: number = 0;
  isShowCategory: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {
    this.activatedRoute.params.subscribe((params) => {
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
}