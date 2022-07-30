import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapComponent } from './map.component';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MapComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
  });

  it('should get user location', () => {
    spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake(() => {
      component.coords = { lat: 52, lng: 13 };
    });
    fixture.detectChanges();
    expect(component.coords).toEqual({ lat: 52, lng: 13 });
  });
});
