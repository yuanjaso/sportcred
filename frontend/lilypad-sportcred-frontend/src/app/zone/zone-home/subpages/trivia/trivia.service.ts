import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { selectUserInfo } from '../../../../auth/store/selectors';
import { HttpClientWrapper } from '../../../../http/http-client-wrapper';
import { AppState } from '../../../../store/reducer';
import { ACS } from '../../../subpages/profile/profile.types';
import { TriviaInstance, TriviaResults } from './trivia.types';

@Injectable()
export class TriviaService {
  constructor(
    private httpClient: HttpClientWrapper,
    private store: Store<AppState>
  ) {}

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
    return this.httpClient.post('trivia/answers', results);
  }

  queryForTriviaGames(): Observable<TriviaInstance[]> {
    return this.httpClient.get<TriviaInstance[]>('trivia').pipe(
      map((instances) =>
        instances.filter((instance) => instance.other_user !== null)
      ),
      withLatestFrom(this.store.select(selectUserInfo)),
      map(([instances, userInfo]) =>
        instances.map((instance) => {
          // only care about the opponent name if there is an other user
          instance.opponentName =
            instance.user.id === userInfo.user_id
              ? instance.other_user.username
              : instance.user.username;
          return instance;
        })
      )
    );
  }
}
