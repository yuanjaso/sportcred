import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from '../../global/material/material.module';
import { LoginEffects } from './store/effects';
import { loginFeatureKey, loginReducer } from './store/reducers';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';

@NgModule({
  declarations: [LoginComponent, RegisterDialogComponent],
  imports: [
    HttpClientModule,
    StoreModule.forFeature(loginFeatureKey, loginReducer),
    EffectsModule.forFeature([LoginEffects]),
    CommonModule,
    LoginRoutingModule,
    MaterialModule,
  ],
})
export class LoginModule {}
