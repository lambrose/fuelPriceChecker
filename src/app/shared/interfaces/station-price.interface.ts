export interface IStation {
  location: string;
  station: IStationPrice;
}

export interface IStationPrice {
  station: string;
  petrol: number;
  diesel: number;
}
