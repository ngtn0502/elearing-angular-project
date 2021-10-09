import { Action } from '@ngrx/store';
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const SHOW_TOAST = 'SHOW_TOAST';
export const CLOSE_TOAST = 'CLOSE_TOAST';

interface openModalPayload {
  type: string;
  id: number;
}

export class OpenModalAction implements Action {
  readonly type = 'OPEN_MODAL';
  constructor(public payload: openModalPayload) {}
}

export class CloseModalAction implements Action {
  readonly type = 'CLOSE_MODAL';
}

export class ShowToastAction implements Action {
  readonly type = 'SHOW_TOAST';
  constructor(public payload: string) {}
}

export class CloseToastAction implements Action {
  readonly type = 'CLOSE_TOAST';
}

export type UIActions =
  | OpenModalAction
  | CloseModalAction
  | ShowToastAction
  | CloseToastAction;
