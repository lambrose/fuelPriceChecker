import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IStationPrice } from './interfaces/station-price.interface';
import { NearbySearchService } from './services/nearby-search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  isStations!: boolean;
  stations!: IStationPrice[];
  subscription!: Subscription;
  columns: string[] = ['station', 'petrol', 'diesel'];

  constructor(private nearbySearchService: NearbySearchService) {}

  ngOnInit(): void {
    this.nearbySearchService.changedNearbyStations$.subscribe(
      (data: IStationPrice[]) => {
        this.isStations = true;
        this.stations = data;
      }
    );
  }

  ngOnDestroy(): void {
    this.isStations = false;
    this.subscription.unsubscribe();
  }
}
