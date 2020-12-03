import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { MaterialModule } from '../../../../../global/material/material.module';
import { DropdownPicksComponent } from './dropdown-picks/dropdown-picks.component';
import { PicksRoutingModule } from './picks-routing.module';
import { PicksComponent } from './picks.component';
import { PicksSerivce } from './picks.service';
import { PicksEffects } from './store/picks.effects';
import { TreePicksComponent } from './tree-picks/tree-picks.component';

@NgModule({
  declarations: [PicksComponent, TreePicksComponent, DropdownPicksComponent],
  imports: [
    CommonModule,
    PicksRoutingModule,
    MaterialModule,
    EffectsModule.forFeature([PicksEffects]),
  ],
  exports: [PicksComponent],
  providers: [PicksSerivce],
})
export class PicksModule {}
