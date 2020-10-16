import { createSelector } from '@ngrx/store';
import { selectFeatureLogin } from '../../store/selectors';
import { LoginState } from './reducers';

export const selectAuthToken = createSelector(
  selectFeatureLogin,
  (state: LoginState) => state.registration_questionaire
);
