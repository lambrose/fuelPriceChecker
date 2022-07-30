import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IAppState } from 'src/app/core/interfaces/app-state.interface';
import { Store } from '@ngrx/store';
import { getLocation, getStations } from 'src/app/core/state/core.selector';
import { IUpdatedStation } from 'src/app/core/interfaces/search-state.interface';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StationService {
  getLocation$: Observable<string> = this._store.select(getLocation);
  getStations$: Observable<IUpdatedStation[]> = this._store.select(getStations);

  constructor(private _store: Store<IAppState>) {}

  getStations(): Map<string, IUpdatedStation> {
    let map = new Map<string, IUpdatedStation>();
    this.getStations$
      .pipe(
        tap((stations) =>
          stations.map((station) => {
            map.set(station.station, {
              id: station.id,
              station: station.station,
              petrol: station.petrol,
              diesel: station.diesel,
            });
          })
        )
      )
      .subscribe();

    return map;
  }
}
