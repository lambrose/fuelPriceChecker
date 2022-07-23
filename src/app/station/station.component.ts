import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IStationPrice } from '../shared/interfaces/station-price.interface';
import { UpdatePriceService } from '../shared/services/update-price.service';
import { FirebaseService } from './service/firebase.service';

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.scss'],
})
export class StationComponent implements OnInit, OnDestroy {
  public stationForm!: FormGroup;
  subscription!: Subscription;
  @ViewChild('form') ngForm!: NgForm;

  constructor(
    private updatePriceService: UpdatePriceService,
    private firebaseService: FirebaseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initSearchForm();
    this.autoPopulateForm();
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

  getErrorMessage() {
    const control = this.stationForm.controls;

    if (control.station.hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }

  onSubmit() {
    this.firebaseService
      .postData(this.stationForm.value)
      .subscribe((data: any) => console.log(data));

    // this.firebaseService.getData().subscribe((data: any) => console.log(data));
    this.onClear();
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
