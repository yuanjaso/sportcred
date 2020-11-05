import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from 'src/app/shared-components/shared-components.module';
import { MaterialModule } from '../../../../global/material/material.module';
import { AdminEchartsComponent } from './admin-echarts/admin-echarts.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminService } from './admin.service';
import { FormatQuestionsPipe } from './format-questions.pipe';
import { AdminEffects } from './store/admin.effects';
@NgModule({
  declarations: [AdminComponent, FormatQuestionsPipe, AdminEchartsComponent],
  imports: [
    CommonModule,
    EffectsModule.forFeature([AdminEffects]),
    AdminRoutingModule,
    MaterialModule,
    SharedModule,
  ],
  providers: [AdminService],
})
export class AdminModule {}
