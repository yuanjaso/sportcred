import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { interval, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { AppState } from '../store/reducer';
import { queryForTriviaGames } from '../trivia/store/trivia.actions';
import { selectAllTriviaInstances } from '../trivia/store/trivia.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  notificationsCount: number;

  private subscription = new Subscription();

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.infiniteQueryForTriviaInvites();
  }

  showNotificationsModal(): void {
    console.log('TODO: show notifications modal');
  }

  /**
   * Every 10 seconds, this will make an API request to get the latest set of games,
   * this user is a part of.
   * The badge value will be how many incomplete games the user has.
   */
  private infiniteQueryForTriviaInvites(): void {
    const triviaInstances$ = this.store.select(selectAllTriviaInstances).pipe(
      filter((instances) => instances !== undefined),
      tap((instances) => {
        // determine how many are in-completed
        this.notificationsCount = instances.filter(
          (el) => el.is_completed === false
        ).length;
      })
    );
    const infiniteRequest$ = interval(3500).pipe(
      tap(() => {
        this.store.dispatch(queryForTriviaGames());
      })
    );

    this.subscription.add(triviaInstances$.subscribe());
    this.subscription.add(infiniteRequest$.subscribe());
  }
}
