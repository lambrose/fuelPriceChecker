export interface ISearchResponse {
  address?: string;
  coordinate: ICoordinate;
}

export interface ICoordinate {
  lat: number;
  lng: number;
}
