import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IStation } from 'src/app/shared/interfaces/station-price.interface';

@Injectable({
  providedIn: 'root',
})
export class UpdatePriceService {
  private _updatePrice$ = new BehaviorSubject<IStation>({
    location: '',
    station: {
      station: '',
      petrol: 0,
      diesel: 0,
    },
  });
  public updatePrice$ = this._updatePrice$.asObservable();
  constructor() {}

  setUpdatePrice(stationPrice: IStation): void {
    this._updatePrice$.next(stationPrice);
  }
}
