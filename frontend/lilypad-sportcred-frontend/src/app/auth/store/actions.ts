import { createAction, props } from '@ngrx/store';
import { loginInfo } from '../../login/models';
import { User } from '../models';

export const getUserInfo = createAction(
  '[Auth] Get User Info',
  props<loginInfo>()
);
export const setUserInfo = createAction(
  '[Auth] Set User Info',
  props<{ payload: User }>()
);
export const clearLoginToken = createAction('[Auth] Clear Login Token');
