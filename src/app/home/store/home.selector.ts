import { createSelector } from '@ngrx/store';
import { IAppState } from 'src/app/core/interfaces/app-state.interface';
import { IHomeState } from './home-state.interface';

export const selectFeature = (state: IAppState) => state.home;

export const getSearchedLocation = createSelector(
  selectFeature,
  (state: IHomeState) => state?.location
);
