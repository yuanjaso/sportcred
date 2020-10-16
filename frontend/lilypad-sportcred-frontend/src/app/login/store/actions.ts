import { createAction, props } from '@ngrx/store';
import * as models from '../models';

export const tryRegister = createAction(
  '[Login] Try Register',
  props<models.registrationInfo>()
);
export const getQuestionaire = createAction('[Login] Get Questionaire');
export const setQuestionaire = createAction(
  '[Login] Set Questionaire',
  props<{ questionaire: models.question[] }>()
);
