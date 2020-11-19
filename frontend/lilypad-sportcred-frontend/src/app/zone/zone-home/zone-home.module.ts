import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../../global/material/material.module';
import { DebateModule } from './subpages/debate/debate.module';
import { PicksModule } from './subpages/picks/picks.module';
import { TriviaModule } from './subpages/trivia/trivia.module';
import { ZoneHomeRoutingModule } from './zone-home-routing.module';
import { ZoneHomeComponent } from './zone-home.component';
@NgModule({
  declarations: [ZoneHomeComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ZoneHomeRoutingModule,
    PicksModule,
    TriviaModule,
    DebateModule,
  ],
})
export class ZoneHomeModule {}
