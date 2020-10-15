import { createAction, props } from '@ngrx/store';
import { authInfo, registrationInfo } from '../models';

export const getLoginToken = createAction(
  '[Auth] Get Login Token',
  props<authInfo>()
);
export const setLoginToken = createAction(
  '[Auth] Set Login Token',
  props<{ token: string }>()
);
export const tryRegister = createAction(
  '[Auth] Try Register',
  props<registrationInfo>()
);
