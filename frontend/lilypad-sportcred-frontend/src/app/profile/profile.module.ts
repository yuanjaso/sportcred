import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ProfileService } from './profile.service';
import { ProfileEffects } from './store/profile.effects';
import { profileFeatureKey, profileReducer } from './store/profile.reducer';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    MatInputModule,
    StoreModule.forFeature(profileFeatureKey, profileReducer),
    EffectsModule.forFeature([ProfileEffects]),
    CommonModule,
    ProfileRoutingModule,
  ],
  providers: [ProfileService],
})
export class ProfileModule {}
