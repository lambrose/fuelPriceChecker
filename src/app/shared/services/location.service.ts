import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ISearchResponse } from '../interfaces/search-response.interface';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private _changedSearchLocation = new Subject<ISearchResponse>();
  public changedSearchLocation$ = this._changedSearchLocation.asObservable();
  constructor() {}

  setLocation(searchedLocation: ISearchResponse): void {
    this._changedSearchLocation.next(searchedLocation);
  }
}
