import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ISearchResponse } from '../interfaces/search-response.interface';

@Component({
  selector: 'app-search-place',
  templateUrl: './search-place.component.html',
  styleUrls: ['./search-place.component.scss'],
})
export class SearchPlaceComponent implements OnInit {
  public searchForm: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.initSearchForm();
  }

  initSearchForm(): void {
    this.searchForm = new FormGroup({
      search: new FormControl('', [Validators.required]),
    });
  }

  handleAddressChange(address: any) {
    console.log(address);
    const location = {
      address: address.formatted_address,
      latitude: address.geometry.location.lat(),
      longitude: address.geometry.location.lng(),
    };

    console.log(location);
  }

  onClear(): void {
    this.searchForm.reset();
  }
}
