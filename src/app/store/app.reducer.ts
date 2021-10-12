import { ActionReducerMap } from '@ngrx/store';
import * as fromCourses from './course/course.reducer';
import * as fromCategories from './category/category.reducer';
import * as fromUI from './ui/ui.reducer';

export interface AppState {
  courses: fromCourses.State;
  categories: fromCategories.State;
  ui: fromUI.State;
}

export const AppReducer: ActionReducerMap<AppState, any> = {
  courses: fromCourses.CourseReducer,
  categories: fromCategories.CourseReducer,
  ui: fromUI.CourseReducer,
};
