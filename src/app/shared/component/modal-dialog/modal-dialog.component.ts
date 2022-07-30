import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDialogData } from '../../interfaces/dialog-data.interface';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss'],
})
export class ModalDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: IDialogData) {}

  ngOnInit(): void {}
}
