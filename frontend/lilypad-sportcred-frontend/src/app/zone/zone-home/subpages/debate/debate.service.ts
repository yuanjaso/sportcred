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
    //todo remove mock
    return this.httpClient.get(apis.debateURL, { sport_id: 1, acs_rank: 'E' });
  }

  getDebateDiscussion(id: number) {
    return this.httpClient.get(apis.debateDiscussion(id));
  }
}
