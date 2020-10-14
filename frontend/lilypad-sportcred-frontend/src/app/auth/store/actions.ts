import { createAction, props } from '@ngrx/store';
import { authInfo } from '../models';

export const getLoginToken = createAction(
  '[Auth] Get Login Token',
  props<authInfo>()
);
export const setLoginToken = createAction(
  '[Auth] Set Login Token',
  props<{ token: string }>()
);
