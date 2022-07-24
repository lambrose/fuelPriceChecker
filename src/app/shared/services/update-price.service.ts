import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IStationPrice } from 'src/app/shared/interfaces/station-price.interface';

@Injectable({
  providedIn: 'root',
})
export class UpdatePriceService {
  private _updatePrice$ = new BehaviorSubject<IStationPrice>({
    station: '',
    petrol: 0,
    diesel: 0,
  });
  public updatePrice$ = this._updatePrice$.asObservable();
  constructor() {}

  setUpdatePrice(stationPrice: IStationPrice): void {
    this._updatePrice$.next(stationPrice);
  }
}
