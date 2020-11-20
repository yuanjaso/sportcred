import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { MaterialModule } from 'src/global/material/material.module';
import { AreaEchartsComponent } from './echarts/area-echart.component';
import { BarEchartsComponent } from './echarts/bar-echart.component';
import { TableComponent } from './table/table.component';
import { UrlifyPipe } from './urlify.pipe';
import { ParseDatePipe } from './parse-date.pipe';
import { IncludesPipePipe } from './includes-pipe.pipe';

const modules = [
  AreaEchartsComponent,
  BarEchartsComponent,
  TableComponent,
  UrlifyPipe,
  ParseDatePipe,
  IncludesPipePipe,
];

@NgModule({
  declarations: [...modules],
  imports: [
    CommonModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    MaterialModule,
  ],
  exports: [...modules],
})
export class SharedModule {}
