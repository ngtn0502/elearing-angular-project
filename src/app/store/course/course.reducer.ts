import { Course, CourseObj } from '../../core/shared/course.model';
import * as CourseActions from './course.action';

export interface State {
  isError: boolean;
  courses: Course[];
  course: Course;
  totalRecords: number;
  pageNumber: number;
}

const initialState: State = {
  isError: false,
  courses: [],
  course: CourseObj,
  totalRecords: 0,
  pageNumber: 1,
};

export function CourseReducer(
  state = initialState,
  action: CourseActions.CourseActions
) {
  if (action.type === CourseActions.GET_COURSES_SUCCESS) {
    return {
      ...state,
      courses: [...action.payload],
      totalRecords: action.payload.length,
    };
  }

  if (action.type === CourseActions.GET_COURSE_SUCCESS) {
    return {
      ...state,
      course: { ...action.payload },
    };
  }

  if (action.type === CourseActions.GET_COURSES_BY_CATEGORY_SUCCESS) {
    if (action.payload.products.length === 0) {
      return {
        ...state,
        courses: [],
        totalRecords: 0,
      };
    }
    return {
      ...state,
      courses: [...action.payload.products],
      totalRecords: action.payload.totalRecords,
      pageNumber: action.payload.pageNumber,
    };
  }

  if (action.type === CourseActions.CREATE_COURSE_SUCCESS) {
    return {
      ...state,
      courses: [action.payload, ...state.courses],
    };
  }

  if (action.type === CourseActions.UPDATE_COURSE_SUCCESS) {
    let updatedCourses = [...state.courses];
    let index = updatedCourses.findIndex((el) => el.id === action.payload.id);

    updatedCourses[index] = action.payload;

    return {
      ...state,
      courses: [...updatedCourses],
    };
  }

  if (action.type === CourseActions.DELETE_COURSE_SUCCESS) {
    const newCourses = [...state.courses].filter(
      (el) => el.id !== action.payload.id
    );
    return {
      ...state,
      courses: [...newCourses],
    };
  }

  if (action.type === CourseActions.SEARCH_COURSE_SUCCESS) {
    return {
      ...state,
      courses: [...action.payload],
    };
  }

  if (action.type === CourseActions.PAGINATION_COURSE_SUCCESS) {
    return {
      ...state,
      courses: [...action.payload.products],
      totalRecords: action.payload.totalRecords,
      pageNumber: action.payload.pageNumber,
    };
  }

  return { ...state };
}
