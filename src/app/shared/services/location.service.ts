import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
// import { IAppState } from 'src/app/interfaces/app-state.interface';
import { ISearchResponse } from '../interfaces/search-response.interface';
import { Store } from '@ngrx/store';
// import { setSearchedLocation } from '../store/shared.action';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private _changedSearchLocation = new Subject<ISearchResponse>();
  public changedSearchLocation$ = this._changedSearchLocation.asObservable();
  // constructor(private _store: Store<IAppState>) {}
  constructor() {}

  setLocation(searchedLocation: ISearchResponse): void {
    this._changedSearchLocation.next(searchedLocation);
    // this._store.dispatch(setSearchedLocation({ searchedLocation }));
  }
}
