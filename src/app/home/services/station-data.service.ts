import { Injectable } from '@angular/core';
import { IStationPrice } from '../interfaces/station-price.interface';

@Injectable({
  providedIn: 'root',
})
export class StationDataService {
  displayedColumns: string[] = ['station', 'petrol', 'diesel'];
  STATION_DATA: IStationPrice[] = [];
  //     { station: 'Station A', petrol: 1.0079, diesel: 2.0079 },
  //     { station: 'Station B', petrol: 1.0026, diesel: 2.0026 },
  //     { station: 'Station C', petrol: 1.941, diesel: 2.941 },
  //     { station: 'Station D', petrol: 1.0122, diesel: 2.0122 },
  //     { station: 'Station E', petrol: 1.811, diesel: 2.811 },
  //     { station: 'Station F', petrol: 1.0107, diesel: 2.0107 },
  //     { station: 'Station G', petrol: 1.0067, diesel: 2.0067 },
  //     { station: 'Station H', petrol: 1.9994, diesel: 2.9994 },
  //     { station: 'Station I', petrol: 1.9984, diesel: 2.9984 },
  //     { station: 'Station J', petrol: 1.1797, diesel: 2.1797 },
  //   ];

  //   private _changedSearchLocation = new Subject<number>();
  //   public changedSearchLocation$ = this._changedSearchLocation.asObservable();
  constructor() {}
}
