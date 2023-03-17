import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-marriage-register-details',
  templateUrl: './marriage-register-details.component.html',
  styleUrls: ['./marriage-register-details.component.scss']
})
export class MarriageRegisterDetailsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MarriageRegisterDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any
  ) { }
  

  ngOnInit(): void {
  }

}
