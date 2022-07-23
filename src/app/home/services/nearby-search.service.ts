import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IStationPrice } from '../../shared/interfaces/station-price.interface';

@Injectable({
  providedIn: 'root',
})
export class NearbySearchService {
  private markers: any = [];
  private stations: IStationPrice[] = [];
  private _changedNearbyStations = new Subject<IStationPrice[]>();
  public changedNearbyStations$ = this._changedNearbyStations.asObservable();
  private _changedMarkers = new Subject<any[]>();
  public changedMarkers$ = this._changedMarkers.asObservable();

  constructor() {}

  findStations(coords: google.maps.LatLngLiteral, map: google.maps.Map): void {
    const searchedPlace = new google.maps.LatLng(coords.lat, coords.lng);

    map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: searchedPlace,
      zoom: 15,
    });

    const request = {
      location: searchedPlace,
      radius: 1500,
      type: 'gas_station',
    };

    const service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, this.callback);
  }

  callback = (
    results: google.maps.places.PlaceResult[],
    status: google.maps.places.PlacesServiceStatus
  ) => {
    if (status == google.maps.places.PlacesServiceStatus.OK && results) {
      for (let result of results) {
        this.addMarker(result);
        this.addStation(result);
      }
      this._changedNearbyStations.next(this.stations);
      this._changedMarkers.next(this.markers);

      this.markers = [];
      this.stations = [];
      // this.map.setCenter(results[0].geometry!.location!);
    }
  };

  addMarker(place: google.maps.places.PlaceResult) {
    if (!place.geometry || !place.geometry.location) return;

    this.markers.push({
      position: place.geometry.location,
      // label: {
      //   color: 'red',
      //   text: place.name,
      // },
      // title: 'Marker title ' + (this.markers.length + 1),
      info: place.name,
      options: {
        animation: google.maps.Animation.BOUNCE,
      },
    });
  }

  addStation(place: google.maps.places.PlaceResult) {
    this.stations.push({
      station: place.name,
      petrol: 0,
      diesel: 0,
    });
  }
}
