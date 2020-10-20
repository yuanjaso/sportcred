import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { all_routes } from '../../global/routing-statics';
import { Router } from '@angular/router';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss']
})
export class ZoneComponent implements OnInit {
  // TODO: Add links to dashboard cards
  cardList: { title: string, imgLink: string, link: string }[] = [
    { title: "Open Court", imgLink: "../../assets/dashboard_OC.png", link: all_routes.zone.url },
    { title: "Picks & Predictions", imgLink: "../../assets/dashboard_PP.png", link: all_routes.zone.url },
    { title: "Analyze & Debate", imgLink: "../../assets/dashboard_AD.png", link: all_routes.zone.url },
    { title: "Trivia", imgLink: "../../assets/dashboard_Trivia.png", link: all_routes.trivia.url }
  ];

  constructor(
    private titleService: Title,
    private router: Router
  ) { 
    this.titleService.setTitle(all_routes.zone.title);
  }

  ngOnInit(): void {
  }

  onClickCard(url: string) {
    if (url != "" || url != null) {
      this.router.navigate([url]);
    } else {
      this.router.navigate([all_routes.zone.url]);
    }
  }

}
