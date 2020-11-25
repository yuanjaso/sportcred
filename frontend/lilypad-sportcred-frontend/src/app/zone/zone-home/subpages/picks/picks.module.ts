import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PicksRoutingModule } from './picks-routing.module';
import { PicksComponent } from './picks.component';
import { TreePicksComponent } from './tree-picks/tree-picks.component';
import { DropdownPicksComponent } from './dropdown-picks/dropdown-picks.component';

@NgModule({
  declarations: [PicksComponent, TreePicksComponent, DropdownPicksComponent],
  imports: [CommonModule, PicksRoutingModule],
})
export class PicksModule {}
