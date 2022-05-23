import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  title = 'google-maps';
  private map: google.maps.Map;

  constructor() {}

  ngOnInit(): void {
    this.initMap();
  }

  initMap(): void {
    const loader = new Loader({
      apiKey: '',
    });

    const location = {
      lat: 53.347836850403354,
      lng: -6.29168534213298,
    };

    const mapOptions = {
      center: location,
      zoom: 12,
    };

    loader
      .load()
      .then((google) => {
        this.map = new google.maps.Map(
          document.getElementById('map') as HTMLElement,
          mapOptions
        );
        new google.maps.Marker({
          position: location,
          map: this.map,
        });
      })
      .catch((e) => {
        console.log('error......');
      });
  }
}
