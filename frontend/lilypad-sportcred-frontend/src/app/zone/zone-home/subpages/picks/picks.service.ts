import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientWrapper } from '../../../../http/http-client-wrapper';
import { Predictions, UpdatePredictionPayload } from './picks.types';

@Injectable()
export class PicksSerivce {
  constructor(private httpClient: HttpClientWrapper) {}

  getPredictions(user_id: number, year: number): Observable<Predictions> {
    return this.httpClient.get('predictions', { user_id, year });
  }

  updateUserPredictions(predictions: UpdatePredictionPayload): Observable<{}> {
    return this.httpClient.put('predictions', predictions);
  }

  lockInPicks(results: UpdatePredictionPayload): Observable<{}> {
    return this.httpClient.put('predictions/admin', results);
  }
}
