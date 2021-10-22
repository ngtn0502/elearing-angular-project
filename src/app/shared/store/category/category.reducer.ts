import { Category } from '../../model/category.model';
import * as CategoryActions from './category.action';

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
