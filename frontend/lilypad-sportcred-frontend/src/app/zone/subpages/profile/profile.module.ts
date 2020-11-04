import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from '../../../../global/material/material.module';
import { SharedModule } from '../../../shared-components/shared-components.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ProfileService } from './profile.service';
import { ProfileEffects } from './store/profile.effects';
import { profileFeatureKey, profileReducer } from './store/profile.reducer';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    MaterialModule,
    FormsModule,
    StoreModule.forFeature(profileFeatureKey, profileReducer),
    EffectsModule.forFeature([ProfileEffects]),
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
  ],
  providers: [ProfileService],
})
export class ProfileModule {}
