import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientWrapper } from '../../../../http/http-client-wrapper';
import { PredictionResults } from './picks.types';

@Injectable()
export class PicksSerivce {
  constructor(private httpClient: HttpClientWrapper) {}

  lockInPicks(results: PredictionResults): Observable<{}> {
    return this.httpClient.put('predictions/admin', results);
  }
}
