import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZoneRoutingModule } from './zone-routing.module';
import { ZoneComponent } from './zone.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { LiveDialogComponent } from '../toolbar/live-dialog/live-dialog.component';
import { MaterialModule } from '../../global/material/material.module';
import { HeaderComponent } from '../header/header.component';
import { zoneFeatureKey, zoneReducer } from './store/reducers';
import { ZoneEffects } from './store/effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    ZoneComponent,
    ToolbarComponent,
    HeaderComponent,
    LiveDialogComponent,
  ],
  imports: [
    StoreModule.forFeature(zoneFeatureKey, zoneReducer),
    EffectsModule.forFeature([ZoneEffects]),
    CommonModule,
    ZoneRoutingModule,
    MaterialModule,
  ],
})
export class ZoneModule {}
