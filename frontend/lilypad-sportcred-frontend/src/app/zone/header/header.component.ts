import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';
import { all_routes } from '../../../global/routing-statics';
import { AppState } from '../../store/reducer';
import { setTriviaInstance } from '../zone-home/subpages/trivia/store/trivia.actions';
import { TriviaService } from '../zone-home/subpages/trivia/trivia.service';
import {
  TriviaInstance,
  TriviaNotification,
} from '../zone-home/subpages/trivia/trivia.types';
import { ZoneService } from '../zone.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit, OnDestroy {
  subscriptions = new Subscription();
  sidenavExpanded: boolean;

  triviaNotification$: Subject<TriviaNotification>;

  curPage$: Observable<string>;
  all_routes = all_routes;

  constructor(
    private triviaService: TriviaService,
    private store: Store<AppState>,
    private router: Router,
    private zoneService: ZoneService,
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.triviaNotification$ = this.triviaService.notificationsSubject$;

    this.setCurPage();

    this.subscriptions.add(
      this.breakpointObserver
        .observe(['(max-width: 700px)'])
        .subscribe((state: BreakpointState) => {
          this.sidenavExpanded = !state.matches;
          this.zoneService.sideNavToggle$.next(!state.matches);
        })
    );
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
