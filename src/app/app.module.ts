import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { HeaderComponent } from './shared/components/header/header.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { MapComponent } from './home/components/map/map.component';
import { SearchPlaceComponent } from './shared/components/search-place/search-place.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { StationComponent } from './station/station.component';
import { StationListComponent } from './home/components/station-list/station-list.component';

const MatModules = [
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatToolbarModule,
  MatCardModule,
  MatInputModule,
  MatTableModule,
  MatSortModule,
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    PageNotFoundComponent,
    SidebarComponent,
    MapComponent,
    SearchPlaceComponent,
    StationComponent,
    StationListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    MatModules,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
