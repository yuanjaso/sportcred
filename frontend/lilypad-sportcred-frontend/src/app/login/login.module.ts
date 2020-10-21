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
import { SwiperModule, SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { QuestionairePagesComponent } from './questionaire-registration-dialog/questionaire-pages/questionaire-pages.component';
import { BasicRegistrationDialogComponent } from './basic-registration-dialog/basic-registration-dialog.component';
import { QuestionaireRegistrationDialogComponent } from './questionaire-registration-dialog/questionaire-registration-dialog.component';
@NgModule({
  declarations: [
    LoginComponent,
    QuestionairePagesComponent,
    BasicRegistrationDialogComponent,
    QuestionaireRegistrationDialogComponent,
  ],
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
