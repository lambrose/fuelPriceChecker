import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { Subscription } from 'rxjs';
import { ISearchResponse } from 'src/app/shared/interfaces/search-response.interface';
import { LocationService } from 'src/app/shared/services/location.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  // @ViewChild(GoogleMap)
  // public map!: GoogleMap;

  zoom = 12;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: false,
    disableDefaultUI: true,
    fullscreenControl: true,
    disableDoubleClickZoom: true,
    // mapTypeId: 'hybrid',
    // maxZoom:this.maxZoom,
    // minZoom:this.minZoom,
  };
  subscription!: Subscription;

  constructor(private locationService: LocationService) {}

  ngOnInit() {
    this.getUserCurrentLocation();
  }

  ngAfterViewInit(): void {
    this.subscription = this.locationService.changedSearchLocation$.subscribe(
      (location: ISearchResponse) => {
        // const place = location.address;
        this.center = {
          lat: location.coordinate.lat,
          lng: location.coordinate.lng,
        };
      }
    );
  }

  getUserCurrentLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
