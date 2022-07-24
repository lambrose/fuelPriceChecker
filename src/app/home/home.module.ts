import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MapComponent } from './components/map/map.component';
import { StationListComponent } from './components/station-list/station-list.component';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { GoogleMapsModule } from '@angular/google-maps';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [HomeComponent, MapComponent, StationListComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    GoogleMapsModule,
    CoreModule,
  ],
  exports: [],
  providers: [],
})
export class HomeModule {}
