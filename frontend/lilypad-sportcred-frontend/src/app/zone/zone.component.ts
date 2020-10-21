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

  cardList: { title: string, imgLink: string, link: string }[] = [
    { title: all_routes.open_court.dashTitle, imgLink: all_routes.open_court.dashImgLink, link: all_routes.open_court.url },
    { title: all_routes.predictions.dashTitle, imgLink: all_routes.predictions.dashImgLink, link: all_routes.predictions.url },
    { title: all_routes.debate.dashTitle, imgLink: all_routes.debate.dashImgLink, link: all_routes.debate.url },
    { title: all_routes.trivia.dashTitle, imgLink: all_routes.trivia.dashImgLink, link: all_routes.trivia.url }
  ];

  constructor(
    private titleService: Title,
    private router: Router
  ) { 
    this.titleService.setTitle(all_routes.zone.title);
  }

  ngOnInit(): void {
  }

}
