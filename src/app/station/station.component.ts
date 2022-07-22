import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from './service/firebase.service';

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.scss'],
})
export class StationComponent implements OnInit {
  public stationForm!: FormGroup;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initSearchForm();
  }

  initSearchForm(): void {
    this.stationForm = new FormGroup({
      station: new FormControl('', [Validators.required]),
      petrol: new FormControl('', [Validators.required]),
      diesel: new FormControl('', [Validators.required]),
    });
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
    this.onClear();
    this.router.navigate(['/home']);
  }

  onClear() {
    this.stationForm.reset();
  }
}
