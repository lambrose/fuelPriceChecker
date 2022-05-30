import { Injectable } from '@angular/core';
// import { Store } from '@ngrx/store';
// import { ISearchResponse } from 'src/app/shared/interfaces/search-response.interface';
// import { IAppState } from '../interfaces/app-state.interface';
// import { setSearchedLocation } from 'src/app/home/store/home.action';

@Injectable({
  providedIn: 'root',
})
export class SearchedLocationService {
  constructor() {}
  //   constructor(private _store: Store<IAppState>) {}

  //   setLocation(searchedLocation: ISearchResponse): void {
  //     this._store.dispatch(setSearchedLocation({ searchedLocation }));
  //   }
}

// Requires further thought

// getSearchedLocation$: Observable<ISearchResponse> =
//     this._store.select(getSearchedLocation);
//   constructor(private _store: Store<IAppState>) {}
