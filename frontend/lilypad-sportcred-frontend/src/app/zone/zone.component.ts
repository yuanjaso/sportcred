import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { all_routes } from '../../global/routing-statics';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss']
})
export class ZoneComponent implements OnInit {

  cardList: { title: string, link: string }[] = [
    { title: "Open Court", link: "somelink" },
    { title: "Picks & Predictions", link: "somelink" },
    { title: "Trivia", link: "somelink" },
    { title: "Analyze & Debate", link: "somelink" }
  ];

  constructor(
    private titleService: Title
  ) { 
    this.titleService.setTitle(all_routes.zone.title);
  }

  ngOnInit(): void {
  }

}
