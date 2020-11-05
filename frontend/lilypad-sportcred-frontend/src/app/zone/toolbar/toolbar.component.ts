import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';
import { all_routes } from '../../../global/routing-statics';
import { selectUserInfo } from '../../auth/store/selectors';
import { AppState } from '../../store/reducer';
import { LiveDialogComponent } from './live-dialog/live-dialog.component';

interface Tab {
  icon: string;
  link: string;
}
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ToolbarComponent implements OnInit, OnDestroy {
  subscriptions = new Subscription();
  pages = [
    { icon: 'home', ...all_routes.zonehome },
    { icon: 'person', ...all_routes.profile },
  ];
  isAdmin = false;
  userId: number;
  tabIndex = 0;
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.store
        .select(selectUserInfo)
        .pipe(
          first(),
          tap((user) => {
            this.isAdmin = user.is_superuser;
            this.userId = user.user_id;
            if (this.isAdmin) {
              //if user is admin, lets append the admin button to the front
              this.pages.push({
                icon: 'admin_panel_settings',
                ...all_routes.admin,
              });
            }
          })
        )
        .subscribe()
    );
    this.subscriptions.add(
      this.router.events
        .pipe(filter((r) => r instanceof NavigationEnd))
        .subscribe((navEvent: NavigationEnd) => {
          //fixes tab behaviour when we are navigating using browser forward and back buttons
          for (let i = 0; i < this.pages.length; i++) {
            if (navEvent.urlAfterRedirects.includes(this.pages[i].url)) {
              this.tabIndex = i;
              break;
            }
          }
        })
    );
  }

  onClickLive() {
    this.dialog.open(LiveDialogComponent);
  }

  navigate(e) {
    let target = [this.pages[e.index]?.url];
    if (!this.route.snapshot['_routerState'].url.includes(target))
      this.router.navigate(target, {
        relativeTo: this.route,
        queryParams: { userId: this.userId },
      });
    // if (e.index >= this.pages.length) return;
    // // the tab might change but are already at the correct route,
    // // this might happen when we route through the search results dialog
    // // in this case that has priority over the routing here

    // // if the current route is already profile and the proposed route is also profile stop
    // // we don't want the current user's user id to be in the url, we want whatever is in the search result

    // const proposedRoute = this.pages[e.index]?.url;
    // if (!this.isTryingToGoToProfileTwice(proposedRoute)) {

    // }
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  // private isTryingToGoToProfileTwice(proposedRoute: string): boolean {
  //   const profileRoute = `${all_routes.profile.url}`;
  //   return (
  //     this.router.url.includes(profileRoute) &&
  //     proposedRoute.includes(profileRoute)
  //   );
  // }
}
