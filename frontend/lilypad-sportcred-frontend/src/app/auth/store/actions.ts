import { createAction, props } from '@ngrx/store';
import { authInfo } from '../models';
export const getLoginToken = createAction(
  '[Auth] getLoginToken',
  props<{ authInfo }>()
);
export const setLoginToken = createAction(
  '[Auth] setLoginToken',
  props<{ token: String }>()
);
