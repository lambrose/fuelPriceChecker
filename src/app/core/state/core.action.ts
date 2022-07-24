import { createAction, props } from '@ngrx/store';
import { IUpdatedStation } from '../interfaces/search-state.interface';

export const resetAll = createAction('[Core Component] RESET ALL');
export const setLocation = createAction(
  '[Core Component] SET SEARCHED LOCATION',
  props<{ location: string }>()
);
export const setStations = createAction(
  '[Core Component] SET UPDATED STATIONS',
  props<{ stations: IUpdatedStation[] }>()
);
