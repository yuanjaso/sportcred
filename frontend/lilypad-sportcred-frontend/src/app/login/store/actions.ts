import { createAction, props } from '@ngrx/store';
import * as models from '../login.types';

export const login = createAction(
  '[Login] login',
  props<{ returnUrl: string }>()
);
export const tryRegisterBasic = createAction(
  '[Login] Try Register Basic',
  props<models.GeneralRegistrationInfo>()
);
export const tryRegisterQuestionaire = createAction(
  '[Login] Try Register Questionaire',
  props<models.QuestionaireRegistrationInfo>()
);
export const getQuestionaire = createAction('[Login] Get Questionaire');
export const setQuestionaire = createAction(
  '[Login] Set Questionaire',
  props<{ questionaire: models.Question[] }>()
);
