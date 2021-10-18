import { Action } from '@ngrx/store';
import { Course } from '../../core/shared/course.model';

export const GET_COURSES = 'GET_COURSES';
export const GET_COURSES_SUCCESS = 'GET_COURSES_SUCCESS';
export const GET_COURSES_ERROR = 'GET_COURSES_ERROR';

// Single
export const GET_COURSE = 'GET_COURSE';
export const GET_COURSE_SUCCESS = 'GET_COURSE_SUCCESS';
export const GET_COURSE_ERROR = 'GET_COURSE_ERROR';

// By Category
export const GET_COURSES_BY_CATEGORY = 'GET_COURSES_BY_CATEGORY';
export const GET_COURSES_BY_CATEGORY_SUCCESS =
  'GET_COURSES_BY_CATEGORY_SUCCESS';
export const GET_COURSES_BY_CATEGORY_ERROR = 'GET_COURSES_BY_CATEGORY_ERROR';

// Post
export const CREATE_COURSE = 'CREATE_COURSE';
export const CREATE_COURSE_SUCCESS = 'CREATE_COURSE_SUCCESS';
export const CREATE_COURSE_ERROR = 'CREATE_COURSE_ERROR';

// Edit
export const UPDATE_COURSE = 'UPDATE_COURSE';
export const UPDATE_COURSE_SUCCESS = 'UPDATE_COURSE_SUCCESS';
export const UPDATE_COURSE_ERROR = 'UPDATE_COURSE_ERROR';

// Delete
export const DELETE_COURSE = 'DELETE_COURSE';
export const DELETE_COURSE_SUCCESS = 'DELETE_COURSE_SUCCESS';
export const DELETE_COURSE_ERROR = 'DELETE_COURSE_ERROR';

// Delete
export const SEARCH_COURSE = 'SEARCH_COURSE';
export const SEARCH_COURSE_SUCCESS = 'SEARCH_COURSE_SUCCESS';
export const SEARCH_COURSE_ERROR = 'SEARCH_COURSE_ERROR';

// Pagination
export const PAGINATION_COURSE = 'PAGINATION_COURSE';
export const PAGINATION_COURSE_SUCCESS = 'PAGINATION_COURSE_SUCCESS';
export const PAGINATION_COURSE_ERROR = 'PAGINATION_COURSE_ERROR';

// Select
export const SELECT_COURSE = 'SELECT_COURSE';
export const SELECT_COURSE_SUCCESS = 'SELECT_COURSE_SUCCESS';
export const SELECT_COURSE_ERROR = 'SELECT_COURSE_ERROR';

export class GetCoursesAction implements Action {
  readonly type = 'GET_COURSES';
}
export class GetCoursesSuccessAction implements Action {
  readonly type = 'GET_COURSES_SUCCESS';
  constructor(public payload: Course[]) {}
}
export class GetCoursesErrorAction implements Action {
  readonly type = 'GET_COURSES_ERROR';
}

// Single
export class GetCourseAction implements Action {
  readonly type = 'GET_COURSE';
  constructor(public payload: number) {}
}
export class GetCourseSuccessAction implements Action {
  readonly type = 'GET_COURSE_SUCCESS';
  constructor(public payload: Course) {}
}
export class GetCourseErrorAction implements Action {
  readonly type = 'GET_COURSE_ERROR';
}

// By Category
export class GetCoursesByCategoryAction implements Action {
  readonly type = 'GET_COURSES_BY_CATEGORY';
  constructor(public payload: number) {}
}
export class GetCoursesByCategorySuccessAction implements Action {
  readonly type = 'GET_COURSES_BY_CATEGORY_SUCCESS';
  constructor(public payload: any) {}
}
export class GetCoursesByCategoryErrorAction implements Action {
  readonly type = 'GET_COURSES_BY_CATEGORY_ERROR';
}

// Post Course
export class CreateCoursesAction implements Action {
  readonly type = 'CREATE_COURSE';
  constructor(public payload: Course) {}
}
export class CreateCoursesSuccessAction implements Action {
  readonly type = 'CREATE_COURSE_SUCCESS';
  constructor(public payload: any) {}
}
export class CreateCoursesErrorAction implements Action {
  readonly type = 'CREATE_COURSE_ERROR';
}

// Update Course
export class UpdateCoursesAction implements Action {
  readonly type = 'UPDATE_COURSE';
  constructor(public payload: { course: Course; id: number }) {}
}
export class UpdateCoursesSuccessAction implements Action {
  readonly type = 'UPDATE_COURSE_SUCCESS';
  constructor(public payload: any) {}
}
export class UpdateCoursesErrorAction implements Action {
  readonly type = 'UPDATE_COURSE_ERROR';
}

// Update Course
export class DeleteCoursesAction implements Action {
  readonly type = 'DELETE_COURSE';
  constructor(public payload: number) {}
}
export class DeleteCoursesSuccessAction implements Action {
  readonly type = 'DELETE_COURSE_SUCCESS';
  constructor(public payload: any) {}
}
export class DeleteCoursesErrorAction implements Action {
  readonly type = 'DELETE_COURSE_ERROR';
}

// Search Course
export class SearchCoursesAction implements Action {
  readonly type = 'SEARCH_COURSE';
  constructor(public payload: any) {}
}
export class SearchCoursesSuccessAction implements Action {
  readonly type = 'SEARCH_COURSE_SUCCESS';
  constructor(public payload: any) {}
}
export class SearchCoursesErrorAction implements Action {
  readonly type = 'SEARCH_COURSE_ERROR';
}

// Pagination
export class PaginationCoursesAction implements Action {
  readonly type = 'PAGINATION_COURSE';
  constructor(
    public payload: { id: number; pageSize: number; pageNumber: number }
  ) {}
}
export class PaginationCoursesSuccessAction implements Action {
  readonly type = 'PAGINATION_COURSE_SUCCESS';
  constructor(public payload: any) {}
}
export class PaginationCoursesErrorAction implements Action {
  readonly type = 'PAGINATION_COURSE_ERROR';
}

// Add
export class SelectCourseAction implements Action {
  readonly type = 'SELECT_COURSE';
  constructor(public payload: Course) {}
}
export class SelectCourseSuccessAction implements Action {
  readonly type = 'SELECT_COURSE_SUCCESS';
  constructor(public payload: any) {}
}
export class SelectCourseErrorAction implements Action {
  readonly type = 'SELECT_COURSE_ERROR';
}

export type CourseActions =
  | GetCoursesAction
  | GetCoursesSuccessAction
  | GetCoursesErrorAction
  | GetCourseAction
  | GetCourseSuccessAction
  | GetCourseErrorAction
  | GetCoursesByCategoryAction
  | GetCoursesByCategorySuccessAction
  | GetCoursesByCategoryErrorAction
  | CreateCoursesAction
  | CreateCoursesSuccessAction
  | CreateCoursesErrorAction
  | UpdateCoursesAction
  | UpdateCoursesSuccessAction
  | UpdateCoursesErrorAction
  | DeleteCoursesAction
  | DeleteCoursesSuccessAction
  | DeleteCoursesErrorAction
  | SearchCoursesAction
  | SearchCoursesSuccessAction
  | SearchCoursesErrorAction
  | PaginationCoursesAction
  | PaginationCoursesSuccessAction
  | PaginationCoursesErrorAction
  | SelectCourseAction
  | SelectCourseSuccessAction
  | SelectCourseErrorAction;
