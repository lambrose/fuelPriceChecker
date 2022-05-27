import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NearbySearchService } from 'src/app/shared/services/nearby-search.service';
import { ISearchResponse } from '../../shared/interfaces/search-response.interface';
import { LocationService } from '../../shared/services/location.service';

@Component({
  selector: 'app-search-place',
  templateUrl: './search-place.component.html',
  styleUrls: ['./search-place.component.scss'],
})
export class SearchPlaceComponent implements OnInit, AfterViewInit {
  public searchForm!: FormGroup;
  @ViewChild('searchInput')
  public searchElementRef!: ElementRef;

  constructor(
    private ngZone: NgZone,
    private locationService: LocationService,
    private nearbySearchService: NearbySearchService
  ) {}

  ngOnInit(): void {
    this.initSearchForm();
  }

  ngAfterViewInit(): void {
    let autocomplete = new google.maps.places.Autocomplete(
      this.searchElementRef.nativeElement
    );

    // gas_station
    autocomplete.setTypes(['locality', 'country']);

    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }

        console.log(
          { place },
          place.geometry.location?.lat(),
          place.geometry.location?.lng()
        );
        const location: ISearchResponse = {
          address: 'xxxx',
          coordinate: {
            lat: place.geometry.location?.lat(),
            lng: place.geometry.location?.lng(),
          },
        };
        // this.getNearbySearch();
        this.locationService.setLocation(location);
      });
    });
  }

  initSearchForm(): void {
    this.searchForm = new FormGroup({
      search: new FormControl('', [Validators.required]),
    });
  }

  onClear(): void {
    this.searchForm.reset();
  }

  getNearbySearch() {
    this.nearbySearchService.getStations().subscribe((response: any) => {
      console.log(response);
    });
  }
}
