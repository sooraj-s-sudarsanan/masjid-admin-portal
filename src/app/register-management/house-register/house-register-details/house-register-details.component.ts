import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-house-register-details',
  templateUrl: './house-register-details.component.html',
  styleUrls: ['./house-register-details.component.scss']
})
export class HouseRegisterDetailsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<HouseRegisterDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any
  ) { }

  ngOnInit(): void {
  }
}
