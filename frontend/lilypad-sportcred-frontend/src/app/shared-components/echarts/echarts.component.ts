import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-echarts',
  templateUrl: './echarts.component.html',
  styleUrls: ['./echarts.component.scss'],
})
export class EchartsComponent implements OnInit {
  @Input() options;
  constructor() {}

  ngOnInit(): void {}
}
