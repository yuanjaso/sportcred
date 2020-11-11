import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { interval, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { all_routes } from '../../../global/routing-statics';
import { AppState } from '../../store/reducer';
import {
  queryForTriviaGames,
  setTriviaInstance,
} from '../zone-home/subpages/trivia/store/trivia.actions';
import { selectAllTriviaInstances } from '../zone-home/subpages/trivia/store/trivia.selectors';
import { TriviaInstance } from '../zone-home/subpages/trivia/trivia.types';
import { ZoneService } from '../zone.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit, OnDestroy {
  subscriptions = new Subscription();
  sidenavExpanded;

  notificationsCount: number;
  triviaInstances: TriviaInstance[];

  private subscription = new Subscription();

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private zoneService: ZoneService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      this.breakpointObserver
        .observe(['(max-width: 700px)'])
        .subscribe((state: BreakpointState) => {
          this.sidenavExpanded = !state.matches;
          this.zoneService.sideNavToggle$.next(!state.matches);
        })
    );

    this.infiniteQueryForTriviaInvites();
  }

  toggle(e) {
    console.log(e);
    this.zoneService.sideNavToggle$.next(e.checked);
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
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
          (el) => el.score === null
        ).length;
        this.triviaInstances = instances;
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

  playTrivia(triviaInstance: TriviaInstance): void {
    this.store.dispatch(setTriviaInstance({ triviaInstance }));
    const multiPlayerTriviaLink = `/${all_routes.zone.url}/${all_routes.zonehome.url}/${all_routes.trivia.url}/${all_routes.multiplayertrivia.url}`;
    this.router.navigate([multiPlayerTriviaLink]);
  }
}
