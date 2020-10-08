import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './login/login.module';
import { ProfileModule } from './profile/profile.module';
import { PicksModule } from './picks/picks.module';
import { TriviaModule } from './trivia/trivia.module';
import { ZoneModule } from './zone/zone.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, LoginModule, ProfileModule, PicksModule, TriviaModule, ZoneModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
