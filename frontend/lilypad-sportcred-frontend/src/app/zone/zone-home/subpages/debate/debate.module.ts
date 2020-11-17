import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from '../../../../../global/material/material.module';
import { DebateComponent } from './debate.component';
import { DebateService } from './debate.service';
import { DebateEffects } from './store/debate.effects';
import { debateFeatureKey, debateReducer } from './store/debate.reducer';
import { DebateDiscussionDialogComponent } from './debate-discussion-dialog/debate-discussion-dialog.component';

@NgModule({
  declarations: [DebateComponent, DebateDiscussionDialogComponent],
  imports: [
    StoreModule.forFeature(debateFeatureKey, debateReducer),
    EffectsModule.forFeature([DebateEffects]),
    CommonModule,
    MaterialModule,
  ],
  providers: [DebateService],
})
export class DebateModule {}
