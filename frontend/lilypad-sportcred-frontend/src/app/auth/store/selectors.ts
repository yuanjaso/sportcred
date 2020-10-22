import { createSelector } from '@ngrx/store';
import { selectFeatureAuth } from '../../store/selectors';
import { AuthState } from './reducers';

export const selectUserInfo = createSelector(
  selectFeatureAuth,
  (state: AuthState) => state.userinfo
);
