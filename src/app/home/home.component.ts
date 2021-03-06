import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IStationPrice } from '../shared/interfaces/station-price.interface';
import { NearbySearchService } from './services/nearby-search.service';
import { MatTableDataSource } from '@angular/material/table';
import { ISearchResponse } from '../shared/interfaces/search-response.interface';
import { LocationService } from '../shared/services/location.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  map!: google.maps.Map;
  coords!: google.maps.LatLngLiteral;
  markers: Observable<any[]> | undefined;
  columns: string[] = ['station', 'petrol', 'diesel', 'star'];
  dataSource!: MatTableDataSource<IStationPrice>;
  dataSubscription!: Subscription;
  locSubscription!: Subscription;
  dbSubscription!: Subscription;

  constructor(
    private locationService: LocationService,
    private nearbySearchService: NearbySearchService
  ) {}

  ngOnInit(): void {
    this.dataSubscription =
      this.nearbySearchService.changedNearbyStations$.subscribe(
        (data: IStationPrice[]) => {
          this.dataSource = new MatTableDataSource(data);
        }
      );
    this.dbSubscription = this.nearbySearchService.getStations().subscribe();
  }

  ngAfterViewInit(): void {
    this.locSubscription =
      this.locationService.changedSearchLocation$.subscribe(
        (response: ISearchResponse) => {
          this.coords = {
            lat: response.coordinate.lat,
            lng: response.coordinate.lng,
          };
          this.nearbySearchService.findStations(this.coords, this.map);
          this.markers = this.nearbySearchService.changedMarkers$;
        }
      );
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
    this.locSubscription.unsubscribe();
    this.dbSubscription.unsubscribe();
  }
}
