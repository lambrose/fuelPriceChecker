import { ISearchState } from '../interfaces/search-state.interface';
import { IAppState } from '../interfaces/app-state.interface';
import { createSelector } from '@ngrx/store';

export const selectFeature = (state: IAppState) => state.core;

export const getLocation = createSelector(
  selectFeature,
  (state: ISearchState) => state.location
);
export const getStations = createSelector(
  selectFeature,
  (state: ISearchState) => state.stations
);
