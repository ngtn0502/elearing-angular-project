import { Action } from '@ngrx/store';
export const OPEN_MODEL = 'OPEN_MODEL';
export const CLOSE_MODEL = 'CLOSE_MODEL';
export const SHOW_TOAST = 'SHOW_TOAST';
export const CLOSE_TOAST = 'CLOSE_TOAST';

interface openModelPayload {
  type: string;
  id: number;
}

export class OpenModelAction implements Action {
  readonly type = 'OPEN_MODEL';
  constructor(public payload: openModelPayload) {}
}

export class CloseModelAction implements Action {
  readonly type = 'CLOSE_MODEL';
}

export class ShowToastAction implements Action {
  readonly type = 'SHOW_TOAST';
  constructor(public payload: string) {}
}

export class CloseToastAction implements Action {
  readonly type = 'CLOSE_TOAST';
}

export type UIActions =
  | OpenModelAction
  | CloseModelAction
  | ShowToastAction
  | CloseToastAction;
