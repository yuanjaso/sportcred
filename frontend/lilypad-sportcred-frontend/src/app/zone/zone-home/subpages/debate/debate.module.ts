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
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../../shared-components/shared-components.module';
@NgModule({
  declarations: [DebateComponent, DebateDiscussionDialogComponent],
  imports: [
    StoreModule.forFeature(debateFeatureKey, debateReducer),
    EffectsModule.forFeature([DebateEffects]),
    CommonModule,
    MaterialModule,
    RouterModule,
    SharedModule,
  ],
  providers: [DebateService],
})
export class DebateModule {}
