import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { all_routes } from '../../global/routing-statics';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  acs = 867;
  username = 'LeBron James';
  status = 'Go Raptors!!! SportCred is the best!';

  constructor(private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle(all_routes.profile.title);
  }
}
