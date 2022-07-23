import {
  Component,
  AfterViewInit,
  ViewChild,
  Input,
  OnChanges,
} from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IStationPrice } from '../../../shared/interfaces/station-price.interface';
import { Router } from '@angular/router';
import { UpdatePriceService } from '../../../shared/services/update-price.service';

@Component({
  selector: 'app-station-list',
  templateUrl: './station-list.component.html',
  styleUrls: ['./station-list.component.scss'],
})
export class StationListComponent implements AfterViewInit, OnChanges {
  @ViewChild(MatSort) sort!: MatSort;
  @Input() location!: string;
  @Input() dataSource!: MatTableDataSource<IStationPrice>;
  @Input() columnData!: string[];

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private updatePriceService: UpdatePriceService,
    private router: Router
  ) {}

  ngOnChanges(): void {
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  updatePrices(rowData: IStationPrice) {
    this.updatePriceService.setUpdatePrice({
      location: this.location,
      station: rowData,
    });
    this.router.navigate(['/station']);
  }
}
