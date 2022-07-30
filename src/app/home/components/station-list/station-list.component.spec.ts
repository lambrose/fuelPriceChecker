import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IStationPrice } from 'src/app/shared/interfaces/station-price.interface';
import { UpdatePriceService } from 'src/app/shared/services/update-price.service';

import { StationListComponent } from './station-list.component';

describe('StationListComponent', () => {
  let component: StationListComponent;
  let fixture: ComponentFixture<StationListComponent>;
  let columns: string[] = ['station', 'petrol', 'diesel', 'star'];
  let data: IStationPrice[] = [
    { station: 'station a', petrol: 1, diesel: 2 },
    { station: 'station b', petrol: 2, diesel: 3 },
    { station: 'station c', petrol: 3, diesel: 4 },
  ];

  let mockRouter = jasmine.createSpyObj(['navigate']);
  let mockUpdatePriceService = jasmine.createSpyObj(['setLocation']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StationListComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: UpdatePriceService, useValue: mockUpdatePriceService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(StationListComponent);
    component = fixture.componentInstance;
  });

  it('should display the station prices table', () => {
    component.columnData = columns;
    component.dataSource = new MatTableDataSource(data);
    component.sort = new MatSort();
    component.dataSource.sort = component.sort;
    fixture.detectChanges();
    const table = fixture.debugElement.queryAll(By.css('table'));
    expect(table.length).toEqual(1);
  });
});
