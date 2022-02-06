import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-appoinment-details',
  templateUrl: './appoinment-details.component.html',
  styleUrls: ['./appoinment-details.component.scss']
})
export class AppoinmentDetailsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AppoinmentDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any
  ) { }

  ngOnInit(): void {
  }

}
