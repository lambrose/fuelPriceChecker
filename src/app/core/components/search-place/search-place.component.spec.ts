import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationService } from 'src/app/shared/services/location.service';
import { SearchLocationService } from '../../services/searched-location.service';

import { SearchPlaceComponent } from './search-place.component';

describe('SearchPlaceComponent', () => {
  let fixture: ComponentFixture<SearchPlaceComponent>;
  let mockLocationService = jasmine.createSpyObj(['setLocation']);
  let mockSearchService = jasmine.createSpyObj([
    'getStations',
    'setSearchedLocation',
    'setUpdatedStations',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchPlaceComponent],
      providers: [
        { provide: LocationService, useValue: mockLocationService },
        { provide: SearchLocationService, useValue: mockSearchService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(SearchPlaceComponent);
  });

  it('should contain an empty input element', () => {
    const selector = fixture.nativeElement.querySelector('input')?.textContent;
    expect(selector).toBe('');
  });
});
