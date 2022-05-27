import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.scss'],
})
export class StationComponent implements OnInit {
  map!: google.maps.Map;
  service!: google.maps.places.PlacesService;
  infowindow!: google.maps.InfoWindow;

  constructor() {}

  ngOnInit(): void {
    this.initMap();
  }

  initMap(): void {
    const newbridge = new google.maps.LatLng(53.17507579999999, -6.8047467);

    this.infowindow = new google.maps.InfoWindow();

    this.map = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      {
        center: newbridge,
        zoom: 15,
      }
    );

    const request = {
      location: newbridge,
      radius: 1500,
      type: 'gas_station',
    };

    const service = new google.maps.places.PlacesService(this.map);
    service.nearbySearch(request, this.callback);
  }

  callback = (
    results: google.maps.places.PlaceResult[],
    status: google.maps.places.PlacesServiceStatus
  ) => {
    if (status == google.maps.places.PlacesServiceStatus.OK && results) {
      for (let result of results) {
        this.createMarker(result);
      }
      // this.map.setCenter(results[0].geometry!.location!);
    }
  };

  createMarker(place: google.maps.places.PlaceResult) {
    console.log(place);
    if (!place.geometry || !place.geometry.location) return;

    const marker = new google.maps.Marker({
      map: this.map,
      position: place.geometry.location,
    });

    google.maps.event.addListener(marker, 'click', () => {
      this.infowindow.setContent(place.name || '');
      this.infowindow.open(this.map);
    });
  }
}
