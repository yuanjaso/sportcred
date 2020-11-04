import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { AreaEchartsComponent } from './echarts/area-echart.component';
import { BarEchartsComponent } from './echarts/bar-echart.component';

const modules = [AreaEchartsComponent, BarEchartsComponent];

@NgModule({
  declarations: [...modules],
  imports: [
    CommonModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  exports: [...modules],
})
export class SharedModule {}
