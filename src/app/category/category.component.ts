import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../services/data-storage.service';
import { CategoryService } from './../services/category.service';
import { Category } from './../shared/category.model';
import { CourseService } from './../services/course.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as CourseActions from '../store/course/course.action';
import * as CategoryActions from '../store/category/category.action';
import * as fromApp from '../store/app.reducer';
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
    private categoryService: CategoryService,
    private dataStorageService: DataStorageService,
    private courseService: CourseService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {
    this.activatedRoute.url.subscribe((url) => {
      if (!url[1]) return;
      if (url[1].path === 'search') {
        this.isShowCategory = false;
      }
    });
    this.activatedRoute.params.subscribe((params) => {
      if (!params.id) {
        this.chosenID = 0;
        console.log(params.id);
        this.store.dispatch(
          new CourseActions.GetCoursesByCategoryAction(this.chosenID)
        );
      } else {
        this.chosenID = Number(params.id);
        this.store.dispatch(
          new CourseActions.GetCoursesByCategoryAction(this.chosenID)
        );
      }
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
  }
}
