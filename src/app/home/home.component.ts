import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IStationPrice } from '../shared/interfaces/station-price.interface';
import { NearbySearchService } from './services/nearby-search.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  columns: string[] = ['station', 'petrol', 'diesel'];
  dataSource!: MatTableDataSource<IStationPrice>;
  subscription!: Subscription;

  constructor(private nearbySearchService: NearbySearchService) {}

  ngOnInit(): void {
    this.subscription =
      this.nearbySearchService.changedNearbyStations$.subscribe(
        (data: IStationPrice[]) => {
          this.dataSource = new MatTableDataSource(data);
        }
      );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
