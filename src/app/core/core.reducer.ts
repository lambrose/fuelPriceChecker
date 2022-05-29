import { IAppState } from './interfaces/app-state.interface';
import { ActionReducerMap } from '@ngrx/store';
import { HomeReducer } from '../home/store/home.reducer';

export const reducer: ActionReducerMap<IAppState> = {
  home: HomeReducer,
};
