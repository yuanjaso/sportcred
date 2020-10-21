import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
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
    MatChipsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    StoreModule.forFeature(profileFeatureKey, profileReducer),
    EffectsModule.forFeature([ProfileEffects]),
    CommonModule,
    ProfileRoutingModule,
  ],
  providers: [ProfileService],
})
export class ProfileModule {}
