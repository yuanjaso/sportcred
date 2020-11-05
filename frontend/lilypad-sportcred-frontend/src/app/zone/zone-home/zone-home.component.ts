import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { all_routes } from '../../../global/routing-statics';
import { ZoneService } from '../zone.service';
@Component({
  selector: 'app-zone-home',
  templateUrl: './zone-home.component.html',
  styleUrls: ['./zone-home.component.scss'],
})
export class ZoneHomeComponent implements OnInit, OnDestroy {
  sidenavExpanded = true;
  subcriptions = new Subscription();

  chartOption;
  cardList = [
    all_routes.open_court,
    all_routes.predictions,
    all_routes.debate,
    all_routes.trivia,
  ];
  constructor(private zoneService: ZoneService, private title: Title) {
    this.subcriptions.add(
      this.zoneService.sideNavToggle$.subscribe((tog) => {
        this.sidenavExpanded = tog;
      })
    );

    this.title.setTitle(all_routes.zone.title);
  }
  ngOnDestroy(): void {
    this.subcriptions.unsubscribe();
  }

  ngOnInit(): void {}
}
