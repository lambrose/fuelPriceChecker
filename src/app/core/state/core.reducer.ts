import { createReducer, on } from '@ngrx/store';
import { ISearchState } from '../interfaces/search-state.interface';
import { resetAll, setLocation, setStations } from './core.action';

export const initialState: ISearchState = {
  location: '',
  stations: [],
};

const _coreReducer = createReducer(
  initialState,
  on(resetAll, () => ({ ...initialState })),
  on(setLocation, (state, action) => ({ ...state, location: action.location })),
  on(setStations, (state, action) => ({
    ...state,
    stations: action.stations,
  }))
);

export function coreReducer(state: any, action: any) {
  return _coreReducer(state, action);
}
