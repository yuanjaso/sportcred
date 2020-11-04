import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClientWrapper } from '../../../../http/http-client-wrapper';
import { ACS } from '../../../subpages/profile/profile.types';
import { TriviaInstance, TriviaResults } from './trivia.types';

@Injectable()
export class TriviaService {
  constructor(private httpClient: HttpClientWrapper) {}

  createTriviaInstance(
    sportId: number,
    opponentUserId?: number
  ): Observable<TriviaInstance> {
    return this.httpClient.post('trivia', {
      sport: sportId,
      other_user: opponentUserId,
    });
  }

  /**
   * Returns null when the game was for multiple players
   * @param results
   */
  submitTriviaResults(results: TriviaResults): Observable<ACS | null> {
    // return this.httpClient.post('trivia/answers', results);
    // ! hardcoded, waiting for backend to implement
    return of({ average: 455, basketball: 12 }).pipe(delay(1500));
  }
}
