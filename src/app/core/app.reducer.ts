import { IAppState } from './interfaces/app-state.interface';
import { ActionReducerMap } from '@ngrx/store';
import { coreReducer } from './state/core.reducer';

export const reducer: ActionReducerMap<IAppState> = {
  core: coreReducer,
};
