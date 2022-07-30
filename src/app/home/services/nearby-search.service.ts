import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  IPrice,
  IStationPrice,
} from '../../shared/interfaces/station-price.interface';
import { tap } from 'rxjs/operators';
import { IAppState } from 'src/app/core/interfaces/app-state.interface';
import { Store } from '@ngrx/store';
import { getStations } from 'src/app/core/state/core.selector';
import { IUpdatedStation } from 'src/app/core/interfaces/search-state.interface';

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
  private stationsMap = new Map<string, IPrice>();
  getStations$: Observable<IUpdatedStation[]> = this._store.select(getStations);

  constructor(private _store: Store<IAppState>) {}

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
      this.stationsMap.clear();
      // this.map.setCenter(results[0].geometry!.location!);
    }
  };

  getStations(): any {
    return this.getStations$.pipe(
      tap((stations) =>
        stations.map((station) => {
          this.stationsMap.set(station.station, {
            petrol: station.petrol,
            diesel: station.diesel,
          });
        })
      )
    );
  }

  addMarker(place: google.maps.places.PlaceResult) {
    if (!place.geometry || !place.geometry.location) return;

    this.markers.push({
      position: place.geometry.location,
      info: place.name,
      options: {
        animation: google.maps.Animation.BOUNCE,
      },
    });
  }

  addStation(place: google.maps.places.PlaceResult) {
    if (!place.name) return;

    let petrolValue = 0;
    let dieselValue = 0;

    const value = this.stationsMap.get(place.name);

    if (this.stationsMap.size > 0 && value) {
      petrolValue = value.petrol;
      dieselValue = value.diesel;
    }

    this.stations.push({
      station: place.name,
      petrol: petrolValue,
      diesel: dieselValue,
    });
  }
}
