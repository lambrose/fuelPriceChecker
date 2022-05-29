import { ISearchResponse } from 'src/app/shared/interfaces/search-response.interface';

export interface IHomeState {
  location: ISearchResponse;
  reset: boolean;
}
