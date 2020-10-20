import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { all_routes } from '../../global/routing-statics';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ToolbarComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  setPage(page: string) {
    console.log("clicked something\n");
    switch(page) {
      case 'PROFILE':
        // TODO: Profile link here
        break;
      case 'ZONE':
        this.router.navigate([all_routes.zone.url]);
        break;
      case 'LIVE':
        // TODO: Coming soon page or popup dialog for LIVE
      break;
    }
  }

}
