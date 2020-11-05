import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private titleService: Title) {
    const title = 'SPORTCRED';
    this.titleService.setTitle(title);
  }
}
