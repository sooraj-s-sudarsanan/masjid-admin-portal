import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-family-register-details',
  templateUrl: './family-register-details.component.html',
  styleUrls: ['./family-register-details.component.scss']
})
export class FamilyRegisterDetailsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FamilyRegisterDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any
  ) { }

  ngOnInit(): void {
  }

}
