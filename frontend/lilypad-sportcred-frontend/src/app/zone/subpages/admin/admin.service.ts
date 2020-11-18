import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { questionaireResponseURL } from 'src/global/api.types';
import * as apis from '../../../../global/api.types';
import { HttpClientWrapper } from '../../../http/http-client-wrapper';
import { PostDebate, QuestionnaireResponse } from './admin.types';

@Injectable()
export class AdminService {
  constructor(private httpClient: HttpClientWrapper) {}

  $freshQuestionnairResponses = new Subject<QuestionnaireResponse>();

  getQuestionnaireResponses(
    questionId: number
  ): Observable<QuestionnaireResponse> {
    return this.httpClient.get<QuestionnaireResponse>(
      questionaireResponseURL(questionId)
    );
  }

  submitDebatePost(submission: PostDebate): Observable<null> {
    return this.httpClient.post(apis.debateURL, submission);
  }
}
