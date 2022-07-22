import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ISearchResponse } from 'src/app/shared/interfaces/search-response.interface';
import { LocationService } from 'src/app/shared/services/location.service';

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
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.initSearchForm();
  }

  ngAfterViewInit(): void {
    let autocomplete = new google.maps.places.Autocomplete(
      this.searchElementRef.nativeElement
    );

    autocomplete.setTypes(['locality', 'country']);

    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }

        const location: ISearchResponse = {
          address: place.name,
          coordinate: {
            lat: place.geometry.location?.lat(),
            lng: place.geometry.location?.lng(),
          },
        };
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
}
