// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { Injectable } from '@angular/core';
// import { mergeMap, map } from 'rxjs/operators';
// import * as AuthAction from './auth.action';
// import { AuthService } from 'src/app/core/services/auth.service';

// @Injectable()
// export class CategoryEffect {
//   login$ = createEffect(() => {
//     return this.actions$.pipe(
//       ofType(AuthAction.LOGIN),
//       mergeMap(() =>
//         this.authService.login.pipe(
//           map((resData) => {
//             return new AuthAction.LoginSuccessAction(resData);
//           })
//         )
//       )
//     );
//   });

//   constructor(
//     private actions$: Actions, // this is an RxJS stream of all actions
//     private authService: AuthService
//   ) {}
// }
