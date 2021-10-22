import { ActionReducerMap } from '@ngrx/store';
import * as fromCourses from './course/course.reducer';
import * as fromCategories from './category/category.reducer';
import * as fromUI from './ui/ui.reducer';
import * as fromAuth from './auth/auth.reudcer';

export interface AppState {
  courses: fromCourses.State;
  categories: fromCategories.State;
  ui: fromUI.State;
  auth: fromAuth.State;
}

export const AppReducer: ActionReducerMap<AppState, any> = {
  courses: fromCourses.CourseReducer,
  categories: fromCategories.CourseReducer,
  ui: fromUI.CourseReducer,
  auth: fromAuth.AuthReducer,
};
