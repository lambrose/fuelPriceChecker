import { createReducer, on } from '@ngrx/store';
import { IHomeState } from './home-state.interface';
import * as actions from './home.action';

export const initialState: IHomeState = {
  location: {
    address: '',
    coordinate: { lat: 0, lng: 0 }, //Could set to user current location
  },
  reset: false,
};

const _HomeReducer = createReducer(
  initialState,
  on(actions.setSearchedLocation, (state, { searchedLocation }) => ({
    ...state,
    location: searchedLocation,
  })),
  on(actions.reset, () => initialState)
);

export function HomeReducer(state: any, action: any) {
  return _HomeReducer(state, action);
}
