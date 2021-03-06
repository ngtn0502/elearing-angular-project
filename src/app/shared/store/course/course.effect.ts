import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { DataStorageService } from '../../../services/data-storage.service';
import * as CourseActions from './course.action';
import { mergeMap, map } from 'rxjs/operators';
import { Toast } from '../../functions/helpers';

@Injectable()
export class CourseEffect {
  // Get All
  getCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CourseActions.GET_COURSES),
      mergeMap(() =>
        this.dataStorageService.fetchCourses().pipe(
          map((courses) => {
            return new CourseActions.GetCoursesSuccessAction(courses);
          })
        )
      )
    );
  });

  //  Get Single
  getCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CourseActions.GET_COURSE),
      mergeMap((action: CourseActions.GetCourseAction) => {
        return this.dataStorageService.fetchCourseByID(action.payload).pipe(
          map((courses) => {
            return new CourseActions.GetCourseSuccessAction(courses);
          })
        );
      })
    );
  });

  // Post courses
  postCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CourseActions.CREATE_COURSE),
      mergeMap((action: CourseActions.CreateCoursesAction) => {
        return this.dataStorageService.postCourses(action.payload).pipe(
          map((courses) => {
            Toast.fire({
              icon: 'success',
              title: 'Create course successfully',
            });
            return new CourseActions.CreateCoursesSuccessAction(courses);
          })
        );
      })
    );
  });

  // Update courses
  updateCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CourseActions.UPDATE_COURSE),
      mergeMap((action: CourseActions.UpdateCoursesAction) => {
        return this.dataStorageService
          .updateCourse(action.payload.course, action.payload.id)
          .pipe(
            map((course) => {
              Toast.fire({
                icon: 'success',
                title: 'Update course successfully',
              });
              return new CourseActions.UpdateCoursesSuccessAction(course);
            })
          );
      })
    );
  });

  // Delete courses
  deleteCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CourseActions.DELETE_COURSE),
      mergeMap((action: CourseActions.DeleteCoursesAction) => {
        return this.dataStorageService.deleteCourse(action.payload).pipe(
          map((id) => {
            Toast.fire({
              icon: 'success',
              title: 'Delete this course successfully',
            });
            return new CourseActions.DeleteCoursesSuccessAction(id);
          })
        );
      })
    );
  });

  // Search courses
  searchCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CourseActions.SEARCH_COURSE),
      mergeMap((action: CourseActions.SearchCoursesAction) => {
        return this.dataStorageService.searchCourse(action.payload).pipe(
          map((courses) => {
            return new CourseActions.SearchCoursesSuccessAction(courses);
          })
        );
      })
    );
  });

  // For paging
  // Get courses by page
  getCoursesByPage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CourseActions.PAGINATION_COURSE),
      mergeMap((action: CourseActions.PaginationCoursesAction) => {
        return this.dataStorageService
          .fetchCoursesByPage(
            action.payload.id,
            action.payload.pageNumber,
            action.payload.pageSize
          )
          .pipe(
            map((data) => {
              return new CourseActions.PaginationCoursesSuccessAction(data);
            })
          );
      })
    );
  });

  //For filtering
  // Get Courses By Category
  getCoursesByCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CourseActions.GET_COURSES_BY_CATEGORY),
      mergeMap((action: CourseActions.GetCoursesByCategoryAction) => {
        return this.dataStorageService
          .fetchCoursesByCategory(action.payload)
          .pipe(
            map((courses) => {
              return new CourseActions.GetCoursesByCategorySuccessAction(
                courses
              );
            })
          );
      })
    );
  });

  constructor(
    private actions$: Actions, // this is an RxJS stream of all actions
    private dataStorageService: DataStorageService
  ) {}
}
