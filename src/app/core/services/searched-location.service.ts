import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { IAppState } from '../interfaces/app-state.interface';
import { IUpdatedStation } from '../interfaces/search-state.interface';
import { resetAll, setLocation, setStations } from '../state/core.action';

@Injectable({
  providedIn: 'root',
})
export class SearchLocationService {
  constructor(
    private firebaseService: FirebaseService,
    private _store: Store<IAppState>
  ) {}

  getStations(location: string) {
    this.firebaseService
      .getAll(location)
      .pipe(
        take(1),
        map((updatedStations) =>
          updatedStations.map((uStation) => ({
            id: uStation.payload.doc.id,
            ...uStation.payload.doc.data(),
          }))
        )
      )
      .subscribe((stations: IUpdatedStation[]) => {
        this.setSearchedLocation(location);
        this.setUpdatedStations(stations);
      });
  }

  resetUserSearch() {
    this._store.dispatch(resetAll());
  }

  setSearchedLocation(location: string) {
    this._store.dispatch(setLocation({ location }));
  }

  setUpdatedStations(stations: IUpdatedStation[]) {
    this._store.dispatch(setStations({ stations }));
  }
}
