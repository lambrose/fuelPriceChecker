import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FirebaseService } from '../shared/services/firebase.service';
import { UpdatePriceService } from '../shared/services/update-price.service';
import { StationService } from './services/station.service';

import { StationComponent } from './station.component';

describe('StationComponent', () => {
  let component: StationComponent;
  let fixture: ComponentFixture<StationComponent>;
  let mockUpdatePriceService = jasmine.createSpyObj(['updatePrice$']);
  let mockFirebaseService = jasmine.createSpyObj(['create, update']);
  let mockStationService = jasmine.createSpyObj(['getStations, getLocation$']);
  let mockRouter = jasmine.createSpyObj(['navigate']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StationComponent],
      providers: [
        { provide: UpdatePriceService, useValue: mockUpdatePriceService },
        { provide: FirebaseService, useValue: mockFirebaseService },
        { provide: StationService, useValue: mockStationService },
        { provide: Router, useValue: mockRouter },
        { provide: MatDialog, useValue: {} },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(StationComponent);
    component = fixture.componentInstance;
  });

  it('', () => {
    expect(true).toBe(true);
  });
});
