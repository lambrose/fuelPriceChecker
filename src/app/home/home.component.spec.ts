import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapComponent } from './components/map/map.component';
import { StationListComponent } from './components/station-list/station-list.component';

import { HomeComponent } from './home.component';
import { NearbySearchService } from './services/nearby-search.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockNearbySearchService = jasmine.createSpyObj([
    'findStations',
    'getStations',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent, MapComponent, StationListComponent],
      providers: [
        { provide: NearbySearchService, useValue: mockNearbySearchService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('', () => {
    expect(true).toBe(true);
  });
});
