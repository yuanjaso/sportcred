import { createAction, props } from '@ngrx/store';
import { PostDebate } from 'src/app/zone/zone-home/subpages/debate/debate.types';

export const getQuestionnaireResponse = createAction(
  '[Profile] Get Questionnaire Response',
  props<{ question_id: number }>()
);

export const submitDebatePost = createAction(
  '[Debate] Try Submit Debate Post',
  props<{ submission: PostDebate }>()
);
