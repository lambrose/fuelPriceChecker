import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
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
  // @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) info!: MapInfoWindow;

  map!: google.maps.Map;
  // service!: google.maps.places.PlacesService;
  // infowindow!: google.maps.InfoWindow;

  zoom = 12;
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
  markers: any = [];
  // markers = []  as  any;
  // markers: google.maps.Marker;
  infoContent = '';
  subscription!: Subscription;

  constructor(private locationService: LocationService) {}

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
        this.getStations();
      }
    );
  }

  getStations(): void {
    const searchedPlace = new google.maps.LatLng(
      this.coords.lat,
      this.coords.lng
    );

    // this.infowindow = new google.maps.InfoWindow();

    this.map = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      {
        center: searchedPlace,
        zoom: 15,
      }
    );

    const request = {
      location: searchedPlace,
      radius: 2500,
      type: 'gas_station',
    };

    const service = new google.maps.places.PlacesService(this.map);
    service.nearbySearch(request, this.callback);
  }

  callback = (
    results: google.maps.places.PlaceResult[],
    status: google.maps.places.PlacesServiceStatus
  ) => {
    if (status == google.maps.places.PlacesServiceStatus.OK && results) {
      for (let result of results) {
        console.log(result);
        this.addMarker(result);
      }
      // this.map.setCenter(results[0].geometry!.location!);
    }
  };

  addMarker(place: google.maps.places.PlaceResult) {
    if (!place.geometry || !place.geometry.location) return;

    this.markers.push({
      position: place.geometry.location,
      label: {
        color: 'red',
        text: place.name,
      },
      title: 'Marker title ' + (this.markers.length + 1),
      info: 'Marker info ' + (this.markers.length + 1),
      options: {
        animation: google.maps.Animation.BOUNCE,
      },
    });
  }

  openInfo(marker: MapMarker, content: any) {
    this.infoContent = content;
    this.info.open(marker);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
