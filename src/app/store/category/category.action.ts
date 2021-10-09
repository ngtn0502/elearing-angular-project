import { Action } from '@ngrx/store';
import { Category } from './../../core/shared/category.model';
export const GET_CATEGORY = 'GET_CATEGORY';
export const GET_CATEGORY_SUCCESS = 'GET_CATEGORY_SUCCESS';
export const GET_CATEGORY_ERROR = 'GET_CATEGORY_ERROR';

export class GetCategoryAction implements Action {
  readonly type = 'GET_CATEGORY';
}
export class GetCategorySuccessAction implements Action {
  readonly type = 'GET_CATEGORY_SUCCESS';
  constructor(public payload: Category[]) {}
}
export class GetCategoryErrorAction implements Action {
  readonly type = 'GET_CATEGORY_ERROR';
}

export type CategoryActions =
  | GetCategoryAction
  | GetCategorySuccessAction
  | GetCategoryErrorAction;
