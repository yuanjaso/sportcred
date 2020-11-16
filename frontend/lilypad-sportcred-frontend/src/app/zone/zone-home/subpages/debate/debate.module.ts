import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../../../../global/material/material.module';
import { DebateComponent } from './debate.component';

@NgModule({
  declarations: [DebateComponent],
  imports: [CommonModule, MaterialModule],
  providers: [],
})
export class DebateModule {}
