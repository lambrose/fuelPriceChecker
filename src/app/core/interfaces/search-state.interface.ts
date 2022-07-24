export interface ISearchState {
  location: string;
  stations: IUpdatedStation[];
}

export interface IUpdatedStation {
  id: string;
  station: string;
  petrol: number;
  diesel: number;
}
