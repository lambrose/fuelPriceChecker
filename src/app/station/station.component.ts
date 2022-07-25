import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUpdatedStation } from '../core/interfaces/search-state.interface';
import { ModalDialogComponent } from '../shared/component/modal-dialog/modal-dialog.component';
import { IStationPrice } from '../shared/interfaces/station-price.interface';
import { FirebaseService } from '../shared/services/firebase.service';
import { UpdatePriceService } from '../shared/services/update-price.service';
import { StationService } from './services/station.service';

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.scss'],
})
export class StationComponent implements OnInit, OnDestroy {
  public stationForm!: FormGroup;
  subscription!: Subscription;
  @ViewChild('form') ngForm!: NgForm;
  location: string = 'stations';
  private stations = new Map<string, IUpdatedStation>();

  constructor(
    private updatePriceService: UpdatePriceService,
    private firebaseService: FirebaseService,
    private stationService: StationService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.initSearchForm();
    this.autoPopulateForm();
    this.getLocation();
  }

  initSearchForm(): void {
    this.stationForm = new FormGroup({
      station: new FormControl('', [Validators.required]),
      petrol: new FormControl('', [Validators.required]),
      diesel: new FormControl('', [Validators.required]),
    });
  }

  autoPopulateForm() {
    this.subscription = this.updatePriceService.updatePrice$.subscribe(
      (data: IStationPrice) => {
        this.stationForm.setValue(data);
      }
    );
  }

  getLocation() {
    this.stationService.getLocation$.subscribe((data: string) => {
      if (data) this.location = data;
    });
    this.stations = this.stationService.getStations();
  }

  getErrorMessage() {
    const control = this.stationForm.controls;

    if (control.station.hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }

  onSubmit() {
    const value = this.stationForm.value;
    const res = this.stations.get(value.station);
    if (!res) this.onCreate(value);
    else this.onUpdate(res.id, value);

    this.onClear();
  }

  onCreate(value: IStationPrice) {
    this.firebaseService
      .create(this.location, value)
      .then(() => this.successfulSubmission());
  }

  onUpdate(id: string, value: IStationPrice) {
    this.firebaseService
      .update(this.location, id, value)
      .then(() => this.successfulSubmission());
  }

  successfulSubmission() {
    this.dialog.open(ModalDialogComponent, {
      data: {
        title: 'Successful Submission',
        content: 'Thank you for updating the fuel price.',
      },
    });
  }

  onCancel() {
    this.router.navigate(['/home']);
  }

  onClear() {
    this.stationForm.reset();
    this.ngForm.resetForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
