import { createAction, props } from '@ngrx/store';
import { loginInfo } from '../../login/models';

export const getLoginToken = createAction(
  '[Auth] Get Login Token',
  props<loginInfo>()
);
export const setLoginToken = createAction(
  '[Auth] Set Login Token',
  props<{ token: string }>()
);
export const clearLoginToken = createAction('[Auth] Clear Login Token');
