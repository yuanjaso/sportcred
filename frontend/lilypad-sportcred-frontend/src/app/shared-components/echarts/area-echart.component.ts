import { Component, Input, OnInit } from '@angular/core';
import * as echarts from 'echarts';
@Component({
  selector: 'app-area-echarts',
  templateUrl: './echarts.component.html',
  styleUrls: ['./echarts.component.scss'],
})
export class AreaEchartsComponent implements OnInit {
  //dataList[12] should be the datapoint of date[12]
  @Input() dataList;
  @Input() dateList;

  @Input() yName: string;

  options;
  constructor() {}

  ngOnInit(): void {
    this.build();
  }

  build() {
    this.options = {
      tooltip: {
        trigger: 'axis',
        position: function (pt) {
          return [pt[0], '10%'];
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.dateList,
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 10,
        },
        {
          start: 0,
          end: 10,
          handleStyle: {
            color: '#fff',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2,
          },
        },
      ],
      series: [
        {
          name: this.yName,
          type: 'line',
          smooth: true,
          symbol: 'none',
          sampling: 'average',
          itemStyle: {
            color: 'rgb(255, 70, 131)',
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(255, 158, 68)',
              },
              {
                offset: 1,
                color: 'rgb(255, 70, 131)',
              },
            ]),
          },
          data: this.dataList,
        },
      ],
    };
  }
}
