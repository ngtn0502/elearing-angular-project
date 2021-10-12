import { of } from 'rxjs';
import { Course, CourseObj } from '../../core/shared/course.model';
import { UserLogin } from 'src/app/core/shared/userLogin.model';
import * as AuthAction from './auth.action';

export interface State {
  isLoading: boolean;
  isError: boolean;
  isLogin: boolean;
  userLogin: UserLogin;
}

const initialState: State = {
  isLoading: false,
  isError: false,
  isLogin: false,
  userLogin: { username: '', accessToken: '' },
};

export function CourseReducer(
  state = initialState,
  action: AuthAction.AuthActions
) {
  if (action.type === AuthAction.LOGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === AuthAction.LOGIN_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      isError: false,
      isLogin: true,
      userLogin: action.payload,
    };
  }

  if (action.type === AuthAction.REGISTER) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === AuthAction.REGISTER_SUCCESS) {
    return {
      ...state,
      userLogin: action.payload,
    };
  }

  if (action.type === AuthAction.LOGOUT) {
    return {
      ...state,
      isLoading: false,
      isError: false,
      isLogin: false,
      userLogin: { username: '', accessToken: '' },
    };
  }

  return { ...state };
}
