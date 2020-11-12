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
    // enables custom header behaviour based on page
    // this 'of' gets route when header comp is created
    this.curPage$ = of(this.route.snapshot['_routerState'].url);
    // this subscription subscribes to every other route change
    // these are seperate cases as router will not provide an initial route emit
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

    this.subcriptions.add(
      this.breakpointObserver
        .observe(['(max-width: 700px)'])
        .subscribe((state: BreakpointState) => {
          this.sidenavExpanded = !state.matches;
          this.zoneService.sideNavToggle$.next(!state.matches);
        })
    );
  }
  toggle(e) {
    console.log(e);
    this.zoneService.sideNavToggle$.next(e.checked);
  }
  ngOnDestroy() {
    this.subcriptions.unsubscribe();
  }
}
