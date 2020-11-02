import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { all_routes } from '../../../global/routing-statics';
import { ZoneService } from '../zone.service';

@Component({
  selector: 'app-zone-home',
  templateUrl: './zone-home.component.html',
  styleUrls: ['./zone-home.component.scss'],
})
export class ZoneHomeComponent implements OnInit, OnDestroy {
  subcriptions = new Subscription();
  sidenavExpanded = true;
  cardList = [
    all_routes.open_court,
    all_routes.predictions,
    all_routes.debate,
    all_routes.trivia,
  ];
  constructor(
    private zoneService: ZoneService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.subcriptions.add(
      this.breakpointObserver
        .observe(['(max-width: 700px)'])
        .subscribe((state: BreakpointState) => {
          if (state.matches) {
            //toggle the sidenav through a service
            this.sidenavExpanded = false;
          } else {
            this.sidenavExpanded = true;
          }
        })
    );
  }
  ngOnDestroy() {
    this.subcriptions.unsubscribe();
  }
}
