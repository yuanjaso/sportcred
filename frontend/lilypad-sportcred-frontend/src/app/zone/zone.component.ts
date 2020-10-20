import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { all_routes } from '../../global/routing-statics';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss']
})
export class ZoneComponent implements OnInit {

  cardList: { title: string, imgLink: string }[] = [
    { title: "Open Court", imgLink: "../../assets/dashboard_OC.png" },
    { title: "Picks & Predictions", imgLink: "../../assets/dashboard_PP.png" },
    { title: "Analyze & Debate", imgLink: "../../assets/dashboard_AD.png" },
    { title: "Trivia", imgLink: "../../assets/dashboard_Trivia.png" }
  ];

  constructor(
    private titleService: Title
  ) { 
    this.titleService.setTitle(all_routes.zone.title);
  }

  ngOnInit(): void {
  }

}
