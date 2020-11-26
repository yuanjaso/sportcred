import { Component, OnInit } from '@angular/core';
import { TreePicksComponent } from './tree-picks/tree-picks.component';
import { DropdownPicksComponent } from './dropdown-picks/dropdown-picks.component';
@Component({
  selector: 'app-picks',
  templateUrl: './picks.component.html',
  styleUrls: ['./picks.component.scss'],
})
export class PicksComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
