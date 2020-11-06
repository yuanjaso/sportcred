import { createAction, props } from '@ngrx/store';
import { LoginInfo } from '../../login/login.types';
import { User } from '../auth.types';

export const getUserInfo = createAction(
  '[Auth] Get User Info',
  props<LoginInfo>()
);
export const setUserInfo = createAction(
  '[Auth] Set User Info',
  props<{ payload: User }>()
);
export const setUserQuestionnaireStatus = createAction(
  '[Auth] Set User Questionnaire Status',
  props<{ payload: boolean }>()
);

export const clearLoginToken = createAction('[Auth] Clear Login Token');
