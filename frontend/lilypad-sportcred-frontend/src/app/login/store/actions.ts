import { createAction, props } from '@ngrx/store';
import * as models from '../login.types';

export const tryRegisterBasic = createAction(
  '[Login] Try Register Basic',
  props<models.generalRegistrationInfo>()
);
export const tryRegisterQuestionaire = createAction(
  '[Login] Try Register Questionaire',
  props<models.questionaireRegistrationInfo>()
);
export const getQuestionaire = createAction('[Login] Get Questionaire');
export const setQuestionaire = createAction(
  '[Login] Set Questionaire',
  props<{ questionaire: models.question[] }>()
);
