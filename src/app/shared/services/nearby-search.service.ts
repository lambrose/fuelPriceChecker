import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NearbySearchService {
  constructor(private http: HttpClient) {}

  baseUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';

  getHeaders() {
    const headers = new HttpHeaders().set(
      'Access-Control-Allow-Origin',
      'http://localhost:4200'
    );
    return headers;
  }

  getParams() {
    const params = new HttpParams()
      .set('location', '-33.8670522%2C151.1957362')
      .set('radius', '1500')
      .set('type', 'restaurant')
      .set('keyword', 'cruise')
      .set('key', 'AIzaSyBuqiIfDtaGfTmioES2pR6KZPoTIQtpfI4');
    return params;
  }

  getStations() {
    return this.http.get<any>(this.baseUrl, {
      headers: this.getHeaders(),
      params: this.getParams(),
    });
  }
}
