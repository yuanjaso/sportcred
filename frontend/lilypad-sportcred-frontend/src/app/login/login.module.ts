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
import {
  SwiperModule,
  SWIPER_CONFIG,
  SwiperConfigInterface,
} from 'ngx-swiper-wrapper';
import { FirstPageRegistrationComponent } from './register-dialog/first-page-registration/first-page-registration.component';
import { QuestionairePagesComponent } from './register-dialog/questionaire-pages/questionaire-pages.component';
@NgModule({
  declarations: [LoginComponent, RegisterDialogComponent, FirstPageRegistrationComponent, QuestionairePagesComponent],
  imports: [
    HttpClientModule,
    StoreModule.forFeature(loginFeatureKey, loginReducer),
    EffectsModule.forFeature([LoginEffects]),
    CommonModule,
    LoginRoutingModule,
    MaterialModule,
    SwiperModule,
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: {
        // options are in SwiperConfigInterface
        direction: 'horizontal',
        slidesPerView: 'auto',
      },
    },
  ],
})
export class LoginModule {}
