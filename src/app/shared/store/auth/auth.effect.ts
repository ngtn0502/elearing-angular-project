import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import * as AuthActions from './auth.action';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserData } from '../../model/userData.model';
import { getUserData, Toast } from '../../functions/helpers';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable()
export class AuthEffect {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.LOGIN),
      mergeMap((action: AuthActions.LoginAction) =>
        this.authService
          .login(action.payload.username, action.payload.password)
          .pipe(
            map((resData: UserData) => {
              const userLogin = JSON.stringify(resData);
              localStorage.setItem('userLogin', userLogin);
              return new AuthActions.LoginSuccessAction(resData);
            }),
            catchError((error) => {
              return of(
                new AuthActions.LoginErrorAction(
                  error || 'An unknown error occurred!'
                )
              );
            })
          )
      )
    );
  });

  authSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.LOGIN_SUCCESS),
        tap(() => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Login successfully',
            showConfirmButton: true,
          });
          return this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  authError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.LOGIN_ERROR),
        tap((action: AuthActions.LoginErrorAction) => {
          Swal.fire({
            title: 'Something wrong here!',
            text: action.payload || 'An unknown error occurred!',
            icon: 'error',
            showCancelButton: true,
            confirmButtonText: 'Try again!',
            cancelButtonText: 'Okay',
          });
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
          localStorage.clear();
          this.router.navigate(['/']);
          Toast.fire({
            icon: 'success',
            title: 'Log out successfully',
          });
        })
      ),
    { dispatch: false }
  );

  autoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.AUTO_LOGIN),
      map(() => {
        if (getUserData()) {
          return new AuthActions.AutoLoginSuccessAction(getUserData());
        }
        return { type: 'DUMMY' };
      })
    )
  );

  constructor(
    private actions$: Actions, // this is an RxJS stream of all actions
    private authService: AuthService,
    private router: Router
  ) {}
}
