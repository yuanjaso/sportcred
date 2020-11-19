import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { interval, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { AppState } from '../../store/reducer';
import { queryForTriviaGames } from '../zone-home/subpages/trivia/store/trivia.actions';
import { selectAllTriviaInstances } from '../zone-home/subpages/trivia/store/trivia.selectors';
import { TriviaService } from '../zone-home/subpages/trivia/trivia.service';
import { UNPLAYED_GAME } from '../zone-home/subpages/trivia/trivia.types';

/**
 * Invisible component, wrapped with the logic to request for trivia invites,
 * which will be sent to the header
 * @author Jason
 */
@Component({ selector: 'app-notifications', template: `` })
export class NotificationsComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();

  constructor(
    private store: Store<AppState>,
    private triviaService: TriviaService
  ) {}

  ngOnInit(): void {
    this.listenForTriviaInvites();
    this.infiniteQueryForTriviaInvites();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private listenForTriviaInvites(): void {
    const triviaInstances$ = this.store.select(selectAllTriviaInstances).pipe(
      filter((triviaInstances) => triviaInstances !== undefined),
      tap((triviaInstances) => {
        // determine how many are in-completed
        let count = triviaInstances.filter((el) => el.score === UNPLAYED_GAME)
          .length;

        if (count === 0) {
          // setting as null looks better on the view than showing a 0
          count = null;
        }

        this.triviaService.notificationsSubject$.next({
          count,
          triviaInstances,
        });
      })
    );

    this.subscription.add(triviaInstances$.subscribe());
  }

  /**
   * Every 5 seconds, this will make an API request to get the latest set of games,
   * this user is a part of.
   * The badge value will be how many incomplete games the user has.
   */
  private infiniteQueryForTriviaInvites(): void {
    const infiniteRequest$ = interval(5000).pipe(
      tap(() => {
        this.store.dispatch(queryForTriviaGames());
      })
    );
    this.subscription.add(infiniteRequest$.subscribe());
  }
}
