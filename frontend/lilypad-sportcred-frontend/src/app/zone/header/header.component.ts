import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { filter } from 'rxjs/internal/operators/filter';
import { first, map } from 'rxjs/operators';
import { all_routes } from '../../../global/routing-statics';
import { ZoneService } from '../zone.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit, OnDestroy {
  subcriptions = new Subscription();
  sidenavExpanded;
  curPage$: Observable<string>;
  all_routes = all_routes;
  constructor(
    private zoneService: ZoneService,
    private breakpointObserver: BreakpointObserver,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.setCurPage();

    this.subcriptions.add(
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
    this.zoneService.sideNavToggle$.next(e.checked);
  }
  ngOnDestroy() {
    this.subcriptions.unsubscribe();
  }
}
