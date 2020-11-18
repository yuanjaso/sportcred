import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { interval, Observable, of, Subscription } from 'rxjs';
import { filter, first, map, tap } from 'rxjs/operators';
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

  readonly UNPLAYED_GAME = '';

  private subscription = new Subscription();

  curPage$: Observable<string>;
  all_routes = all_routes;
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private zoneService: ZoneService,
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.setCurPage();

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

  /**
   * this function sets the observer for cur page
   * we need to split this functionality into 2
   * 1) subscribe to the on created route
   * 2) subscribe to everyother subsiquent route change
   */
  setCurPage() {
    // 1) step
    this.curPage$ = of(this.route.snapshot['_routerState'].url);
    // 2) step
    this.router.events
      .pipe(
        filter((r) => r instanceof NavigationEnd),
        first(() => {
          this.curPage$ = this.router.events.pipe(
            filter((r) => r instanceof NavigationEnd),
            map((r: NavigationEnd) => r.urlAfterRedirects)
          );
          return true;
        })
      )
      .subscribe();
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
          (el) => el.score === this.UNPLAYED_GAME
        ).length;

        if (this.notificationsCount === 0) {
          // setting as undefined looks better on the view than showing a 0
          this.notificationsCount = undefined;
        }
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

    this.router.navigate([
      all_routes.zone.url,
      all_routes.zonehome.url,
      all_routes.trivia.url,
      all_routes.multiplayertrivia.url,
    ]);
  }
}
