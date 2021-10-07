import * as UIActions from './ui.action';

export interface State {
  isModelOpen: boolean;
  modelType: string;
  id: number;
  //
  isToastShow: boolean;
  toastMessage: string;
}

const initialState: State = {
  isModelOpen: false,
  modelType: '',
  id: 0,
  //
  isToastShow: false,
  toastMessage: '',
};

export function CourseReducer(
  state = initialState,
  action: UIActions.UIActions
) {
  if (action.type === UIActions.OPEN_MODEL) {
    return {
      ...state,
      isModelOpen: true,
      modelType: action.payload.type,
      id: action.payload.id,
      isToastShow: false,
    };
  }

  if (action.type === UIActions.CLOSE_MODEL) {
    return {
      ...state,
      isModelOpen: false,
      isToastShow: false,
    };
  }

  if (action.type === UIActions.SHOW_TOAST) {
    return {
      ...state,
      isToastShow: true,
      toastMessage: action.payload,
    };
  }

  if (action.type === UIActions.CLOSE_TOAST) {
    return {
      ...state,
      isToastShow: false,
    };
  }

  return { ...state };
}
