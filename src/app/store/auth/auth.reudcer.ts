import { of } from 'rxjs';
import { Course, CourseObj } from '../../core/shared/course.model';
import { UserData } from 'src/app/core/shared/userData.model';
import * as AuthAction from './auth.action';

export interface State {
  isLoading: boolean;
  isLogin: boolean;
  UserData: UserData | null;
  errorMessage: string | null;
}

const initialState: State = {
  isLoading: false,
  isLogin: false,
  UserData: null,
  errorMessage: null,
};

export function AuthReducer(
  state = initialState,
  action: AuthAction.AuthActions
) {
  if (action.type === AuthAction.LOGIN) {
    return {
      ...state,
      isLoading: true,
      errorMessage: null,
    };
  }

  if (action.type === AuthAction.LOGIN_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      isLogin: true,
      UserData: action.payload,
    };
  }

  if (action.type === AuthAction.LOGIN_ERROR) {
    return {
      ...state,
      isLoading: false,
      isLogin: false,
      errorMessage: action.payload,
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
      UserData: action.payload,
    };
  }

  if (action.type === AuthAction.LOGOUT) {
    return {
      ...state,
      isLoading: false,
      isLogin: false,
      UserData: null,
    };
  }

  if (action.type === AuthAction.AUTO_LOGIN_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      isLogin: true,
      UserData: action.payload,
    };
  }

  return { ...state };
}
