import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IStationPrice } from 'src/app/shared/interfaces/station-price.interface';

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  private route =
    'https://fuel-price-checker-default-rtdb.europe-west1.firebasedatabase.app/stations.json';

  constructor(private http: HttpClient) {}

  getData(): Observable<{ [key: string]: IStationPrice }> {
    return this.http.get<{ [key: string]: IStationPrice }>(this.route);
  }

  postData(data: IStationPrice): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(this.route, data);
  }
}
