import * as UIActions from './ui.action';

export interface State {
  isModalOpen: boolean;
  modalType: string;
  id: number;
  //
  isToastShow: boolean;
  toastMessage: string;
}

const initialState: State = {
  isModalOpen: false,
  modalType: '',
  id: 0,
  //
  isToastShow: false,
  toastMessage: '',
};

export function CourseReducer(
  state = initialState,
  action: UIActions.UIActions
) {
  if (action.type === UIActions.OPEN_MODAL) {
    return {
      ...state,
      isModalOpen: true,
      modalType: action.payload.type,
      id: action.payload.id,
      isToastShow: false,
    };
  }

  if (action.type === UIActions.CLOSE_MODAL) {
    return {
      ...state,
      isModalOpen: false,
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
