import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from '../../global/material/material.module';
import { HeaderComponent } from '../header/header.component';
import { LiveDialogComponent } from '../toolbar/live-dialog/live-dialog.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { ZoneEffects } from './store/effects';
import { zoneFeatureKey, zoneReducer } from './store/reducers';
import { ZoneRoutingModule } from './zone-routing.module';
import { ZoneComponent } from './zone.component';

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
  exports: [
    ToolbarComponent,
    HeaderComponent,
  ],
})
export class ZoneModule {}
