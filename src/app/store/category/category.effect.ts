import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { DataStorageService } from '../../core/services/data-storage.service';
import { mergeMap, map } from 'rxjs/operators';
import * as CategoryActions from '../category/category.action';

@Injectable()
export class CategoryEffect {
  getCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CategoryActions.GET_CATEGORY),
      mergeMap(() =>
        this.dataStorageService.fetchCategory().pipe(
          map((categories) => {
            return new CategoryActions.GetCategorySuccessAction(categories);
          })
        )
      )
    );
  });

  constructor(
    private actions$: Actions, // this is an RxJS stream of all actions
    private dataStorageService: DataStorageService
  ) {}
}
