import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZoneRoutingModule } from './zone-routing.module';
import { ZoneComponent } from './zone.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { MaterialModule } from '../../global/material/material.module';


@NgModule({
  declarations: [ZoneComponent, ToolbarComponent],
  imports: [
    CommonModule,
    ZoneRoutingModule,
    MaterialModule
  ]
})
export class ZoneModule { }
