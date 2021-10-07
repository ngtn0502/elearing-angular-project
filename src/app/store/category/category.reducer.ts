import { of } from 'rxjs';
import { Course, CourseObj } from '../../shared/course.model';
import * as CategoryActions from './category.action';
import { Category } from './../../shared/category.model';

export interface State {
  isError: boolean;
  categories: Category[];
}

const initialState: State = {
  isError: false,
  categories: [],
};

export function CourseReducer(
  state = initialState,
  action: CategoryActions.CategoryActions
) {
  if (action.type === CategoryActions.GET_CATEGORY_SUCCESS) {
    return {
      ...state,
      categories: [...action.payload],
    };
  }

  return { ...state };
}
