import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as apis from '../../../../../global/api.types';
import { HttpClientWrapper } from '../../../../http/http-client-wrapper';
import { DebateComment } from './debate.types';

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
}
