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

  constructor(private nearbySearchService: NearbySearchService) {}

  ngOnInit(): void {
    // this.nearbySearchService.getStations();

    this.nearbySearchService.changedNearbyStations$.subscribe(
      (data: IStationPrice[]) => {
        console.log(data);
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
