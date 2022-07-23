import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModalDialogComponent } from '../shared/component/modal-dialog/modal-dialog.component';
import { IStation } from '../shared/interfaces/station-price.interface';
import { FirebaseService } from '../shared/services/firebase.service';
import { UpdatePriceService } from '../shared/services/update-price.service';
// import { map } from 'rxjs/operators';

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.scss'],
})
export class StationComponent implements OnInit, OnDestroy {
  public stationForm!: FormGroup;
  subscription!: Subscription;
  @ViewChild('form') ngForm!: NgForm;
  location!: string;

  constructor(
    private updatePriceService: UpdatePriceService,
    private firebaseService: FirebaseService,
    private router: Router,
    private dialog: MatDialog
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
      (data: IStation) => {
        this.location = data.location;
        this.stationForm.setValue(data.station);
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
      .create(this.location, this.stationForm.value)
      .then(() => {
        console.log(this.location);
        this.dialog.open(ModalDialogComponent, {
          data: {
            title: 'Successful Submission',
            content: 'Thank you for updating the fuel price.',
          },
        });
      });
    this.onClear();
  }

  onCancel() {
    this.router.navigate(['/home']);
  }

  onClear() {
    // this.firebaseService
    //   .getAll(this.location)
    //   .pipe(
    //     map((changes) =>
    //       changes.map((c) => ({
    //         id: c.payload.doc.id,
    //         ...c.payload.doc.data(),
    //       }))
    //     )
    //   )
    //   .subscribe((data) => {
    //     console.log(data);
    //   });

    this.stationForm.reset();
    this.ngForm.resetForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
