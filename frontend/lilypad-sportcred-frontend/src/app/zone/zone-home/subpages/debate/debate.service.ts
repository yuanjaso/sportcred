import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as apis from '../../../../../global/api.types';
import { HttpClientWrapper } from '../../../../http/http-client-wrapper';
import {
  DebateComment,
  DebateCommentRating,
  DebatePostCommentPayload,
} from './debate.types';

@Injectable()
export class DebateService {
  constructor(private httpClient: HttpClientWrapper) {}
  hotDebateDiscussion$ = new Subject<DebateComment[]>();

  getAllDebates() {
    return this.httpClient.get(apis.debateURL);
  }

  getDebateDiscussion(id: number) {
    return this.httpClient.get(apis.debateDiscussion, { debate_id: id });
  }

  postDebateComment(
    payload: DebatePostCommentPayload
  ): Observable<DebateComment> {
    return this.httpClient.post(apis.debateDiscussion, payload);
  }

  rateDebateComment(payload: DebateCommentRating): Observable<DebateComment> {
    return this.httpClient.put(apis.debateDiscussion, payload);
  }
}
