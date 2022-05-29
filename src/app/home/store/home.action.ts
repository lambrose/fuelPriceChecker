import { createAction, props } from '@ngrx/store';
import { ISearchResponse } from 'src/app/shared/interfaces/search-response.interface';

export const setSearchedLocation = createAction(
  '[Home Component] set searched location',
  props<{ searchedLocation: ISearchResponse }>()
);
export const reset = createAction('[Home Component] Reset');
