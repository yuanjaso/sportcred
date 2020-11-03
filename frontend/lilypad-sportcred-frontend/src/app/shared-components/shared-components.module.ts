import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { EchartsComponent } from './echarts/echarts.component';

const modules = [EchartsComponent];

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
