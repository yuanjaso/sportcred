import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from '../../global/material/material.module';
import { AuthEffects } from '../auth/store/effects';
import { authFeatureKey, authReducer } from '../auth/store/reducers';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    // TODO have a global http client wrapper
    HttpClientModule,
    StoreModule.forFeature(authFeatureKey, authReducer),
    EffectsModule.forFeature([AuthEffects]),
    CommonModule,
    LoginRoutingModule,
    MaterialModule,
  ],
})
export class LoginModule {}
