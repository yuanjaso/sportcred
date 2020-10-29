import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  notificationsCount: number;

  constructor() {}

  ngOnInit(): void {
    // ! hacking cuz development
    this.notificationsCount = 7;
  }

  showNotificationsModal(): void {
    console.log('TODO: show notifications modal');
  }
}
