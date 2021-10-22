import { Action } from '@ngrx/store';
import { UserData } from '../../model/userData.model';
export const REGISTER = 'REGISTER';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';
export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT = 'LOGOUT';
export const AUTO_LOGIN = 'AUTO_LOGIN';
export const AUTO_LOGIN_SUCCESS = 'AUTO_LOGIN_SUCCESS';

export class RegisterAction implements Action {
  readonly type = 'REGISTER';
}
export class RegisterSuccessAction implements Action {
  readonly type = 'REGISTER_SUCCESS';
  constructor(public payload: UserData) {}
}
export class RegisterErrorAction implements Action {
  readonly type = 'REGISTER_ERROR';
}

export class LoginAction implements Action {
  readonly type = 'LOGIN';
  constructor(public payload: { username: string; password: string }) {}
}
export class LoginSuccessAction implements Action {
  readonly type = 'LOGIN_SUCCESS';
  constructor(public payload: UserData) {}
}
export class LoginErrorAction implements Action {
  readonly type = 'LOGIN_ERROR';
  constructor(public payload: string) {}
}

export class LogoutAction implements Action {
  readonly type = 'LOGOUT';
}

export class AutoLoginAction implements Action {
  readonly type = 'AUTO_LOGIN';
}

export class AutoLoginSuccessAction implements Action {
  readonly type = 'AUTO_LOGIN_SUCCESS';
  constructor(public payload: UserData) {}
}

export type AuthActions =
  | RegisterAction
  | RegisterSuccessAction
  | RegisterErrorAction
  | LoginAction
  | LoginSuccessAction
  | LoginErrorAction
  | LogoutAction
  | AutoLoginAction
  | AutoLoginSuccessAction;
