import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bar-echarts',
  templateUrl: './echarts.component.html',
  styleUrls: ['./echarts.component.scss'],
})
export class BarEchartsComponent implements OnInit {
  @Input() dataList = [];
  @Input() dataAxis = [];

  @Input() yName: string;

  options;
  constructor() {}

  //todo update to be in line with area-echart when jason merges
  ngOnInit(): void {
    this.build();
  }

  build() {
    this.options = {
      color: ['#61892f'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: this.dataAxis,
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: this.yName,
          type: 'bar',
          barWidth: '60%',
          data: this.dataList,
        },
      ],
    };
  }
}
