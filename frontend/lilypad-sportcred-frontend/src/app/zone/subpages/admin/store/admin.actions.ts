import { createAction, props } from '@ngrx/store';

export const getQuestionnaireResponse = createAction(
  '[Profile] Get Questionnaire Response',
  props<{ question_id: number }>()
);
