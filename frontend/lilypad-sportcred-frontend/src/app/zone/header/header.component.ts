import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { filter } from 'rxjs/internal/operators/filter';
import { first, map, tap } from 'rxjs/operators';
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
  curPage: string;
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

  setCurPage() {
    //init route
    this.curPage = this.route.snapshot['_routerState'].url;
    this.subcriptions.add(
      //then listen to every subsiquent route change
      this.router.events
        .pipe(filter((r) => r instanceof NavigationEnd))
        .subscribe((r: NavigationEnd) => {
          console.log(r);
          this.curPage = r.url;
        })
    );
  }

  toggle(e) {
    this.zoneService.sideNavToggle$.next(e.checked);
  }
  ngOnDestroy() {
    this.subcriptions.unsubscribe();
  }
}
