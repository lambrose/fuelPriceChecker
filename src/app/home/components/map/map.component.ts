import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
// import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Observable, Subscription } from 'rxjs';
import { ISearchResponse } from 'src/app/shared/interfaces/search-response.interface';
import { LocationService } from 'src/app/shared/services/location.service';
import { NearbySearchService } from '../../services/nearby-search.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MapInfoWindow, { static: false }) info!: MapInfoWindow;
  map!: google.maps.Map;
  zoom = 14;
  coords!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: false,
    disableDefaultUI: true,
    fullscreenControl: true,
    disableDoubleClickZoom: true,
    mapTypeId: 'hybrid',
    // maxZoom:this.maxZoom,
    // minZoom:this.minZoom,
  };
  markers: Observable<any[]> | undefined;
  infoContent = '';
  subscription!: Subscription;

  constructor(
    private locationService: LocationService,
    private nearbySearchService: NearbySearchService
  ) {}

  ngOnInit() {
    this.getUserCurrentLocation();
  }

  getUserCurrentLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.coords = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
  }

  ngAfterViewInit(): void {
    this.subscription = this.locationService.changedSearchLocation$.subscribe(
      (location: ISearchResponse) => {
        this.coords = {
          lat: location.coordinate.lat,
          lng: location.coordinate.lng,
        };
        this.nearbySearchService.findStations(this.coords, this.map);
        this.markers = this.nearbySearchService.changedMarkers$;
      }
    );
  }

  openInfo(marker: MapMarker, content: any) {
    this.infoContent = content;
    this.info.open(marker);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
