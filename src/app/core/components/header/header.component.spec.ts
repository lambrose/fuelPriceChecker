import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/shared/services/location.service';
import { SearchLocationService } from '../../services/searched-location.service';
import { SearchPlaceComponent } from '../search-place/search-place.component';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockLocationService = jasmine.createSpyObj(['setLocation']);
  let mockSearchService = jasmine.createSpyObj([
    'getStations',
    'setSearchedLocation',
    'setUpdatedStations',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent, SearchPlaceComponent],
      providers: [
        { provide: Router, useValue: { url: '/home' } },
        { provide: LocationService, useValue: mockLocationService },
        { provide: SearchLocationService, useValue: mockSearchService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create search directive on the template', () => {
    component.isHomeScreen();
    fixture.detectChanges();

    const searchCED = fixture.debugElement.queryAll(
      By.directive(SearchPlaceComponent)
    );

    expect(searchCED.length).toEqual(1);
  });
});
