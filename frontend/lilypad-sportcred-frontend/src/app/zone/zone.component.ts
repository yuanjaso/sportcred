import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { all_routes } from '../../global/routing-statics';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss']
})
export class ZoneComponent implements OnInit {

  cardList= [all_routes.open_court, all_routes.predictions, all_routes.debate, all_routes.trivia]

  constructor(
    private titleService: Title
  ) { 
    this.titleService.setTitle(all_routes.zone.title);
  }

  ngOnInit(): void {
  }

}
