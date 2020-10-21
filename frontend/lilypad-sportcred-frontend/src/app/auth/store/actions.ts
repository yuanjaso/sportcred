import { createAction, props } from '@ngrx/store';
import { loginInfo } from '../../login/login.types';

export const getLoginToken = createAction(
  '[Auth] Get Login Token',
  props<loginInfo>()
);
export const setLoginToken = createAction(
  '[Auth] Set Login Token',
  props<{ token: string }>()
);
