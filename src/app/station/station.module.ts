import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StationRoutingModule } from './station-routing.module';
import { StationComponent } from './station.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [StationComponent],
  imports: [CommonModule, StationRoutingModule, SharedModule],
  exports: [],
  providers: [],
})
export class StationModule {}
